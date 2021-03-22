import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectShopsReducer = (state) => state.shops;

const selectShops = createSelector(
  [selectShopsReducer],
  (shops) => shops.shops
);

export const selectShopsForOverview = createSelector(
  [selectShops],
  (shopsMap) =>
    shopsMap ? Object.keys(shopsMap).map((id) => shopsMap[id]) : []
);

export const selectIsShopListFetching = createSelector(
  [selectShopsReducer],
  (shops) => shops.isFetching
);

export const selectShopById = memoize((shopId) =>
  createSelector([selectShops], (shopsMap) =>
    shopsMap ? shopsMap[shopId] : null
  )
);

export const selectIsShopListLoaded = createSelector(
  [selectShops],
  (shopsMap) => !!shopsMap
);
