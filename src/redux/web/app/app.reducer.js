import * as actionTypes from "./app.types";

const INITIAL_STATE_APPS = {
	// DATA
	menu: null,
	logo: null,
	siteInfo: null,
	allProducts: null,

	// Error Message
	fetchMenuFailMessage: null,
	fetchLogoFailMessage: null,
	fetchSiteDataFailMessage: null,
	fetchAllProductsDataFailMessage: null,
};

const reducer = (state = INITIAL_STATE_APPS, action) => {
	switch (action.type) {
		case actionTypes.FETCH_MENU_SUCCESS:
			return {
				...state,
				menu: action.payload,
			};

		case actionTypes.FETCH_MENU_FAIL:
			return {
				...state,
				fetchMenuFailMessage: action.message,
			};

		case actionTypes.FETCH_LOGO_SUCCESS: {
			return {
				...state,
				logo: action.payload,
			};
		}

		case actionTypes.FETCH_LOGO_FAIL:
			return {
				...state,
				fetchLogoFailMessage: action.message,
			};

		case actionTypes.FETCH_SITE_SUCCESS: {
			return {
				...state,
				siteInfo: action.payload,
			};
		}

		case actionTypes.FETCH_SITE_FAIL:
			return {
				...state,
				fetchSiteDataFailMessage: action.message,
			};

		case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
			return {
				...state,
				allProducts: action.payload,
			};
		case actionTypes.FETCH_ALL_PRODUCTS_FAIL:
			return {
				...state,
				fetchAllProductsFailMessage: action.message,
			};

		default:
			return state;
	}
};

export default reducer;
