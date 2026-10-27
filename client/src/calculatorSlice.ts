import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type CalculatorState = {
  countryId: string
  hourlyWage: string
  daysPerWeek: string
  hoursPerDay: string
  overtimeHours: string
  overtimeMultiplier: string
}

const initialState: CalculatorState = {
  countryId: "de",
  hourlyWage: "15",
  daysPerWeek: "5",
  hoursPerDay: "8",
  overtimeHours: "0",
  overtimeMultiplier: "1,5",
}

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setCountryId(state, action: PayloadAction<string>) {
      state.countryId = action.payload
    },
    setHourlyWage(state, action: PayloadAction<string>) {
      state.hourlyWage = action.payload
    },
    setDaysPerWeek(state, action: PayloadAction<string>) {
      state.daysPerWeek = action.payload
    },
    setHoursPerDay(state, action: PayloadAction<string>) {
      state.hoursPerDay = action.payload
    },
    setOvertimeHours(state, action: PayloadAction<string>) {
      state.overtimeHours = action.payload
    },
    setOvertimeMultiplier(state, action: PayloadAction<string>) {
      state.overtimeMultiplier = action.payload
    },
  },
})

export const {
  setCountryId,
  setHourlyWage,
  setDaysPerWeek,
  setHoursPerDay,
  setOvertimeHours,
  setOvertimeMultiplier,
} = calculatorSlice.actions

export const calculatorReducer = calculatorSlice.reducer
