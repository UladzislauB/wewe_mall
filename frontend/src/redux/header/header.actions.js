import HeaderTypes from "./header.types";

export const selectMenuItemAction = (menuItem) => ({
  type: HeaderTypes.SELECT_MENU_ITEM,
  payload: menuItem,
});
