import { combineReducers } from "redux";
import appReducer from "./web/app/app.reducer";
import homepageReducer from "./web/homepage/homepage.reducer";
import shoppageReducer from "./web/shoppage/shoppage.reducer";

const rootReducer = combineReducers({
	homepage: homepageReducer,
	app: appReducer,
	shoppage: shoppageReducer,
});

export default rootReducer;
