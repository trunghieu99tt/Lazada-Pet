export const addItemToCart = (cartItems, cartItemToAdd, quantity = 1) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.productID === cartItemToAdd.productID
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.productID === cartItemToAdd.productID
                ? { ...cartItem, amount: cartItem.amount + quantity }
                : cartItem
        );
    } else {
        return [...cartItems, { ...cartItemToAdd, amount: quantity }];
    }
};

export const decreaseItemFromCart = (cartItems, cartItemToDecrease) => {
    const newCartItems = cartItems.map((cartItem) =>
        cartItem.productID === cartItemToDecrease.productID
            ? {
                  ...cartItem,
                  amount: cartItem.amount - 1,
              }
            : cartItem
    );

    return newCartItems.filter((item) => item.amount > 0);
};
