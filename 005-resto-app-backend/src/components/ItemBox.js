import React, {useState} from "react";
import styles from "./ItemBox.module.css";
import axios from "axios";

const ItemBox = ({id, name, price, image, quantity, showEditItemForm, editItem, dispatch}) => {
	const [deleteItem, setDeleteItem] = useState({
		id,
	});

	const [addToCart, setAddToCart] = useState({
		id,
		name,
		price,
		image,
		quantity,
	});

	const onAddToCart = (e) => {
		e.preventDefault();
		axios.post(`http://localhost:8000/cart/${id}`, addToCart).then((response) => {
			console.log(response);
			dispatch({type: "ADD_TO_CART", payload: {id, name, price, image, quantity}});
			setAddToCart(addToCart);
		});
	};

	// deletes items in menu and in cart
	const onDelete = (e) => {
		e.preventDefault();
		axios.delete(`http://localhost:8000/menu/${id}`, deleteItem).then((response) => {
			dispatch({type: "DELETE_ITEM", payload: {id}});
			setDeleteItem("");

			axios.delete(`http://localhost:8000/cart/${id}`, deleteItem).then((response) => {
				dispatch({type: "DELETE_CART_ITEM", payload: {id}});
				setDeleteItem("");
			});
		});
	};

	return (
		<div className={styles.Item}>
			<div>
				<img className={styles.itemImage} src={image} alt="item" />
			</div>
			<div className={styles.itemDetails}>
				<strong>{name}</strong>
				<p>
					<small>Php {price}</small>
				</p>
				<p>
					<button className={styles.addToCartBtn} onClick={onAddToCart}>
						Add to Cart
					</button>
					<br />
					{editItem ? (
						""
					) : (
						<button className={styles.editBtn} onClick={() => showEditItemForm(true, id)}>
							Edit
						</button>
					)}
					<button className={styles.deleteBtn} onClick={onDelete}>
						Delete
					</button>
				</p>
			</div>
		</div>
	);
};

export default ItemBox;
