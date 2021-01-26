import * as userActionTypes from "./users.types";

const INITIAL_REDUCER = {
    allUsers: [],
    userInfo: {},
    userReviews: [],
    reviewInfo: {},
    userOrders: [],
    orderInfo: {},
};

const reducer = (state = INITIAL_REDUCER, action) => {
    switch (action.type) {
        case userActionTypes.GET_ALL_USERS_DATA_SUCCESS:
            return {
                ...state,
                allUsers: action.payload,
            };
        case userActionTypes.GET_USER_DATA_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
            };
        case userActionTypes.GET_ALL_REVIEWS_DATA_SUCCESS:
            return {
                ...state,
                userReviews: action.payload,
            };
        case userActionTypes.GET_REVIEW_DATA_SUCCESS:
            return {
                ...state,
                reviewInfo: action.payload,
            };
        case userActionTypes.GET_ALL_ORDER_DATA_SUCCESS:
            return {
                ...state,
                userOrders: action.payload,
            };
        case userActionTypes.GET_ORDER_DATA_SUCCESS:
            return {
                ...state,
                orderInfo: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
