const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const path = require("path");
// const controller = require("../constrollers/items.controller");

const menuFile = "./menu.json";
const menuFilePath = path.resolve(__dirname, menuFile);
const cartFile = "./cart.json";
const cartFilePath = path.resolve(__dirname, cartFile);

router.get("/", (request, response) => {
	const menuItems = fs.readFileSync(menuFilePath);
	response.send(menuItems);
});

// http:localhost:8080/menu/id
router.get("/:id", (request, response) => {
	// console.log(request.params.id);
	const menuItems = fs.readFileSync(menuFilePath);
	const itemsList = JSON.parse(menuItems);

	const item = itemsList.find((item) => item.id === Number(request.params.id));
	response.send(item);
});

router.post("/", (request, response) => {
	try {
		const itemsList = JSON.parse(fs.readFileSync(menuFilePath));

		const newItem = {
			id: uuidv4(),
			name: request.body.name,
			price: request.body.price,
			category: request.body.category,
			image: request.body.image,
		};

		// push/add to existing items
		itemsList.push(newItem);
		// write to json file
		fs.writeFileSync(menuFilePath, JSON.stringify(itemsList, null, 2));

		response.status(201).send();
	} catch (err) {
		response.send(err.message);
	}
});

router.put("/:id", (request, response) => {
	try {
		const itemsList = JSON.parse(fs.readFileSync(menuFilePath));
		const cartList = JSON.parse(fs.readFileSync(cartFilePath));

		itemsList.forEach((item) => {
			if (item.id == request.params.id) {
				item.name = request.body.name;
				item.price = request.body.price;
				item.category = request.body.category;
				item.image = request.body.image;
			}
		});
		cartList.forEach((item) => {
			console.log(item.id + "-" + request.params.id);

			if (item.id == request.params.id) {
				item.name = request.body.name;
				item.price = request.body.price;
				item.image = request.body.image;
			}
		});

		// console.log(itemsList);
		fs.writeFileSync(menuFilePath, JSON.stringify(itemsList, null, 2));
		fs.writeFileSync(cartFilePath, JSON.stringify(cartList, null, 2));
		// console.log(itemsList);
		// console.log(cartList);
		response.status(200).send();
	} catch (err) {
		response.send(err.message);
	}
});

router.delete("/:id", (request, response) => {
	try {
		const itemsList = JSON.parse(fs.readFileSync(menuFilePath));

		const filteredItems = itemsList.filter((item) => item.id !== request.params.id);

		fs.writeFileSync(menuFilePath, JSON.stringify(filteredItems, null, 2));
		response.status(200).send();
	} catch (err) {
		response.send(err.message);
	}
});

module.exports = router;
