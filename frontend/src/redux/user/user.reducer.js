import USER_TYPES from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isFetching: false,
  error: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_TYPES.CHECK_USER_SESSION:
      return {
        ...state,
        isFetching: true,
      };
    case USER_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
        error: "",
      };
    case USER_TYPES.SIGN_IN_FAILURE:
      return {
        ...state,
        isFetching: false,
        currentUser: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
