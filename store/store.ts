"use client";

import userSlice from "@/store/slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = () => {
  return configureStore({
    reducer: {
      user: userSlice,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
