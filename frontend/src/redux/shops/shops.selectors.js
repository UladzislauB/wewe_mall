import { createSelector } from "reselect";

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
