import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item: { imageURL, price, name, quantity, id } }) => {
	return (
		<div className="cart-item">
			<Link to={`/product/${id}`}>
				<img
					className="cart-item__image"
					src={imageURL}
					alt={name || ""}
				/>
			</Link>
			<div className="cart-item-details">
				<Link to={`/product/${id}`}>
					<p className="cart-item__name">{name || ""}</p>
				</Link>

				<p className="cart-item__quantity">
					Số lượng: {quantity || ""}
				</p>

				<p className="cart-item__price">${price}</p>
			</div>
		</div>
	);
};

export default CartItem;
