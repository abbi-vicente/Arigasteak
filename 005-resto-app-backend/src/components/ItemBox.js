import React from "react";
import styles from "./ItemBox.module.css";

const ItemBox = ({id, name, price, image, showEditItemForm, editItem, dispatch}) => {
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
					<button
						className={styles.addToCartBtn}
						onClick={() => dispatch({type: "ADD_TO_CART", payload: {id, name, price, image}})}
					>
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
					<button
						className={styles.deleteBtn}
						onClick={() => {
							dispatch({type: "DELETE_ITEM", payload: {id}});
							dispatch({type: "DELETE_CART_ITEM", payload: {id}});
						}}
					>
						Delete
					</button>
				</p>
			</div>
		</div>
	);
};

export default ItemBox;
