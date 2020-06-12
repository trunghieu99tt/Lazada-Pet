import { call, put, takeEvery } from "redux-saga/effects";
import { queryProductCategories } from "./shoppage.queries";
import * as actionTypes from "./shoppage.types";

// Fetch categories

function* fetchCategoriesData() {
	try {
		const response = yield call(queryProductCategories);

		if (response) {
			yield put({
				type: actionTypes.FETCH_PRODUCT_CATEGORIES_SUCCESS,
				payload: response?.data || {},
			});
		}
	} catch (e) {
		yield put({
			type: actionTypes.FETCH_PRODUCT_CATEGORIES_FAIL,
			payload: { message: e },
		});
	}
}

export function* fetchCategories() {
	yield takeEvery(
		actionTypes.FETCH_PRODUCT_CATEGORIES_DATA,
		fetchCategoriesData
	);
}
