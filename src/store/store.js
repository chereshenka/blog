import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import articleReducer from "./reducers/articles-reducer";
import singleReducer from "./reducers/single-article-reducer";
import { userDataLogin } from "./reducers/user-state";
const rootReducer = combineReducers({
  articleReducer,
  singleReducer,
  userDataLogin,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
