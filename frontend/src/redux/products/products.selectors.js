import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectProductsReducer = (state) => state.products;

const selectProducts = createSelector(
  [selectProductsReducer],
  (products) => products.products
);

export const selectProductsForOverview = createSelector(
  [selectProducts],
  (productsMap) =>
    productsMap
      ? Object.keys(productsMap).map((productId) => productsMap[productId])
      : []
);

export const selectIsProductListFetching = createSelector(
  [selectProductsReducer],
  (products) => products.isFetching
);

export const selectProductById = memoize((productId) =>
  createSelector([selectProducts], (productsMap) =>
    productsMap ? Object.keys(productsMap).map((id) => productsMap[id]) : []
  )
);

export const selectIsProductListLoaded = createSelector(
  [selectProducts],
  (productsMap) => !!productsMap
);
