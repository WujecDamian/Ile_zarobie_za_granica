import { describe, expect, it } from "vitest"
import { calculateSalary } from "./calculateSalary.ts"

describe("calculateSalary", () => {
  it("counts a normal week without overtime", () => {
    const result = calculateSalary({
      hourlyWage: 15,
      daysPerWeek: 5,
      hoursPerDay: 8,
      overtimeHoursPerWeek: 0,
      overtimeMultiplier: 1.5,
    })

    expect(result.regularHoursPerWeek).toBe(40)
    expect(result.regularWeekly).toBe(600)
    expect(result.overtimeWeekly).toBe(0)
    expect(result.weekly).toBe(600)
    expect(result.monthly).toBe(2600)
    expect(result.annual).toBe(31200)
  })

  it("pays overtime at 1.5", () => {
    const result = calculateSalary({
      hourlyWage: 15,
      daysPerWeek: 5,
      hoursPerDay: 8,
      overtimeHoursPerWeek: 4,
      overtimeMultiplier: 1.5,
    })

    expect(result.overtimeWeekly).toBe(90)
    expect(result.weekly).toBe(690)
    expect(result.monthly).toBe(2990)
    expect(result.annual).toBe(35880)
  })

  it("pays overtime at 2", () => {
    const result = calculateSalary({
      hourlyWage: 10,
      daysPerWeek: 5,
      hoursPerDay: 8,
      overtimeHoursPerWeek: 2,
      overtimeMultiplier: 2,
    })

    expect(result.overtimeWeekly).toBe(40)
    expect(result.weekly).toBe(440)
  })

  it("pays overtime like normal hours when the multiplier is 1", () => {
    const result = calculateSalary({
      hourlyWage: 20,
      daysPerWeek: 5,
      hoursPerDay: 8,
      overtimeHoursPerWeek: 3,
      overtimeMultiplier: 1,
    })

    expect(result.overtimeWeekly).toBe(60)
    expect(result.weekly).toBe(860)
  })

  it("estimates the month as 52 weeks divided by 12", () => {
    const result = calculateSalary({
      hourlyWage: 15,
      daysPerWeek: 5,
      hoursPerDay: 8,
      overtimeHoursPerWeek: 0,
      overtimeMultiplier: 1.5,
    })

    expect(result.monthly).toBe(result.weekly * (52 / 12))
    expect(result.annual).toBe(result.weekly * 52)
  })

  it("keeps cents in the hourly wage", () => {
    const result = calculateSalary({
      hourlyWage: 12.5,
      daysPerWeek: 5,
      hoursPerDay: 8,
      overtimeHoursPerWeek: 0,
      overtimeMultiplier: 1.5,
    })

    expect(result.regularWeekly).toBe(500)
    expect(result.weekly).toBe(500)
  })
})
