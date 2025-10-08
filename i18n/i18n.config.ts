const pluralRule = (choice: number, choicesLength: number) => {
  if (choice === 0) return 0

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1

  if (!teen && endsWithOne) return 1
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2

  return (choicesLength < 4) ? 2 : 3
}

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: process.env.DEFAULT_LOCALE as 'uk' | 'ru' | 'en' | undefined,
    pluralRules: {
      uk: pluralRule,
      ru: pluralRule
    }
  }
})
