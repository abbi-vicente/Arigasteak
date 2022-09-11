const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const path = require("path");

const cartFile = "./cart.json";
const cartFilePath = path.resolve(__dirname, cartFile);

router.get("/cart", (request, response) => {
	const cartItems = fs.readFileSync(cartFilePath);
	response.send(cartItems);
});

// http:localhost:8080/menu/id
router.get("/:id", (request, response) => {
	// console.log(request.params.id);
	const menuItems = fs.readFileSync(cartFilePath);
	const itemsList = JSON.parse(menuItems);

	const item = itemsList.find((item) => item.id === Number(request.params.id));
	response.send(item);
});

router.post("/", (request, response) => {
	const cartItems = JSON.parse(fs.readFileSync(cartFilePath));

	let itemExist = false;

	cartItems.forEach((item) => {
		if (item.name.trim().toLowerCase() == request.body.name.trim().toLowerCase()) {
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
});

router.put("/:id", (request, response) => {
	const itemsList = JSON.parse(fs.readFileSync(cartFilePath));

	itemsList.forEach((item) => {
		if (item.id === Number(request.params.id)) {
			item.name = request.body.name;
			item.price = request.body.price;
			item.category = request.body.category;
			item.image = request.body.image;
		}
	});
	// console.log(itemsList);
	fs.writeFileSync(cartFilePath, JSON.stringify(itemsList));
	response.status(200).send();
});

router.delete("/:id", (request, response) => {
	const itemsList = JSON.parse(fs.readFileSync(cartFilePath));

	const filteredItems = itemsList.filter((item) => item.id !== request.params.id);

	fs.writeFileSync(cartFilePath, JSON.stringify(filteredItems));
	response.status(200).send();
});

module.exports = router;
