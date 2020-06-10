import { all, call } from "redux-saga/effects";
import {
	fetchCategories,
	fetchLatestNews,
	fetchLatestProducts,
	fetchLogo,
	fetchMenu,
	fetchPopularServices,
	fetchSalesAds,
	fetchSlides,
} from "./web/homepage/homepage.sagas";

export default function* rootSaga() {
	yield all([
		call(fetchMenu),
		call(fetchLogo),
		call(fetchSlides),
		call(fetchCategories),
		call(fetchLatestProducts),
		call(fetchSalesAds),
		call(fetchPopularServices),
		call(fetchLatestNews),
	]);
}
