import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import CheckoutItem from "../componentsWeb/Checkout/CheckoutItem";
import BaseView1 from "../layout/BaseView1";
import {
	selectCartItems,
	selectCartTotal,
} from "../redux/web/cart/cart.selectors";

const Checkout = ({ cartItems, total }) => {
	return (
		<div className="checkout-page">
			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Name</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>

			{(cartItems &&
				cartItems.length &&
				cartItems.map((cartItem) => (
					<CheckoutItem cartItem={cartItem} />
				))) || (
				<h2
					style={{
						margin: "2rem",
					}}
				>
					It seems that you haven't had any product in cart yet!
				</h2>
			)}

			<div className="total">
				TOTAL: <span>{total}$</span>
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal,
});

const withRedux = connect(mapStateToProps);

const withLayout = compose(withRedux, BaseView1);

export default withLayout(Checkout);
