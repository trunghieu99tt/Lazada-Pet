import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/web/cart/cart.actions";
import { selectCartItems } from "../../redux/web/cart/cart.selectors";
import CartItem from "./CartItem";

const CartDropdown = ({ cartItems, history, dispatch }) => {
	console.log("cartItems", cartItems);

	return (
		<div className="cart-dropdown">
			<div className="cart-items">
				{(cartItems &&
					cartItems.length > 0 &&
					cartItems.map((item) => (
						<CartItem key={cartItems.id} item={item} />
					))) || (
					<span className="empty-message">Your cart is empty</span>
				)}
			</div>
			<div
				className="button--1"
				onClick={() => {
					history.push("/checkout");
					dispatch(toggleCartHidden());
				}}
			>
				GO TO CHECKOUT
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
