import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  setCountryId,
  setDaysPerWeek,
  setHourlyWage,
  setHoursPerDay,
  setOvertimeHours,
  setOvertimeMultiplier,
} from "../calculatorSlice.ts"
import type { FieldErrors } from "../checkForm.ts"
import { countries } from "../countries.ts"
import type { RootState } from "../store.ts"

type SalaryFormProps = {
  errors: FieldErrors
}

export const SalaryForm = ({ errors }: SalaryFormProps) => {
  const dispatch = useDispatch()
  const calculator = useSelector((state: RootState) => state.calculator)
  const country =
    countries.find((item) => item.id === calculator.countryId) ?? countries[0]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dane do wyliczenia</CardTitle>
        <CardDescription>Wpisz stawkę brutto i swój tydzień pracy.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="country">Kraj pracy</Label>
            <Select
              value={calculator.countryId}
              onValueChange={(value) => {
                dispatch(setCountryId(value))
              }}
            >
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Wybierz kraj" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Waluta: {country.currencyLabel}</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hourly-wage">
              Stawka godzinowa ({country.currencyLabel}, brutto)
            </Label>
            <Input
              id="hourly-wage"
              inputMode="decimal"
              autoComplete="off"
              className="h-10"
              aria-invalid={errors.hourlyWage !== ""}
              value={calculator.hourlyWage}
              onChange={(event) => {
                dispatch(setHourlyWage(event.target.value))
              }}
            />
            {errors.hourlyWage !== "" ? (
              <p className="text-sm text-destructive">{errors.hourlyWage}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="days-per-week">Dni pracy w tygodniu</Label>
            <Input
              id="days-per-week"
              inputMode="numeric"
              autoComplete="off"
              className="h-10"
              aria-invalid={errors.daysPerWeek !== ""}
              value={calculator.daysPerWeek}
              onChange={(event) => {
                dispatch(setDaysPerWeek(event.target.value))
              }}
            />
            {errors.daysPerWeek !== "" ? (
              <p className="text-sm text-destructive">{errors.daysPerWeek}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hours-per-day">Godziny dziennie</Label>
            <Input
              id="hours-per-day"
              inputMode="decimal"
              autoComplete="off"
              className="h-10"
              aria-invalid={errors.hoursPerDay !== ""}
              value={calculator.hoursPerDay}
              onChange={(event) => {
                dispatch(setHoursPerDay(event.target.value))
              }}
            />
            {errors.hoursPerDay !== "" ? (
              <p className="text-sm text-destructive">{errors.hoursPerDay}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="overtime-hours">Nadgodziny w tygodniu</Label>
            <Input
              id="overtime-hours"
              inputMode="decimal"
              autoComplete="off"
              className="h-10"
              aria-invalid={errors.overtimeHours !== ""}
              value={calculator.overtimeHours}
              onChange={(event) => {
                dispatch(setOvertimeHours(event.target.value))
              }}
            />
            {errors.overtimeHours !== "" ? (
              <p className="text-sm text-destructive">{errors.overtimeHours}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="overtime-multiplier">Mnożnik nadgodzin</Label>
            <Input
              id="overtime-multiplier"
              inputMode="decimal"
              autoComplete="off"
              className="h-10"
              aria-invalid={errors.overtimeMultiplier !== ""}
              value={calculator.overtimeMultiplier}
              onChange={(event) => {
                dispatch(setOvertimeMultiplier(event.target.value))
              }}
            />
            <p className="text-sm text-muted-foreground">
              1,5 oznacza półtora raza więcej za godzinę nadliczbową.
            </p>
            {errors.overtimeMultiplier !== "" ? (
              <p className="text-sm text-destructive">{errors.overtimeMultiplier}</p>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
