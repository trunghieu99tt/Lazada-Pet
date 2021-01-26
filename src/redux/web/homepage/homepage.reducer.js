import * as actionTypes from "./homepage.types";

const INITIAL_STATE_WEBS = {
	// DATA
	slides: null,
	categories: null,
	latestProducts: null,
	salesAds: null,
	popularServices: null,
	latestNews: null,
	latestComments: null,

	// Error Message
	fetchMenuFailMessage: null,
	fetchLogoFailMessage: null,
	fetchSlidesFailMessage: null,
	fetchCategoriesFailMessage: null,
	fetchLatestProductsFailMessage: null,
	fetchSalesAdsFailMessage: null,
	fetchPopularServicesFailMessage: null,
	fetchLatestNewsFailMessage: null,
	fetchLatestCommentsFailMessage: null,

	// Loading
	isLoadingHomePage: true,
};

const reducer = (state = INITIAL_STATE_WEBS, action) => {
	switch (action.type) {
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
			};

		case actionTypes.FETCH_CATEGORIES_FAIL:
			return {
				...state,
				fetchCategoriesFailMessage: action.message,
			};

		case actionTypes.FETCH_LATEST_PRODUCTS_SUCCESS:
			return {
				...state,
				latestProducts: action.payload,
			};

		case actionTypes.FETCH_LATEST_PRODUCTS_FAIL:
			return {
				...state,
				fetchLatestProductsFailMessage: action.message,
			};

		case actionTypes.FETCH_SALESADS_SUCCESS:
			return {
				...state,
				salesAds: action.payload,
			};

		case actionTypes.FETCH_SALESADS_FAIL:
			return {
				...state,
				fetchSalesAdsFailMessage: action.message,
			};

		case actionTypes.FETCH_POPULAR_SERVICES_SUCCESS:
			return {
				...state,
				popularServices: action.payload,
			};

		case actionTypes.FETCH_POPULAR_SERVICES_FAIL:
			return {
				...state,
				fetchPopularServicesFailMessage: action.message,
			};

		case actionTypes.FETCH_LATEST_NEWS_SUCCESS:
			return {
				...state,
				latestNews: action.payload,
			};

		case actionTypes.FETCH_LATEST_NEWS_FAIL:
			return {
				...state,
				fetchLatestNewsFailMessage: action.message,
			};

		case actionTypes.FETCH_COMMENTS_SUCCESS:
			return {
				...state,
				latestComments: action.payload,
			};

		case actionTypes.FETCH_COMMENTS_FAIL:
			return {
				...state,
				fetchLatestCommentsFailMessage: action.message,
			};

		default:
			return state;
	}
};

export default reducer;
