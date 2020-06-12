import * as actionTypes from "./shoppage.types";

export const fetchProductCategories = () => {
	return { type: actionTypes.FETCH_PRODUCT_CATEGORIES_DATA };
};
