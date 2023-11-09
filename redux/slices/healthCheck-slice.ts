import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HealthCheckState } from "@/types/types";

const initialState: HealthCheckState = {
  status_code: 0,
  detail: "",
  result: "",
};
export const healthCheckSlice = createSlice({
  name: "healthCheck",
  initialState,
  reducers: {
    updateHealthCheck: (state, action: PayloadAction<HealthCheckState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateHealthCheck } = healthCheckSlice.actions;
export default healthCheckSlice.reducer;