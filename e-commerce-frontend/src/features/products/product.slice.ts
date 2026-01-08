import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types";
import api from "../../api/axiosInstance";

interface ProductState {
    items: Product[];
    loading: boolean;
    error?: string | null;
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/products");
            return res.data as Product[]
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct(state, action) {
            state.items = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
    }
})

export const { setProduct } = productSlice.actions
export default productSlice.reducer;