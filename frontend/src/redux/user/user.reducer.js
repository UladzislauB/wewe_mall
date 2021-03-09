import USER_TYPES from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isFetching: false,
  signInError: "",
  signUpError: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_TYPES.CHECK_USER_SESSION:
    case USER_TYPES.SIGN_IN_START:
    case USER_TYPES.SIGN_UP_START:
      return {
        ...state,
        isFetching: true,
      };
    case USER_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
        signInError: "",
      };
    case USER_TYPES.SIGN_IN_FAILURE:
      return {
        ...state,
        isFetching: false,
        currentUser: null,
        signInError: action.payload,
      };
    case USER_TYPES.SIGN_UP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        signUpError: "",
      };
    case USER_TYPES.SIGN_UP_FAILURE:
      return {
        ...state,
        isFetching: false,
        signUpError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
