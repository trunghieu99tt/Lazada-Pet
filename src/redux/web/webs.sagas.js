import { call, put, takeEvery } from "redux-saga/effects";
import { queryMenu } from "./webs.queries";
import * as actionTypes from "./webs.types";

function* fetchMenuData() {
	try {
		const response = yield call(queryMenu);

		if (response) {
			console.log("response", response);

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
