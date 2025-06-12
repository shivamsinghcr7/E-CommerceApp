import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // 2 days
      localStorage.setItem("expirationTime", expirationTime);
    },

    logoutCredentials: (state) => {
      state.userInfo = null;
      localStorage.clear();
      
    },
  },
});

export const { setCredentials, logoutCredentials } = authSlice.actions;

export default authSlice.reducer;
