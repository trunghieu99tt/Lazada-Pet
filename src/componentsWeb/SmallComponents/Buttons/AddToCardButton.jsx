import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { addItem } from "../../../redux/web/cart/cart.actions";

const AddToCartButton = ({ item, amount }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cartItems);
	const currentUser = useSelector((state) => state.user.currentUser);
	const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

	useEffect(() => {
		setCartItems(cart);
	}, [cart]);

	const addToCart = () => {
		if (currentUser?.isShop) {
			message.error(
				"Can't add to cart when you're using shop account. Please log in with customer account!"
			);
		} else {
			if (cart.length === 0) {
				dispatch(addItem(item, amount));
			} else {
				const currItem = cart[0];
				if (currItem.id === item.id) {
					dispatch(addItem(item, amount));
				} else {
					message.error("You can only add 1 product to cart");
				}
			}
		}
	};

	return (
		<div className="button--1" onClick={addToCart}>
			Add to cart
		</div>
	);
};

export default AddToCartButton;
