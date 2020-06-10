import { call, put, takeEvery } from "redux-saga/effects";
import {
	queryCategories,
	queryLatestNews,
	queryLatestProducts,
	queryLogo,
	queryMenu,
	queryPopularServices,
	querySalesAds,
	querySlides,
} from "./homepage.queries";
import * as actionTypes from "./homepage.types";

// Fetch Logo

function* fetchLogoData() {
	try {
		const response = yield call(queryLogo);

		if (response) {
			yield put({
				type: actionTypes.FETCH_LOGO_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (e) {
		yield put({
			type: actionTypes.FETCH_LOGO_FAIL,
			payload: { message: e },
		});
	}
}

export function* fetchLogo() {
	yield takeEvery(actionTypes.FETCH_LOGO_DATA, fetchLogoData);
}

// Fetch Menu
function* fetchMenuData() {
	try {
		const response = yield call(queryMenu);

		if (response) {
			yield put({
				type: actionTypes.FETCH_MENU_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (e) {
		yield put({
			type: actionTypes.FETCH_MENU_FAIL,
			payload: { message: e },
		});
	}
}

export function* fetchMenu() {
	yield takeEvery(actionTypes.FETCH_MENU_DATA, fetchMenuData);
}

// Fetch Sliders

function* fetchSlidesData() {
	try {
		const response = yield call(querySlides);

		if (response) {
			yield put({
				type: actionTypes.FETCH_SLIDES_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (error) {
		put({
			type: actionTypes.FETCH_SLIDES_FAIL,
			payload: {
				message: error,
			},
		});
	}
}

export function* fetchSlides() {
	yield takeEvery(actionTypes.FETCH_SLIDES_DATA, fetchSlidesData);
}

// Fetch Categories
function* fetchCategoriesData() {
	try {
		const response = yield call(queryCategories);

		if (response) {
			yield put({
				type: actionTypes.FETCH_CATEGORIES_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (error) {
		put({
			type: actionTypes.FETCH_CATEGORIES_FAIL,
			payload: {
				message: error,
			},
		});
	}
}

export function* fetchCategories() {
	yield takeEvery(actionTypes.FETCH_CATEGORIES_DATA, fetchCategoriesData);
}

function* fetchLatestProductsData(params) {
	const { payload } = params;

	try {
		const response = yield call(queryLatestProducts, payload);

		if (response) {
			yield put({
				type: actionTypes.FETCH_LATEST_PRODUCTS_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (error) {
		put({
			type: actionTypes.FETCH_LATEST_PRODUCTS_FAIL,
			payload: {
				message: error,
			},
		});
	}
}

export function* fetchLatestProducts() {
	yield takeEvery(
		actionTypes.FETCH_LATEST_PRODUCTS_DATA,
		fetchLatestProductsData
	);
}

function* fetchSalesAdsData() {
	try {
		const response = yield call(querySalesAds);
		if (response) {
			yield put({
				type: actionTypes.FETCH_SALESADS_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (error) {
		put({
			type: actionTypes.FETCH_SALESADS_FAIL,
			payload: {
				message: error,
			},
		});
	}
}

export function* fetchSalesAds() {
	yield takeEvery(actionTypes.FETCH_SALESADS_DATA, fetchSalesAdsData);
}

function* fetchPopularServicesData(params) {
	const { payload } = params;

	try {
		const response = yield call(queryPopularServices, payload);

		if (response) {
			yield put({
				type: actionTypes.FETCH_POPULAR_SERVICES_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (error) {
		put({
			type: actionTypes.FETCH_POPULAR_SERVICES_FAIL,
			payload: {
				message: error,
			},
		});
	}
}

export function* fetchPopularServices() {
	yield takeEvery(
		actionTypes.FETCH_POPULAR_SERVICES_DATA,
		fetchPopularServicesData
	);
}
function* fetchLatestNewsData(params) {
	const { payload } = params;

	try {
		const response = yield call(queryLatestNews, payload);

		if (response) {
			yield put({
				type: actionTypes.FETCH_LATEST_NEWS_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (error) {
		put({
			type: actionTypes.FETCH_LATEST_NEWS_FAIL,
			payload: {
				message: error,
			},
		});
	}
}

export function* fetchLatestNews() {
	yield takeEvery(actionTypes.FETCH_LATEST_NEWS_DATA, fetchLatestNewsData);
}
