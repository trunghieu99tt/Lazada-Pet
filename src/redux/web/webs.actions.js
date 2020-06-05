import * as actionTypes from "./webs.types";

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
