import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherApiSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});