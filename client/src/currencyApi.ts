import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type ExchangeRate = {
  date: string
  plnRate: number
  currencyCode: string
}

type RateFile = {
  date?: string
  [key: string]: { pln?: number } | string | undefined
}

const readRate = async (
  url: string,
  currencyCode: string,
): Promise<ExchangeRate | null> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as RateFile
    const rates = data[currencyCode]
    if (
      typeof data.date !== "string" ||
      typeof rates !== "object" ||
      rates === null ||
      typeof rates.pln !== "number"
    ) {
      return null
    }

    return {
      date: data.date,
      plnRate: rates.pln,
      currencyCode,
    }
  } catch {
    return null
  }
}

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  refetchOnFocus: false,
  refetchOnReconnect: false,
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getPlnRate: builder.query<ExchangeRate, string>({
      async queryFn(currencyCode) {
        const primaryUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.min.json`
        const fallbackUrl = `https://latest.currency-api.pages.dev/v1/currencies/${currencyCode}.min.json`

        const primaryRate = await readRate(primaryUrl, currencyCode)
        if (primaryRate !== null) {
          return { data: primaryRate }
        }

        const fallbackRate = await readRate(fallbackUrl, currencyCode)
        if (fallbackRate !== null) {
          return { data: fallbackRate }
        }

        return {
          error: {
            status: "FETCH_ERROR",
            error: "Nie udało się pobrać kursu.",
          },
        }
      },
    }),
  }),
})

export const { useGetPlnRateQuery } = currencyApi
