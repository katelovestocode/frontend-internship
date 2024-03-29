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
    averageRating: 0,
  },
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  isError: false,
  notifications: []
 
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = {
        accessToken: '',
        refreshToken: '',
        name: '',
        id: 0,
        email: '',
        averageRating: 0,
      };
      state.isLoggedIn = false;
      state.isLoading = false;
      state.isRefreshing = false;
    },
    isRefreshError: (state, { payload }) => {
      state.isError = payload
    },
    setNotification: (state, { payload }) => {
      state.notifications = payload
    }
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
        state.user = action.payload.user
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
        return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isLoggedIn: true,
        isRefreshing: false,
      };
      })
      .addMatcher(
        authApi.endpoints.currentUser.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = false;
          state.isRefreshing = false
        })
     // refresh user
        .addMatcher(
        authApi.endpoints.refreshUser.matchPending,
        (state) => {
          state.isLoading = true;
          state.isRefreshing = true})
         .addMatcher(
        authApi.endpoints.refreshUser.matchFulfilled,
           (state, action) => {
        return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isLoggedIn: true,
        isRefreshing: false,
      };
      })
      .addMatcher(
        authApi.endpoints.refreshUser.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = false;
          state.isRefreshing = false
        })
  },
});

export default authSlice.reducer;
export const {logOut, isRefreshError, setNotification} = authSlice.actions;
