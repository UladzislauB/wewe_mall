import { takeLatest, all, call, put } from "redux-saga/effects";
import axios from "axios";

import PRODUCT_TYPES from "./products.types";
import { fetchProductsSuccess, fetchProductsFailure } from "./products.actions";
import { converArrayOfObjectsToMap } from "../utils";

export function* fetchProductsByShopStart({ payload }) {
  try {
    const res = yield axios.get(`/api/shops/${payload}/products/`);
    const productsMap = yield converArrayOfObjectsToMap(res.data)
    yield put(fetchProductsSuccess(productsMap));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

export function* watchFetchProductsByShopStart() {
  yield takeLatest(
    PRODUCT_TYPES.FETCH_PRODUCTS_BY_SHOP_START,
    fetchProductsByShopStart
  );
}

export function* productsSagas() {
  yield all([call(watchFetchProductsByShopStart)]);
}
