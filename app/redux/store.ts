import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/employeeSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
