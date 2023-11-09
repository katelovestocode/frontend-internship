import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { healthApi } from './api/healthApiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        counterReducer,
        [healthApi.reducerPath]: healthApi.reducer,
    },
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(healthApi.middleware),
})
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;