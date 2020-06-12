import React from "react";

const CartItem = ({ item: { imageURL, price, name, quantity } }) => {
	return (
		<div className="cart-item">
			<img className="cart-item__image" src={imageURL} alt={name || ""} />
			<div className="cart-item-details">
				<p className="cart-item__name">{name || ""}</p>

				<p className="cart-item__quantity">
					Số lượng: {quantity || ""}
				</p>

				<p className="cart-item__price">${price}</p>
			</div>
		</div>
	);
};

export default CartItem;
