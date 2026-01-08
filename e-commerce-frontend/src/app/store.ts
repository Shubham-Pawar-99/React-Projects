import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/auth/auth.slice'
import productSlice from "../features/products/product.slice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch