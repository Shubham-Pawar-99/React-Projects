import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todo/todo.slice";
import counterSlice from "../features/counter/counter.slice";

export const store = configureStore({
  reducer: todoSlice,
  counter: counterSlice,
});
