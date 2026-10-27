import { useSelector } from "react-redux"
import { SalaryBreakdown } from "./components/SalaryBreakdown.tsx"
import { SalaryForm } from "./components/SalaryForm.tsx"
import { SalaryResults } from "./components/SalaryResults.tsx"
import { checkForm } from "./checkForm.ts"
import { countries } from "./countries.ts"
import type { RootState } from "./store.ts"

const App = () => {
  const calculator = useSelector((state: RootState) => state.calculator)
  const checked = checkForm(calculator)
  const country =
    countries.find((item) => item.id === calculator.countryId) ?? countries[0]

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <img
          src="https://images.pexels.com/photos/11725734/pexels-photo-11725734.jpeg"
          alt=""
          className="h-full w-full scale-110 object-cover blur-sm"
        />
      </div>
      <main className="relative min-h-svh">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6">
          <header>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ile zarobię za granicą
            </h1>
            <p className="mt-2 max-w-2xl text-foreground/90">
              Sprawdź, ile zarobisz za granicą po przeliczeniu na złotówki.
            </p>
          </header>

          <div className="grid items-start gap-6 lg:grid-cols-2">
            <SalaryForm errors={checked.errors} />
            <div className="grid gap-4">
              <SalaryResults salary={checked.salary} country={country} />
              <SalaryBreakdown salary={checked.salary} country={country} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
