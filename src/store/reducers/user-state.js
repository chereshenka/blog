import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

export const userDataLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLoggined(state, actions) {
      state.isLoggedIn = actions.payload.isLoggedIn;
      state.user = actions.payload.user;
    },
  },
});

export default userDataLogin.reducer;
