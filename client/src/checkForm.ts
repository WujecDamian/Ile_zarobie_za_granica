import type { CalculatorState } from "./calculatorSlice.ts"
import type { SalaryInput } from "./calculateSalary.ts"

export type FieldErrors = {
  hourlyWage: string
  daysPerWeek: string
  hoursPerDay: string
  overtimeHours: string
  overtimeMultiplier: string
}

export type CheckedForm = {
  errors: FieldErrors
  salary: SalaryInput | null
}

const readNumber = (text: string): number | null => {
  const trimmed = text.trim().replace(",", ".")
  if (trimmed === "") {
    return null
  }

  const value = Number(trimmed)
  if (Number.isNaN(value)) {
    return null
  }

  return value
}

export const checkForm = (state: CalculatorState): CheckedForm => {
  const errors: FieldErrors = {
    hourlyWage: "",
    daysPerWeek: "",
    hoursPerDay: "",
    overtimeHours: "",
    overtimeMultiplier: "",
  }

  const hourlyWage = readNumber(state.hourlyWage)
  if (hourlyWage === null) {
    errors.hourlyWage = "Wpisz stawkę godzinową, na przykład 15 lub 15,5."
  } else if (hourlyWage <= 0) {
    errors.hourlyWage = "Stawka musi być większa od 0."
  } else if (hourlyWage > 1000) {
    errors.hourlyWage = "Stawka nie może być większa niż 1000."
  }

  const daysPerWeek = readNumber(state.daysPerWeek)
  if (daysPerWeek === null) {
    errors.daysPerWeek = "Wpisz liczbę dni w tygodniu."
  } else if (!Number.isInteger(daysPerWeek) || daysPerWeek < 1 || daysPerWeek > 7) {
    errors.daysPerWeek = "Podaj całą liczbę dni od 1 do 7."
  }

  const hoursPerDay = readNumber(state.hoursPerDay)
  if (hoursPerDay === null) {
    errors.hoursPerDay = "Wpisz liczbę godzin dziennie."
  } else if (hoursPerDay <= 0 || hoursPerDay > 12) {
    errors.hoursPerDay = "Podaj więcej niż 0 i najwyżej 12 godzin dziennie."
  }

  const overtimeHours = readNumber(state.overtimeHours)
  if (overtimeHours === null) {
    errors.overtimeHours = "Wpisz liczbę nadgodzin. Wpisz 0, jeśli ich nie ma."
  } else if (overtimeHours < 0 || overtimeHours > 40) {
    errors.overtimeHours = "Nadgodziny mogą mieć od 0 do 40 godzin."
  }

  const overtimeMultiplier = readNumber(state.overtimeMultiplier)
  if (overtimeMultiplier === null) {
    errors.overtimeMultiplier = "Wpisz mnożnik nadgodzin, na przykład 1,5."
  } else if (overtimeMultiplier < 1 || overtimeMultiplier > 3) {
    errors.overtimeMultiplier = "Mnożnik może być od 1 do 3."
  }

  if (
    hourlyWage === null ||
    daysPerWeek === null ||
    hoursPerDay === null ||
    overtimeHours === null ||
    overtimeMultiplier === null ||
    errors.hourlyWage !== "" ||
    errors.daysPerWeek !== "" ||
    errors.hoursPerDay !== "" ||
    errors.overtimeHours !== "" ||
    errors.overtimeMultiplier !== ""
  ) {
    return { errors, salary: null }
  }

  return {
    errors,
    salary: {
      hourlyWage,
      daysPerWeek,
      hoursPerDay,
      overtimeHoursPerWeek: overtimeHours,
      overtimeMultiplier,
    },
  }
}
