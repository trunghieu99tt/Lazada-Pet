import React, { useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import CheckoutItem from "../componentsWeb/Checkout/CheckoutItem";
import WrapperWithAds from "../layout/BaseView1";
import {
    selectCartItems,
    selectCartTotal,
} from "../redux/web/cart/cart.selectors";
import Axios from "axios";
import { message, Modal } from "antd";
import { API_URL_1 } from "../variables";
import { clearItemFromCart } from "../redux/web/cart/cart.actions";

const Checkout = ({ cartItems, total }) => {
    const dispatch = useDispatch();

    const clearCheckout = useCallback(
        (cartItems) => {
            cartItems.forEach((cartItem) =>
                dispatch(clearItemFromCart(cartItem))
            );
        },
        [dispatch]
    );

    const handleCheckout = () => {
        Modal.confirm({
            title: "Confirm checkout",
            content: "Check out all items ?",
            okText: "Yes",
            cancelText: "No",
            onOk: updateData,
        });
    };

    const displaySuccessMessage = () =>
        message.success("Checkouted successfully");

    const displayErrorMessage = (err) => message.error(err);

    const updateData = async () => {
        try {
            cartItems.forEach((item) => postData(item));
            displaySuccessMessage();
            clearCheckout(cartItems);
        } catch (error) {
            displayErrorMessage(error);
        }
    };

    const postData = async (item) => {
        try {
            await Axios.post(`${API_URL_1}/users/1/orders`, item);
        } catch (error) {}
    };

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

            <button className="button--1" onClick={handleCheckout}>
                Checkout
            </button>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
});

const withRedux = connect(mapStateToProps);

const withLayout = compose(withRedux, WrapperWithAds);

export default withLayout(Checkout);
