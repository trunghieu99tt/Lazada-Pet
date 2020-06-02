import * as actionTypes from "./webs.types";

const INITIAL_STATE_WEBS = {
	menu: [],
	fetchMenuFailMessage: null,
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
		default:
			return state;
	}
};

export default reducer;
