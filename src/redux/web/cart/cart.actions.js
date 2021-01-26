import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item, amount = 1) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: {
        item,
        amount,
    },
});

export const clearItemFromCart = (item) => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item,
});

export const decreaseItem = (item) => ({
    type: CartActionTypes.DECREASE_ITEM,
    payload: item,
});
