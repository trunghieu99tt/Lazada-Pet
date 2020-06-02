import { all, call } from "redux-saga/effects";
import { fetchMenu } from "./web/webs.sagas";

export default function* rootSaga() {
	yield all([call(fetchMenu)]);
}
