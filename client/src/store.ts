import { configureStore } from "@reduxjs/toolkit"
import { calculatorReducer } from "./calculatorSlice.ts"
import { currencyApi } from "./currencyApi.ts"

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currencyApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
