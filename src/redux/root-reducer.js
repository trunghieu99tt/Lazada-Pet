import { combineReducers } from "redux";
import appReducer from "./web/app/app.reducer";
import cartReducer from "./web/cart/cart.reducer";
import homepageReducer from "./web/homepage/homepage.reducer";
import shoppageReducer from "./web/shoppage/shoppage.reducer";
import userReducer from "./web/user/user.reducer";

const rootReducer = combineReducers({
	homepage: homepageReducer,
	app: appReducer,
	shoppage: shoppageReducer,
	cart: cartReducer,
	user: userReducer,
});

export default rootReducer;
