<template>
  <UFooter
    :ui="{
      container: 'flex justify-center py-4'
    }"
  >
    <template #right>
      <ULocaleSelect
        v-model="locale"
        variant="none"
        :locales="locales"
        :ui="{
          base: 'cursor-pointer'
        }"
        @update:model-value="setLocale($event as SupportedLocale)"
      />

      <UColorModeSelect
        variant="none"
        class="cursor-pointer"
      />
    </template>
  </UFooter>
</template>

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales: i18nLocales, setLocale: setI18nLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const locales = ref<any>(i18nLocales.value.map((l: LocaleObject) => ({
  name: l.name?.substring(0, 3),
  code: l.code,
  dir: l.dir
})))

const setLocale = (value: SupportedLocale) => {
  if (i18nLocales.value.filter((i: LocaleObject) => i.code !== value)) {
    setI18nLocale(value)

    location.href = switchLocalePath(value)
  }
}
</script>
