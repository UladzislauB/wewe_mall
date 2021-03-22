import HEADER_TYPES from "./header.types";

export const selectMenuItemAction = (menuItem) => ({
  type: HEADER_TYPES.SELECT_MENU_ITEM,
  payload: menuItem,
});
