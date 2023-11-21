import { InitialState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApiSlice";

export const initialState: InitialState = {
    user: {
    id: 0,
    name: '',
    email: "",
    password: "",
    accessToken: "",
    refreshToken: '',
  },
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
 
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user.accessToken = '';
      state.user.refreshToken = '';
      state.user.name = '';
      state.user.id = 0;
      state.user.email = '';
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addMatcher(
        authApi.endpoints.registerUser.matchPending,
        (state) => {
          state.isLoading = true;
          })
         .addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(
        authApi.endpoints.registerUser.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = false;
        })
    // login user
        .addMatcher(
        authApi.endpoints.loginUser.matchPending,
        (state) => {state.isLoading = true;})
         .addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
           (state, action) => {
        state.user.accessToken = action.payload.user.accessToken;
        state.user.refreshToken = action.payload.user.refreshToken;
        state.user.name = action.payload.user.name
        state.user.id = action.payload.user.id
        state.user.email = action.payload.user.email
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addMatcher(
        authApi.endpoints.loginUser.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = false;
        })
      // current user
        .addMatcher(
        authApi.endpoints.currentUser.matchPending,
        (state) => {
          state.isLoading = true;
          state.isRefreshing = true})
         .addMatcher(
        authApi.endpoints.currentUser.matchFulfilled,
           (state, action) => {
        state.user.name = action.payload.user.name
        state.user.id = action.payload.user.id
        state.user.email = action.payload.user.email
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isRefreshing = false
      })
      .addMatcher(
        authApi.endpoints.currentUser.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = false;
          state.isRefreshing = false
        })
  },
});

export default authSlice.reducer;
export const {logOut} = authSlice.actions;
