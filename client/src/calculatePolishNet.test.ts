import { describe, expect, it } from "vitest"
import { calculatePolishNet } from "./calculatePolishNet.ts"

describe("calculatePolishNet", () => {
  it("charges the same social and health contributions at both ages", () => {
    const result = calculatePolishNet(120_000)

    expect(result.under26.social).toBeCloseTo(result.from26.social, 2)
    expect(result.under26.health).toBeCloseTo(result.from26.health, 2)
    expect(result.from26.social).toBeCloseTo(16_452, 2)
    expect(result.from26.health).toBeCloseTo(9_319.32, 2)
  })

  it("charges no income tax under 26 when the whole year is inside the relief", () => {
    const result = calculatePolishNet(85_528)

    expect(result.under26.tax).toBe(0)
    expect(result.from26.tax).toBeGreaterThan(0)
  })

  it("still charges no income tax under 26 at 10 000 zł gross per month", () => {
    const result = calculatePolishNet(120_000)

    expect(result.under26.tax).toBe(0)
    expect(result.from26.tax).toBeCloseTo(8_465.76, 2)
    expect(result.from26.monthly).toBeCloseTo(7_146.91, 2)
  })

  it("charges no income tax from age 26 when income stays inside the tax-free amount", () => {
    const result = calculatePolishNet(36_000)

    expect(result.from26.tax).toBe(0)
    expect(result.under26.tax).toBe(0)
    expect(result.under26.annual).toBeCloseTo(result.from26.annual, 2)
  })

  it("uses 32 percent only on income above 120 000 zł", () => {
    const result = calculatePolishNet(200_000)
    const social = 200_000 * (0.0976 + 0.015 + 0.0245)
    const income = 200_000 - social - 3_000
    const tax = 120_000 * 0.12 - 3_600 + (income - 120_000) * 0.32

    expect(result.from26.tax).toBeCloseTo(tax, 2)
    expect(income).toBeGreaterThan(120_000)
    expect(result.under26.tax).toBeLessThan(result.from26.tax)
  })

  it("splits the year into 12 equal months and 52 equal weeks", () => {
    const result = calculatePolishNet(100_000)

    expect(result.from26.monthly).toBeCloseTo(result.from26.annual / 12, 2)
    expect(result.from26.weekly).toBeCloseTo(result.from26.annual / 52, 2)
    expect(result.under26.monthly).toBeCloseTo(result.under26.annual / 12, 2)
  })
})
