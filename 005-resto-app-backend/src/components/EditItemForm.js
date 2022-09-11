import React, {useState} from "react";
import styles from "./EditItem.module.css";

const EditItemForm = ({details, hideEditItemForm, dispatch}) => {
	const [editItem, setEditItem] = useState({
		id: details.id,
		name: details.name,
		price: details.price,
		category: details.category,
		image: details.image,
	});

	const onChange = (e) => {
		const inputName = e.target.name;

		switch (inputName) {
			case "name":
				setEditItem({
					...editItem,
					name: e.target.value,
				});
				break;
			case "price":
				setEditItem({
					...editItem,
					price: Number(e.target.value),
				});
				break;
			case "category":
				setEditItem({
					...editItem,
					category: e.target.value,
				});
				break;
			case "image":
				setEditItem({
					...editItem,
					image: e.target.value,
				});
				break;
			default:
				break;
		}
	};

	const onEditItem = (e) => {
		e.preventDefault();
		dispatch({
			type: "SAVE_CHANGES",
			payload: {...editItem},
		});

		setEditItem("");
		hideEditItemForm(false);
	};

	const hideForm = (e) => {
		e.preventDefault();
		hideEditItemForm(false);
	};
	return (
		<div className="EditForm">
			<form>
				<label>Item Name: </label>
				<input name="name" value={editItem.name} type="text" onChange={onChange} />
				<br />
				<label>Item Price: </label>
				<input name="price" value={editItem.price} type="number" onChange={onChange} />
				<br />
				<label>Item Category: </label>
				<input name="category" value={editItem.category} type="text" onChange={onChange} />
				<br />
				<label>Item Image: </label>
				<input name="image" value={editItem.image} type="text" onChange={onChange} />
				<br />
				<input name="id" value={editItem.id} type="hidden" />
				<button className={styles.submitBtn} onClick={onEditItem}>
					Save
				</button>
				<button className={styles.cancelBtn} onClick={hideForm}>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default EditItemForm;
