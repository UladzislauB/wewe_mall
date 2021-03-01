import { all, call } from "redux-saga/effects";

import { shopsSagas } from "./shops/shops.sagas";
import { productsSagas } from "./products/products.sagas";

export default function* rootSaga() {
  yield all([call(shopsSagas), call(productsSagas)]);
}
