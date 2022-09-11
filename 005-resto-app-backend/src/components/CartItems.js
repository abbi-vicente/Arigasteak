import React from "react";
import styles from "./ItemBox.module.css";

const CartItems = ({id, name, price, image, quantity, dispatch}) => {
	return (
		<div className={styles.Item}>
			<div>
				<img className={styles.itemImage} src={image} alt="item" />
			</div>
			<div className={styles.itemDetails}>
				<strong>{name}</strong>
				<br />
				<small>Php {price}</small>

				<div className={styles.qtyBtns}>
					Quantity <br />
					<button
						className={styles.decrementBtn}
						onClick={() => dispatch({type: "DECREMENT_COUNTER", payload: {id: id}})}
					>
						-
					</button>
					<small> {quantity} </small>
					<button
						className={styles.incrementBtn}
						onClick={() => dispatch({type: "INCREMENT_COUNTER", payload: {id: id}})}
					>
						+
					</button>
				</div>

				<p className={styles.subTotal}>
					Subtotal: Php {price * quantity}
					<button className={styles.removeBtn} onClick={() => dispatch({type: "DELETE_CART_ITEM", payload: {id}})}>
						Remove from Cart
					</button>
				</p>
			</div>
		</div>
	);
};

export default CartItems;
