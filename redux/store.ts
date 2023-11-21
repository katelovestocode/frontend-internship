import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { healthApi } from './api/healthApiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import healthCheckReducer from './slices/healthCheckSlice';
import { authApi } from './api/authApiSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  healthCheck: healthCheckReducer,
  authReducer: authReducer,
  [healthApi.reducerPath]: healthApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(healthApi.middleware, authApi.middleware,),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;