import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateSalary, type SalaryInput } from "../calculateSalary.ts"
import type { Country } from "../countries.ts"
import { useGetPlnRateQuery } from "../currencyApi.ts"

type SalaryBreakdownProps = {
  salary: SalaryInput | null
  country: Country
}

const formatForeign = (amount: number, currencyLabel: string): string => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: currencyLabel,
  }).format(amount)
}

const formatHours = (hours: number): string => {
  return new Intl.NumberFormat("pl-PL", {
    maximumFractionDigits: 2,
  }).format(hours)
}

const formatRate = (rate: number): string => {
  return new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(rate)
}

const formatRateDate = (date: string): string => {
  const parts = date.split("-")
  if (parts.length !== 3) {
    return date
  }
  return `${parts[2]}.${parts[1]}.${parts[0]}`
}

export const SalaryBreakdown = ({ salary, country }: SalaryBreakdownProps) => {
  const rateQuery = useGetPlnRateQuery(country.currencyCode)
  const loadedRate = rateQuery.currentData
  const rate =
    loadedRate !== undefined && loadedRate.currencyCode === country.currencyCode
      ? loadedRate
      : undefined

  if (salary === null) {
    return null
  }

  const result = calculateSalary(salary)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jak to liczymy</CardTitle>
        <CardDescription>
          Najpierw tydzień w walucie kraju, potem miesiąc jako tydzień × 52 / 12.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Godziny zwykłe w tygodniu</dt>
            <dd className="shrink-0 font-medium">{formatHours(result.regularHoursPerWeek)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Stawka godzinowa</dt>
            <dd className="shrink-0 font-medium">
              {formatForeign(salary.hourlyWage, country.currencyLabel)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Pensja zwykła tygodniowo</dt>
            <dd className="shrink-0 font-medium">
              {formatForeign(result.regularWeekly, country.currencyLabel)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Nadgodziny w tygodniu</dt>
            <dd className="shrink-0 font-medium">{formatHours(result.overtimeHoursPerWeek)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Mnożnik nadgodzin</dt>
            <dd className="shrink-0 font-medium">{formatHours(salary.overtimeMultiplier)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Dopłata za nadgodziny tygodniowo</dt>
            <dd className="shrink-0 font-medium">
              {formatForeign(result.overtimeWeekly, country.currencyLabel)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Suma tygodniowa</dt>
            <dd className="shrink-0 font-medium">
              {formatForeign(result.weekly, country.currencyLabel)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Szacunek miesięczny</dt>
            <dd className="shrink-0 font-medium">
              {formatForeign(result.monthly, country.currencyLabel)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Szacunek roczny (tydzień × 52)</dt>
            <dd className="shrink-0 font-medium">
              {formatForeign(result.annual, country.currencyLabel)}
            </dd>
          </div>
        </dl>

        <div className="mt-4 border-t pt-4">
          {rate ? (
            <>
              <p className="font-medium">
                1 {country.currencyLabel} = {formatRate(rate.plnRate)} PLN
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Kurs z dnia {formatRateDate(rate.date)}
              </p>
            </>
          ) : null}
          {!rate && rateQuery.isError ? (
            <p className="text-sm text-destructive">Kurs jest niedostępny.</p>
          ) : null}
          {!rate && !rateQuery.isError ? (
            <p className="text-sm text-muted-foreground">Pobieram kurs...</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
