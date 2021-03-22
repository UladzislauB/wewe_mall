import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

import SHOP_TYPES from "./shops.types";
import { fetchShopsSuccess, fetchShopsFailure } from "./shops.actions";
import { converArrayOfObjectsToMap } from "../utils";

export function* fetchShopsStart() {
  try {
    const res = yield axios.get("/api/shops/");
    const shopsMap = yield converArrayOfObjectsToMap(res.data);
    yield put(fetchShopsSuccess(shopsMap));
  } catch (error) {
    yield put(fetchShopsFailure(error));
  }
}

export function* watchFetchShopsStart() {
  yield takeLatest(SHOP_TYPES.FETCH_SHOPS_START, fetchShopsStart);
}

export function* shopsSagas() {
  yield all([call(watchFetchShopsStart)]);
}
