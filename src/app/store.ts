import {Action , ThunkAction , configureStore} from '@reduxjs/toolkit';
import { listenerMiddleware } from './listenerMiddleware';
import authReducer from '../auth/authSlice';
import {driverSlice} from '../features/driver/driverSlice'
import { apiSlice } from '../features/api/apiSlice';
import zipcodeReducer from '../features/api/zipCodeSlice';
import globalStateReducer from '../features/api/globalStateSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        zipcode: zipcodeReducer,
        globalState: globalStateReducer,
        [driverSlice.reducerPath]: driverSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(driverSlice.middleware, apiSlice.middleware)
})

export type AppStore = typeof store

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export type AppThunk = ThunkAction<void , RootState , unknown , Action>