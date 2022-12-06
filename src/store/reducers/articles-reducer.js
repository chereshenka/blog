import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  isLoading: false,
  error: "",
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    fetchArticles(state) {
      state.isLoading = true;
    },
    fetchArticlesSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      state.articles = action.payload;
    },
    fetchArticlesError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default articleSlice.reducer;
