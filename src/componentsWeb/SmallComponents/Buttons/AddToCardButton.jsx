import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/web/cart/cart.actions";

const AddToCardButton = ({ item, amount }) => {
	const dispatch = useDispatch();

	return (
		<div
			className="button--1"
			onClick={() => dispatch(addItem(item, amount))}
		>
			Add to cart
		</div>
	);
};

export default AddToCardButton;
