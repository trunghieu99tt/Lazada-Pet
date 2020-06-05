import * as actionTypes from "./webs.types";

const INITIAL_STATE_WEBS = {
	// DATA
	menu: [],
	logo: null,
	slides: [],
	categories: [],

	// Error Message
	fetchMenuFailMessage: null,
	fetchLogoFailMessage: null,
	fetchSlidesFailMessage: null,
	fetchCategoriesFailMessage: null,

	// Loading
	isLoadingHomePage: true,
};

const reducer = (state = INITIAL_STATE_WEBS, action) => {
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
				logo: action.message,
			};

		case actionTypes.FETCH_SLIDES_SUCCESS:
			return {
				...state,
				slides: action.payload,
			};

		case actionTypes.FETCH_SLIDES_FAIL:
			return {
				...state,
				fetchSlidesFailMessage: action.message,
			};

		case actionTypes.FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.payload,
				isLoadingHomePage: false,
			};

		case actionTypes.FETCH_CATEGORIES_FAIL:
			return {
				...state,
				fetchCategoriesFailMessage: action.message,
			};

		default:
			return state;
	}
};

export default reducer;
