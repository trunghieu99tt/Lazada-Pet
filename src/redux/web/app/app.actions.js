import * as actionTypes from "./app.types";

export const fetchMenu = () => {
	return { type: actionTypes.FETCH_MENU_DATA };
};

export const fetchLogo = () => {
	return { type: actionTypes.FETCH_LOGO_DATA };
};
export const fetchSiteData = () => {
	return { type: actionTypes.FETCH_SITE_DATA };
};
