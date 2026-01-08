import { configureStore } from "@reduxjs/toolkit";
import authSlicce from "../store/slice/auth.slice";

const store = configureStore({
  reducer: {
    auth: authSlicce,
  },
});

export default store;
