import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
	addItem,
	clearItemFromCart,
	decreaseItem,
} from "../../redux/web/cart/cart.actions";

const CheckoutItem = ({ cartItem, clearItem, increaseItem, decreaseItem }) => {
	const { name, amount, price, imageURL, id } = cartItem;

	return (
		<div className="checkout-item">
			<div className="image-container">
				<img src={imageURL} alt="item" />
			</div>

			<div className="name">
				<Link to={`/product/${id}`}>{name}</Link>
			</div>
			<div className="quantity">
				<div className="arrow" onClick={() => decreaseItem(cartItem)}>
					&#10094;
				</div>
				<span className="value">{amount}</span>
				<div className="arrow" onClick={() => increaseItem(cartItem)}>
					&#10095;
				</div>
			</div>
			<div className="price">{price}</div>
			<div className="remove-btn" onClick={() => clearItem(cartItem)}>
				&#10005;
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	clearItem: (item) => dispatch(clearItemFromCart(item)),
	increaseItem: (item) => dispatch(addItem(item)),
	decreaseItem: (item) => dispatch(decreaseItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
