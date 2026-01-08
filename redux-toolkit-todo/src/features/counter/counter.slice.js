import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increament: (state) => {
      state + 1;
    },
    decrement: (state) => {
      state - 1;
    },
  },
});

export const { increament, decrement } = counterSlice.actions;
export default counterSlice.reducer;
