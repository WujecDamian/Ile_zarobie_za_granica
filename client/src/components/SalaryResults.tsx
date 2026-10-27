import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateSalary, type SalaryInput } from "../calculateSalary.ts"
import type { Country } from "../countries.ts"
import { useGetPlnRateQuery } from "../currencyApi.ts"
import { PolishNet } from "./PolishNet.tsx"

type SalaryResultsProps = {
  salary: SalaryInput | null
  country: Country
}

const formatForeign = (amount: number, currencyLabel: string): string => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: currencyLabel,
  }).format(amount)
}

const formatPln = (amount: number): string => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount)
}

export const SalaryResults = ({ salary, country }: SalaryResultsProps) => {
  const rateQuery = useGetPlnRateQuery(country.currencyCode)
  const loadedRate = rateQuery.currentData
  const rate =
    loadedRate !== undefined && loadedRate.currencyCode === country.currencyCode
      ? loadedRate
      : undefined

  if (salary === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wynik</CardTitle>
          <CardDescription>
            Popraw pola w formularzu, żeby zobaczyć wyliczenie.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const result = calculateSalary(salary)

  const plnLine = (amount: number): string => {
    if (rate) {
      return formatPln(amount * rate.plnRate)
    }
    if (rateQuery.isError) {
      return "Brak kursu"
    }
    return "Pobieram kurs..."
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardDescription>Miesiąc, brutto</CardDescription>
          <CardTitle className="text-3xl font-semibold tracking-tight break-words sm:text-4xl">
            {plnLine(result.monthly)}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <p className="text-muted-foreground">
            {formatForeign(result.monthly, country.currencyLabel)}
          </p>
          <p className="text-sm text-muted-foreground">
            To jest kwota brutto. Zależy od wpisanej stawki i aktualnego kursu.
          </p>
          {rateQuery.isError ? (
            <p className="text-sm text-destructive">
              Nie udało się pobrać kursu. Kwoty w walucie kraju są policzone, ale
              przeliczenie na PLN jest niedostępne.
            </p>
          ) : null}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Tydzień, brutto</CardDescription>
            <CardTitle className="text-2xl break-words">{plnLine(result.weekly)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {formatForeign(result.weekly, country.currencyLabel)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Rok, brutto</CardDescription>
            <CardTitle className="text-2xl break-words">{plnLine(result.annual)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {formatForeign(result.annual, country.currencyLabel)}
            </p>
          </CardContent>
        </Card>
      </div>

      {rate ? <PolishNet grossAnnualPln={result.annual * rate.plnRate} /> : null}
    </div>
  )
}
