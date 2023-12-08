import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";


export interface AuthState {
  accessToken: string | null;
  isLogin: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ accessToken: string }>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          accessToken: action.payload.accessToken,
        })
      );

      state.accessToken = action.payload.accessToken;
      state.isLogin = true;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.accessToken = null;
      state.isLogin = false;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
