import { all, call } from "redux-saga/effects";

import { shopsSagas } from "./shops/shops.sagas";

export default function* rootSaga() {
  yield all([call(shopsSagas)]);
}
