<template>
  <UModal
    v-model:open="settingsStore.edit"
    :title="$t('settings.edit.title')"
  >
    <template #body>
      <div class="grid grid-cols-12 gap-4">
        <div
          class="col-span-4 sm:col-span-2"
          v-text="$t('settings.edit.language')"
        />

        <div class="col-span-8 sm:col-span-10">
          <ULocaleSelect
            v-model="locale"
            variant="none"
            :locales="locales"
            :ui="{
              base: 'cursor-pointer',
            }"
            @update:model-value="setLocale($event as SupportedLocale)"
          />
        </div>

        <div
          class="col-span-4 sm:col-span-2"
          v-text="$t('settings.edit.theme')"
        />

        <div class="col-span-8 sm:col-span-10">
          <UColorModeSelect
            variant="none"
            class="cursor-pointer"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales: i18nLocales, setLocale: setI18nLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const settingsStore = useSettingsStore()


const locales = ref<any>(i18nLocales.value.map((l: LocaleObject) => ({
  name: l.name?.substring(0, 3),
  code: l.code,
  dir: l.dir
})))


const setLocale = (value: SupportedLocale) => {
  if (i18nLocales.value.filter((i: LocaleObject) => i.code !== value)) {
    setI18nLocale(value)

    location.href = switchLocalePath(value)
    // return navigateTo(localePath(switchLocalePath(value)), { external: true })
  }
}
</script>
