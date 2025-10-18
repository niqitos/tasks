<template>
  <div class="flex flex-row items-start min-h-[inherit] w-full overflow-y-visible py-4 sm:px-6 lg:px-8 overflow-x-auto space-x-4">
    <UContainer class="py-12 lg:py-16">
      <UPageHero
        :headline="$t('home.hero.headline')"
        :title="$t('home.hero.title')"
        :description="$t('home.hero.description')"
        orientation="horizontal"
        :links="links"
      >
        <UColorModeImage
          :light="`/hero/${locale}/light-task.webp`"
          :dark="`/hero/${locale}/dark-task.webp`"
          alt="Hero"
          class="rounded-lg shadow-2xl ring ring-default"
        />
      </UPageHero>

      <section class="mb-20">
        <h2
          class="text-3xl font-bold text-center mb-8"
          v-text="$t('home.features.title')"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <UPageCard
            v-for="feature in featuresList"
            :key="feature.key"
            :icon="feature.icon"
            :title="$t(`home.features.${feature.key}.title`)"
            :description="$t(`home.features.${feature.key}.desc`)"
            :ui="{
              root: [
                feature.size,
                'transition-all duration-300 hover:shadow-xl hover:ring-blue-500 shadow-lg rounded-xl'
              ],
              leadingIcon: 'size-8 mb-3',
              title: 'text-xl font-semibold',
              description: 'mt-2 flex-grow'
            }"
          />
        </div>
      </section>

      <section>
        <h2
          class="text-3xl font-bold text-center mb-8 lg:mb-12"
          v-text="$t('home.pricing.title')"
        />

        <UPricingPlans :plans="planStore.plans" />
      </section>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'home'
})

const { t, locale } = useI18n()
const localePath = useLocalePath()
const planStore = usePlanStore()

const links = ref([
  {
    label: t('home.hero.links.start'),
    to: localePath('dashboard'),
    trailingIcon: 'i-lucide:arrow-right'
  }
])

const featuresList = computed(() => [
  {
    key: 'workspaces',
    icon: 'i-lucide:blocks',
    size: 'lg:col-span-2'
  }, // BIG
  {
    key: 'boards',
    icon: 'i-lucide:square-kanban',
    size: 'lg:col-span-2'
  }, // BIG
  {
    key: 'tasks',
    icon: 'i-lucide:circle-check',
    size: 'lg:col-span-2'
  }, // BIG
  {
    key: 'user_assign',
    icon: 'i-lucide:users',
    size: 'lg:col-span-1'
  }, // MEDIUM
  {
    key: 'task_assign',
    icon: 'i-lucide:user-plus',
    size: 'lg:col-span-1'
  }, // MEDIUM
  {
    key: 'attachments',
    icon: 'i-lucide:paperclip',
    size: 'lg:col-span-1'
  }, // MEDIUM
  {
    key: 'comments',
    icon: 'i-lucide:messages-square',
    size: 'lg:col-span-1'
  }, // MEDIUM
  {
    key: 'tiptap',
    icon: 'i-lucide:square-pen',
    size: 'lg:col-span-1'
  } // MEDIUM
])
</script>
