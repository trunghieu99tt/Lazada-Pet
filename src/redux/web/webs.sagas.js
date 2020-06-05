import { call, put, takeEvery } from "redux-saga/effects";
import {
	queryCategoires as queryCategories,
	queryLogo,
	queryMenu,
	querySlides,
} from "./webs.queries";
import * as actionTypes from "./webs.types";

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
	console.log("Go here\n");

	try {
		const response = yield call(queryCategories);

		console.log("response", response);

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
