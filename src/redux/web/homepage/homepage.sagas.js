import { call, put, takeEvery } from "redux-saga/effects";
import {
	queryCategories,
	queryLatestComments,
	queryLatestNews,
	queryLatestProducts,
	queryPopularServices,
	querySalesAds,
	querySlides,
} from "./homepage.queries";
import * as actionTypes from "./homepage.types";

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

function* fetchLatestCommentsData(params) {
	const { payload } = params;

	try {
		const response = yield call(queryLatestComments, payload);

		if (response) {
			yield put({
				type: actionTypes.FETCH_COMMENTS_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (error) {
		put({
			type: actionTypes.FETCH_COMMENTS_FAIL,
			payload: {
				message: error,
			},
		});
	}
}

export function* fetchLatestComments() {
	yield takeEvery(actionTypes.FETCH_COMMENTS_DATA, fetchLatestCommentsData);
}
