import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

export const userLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLoggined(state, actions) {
      state.isLoggedIn = !state.isLoggedIn;
      state.user = actions.payload;
    },
  },
});

export default userLogin.reducer;
