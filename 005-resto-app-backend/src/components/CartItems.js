import React, {useState} from "react";
import styles from "./ItemBox.module.css";
import axios from "axios";

const CartItems = ({id, name, price, image, quantity, dispatch}) => {
	const [removeFromCart, setRemoveFromCart] = useState({
		id,
	});

	const [decrementCounter, setDecrementCounter] = useState({
		id,
		quantity,
	});

	const [incrementCounter, setIncrementCounter] = useState({
		id,
	});

	const onRemoveFromCart = (e) => {
		e.preventDefault();
		axios.delete(`http://localhost:8000/cart/${removeFromCart.id}`, removeFromCart).then((response) => {
			console.log(response);
			dispatch({type: "DELETE_CART_ITEM", payload: {id}});
			setRemoveFromCart("");
		});
	};

	const onDecrement = (e) => {
		e.preventDefault();
		if (quantity <= 1) {
			axios.delete(`http://localhost:8000/cart/${removeFromCart.id}`, removeFromCart).then((response) => {
				console.log(response);
				dispatch({type: "DELETE_CART_ITEM", payload: {id}});
				setRemoveFromCart("");
			});
		} else {
			axios.put(`http://localhost:8000/cart/decrement/${decrementCounter.id}`, decrementCounter).then((response) => {
				console.log(response);
				dispatch({type: "DECREMENT_COUNTER", payload: {id}});
				setDecrementCounter(decrementCounter);
			});
		}
	};

	const onIncrement = (e) => {
		e.preventDefault();
		axios.put(`http://localhost:8000/cart/increment/${incrementCounter.id}`, incrementCounter).then((response) => {
			console.log(response);
			dispatch({type: "INCREMENT_COUNTER", payload: {id}});
			setIncrementCounter(incrementCounter);
		});
	};

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
					<button className={styles.decrementBtn} onClick={onDecrement}>
						-
					</button>
					<small> {quantity} </small>
					<button className={styles.incrementBtn} onClick={onIncrement}>
						+
					</button>
				</div>

				<p className={styles.subTotal}>
					Subtotal: Php {price * quantity}
					<button className={styles.removeBtn} onClick={onRemoveFromCart}>
						Remove from Cart
					</button>
				</p>
			</div>
		</div>
	);
};

export default CartItems;
