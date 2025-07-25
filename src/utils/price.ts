type SupportedCurrency = 'USD' | 'EUR' | 'UAH'
type SupportedLocales = 'uk-UA' | 'en-US'

interface FormatPriceOptions {
  currency?: SupportedCurrency
  locale?: SupportedLocales
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export const formatPrice = (price: number, options: FormatPriceOptions = {}): string => {
  const { currency = 'USD', locale = 'en-US', minimumFractionDigits = 2, maximumFractionDigits = 2 } = options

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(price)
}
