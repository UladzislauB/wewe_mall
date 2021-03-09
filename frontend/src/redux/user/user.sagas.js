import { takeLatest, all, put, call } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

import USER_TYPES from "./user.types";
import {
  signInSuccess,
  signInFalilure,
  signUpFailure,
  signUpSuccess,
  signInStart,
} from "./user.actions";

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

export function* startSignIn({ payload: { email, password } }) {
  try {
    yield console.log({ email, password });
    const response = yield axios.post(
      "/api-auth/token/",
      { email, password },
      { withCredentials: true }
    );

    yield put(signInSuccess(response.data));
    yield message.success("Successful login");
  } catch (error) {
    if (error.response.status === 401)
      yield put(signInFalilure(error.response.data["detail"]));
    else yield put(signInFalilure(error));
  }
}

export function* watchSignInStart() {
  yield takeLatest(USER_TYPES.SIGN_IN_START, startSignIn);
}

export function* startSignUp({ payload }) {
  try {
    yield console.log(payload);
    yield axios.post("/api-auth/register/", payload);
    yield put(signUpSuccess());
    yield put(signInStart(payload));
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

export function* watchSignUpStart() {
  yield takeLatest(USER_TYPES.SIGN_UP_START, startSignUp);
}

export function* userSagas() {
  yield all([
    call(watchCheckUserSession),
    call(watchSignInStart),
    call(watchSignUpStart),
  ]);
}
