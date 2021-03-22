import PRODUCT_TYPES from "./products.types";

export const fetchProductsByShopStart = (shopId) => ({
  type: PRODUCT_TYPES.FETCH_PRODUCTS_BY_SHOP_START,
  payload: shopId,
});

export const fetchProductsSuccess = (productsMap) => ({
  type: PRODUCT_TYPES.FETCH_PRODUCTS_SUCCESS,
  payload: productsMap,
});

export const fetchProductsFailure = (errorMessage) => ({
  type: PRODUCT_TYPES.FETCH_PRODUCTS_FAILURE,
  payload: errorMessage,
});
