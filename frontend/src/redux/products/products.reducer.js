import PRODUCT_TYPES from "./products.types";

const INITIAL_STATE = {
  products: null,
  isFetching: false,
  errorMessage: undefined,
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_TYPES.FETCH_PRODUCTS_BY_SHOP_START:
      return {
        ...state,
        isFetching: true,
      };

    case PRODUCT_TYPES.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        products: action.payload,
      };
    case PRODUCT_TYPES.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
