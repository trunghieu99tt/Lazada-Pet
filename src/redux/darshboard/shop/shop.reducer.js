import * as shopDashTypes from "./shop.types";

const INITIAL_STATE = {
    sideBarID: 1,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case shopDashTypes.CHANGE_SIDEBAR:
            return {
                ...state,
                sideBarID: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
