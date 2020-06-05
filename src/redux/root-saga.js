import { all, call } from "redux-saga/effects";
import {
	fetchCategories,
	fetchLogo,
	fetchMenu,
	fetchSlides,
} from "./web/webs.sagas";

export default function* rootSaga() {
	yield all([
		call(fetchMenu),
		call(fetchLogo),
		call(fetchSlides),
		call(fetchCategories),
	]);
}
