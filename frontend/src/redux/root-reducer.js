import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import headerReducer from "./header/header.reducer";
import shopsReducer from "./shops/shops.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  header: headerReducer,
  shops: shopsReducer,
});

export default persistReducer(persistConfig, rootReducer);
