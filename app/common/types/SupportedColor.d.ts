declare type SupportedColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'

declare type Color = {
  value: SupportedColor | null,
  label: string,
  class?: string
}
