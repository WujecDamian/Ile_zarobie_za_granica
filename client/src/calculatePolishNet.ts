const pensionRate = 0.0976
const disabilityRate = 0.015
const sicknessRate = 0.0245
const socialRate = pensionRate + disabilityRate + sicknessRate
const healthRate = 0.09
const lowerTaxRate = 0.12
const higherTaxRate = 0.32
const higherTaxFromIncome = 120_000
const yearlyTaxReduction = 3_600
const yearlyWorkCosts = 250 * 12
const youthExemptRevenue = 85_528

export type PolishNet = {
  social: number
  health: number
  tax: number
  annual: number
  monthly: number
  weekly: number
}

export type PolishNetComparison = {
  under26: PolishNet
  from26: PolishNet
}

const incomeTax = (income: number): number => {
  if (income <= 0) {
    return 0
  }

  if (income <= higherTaxFromIncome) {
    const tax = income * lowerTaxRate - yearlyTaxReduction
    if (tax < 0) {
      return 0
    }
    return tax
  }

  const taxOnLowerIncome = higherTaxFromIncome * lowerTaxRate - yearlyTaxReduction
  const taxOnHigherIncome = (income - higherTaxFromIncome) * higherTaxRate
  return taxOnLowerIncome + taxOnHigherIncome
}

const netFromGross = (grossAnnual: number, exemptRevenueLimit: number): PolishNet => {
  const social = grossAnnual * socialRate
  const health = (grossAnnual - social) * healthRate
  const exemptRevenue = Math.min(grossAnnual, exemptRevenueLimit)
  const taxableRevenue = grossAnnual - exemptRevenue
  const deductibleSocial = taxableRevenue * socialRate
  const workCosts = Math.min(yearlyWorkCosts, taxableRevenue)
  const income = taxableRevenue - deductibleSocial - workCosts
  const tax = incomeTax(income)
  const annual = grossAnnual - social - health - tax

  return {
    social,
    health,
    tax,
    annual,
    monthly: annual / 12,
    weekly: annual / 52,
  }
}

export const calculatePolishNet = (grossAnnual: number): PolishNetComparison => {
  return {
    under26: netFromGross(grossAnnual, youthExemptRevenue),
    from26: netFromGross(grossAnnual, 0),
  }
}
