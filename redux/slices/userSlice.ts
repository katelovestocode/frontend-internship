import { InitialState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApiSlice";
import { userApi } from "../api/userApiSlice";

export type UsersType = {
  users: [],
  isLoading: boolean,
    user: {
    name: string,
    email: string,
    password: string,
  },
}

export const initialState: UsersType = {
  users: [],
  user: {
    name: '',
    email: '',
    password: '',
  },
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // all users
    //   .addMatcher(
    //     userApi.endpoints.getAllUsers.matchPending,
    //     (state) => {
    //       state.isLoading = true;
    //       })
    //      .addMatcher(
    //   userApi.endpoints.getAllUsers.matchFulfilled,
    //        (state, action) => {
    //     console.log(action.payload, "action")
    //     state.users = action.payload.users;
    //     state.isLoading = false;
    //   })
    //   .addMatcher(
    //     userApi.endpoints.getAllUsers.matchRejected,
    //     (state, action) => {
    //       state.isLoading = false;
    //     })
    // // get user by id
    //   .addMatcher(
    //     userApi.endpoints.getOneUser.matchPending,
    //     (state) => {
    //       state.isLoading = true;
    //       })
    //      .addMatcher(
    //   userApi.endpoints.getOneUser.matchFulfilled,
    //        (state, action) => {
    //     console.log(action.payload, "action")
    //     state.user = action.payload.user;
    //     state.isLoading = false;
    //   })
    //   .addMatcher(
    //     userApi.endpoints.getOneUser.matchRejected,
    //     (state, action) => {
    //       state.isLoading = false;
    //     })
    // // login user
    //     .addMatcher(
    //     authApi.endpoints.loginUser.matchPending,
    //     (state) => {state.isLoading = true;})
    //      .addMatcher(
    //     authApi.endpoints.loginUser.matchFulfilled,
    //        (state, action) => {
    //     state.user = action.payload.user
    //     state.isLoading = false;
    //     state.isLoggedIn = true;
    //   })
    //   .addMatcher(
    //     authApi.endpoints.loginUser.matchRejected,
    //     (state, action) => {
    //       state.isLoading = false;
    //       state.isLoggedIn = false;
    //     })
    //   // current user
    //     .addMatcher(
    //     authApi.endpoints.currentUser.matchPending,
    //     (state) => {
    //       state.isLoading = true;
    //       state.isRefreshing = true})
    //      .addMatcher(
    //     authApi.endpoints.currentUser.matchFulfilled,
    //        (state, action) => {
    //     state.user = action.payload.user
    //     state.isLoading = false;
    //     state.isLoggedIn = true;
    //     state.isRefreshing = false
    //   })
    //   .addMatcher(
    //     authApi.endpoints.currentUser.matchRejected,
    //     (state, action) => {
    //       state.isLoading = false;
    //       state.isLoggedIn = false;
    //       state.isRefreshing = false
    //     })
    //  // refresh user
    //     .addMatcher(
    //     authApi.endpoints.refreshUser.matchPending,
    //     (state) => {
    //       state.isLoading = true;
    //       state.isRefreshing = true})
    //      .addMatcher(
    //     authApi.endpoints.refreshUser.matchFulfilled,
    //        (state, action) => {
    //     state.user = action.payload.user
    //     state.isLoading = false;
    //     state.isLoggedIn = true;
    //     state.isRefreshing = false
    //   })
    //   .addMatcher(
    //     authApi.endpoints.refreshUser.matchRejected,
    //     (state, action) => {
    //       state.isLoading = false;
    //       state.isLoggedIn = false;
    //       state.isRefreshing = false
    //     })
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
