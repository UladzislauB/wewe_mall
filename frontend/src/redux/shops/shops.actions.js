import SHOP_TYPES from "./shops.types";

export const fetchShopsStart = () => ({
  type: SHOP_TYPES.FETCH_SHOPS_START,
});

export const fetchShopsSuccess = (shopsMap) => ({
  type: SHOP_TYPES.FETCH_SHOPS_SUCCESS,
  payload: shopsMap,
});

export const fetchShopsFailure = (errorMessage) => ({
  type: SHOP_TYPES.FETCH_SHOPS_FAILURE,
  payload: errorMessage,
});
