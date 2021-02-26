import { createSelector } from "reselect";

const selectHeader = (state) => state.header;

export const selectMenuItem = createSelector(
  [selectHeader],
  (header) => header.menuItem
);
