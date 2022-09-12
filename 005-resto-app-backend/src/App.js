import "./App.css";
import React, {useEffect, useReducer} from "react";
import ItemBox from "./components/ItemBox";
import FilterCartItem from "./components/FilterCartItem";
import NewItem from "./components/NewItem";
import {v4 as uuidv4} from "uuid";
import EditItemForm from "./components/EditItemForm";
import CartItems from "./components/CartItems";
import {Routes, Route} from "react-router";
import {Link} from "react-router-dom";
import axios from "axios";

const App = () => {
	const initialState = {
		items: [
			// {
			// 	id: uuidv4(),
			// 	name: "Dry Aged Prime Rib",
			// 	price: 450,
			// 	category: "Food",
			// 	image:
			// 		"https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/217554287_328305238918438_543284701030730607_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a26aad&_nc_ohc=dEDrGor-nhAAX-uDgB5&tn=0RvgyDXAxf3ujckz&_nc_ht=scontent.fmnl17-2.fna&oh=00_AT9jPNr5SzdhTQIL03MXWDypeT3JEzAQ5SLrXuGHpAfyJg&oe=631ED674",
			// },
			// {
			// 	id: uuidv4(),
			// 	name: "Wagyu Burger",
			// 	price: 250,
			// 	category: "Food",
			// 	image: "https://bit.ly/3pFH1NA",
			// },
			// {
			// 	id: uuidv4(),
			// 	name: "Surf & Turf",
			// 	price: 1050,
			// 	category: "Food",
			// 	image: "https://bit.ly/3dJZeXo",
			// },
			// {
			// 	id: uuidv4(),
			// 	name: "Wagyu Cubes",
			// 	price: 150,
			// 	category: "Appetizer",
			// 	image:
			// 		"https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1024,h_768/https://happyandbusytravels.com/wp-content/uploads/2021/06/The-Steak-Cartel-Calamba-Laguna-17-Wagyu-Skewers-Happy-and-Busy-Travels.jpeg",
			// },
			// {
			// 	id: uuidv4(),
			// 	name: "Japanese Highball",
			// 	price: 95,
			// 	category: "Drink",
			// 	image: "https://bit.ly/3PTnHqG",
			// },
			// {
			// 	id: uuidv4(),
			// 	name: "Mochi Ice Cream",
			// 	price: 60,
			// 	category: "Dessert",
			// 	image: "https://bit.ly/3dX7wLN",
			// },
		],
		item: "",
		price: "",
		category: "",
		image: "",
		counter: 0,
		cartItem: [],
		editItem: false,
		editItemDetail: [],
		newItemForm: false,
		newItem: false,
		cartTotal: 0,
		editData: {
			id: "",
			name: "",
			price: "",
			category: "",
			image: "",
		},
	};

	useEffect(() => {
		axios.get("http://localhost:8000/menu", state.items).then((response) => {
			// console.log(response);
			dispatch({type: "LOAD_ITEMS", payload: response.data});
		});
		axios.get("http://localhost:8000/cart", state.cartItem).then((response) => {
			// console.log(response);
			dispatch({type: "LOAD_CART", payload: response.data});
		});
	}, []);

	const reducer = (state, action) => {
		switch (action.type) {
			case "LOAD_ITEMS": {
				return {
					...state,
					items: action.payload,
				};
			}
			case "LOAD_CART": {
				return {
					...state,
					cartItem: action.payload,
				};
			}
			case "ADD_ITEM": {
				return {
					...state,
					items: [...state.items, action.payload],
				};
			}
			case "SHOW_NEW_FORM": {
				return {
					...state,
					newItem: action.payload,
				};
			}
			case "SET_CATEGORY": {
				return {
					...state,
					category: action.payload,
				};
			}
			case "SHOW_EDIT_FORM": {
				return {
					...state,
					editItem: action.payload,
				};
			}
			case "EDIT_ITEM_DETAIL": {
				return {
					...state,
					editItemDetail: action.payload,
				};
			}
			case "SAVE_CHANGES": {
				const saveChanges = state.items.map((item) => {
					if (item.id === action.payload.id) {
						return action.payload;
					}
					return item;
				});
				const saveCartChanges = state.cartItem.map((item) => {
					if (item.id === action.payload.id) {
						return {...item, ...action.payload};
					}
					return item;
				});

				return {...state, items: saveChanges, cartItem: saveCartChanges};
			}
			case "DELETE_ITEM": {
				return {
					...state,
					items: state.items.filter((item) => item.id !== action.payload.id),
				};
			}
			case "ADD_TO_CART": {
				const cartCopy = [...state.cartItem];
				const cartIndex = cartCopy.findIndex((item) => {
					return action.payload.id === item.id;
				});
				if (cartIndex <= -1) {
					cartCopy.push({...action.payload, quantity: 1});
				} else {
					cartCopy[cartIndex].quantity = cartCopy[cartIndex].quantity + 1;
				}
				const cartTotal = state.cartTotal + action.payload.price;
				return {...state, cartTotal, cartItem: cartCopy};
			}
			case "INCREMENT_COUNTER": {
				const cartCopy = [...state.cartItem];

				let cartIndex = cartCopy.findIndex((item) => {
					return action.payload.id === item.id;
				});

				cartCopy[cartIndex].quantity = cartCopy[cartIndex].quantity + 1;

				const cartTotal = state.cartTotal + cartCopy[cartIndex].price;

				return {...state, cartItem: [...cartCopy], cartTotal};
			}
			case "DECREMENT_COUNTER": {
				const cartCopy = [...state.cartItem];

				let cartIndex = cartCopy.findIndex((item) => {
					return action.payload.id === item.id;
				});
				cartCopy[cartIndex].quantity = cartCopy[cartIndex].quantity - 1;

				const cartTotal = state.cartTotal - cartCopy[cartIndex].price;

				if (cartCopy[cartIndex].quantity <= 0) {
					cartCopy.splice(cartIndex, 1);
				}

				return {...state, cartItem: [...cartCopy], cartTotal};
			}
			case "DELETE_CART_ITEM": {
				return {
					...state,
					cartItem: state.cartItem.filter((item) => item.id !== action.payload.id),
				};
			}
			default: {
				return state;
			}
		}
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	// checks the category of the item added
	const categories = state.items.reduce((categories, item) => {
		if (!categories.includes(item.category)) {
			categories.push(item.category);
		}
		return categories;
	}, []);

	const filterCategory = (category) => {
		dispatch({type: "SET_CATEGORY", payload: category});
	};

	let filteredItems =
		state.category === ""
			? state.items
			: state.items.filter((item) => {
					return item.category === state.category;
			  });

	const showAddItemForm = () => {
		state.newItem
			? dispatch({type: "SHOW_NEW_FORM", payload: false})
			: dispatch({type: "SHOW_NEW_FORM", payload: true});
	};

	const showEditItemForm = (status, id) => {
		state.editItem
			? dispatch({type: "SHOW_EDIT_FORM", payload: false})
			: dispatch({type: "SHOW_EDIT_FORM", payload: status});

		const indexOfItem = state.items.findIndex((item) => item.id === id);
		const listItems = [...state.items];
		dispatch({type: "EDIT_ITEM_DETAIL", payload: listItems.splice(indexOfItem, 1)});
	};

	const hideNewItemForm = (status) => {
		dispatch({type: "SHOW_NEW_FORM", payload: status});
	};

	const hideEditItemForm = (status) => {
		dispatch({type: "SHOW_EDIT_FORM", payload: status});
	};

	const getCartTotal = () => {
		let cartTotal = 0;
		state.cartItem.map((item) => {
			cartTotal += item.price * item.quantity;
		});
		return cartTotal;
	};

	const totalAmout = getCartTotal();

	const listCartItems = state.cartItem.map((item, index) => (
		<CartItems
			key={index}
			id={item.id}
			name={item.name}
			price={item.price}
			image={item.image}
			quantity={item.quantity}
			editItem={state.editItem}
			dispatch={dispatch}
		/>
	));

	const listItems =
		filteredItems.length === 0 ? (
			<p>No item available.</p>
		) : (
			filteredItems.map((item, index) => (
				<ItemBox
					key={index}
					id={item.id}
					name={item.name}
					price={item.price}
					image={item.image}
					showEditItemForm={showEditItemForm}
					editItem={state.editItem}
					dispatch={dispatch}
				/>
			))
		);

	// console.log(state.items);
	return (
		<div className="App">
			<header>
				<h1>ArigaSteak</h1>
				<h2>Total: {totalAmout}</h2>
				<nav>
					<Link to="/">Home</Link> |<Link to="Menu">Menu</Link> |<Link to="Cart">Cart </Link>
				</nav>
			</header>

			<Routes>
				<Route
					path="/"
					element={
						<div className="home">
							{state.editItem ? (
								<EditItemForm
									details={state.editItemDetail[0]}
									hideEditItemForm={hideEditItemForm}
									dispatch={dispatch}
								/>
							) : (
								""
							)}
							<br />
							<FilterCartItem filterCategory={filterCategory} categories={categories} dispatch={dispatch} />
							{state.newItem ? (
								<NewItem hideNewItemForm={hideNewItemForm} dispatch={dispatch} state={state} />
							) : (
								<button className="AddItemBtn" onClick={showAddItemForm}>
									Add New Item
								</button>
							)}
							<br />
							<div className="ItemList">{listItems}</div>
							<h2>Cart Items:</h2>
							<div className="ItemList">{listCartItems}</div>
						</div>
					}
				/>
				<Route
					path="/Menu"
					element={
						<div className="menu">
							{state.editItem ? (
								<EditItemForm
									details={state.editItemDetail[0]}
									hideEditItemForm={hideEditItemForm}
									dispatch={dispatch}
								/>
							) : (
								""
							)}
							<FilterCartItem filterCategory={filterCategory} categories={categories} dispatch={dispatch} />
							<div className="ItemList">{listItems}</div>
						</div>
					}
				/>
				<Route
					path="/Cart"
					element={
						<div className="cart">
							<h2>In your Cart: {totalAmout}</h2>
							<div className="ItemList">{listCartItems}</div>
						</div>
					}
				/>
			</Routes>
			<br />
			<footer>
				<p>© 2022 Arigasteak</p>
				<p>
					Photo credits
					<a href="https://www.facebook.com/thesteakcartel/" target="_blank">
						The Steak Cartel
					</a>
				</p>
			</footer>
		</div>
	);
};

export default App;
