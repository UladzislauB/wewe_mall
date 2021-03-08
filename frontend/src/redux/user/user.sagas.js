import { takeLatest, all, put, call } from "redux-saga/effects";
import axios from "axios";

import USER_TYPES from "./user.types";
import { signInSuccess, signInFalilure } from "./user.actions";

export function* checkUserSession() {
  try {
    yield axios.post("/api-auth/token/refresh/");
    const response = yield axios.get("/api-auth/get_user/");
    yield put(signInSuccess(response.data));
  } catch (error) {
    yield put(signInFalilure(error));
  }
}

export function* watchCheckUserSession() {
  yield takeLatest(USER_TYPES.CHECK_USER_SESSION, checkUserSession);
}

export function* userSagas() {
  yield all([call(watchCheckUserSession)]);
}
