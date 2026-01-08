import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";
import type { User } from "../../types";
import { clearToken, setToken } from "../../util/token";

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error?: string | null
}
const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

export const login = createAsyncThunk('auth/login', async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
        const res = await api.post("auth/login", payload);
        return res.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null
            state.token = null
            clearToken()
        },
        setUser(state, action: PayloadAction<{ user: User, token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            setToken(action.payload.token)
        }
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token
            setToken(action.payload.token)
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string | null
        })
    }
})

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;