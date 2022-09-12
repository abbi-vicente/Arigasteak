const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const path = require("path");

const cartFile = "./cart.json";
const cartFilePath = path.resolve(__dirname, cartFile);

router.get("/", (request, response) => {
	const cartItems = fs.readFileSync(cartFilePath);
	const cart = JSON.parse(cartItems);
	response.send(cart);
});

// http:localhost:8080/menu/id
router.get("/:id", (request, response) => {
	// console.log(request.params.id);
	const menuItems = fs.readFileSync(cartFilePath);
	const itemsList = JSON.parse(menuItems);

	const item = itemsList.find((item) => item.id == request.params.id);
	response.send(item);
});

router.post("/:id", (request, response) => {
	try {
		const cartItems = JSON.parse(fs.readFileSync(cartFilePath));

		let itemExist = false;

		cartItems.forEach((item) => {
			console.log(item.name + "-" + request.body.name);
			if (item.name?.trim()?.toLowerCase() == request.body.name?.trim()?.toLowerCase()) {
				itemExist = true;
				item.quantity += 1;
			}
		});
		if (!itemExist) {
			const addItem = {
				id: request.body.id,
				name: request.body.name,
				price: request.body.price,
				category: request.body.category,
				image: request.body.image,
				quantity: 1,
			};
			// push/add to existing items
			cartItems.push(addItem);
		}

		// write to json file
		fs.writeFileSync(cartFilePath, JSON.stringify(cartItems, null, 2));

		response.status(201).send();
	} catch (err) {
		response.send(err.message);
	}
});

router.put("/decrement/:id", (request, response) => {
	try {
		const cartItems = JSON.parse(fs.readFileSync(cartFilePath));

		cartItems.findIndex((item) => {
			console.log(item.id + "-" + request.body.id);
			if (item.id == request.body.id) {
				item.quantity -= 1;
			}
		});

		// write to json file
		fs.writeFileSync(cartFilePath, JSON.stringify(cartItems, null, 2));

		response.status(200).send();
	} catch (err) {
		response.send(err.message);
	}
});

router.put("/increment/:id", (request, response) => {
	try {
		const cartItems = JSON.parse(fs.readFileSync(cartFilePath));

		cartItems.findIndex((item) => {
			console.log(item.id + "-" + request.body.id);
			if (item.id == request.body.id) {
				item.quantity += 1;
			}
		});

		// write to json file
		fs.writeFileSync(cartFilePath, JSON.stringify(cartItems, null, 2));

		response.status(200).send();
	} catch (err) {
		response.send(err.message);
	}
});

router.delete("/:id", (request, response) => {
	try {
		const cartList = JSON.parse(fs.readFileSync(cartFilePath));

		const filteredCart = cartList.filter((item) => item.id !== request.params.id);

		fs.writeFileSync(cartFilePath, JSON.stringify(filteredCart));
		response.status(200).send();
	} catch (err) {
		response.send(err.message);
	}
});

module.exports = router;
