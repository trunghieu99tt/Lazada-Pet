export const addItemToCart = (cartItems, cartItemToAdd, amount = 1) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + amount }
				: cartItem
		);
	} else {
		return [...cartItems, { ...cartItemToAdd, quantity: amount }];
	}
};

export const decreaseItemFromCart = (cartItems, cartItemToDecrease) => {
	const newCartItems = cartItems.map((cartItem) =>
		cartItem.id === cartItemToDecrease.id
			? {
					...cartItem,
					quantity: cartItem.quantity - 1,
			  }
			: cartItem
	);

	return newCartItems.filter((item) => item.quantity > 0);
};
