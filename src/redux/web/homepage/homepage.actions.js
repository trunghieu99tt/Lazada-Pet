import * as actionTypes from "./homepage.types";

export const fetchMenu = () => {
	return { type: actionTypes.FETCH_MENU_DATA };
};

export const fetchLogo = () => {
	return { type: actionTypes.FETCH_LOGO_DATA };
};

export const fetchSlides = () => {
	return { type: actionTypes.FETCH_SLIDES_DATA };
};

export const fetchCategories = () => {
	return { type: actionTypes.FETCH_CATEGORIES_DATA };
};

export const fetchLatestProducts = (payload) => {
	return { type: actionTypes.FETCH_LATEST_PRODUCTS_DATA, payload };
};

export const fetchSalesAds = () => {
	return { type: actionTypes.FETCH_SALESADS_DATA };
};

export const fetchPopularServices = () => {
	return { type: actionTypes.FETCH_POPULAR_SERVICES_DATA };
};
export const fetchLatestNews = () => {
	return { type: actionTypes.FETCH_LATEST_NEWS_DATA };
};
