import { all, call } from "redux-saga/effects";
// Saga from app
import { fetchLogo, fetchMenu, fetchSite } from "./web/app/app.sagas";
// Saga from homepage
import {
	fetchCategories,
	fetchLatestComments,
	fetchLatestNews,
	fetchLatestProducts,
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
		call(fetchLatestComments),
		call(fetchSite),
	]);
}
