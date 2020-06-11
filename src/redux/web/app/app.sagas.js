import { call, put, takeEvery } from "redux-saga/effects";
import { queryLogo, queryMenu, querySiteInfo } from "./app.queries";
import * as actionTypes from "./app.types";

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

function* fetchSiteData() {
	try {
		const response = yield call(querySiteInfo);

		if (response) {
			yield put({
				type: actionTypes.FETCH_SITE_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (e) {
		yield put({
			type: actionTypes.FETCH_SITE_FAIL,
			payload: { message: e },
		});
	}
}

export function* fetchSite() {
	yield takeEvery(actionTypes.FETCH_SITE_DATA, fetchSiteData);
}
