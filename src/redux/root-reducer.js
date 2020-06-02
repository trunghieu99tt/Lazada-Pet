import { combineReducers } from "redux";
import webReducer from "./web/webs.reducer";

const rootReducer = combineReducers({
	web: webReducer,
});

export default rootReducer;
