import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { calculatePolishNet, type PolishNet as PolishNetAmounts } from "../calculatePolishNet.ts"

type PolishNetProps = {
  grossAnnualPln: number
}

const formatPln = (amount: number): string => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount)
}

const NetColumn = ({
  title,
  amounts,
}: {
  title: string
  amounts: PolishNetAmounts
}) => {
  return (
    <div className="grid gap-2">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-semibold tracking-tight break-words">
        {formatPln(amounts.monthly)}
      </p>
      <p className="text-sm text-muted-foreground">średnio miesięcznie</p>
      <dl className="grid gap-1 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">Składki społeczne</dt>
          <dd className="shrink-0">{formatPln(amounts.social / 12)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">Składka zdrowotna</dt>
          <dd className="shrink-0">{formatPln(amounts.health / 12)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">Podatek</dt>
          <dd className="shrink-0">{formatPln(amounts.tax / 12)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">W roku</dt>
          <dd className="shrink-0">{formatPln(amounts.annual)}</dd>
        </div>
      </dl>
    </div>
  )
}

export const PolishNet = ({ grossAnnualPln }: PolishNetProps) => {
  const net = calculatePolishNet(grossAnnualPln)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Netto w Polsce</CardTitle>
        <CardDescription>
          Szacunek, gdyby ta kwota brutto była umową o pracę w Polsce przez cały rok.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <NetColumn title="Mniej niż 26 lat" amounts={net.under26} />
          <NetColumn title="26 lat lub więcej" amounts={net.from26} />
        </div>
        <p className="text-sm text-muted-foreground">
          Składki pracownika: emerytalna 9,76%, rentowa 1,5%, chorobowa 2,45% i zdrowotna
          9%. Koszty uzyskania przychodu to 250 zł miesięcznie. Do 26. roku życia
          przychód do 85 528 zł w roku jest bez podatku. Od dochodu powyżej 120 000 zł
          podatek wynosi 32% zamiast 12%. To nie jest podatek kraju, w którym pracujesz.
        </p>
      </CardContent>
    </Card>
  )
}
