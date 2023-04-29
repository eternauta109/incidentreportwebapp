import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import reportsReducer from "./slice/reportsSlice";

import logger from "redux-logger";

const initState = [];

export const store = configureStore({
  initState,
  reducer: {
    user: userReducer,
    reports: reportsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
