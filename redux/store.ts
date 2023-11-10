import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counter-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { healthApi } from './api/healthApiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import healthCheckReducer from './slices/healthCheck-slice';

const rootReducer = combineReducers({
  counter: counterReducer,
  healthCheck: healthCheckReducer,
  [healthApi.reducerPath]: healthApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(healthApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;