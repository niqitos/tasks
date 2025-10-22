declare type SupportedCurrency = 'USD' | 'EUR' | 'GBP'

declare type Currency = {
  symbol: '$' | '€' | '£'
  name: string
  code: SupportedCurrency
}
