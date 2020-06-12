import * as actionTypes from "./shoppage.types";

const INITIAL_STATE_SHOP_PAGE = {
	// DATA
	productCategories: null,

	// ERROR MESSAGES
	fetchProductCategoriesFailMessage: null,
};

const reducer = (state = INITIAL_STATE_SHOP_PAGE, action) => {
	switch (action.type) {
		case actionTypes.FETCH_PRODUCT_CATEGORIES_SUCCESS:
			return {
				...state,
				productCategories: action.payload,
			};
		case actionTypes.FETCH_PRODUCT_CATEGORIES_FAIL:
			return {
				...state,
				fetchProductCategoriesFailMessage: action.message,
			};

		default:
			return state;
	}
};

export default reducer;
