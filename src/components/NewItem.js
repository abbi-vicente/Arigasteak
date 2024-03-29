import axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./ItemBox.module.css";

const NewItem = ({ dispatch, hideNewItemForm }) => {
	const [item, setItem] = useState({
		name: "",
		price: "",
		category: "",
		image: "",
	});

	// hides form on cancel
	const cancelItem = (e) => {
		e.preventDefault();
		hideNewItemForm(false);
	};

	// adds new menu item, alerts and prevents duplicates and empty input
	const onSubmit = (e) => {
		e.preventDefault();

		if (item.name.length <= 0 && item.name.trim() !== "") {
			axios.post("http://localhost:8000/menu", item).then((response) => {
				dispatch({
					type: "ADD_ITEM",
					payload: { id: uuidv4(), ...item },
				});
				setItem(item);
			});
		} else if (item.name.trim() == "") {
			alert("Please add an item.");
		} else {
			alert("It's already on your list.");
		}
	};

	const onChange = (e) => {
		const inputName = e.target.name;
		switch (inputName) {
			case "name":
				setItem({
					...item,
					name: e.target.value,
				});
				break;
			case "price":
				setItem({
					...item,
					price: Number(e.target.value),
				});
				break;
			case "category":
				setItem({
					...item,
					category: e.target.value,
				});
				break;
			case "image":
				setItem({
					...item,
					image: e.target.value,
				});
				break;
			default:
				break;
		}
	};

	return (
		<div className={styles.EditForm}>
			<form onSubmit={onSubmit}>
				<input name="name" placeholder="item name" type="text" onChange={onChange} />
				<br />
				<input name="price" placeholder="price" type="number" onChange={onChange} />
				<br />
				<input name="category" placeholder="category" type="text" onChange={onChange} />
				<br />
				<input name="image" placeholder="image" type="text" onChange={onChange} />
				<br />
				<input value="submit" type="submit" />
				<button className="cancel-btn" onClick={cancelItem}>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default NewItem;
