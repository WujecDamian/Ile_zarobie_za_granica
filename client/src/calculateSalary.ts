export type SalaryInput = {
  hourlyWage: number
  daysPerWeek: number
  hoursPerDay: number
  overtimeHoursPerWeek: number
  overtimeMultiplier: number
}

export type SalaryResult = {
  regularHoursPerWeek: number
  overtimeHoursPerWeek: number
  regularWeekly: number
  overtimeWeekly: number
  weekly: number
  monthly: number
  annual: number
}

export const calculateSalary = (input: SalaryInput): SalaryResult => {
  const regularHoursPerWeek = input.daysPerWeek * input.hoursPerDay
  const regularWeekly = regularHoursPerWeek * input.hourlyWage
  const overtimeWeekly =
    input.overtimeHoursPerWeek * input.hourlyWage * input.overtimeMultiplier
  const weekly = regularWeekly + overtimeWeekly

  return {
    regularHoursPerWeek,
    overtimeHoursPerWeek: input.overtimeHoursPerWeek,
    regularWeekly,
    overtimeWeekly,
    weekly,
    monthly: weekly * (52 / 12),
    annual: weekly * 52,
  }
}
