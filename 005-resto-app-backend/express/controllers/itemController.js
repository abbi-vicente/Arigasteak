const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const menuFilePath = "./routes/menu.json";
const cartFilePath = "./routes/cart.json";

// MENU
const displayItems = (request, response) => {
	const menuItems = fs.readFileSync(menuFilePath);
	const itemsList = JSON.parse(menuItems);
	response.send(itemsList);
};

const displayById = (request, response) => {
	const menuItems = fs.readFileSync(menuFilePath);
	const itemsList = JSON.parse(menuItems);

	const item = itemsList.find((item) => item.id === request.params.id);
	response.send(item);
};

const addNewItem = (request, response) => {
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
};

const editItems = (request, response) => {
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
			if (item.id == request.params.id) {
				item.name = request.body.name;
				item.price = request.body.price;
				item.image = request.body.image;
			}
		});

		fs.writeFileSync(menuFilePath, JSON.stringify(itemsList, null, 2));
		fs.writeFileSync(cartFilePath, JSON.stringify(cartList, null, 2));
		response.status(200).send();
	} catch (err) {
		response.send(err.message);
	}
};

const deleteItems = (request, response) => {
	try {
		const itemsList = JSON.parse(fs.readFileSync(menuFilePath));

		const filteredItems = itemsList.filter((item) => item.id !== request.params.id);

		fs.writeFileSync(menuFilePath, JSON.stringify(filteredItems, null, 2));
		response.status(200).send();
	} catch (err) {
		response.send(err.message);
	}
};

// CART
const displayCart = (request, response) => {
	const cartItems = fs.readFileSync(cartFilePath);
	const cart = JSON.parse(cartItems);
	response.send(cart);
};

const displayCartById = (request, response) => {
	const menuItems = fs.readFileSync(cartFilePath);
	const itemsList = JSON.parse(menuItems);

	const item = itemsList.find((item) => item.id == request.params.id);
	response.send(item);
};

const addToCart = (request, response) => {
	try {
		const cartItems = JSON.parse(fs.readFileSync(cartFilePath));

		let itemExist = false;

		cartItems.forEach((item) => {
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
};

const decrementQty = (request, response) => {
	try {
		const cartItems = JSON.parse(fs.readFileSync(cartFilePath));

		cartItems.findIndex((item) => {
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
};

const incrementQty = (request, response) => {
	try {
		const cartItems = JSON.parse(fs.readFileSync(cartFilePath));

		cartItems.findIndex((item) => {
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
};

const removeFromCart = (request, response) => {
	try {
		const cartList = JSON.parse(fs.readFileSync(cartFilePath));

		const filteredCart = cartList.filter((item) => item.id !== request.params.id);

		fs.writeFileSync(cartFilePath, JSON.stringify(filteredCart));
		response.status(200).send();
	} catch (err) {
		response.send(err.message);
	}
};

module.exports = {
	displayItems,
	displayById,
	addNewItem,
	editItems,
	deleteItems,
	displayCart,
	displayCartById,
	addToCart,
	decrementQty,
	incrementQty,
	removeFromCart,
};
