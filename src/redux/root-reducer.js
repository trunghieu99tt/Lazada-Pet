import { combineReducers } from "redux";
import homepageReducer from "./web/homepage/homepage.reducer";

const rootReducer = combineReducers({
	homepage: homepageReducer,
});

export default rootReducer;
