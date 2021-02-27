import SHOP_TYPES from "./shops.types";

const INITIAL_STATE = {
  shops: null,
  isFetching: false,
  errorMessage: undefined,
};

const shopsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOP_TYPES.FETCH_SHOPS_START:
      return {
        ...state,
        isFetching: true,
      };

    case SHOP_TYPES.FETCH_SHOPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        shops: action.payload,
      };
    case SHOP_TYPES.FETCH_SHOPS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopsReducer;
