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
          v-text="$t('home.features_title')"
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
          v-text="$t('home.pricing_title')"
        />

        <UPricingPlans :plans="plans" />
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

const plans = ref([
  {
    title: t('home.plans.free.name'),
    description: t('home.plans.free.description'),
    price: '$0',
    features: [
      t('home.plans.free.features.1'),
      t('home.plans.free.features.2'),
      t('home.plans.free.features.3')
    ],
    button: {
      label: t('home.plans.free.action')
    }
  },
  {
    title: t('home.plans.team.name'),
    description: t('home.plans.team.description'),
    price: '$4.99',
    features: [
      t('home.plans.team.features.1'),
      t('home.plans.team.features.2'),
      t('home.plans.team.features.3'),
      t('home.plans.team.features.4')
    ],
    button: {
      label: t('home.plans.team.action')
    },
    scale: true,
    highlight: true
  },
  {
    title: t('home.plans.business.name'),
    description: t('home.plans.business.description'),
    price: '$9.99',
    features: [
      t('home.plans.business.features.1'),
      t('home.plans.business.features.2'),
      t('home.plans.business.features.3'),
      t('home.plans.business.features.4')
    ],
    button: {
      label: t('home.plans.business.action')
    }
  }
])
</script>
