import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/web/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/web/cart/cart.selectors";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
	return (
		<div className="header-cart">
			<span className="header-cart-inner" onClick={toggleCartHidden}>
				<span className="header-cart__text">Cart</span>
				<img
					src={require("../../static/images/cart.svg")}
					alt="cart"
					className="header-cart__image"
				/>
			</span>
			<span>{itemCount}</span>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
