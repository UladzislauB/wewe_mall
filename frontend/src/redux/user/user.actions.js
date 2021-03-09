import USER_TYPES from "./user.types";

export const checkUserSession = () => ({
  type: USER_TYPES.CHECK_USER_SESSION,
});

export const signInSuccess = (user) => ({
  type: USER_TYPES.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFalilure = (error) => ({
  type: USER_TYPES.SIGN_IN_FAILURE,
  payload: error,
});

export const signInStart = (credentials) => ({
  type: USER_TYPES.SIGN_IN_START,
  payload: credentials,
});

export const signUpStart = (credentials) => ({
  type: USER_TYPES.SIGN_UP_START,
  payload: credentials,
});

export const signUpSuccess = () => ({
  type: USER_TYPES.SIGN_IN_SUCCESS,
});

export const signUpFailure = (error) => ({
  type: USER_TYPES.SIGN_UP_FAILURE,
  payload: error,
});
