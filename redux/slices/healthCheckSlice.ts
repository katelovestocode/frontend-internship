import { createSlice } from "@reduxjs/toolkit";
import { HealthCheckState } from "@/types/types";
import { healthApi } from "../api/healthApiSlice";

const initialState: HealthCheckState = {
  status_code: 0,
  detail: "",
  result: "",
};

export const healthCheckSlice = createSlice({
  name: "healthCheck",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      healthApi.endpoints.getHealthCheck.matchFulfilled,
      (state, { payload }: { payload: HealthCheckState }) => {
        state.status_code = payload.status_code;
        state.detail = payload.detail;
        state.result = payload.result;
      }
    );
  },
});

export default healthCheckSlice.reducer;
export const {  } = healthCheckSlice.actions;
