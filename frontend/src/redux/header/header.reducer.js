import HeaderTypes from "./header.types";

const INITIAL_STATE = {
  menuItem: "home",
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HeaderTypes.SELECT_MENU_ITEM:
      return {
        ...state,
        menuItem: action.payload,
      };
    default:
      return state;
  }
};

export default headerReducer;
