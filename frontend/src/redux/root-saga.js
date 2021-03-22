import { all, call } from "redux-saga/effects";

import { shopsSagas } from "./shops/shops.sagas";
import { productsSagas } from "./products/products.sagas";
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([call(shopsSagas), call(productsSagas), call(userSagas)]);
}
