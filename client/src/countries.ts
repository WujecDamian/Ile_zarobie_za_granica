export type Country = {
  id: string
  name: string
  currencyCode: string
  currencyLabel: string
}

export const countries: Country[] = [
  { id: "at", name: "Austria", currencyCode: "eur", currencyLabel: "EUR" },
  { id: "be", name: "Belgia", currencyCode: "eur", currencyLabel: "EUR" },
  { id: "cz", name: "Czechy", currencyCode: "czk", currencyLabel: "CZK" },
  { id: "dk", name: "Dania", currencyCode: "dkk", currencyLabel: "DKK" },
  { id: "fi", name: "Finlandia", currencyCode: "eur", currencyLabel: "EUR" },
  { id: "fr", name: "Francja", currencyCode: "eur", currencyLabel: "EUR" },
  { id: "es", name: "Hiszpania", currencyCode: "eur", currencyLabel: "EUR" },
  { id: "nl", name: "Holandia", currencyCode: "eur", currencyLabel: "EUR" },
  { id: "ie", name: "Irlandia", currencyCode: "eur", currencyLabel: "EUR" },
  { id: "lu", name: "Luksemburg", currencyCode: "eur", currencyLabel: "EUR" },
  { id: "de", name: "Niemcy", currencyCode: "eur", currencyLabel: "EUR" },
  { id: "no", name: "Norwegia", currencyCode: "nok", currencyLabel: "NOK" },
  { id: "ch", name: "Szwajcaria", currencyCode: "chf", currencyLabel: "CHF" },
  { id: "se", name: "Szwecja", currencyCode: "sek", currencyLabel: "SEK" },
  { id: "gb", name: "Wielka Brytania", currencyCode: "gbp", currencyLabel: "GBP" },
  { id: "it", name: "Włochy", currencyCode: "eur", currencyLabel: "EUR" },
]
