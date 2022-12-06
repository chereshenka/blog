import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: {},
  isLoading: false,
  error: "",
};

export const singleArticleSlice = createSlice({
  name: "single",
  initialState,
  reducers: {
    fetchSingle(state) {
      state.isLoading = true;
    },
    fetchSingleSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      state.article = action.payload;
    },
    fetchSingleError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default singleArticleSlice.reducer;
