import { all, call } from "redux-saga/effects";
// Saga from app
import {
	fetchBlogPosts,
	fetchLogo,
	fetchMenu,
	fetchProducts,
	fetchSite,
} from "./web/app/app.sagas";
// Saga from homepage
import {
	fetchCategories as fetchServicesCategories,
	fetchLatestComments,
	fetchLatestNews,
	fetchLatestProducts,
	fetchPopularServices,
	fetchSalesAds,
	fetchSlides,
} from "./web/homepage/homepage.sagas";
import { fetchCategories } from "./web/shoppage/shoppage.sagas";

export default function* rootSaga() {
	yield all([
		call(fetchMenu),
		call(fetchLogo),
		call(fetchSlides),
		call(fetchServicesCategories),
		call(fetchLatestProducts),
		call(fetchSalesAds),
		call(fetchPopularServices),
		call(fetchLatestNews),
		call(fetchLatestComments),
		call(fetchSite),
		call(fetchCategories),
		call(fetchProducts),
		call(fetchBlogPosts),
	]);
}
