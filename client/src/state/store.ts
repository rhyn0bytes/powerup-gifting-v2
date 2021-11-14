import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import { wishesApi } from "./wishes";

export const store = configureStore({
  reducer: { auth: authReducer, [wishesApi.reducerPath]: wishesApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wishesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
