import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/web/cart/cart.actions";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const AddToCartButton = ({ item, amount }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cartItems);
    const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    return (
        <div
            className="button--1"
            onClick={() => dispatch(addItem(item, amount))}
        >
            Add to cart
        </div>
    );
};

export default AddToCartButton;
