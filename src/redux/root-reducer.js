import { combineReducers } from "redux";
import appReducer from "./web/app/app.reducer";
import homepageReducer from "./web/homepage/homepage.reducer";

const rootReducer = combineReducers({
	homepage: homepageReducer,
	app: appReducer,
});

export default rootReducer;
