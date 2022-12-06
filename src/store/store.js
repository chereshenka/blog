import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import articleReducer from "./reducers/articles-reducer";
import singleReducer from "./reducers/single-article-reducer";

const rootReducer = combineReducers({
  articleReducer,
  singleReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
