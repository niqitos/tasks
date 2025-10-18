<template>
  <section>
    <h2
      class="text-3xl font-bold text-center mb-8 lg:mb-12"
      v-text="$t('plans.title')"
    />

    <UPricingPlans :plans />
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const localePath = useLocalePath()

const planStore = usePlanStore()
const userStore = useUserStore()

const plans = computed(() => [
  {
    title: t('plans.free.name'),
    description: t('plans.free.description'),
    price: '$0',
    features: [
      t(`plans.limits.workspaces.${planStore.limitations.free.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.max),
      t(`plans.limits.workspaces.members.${planStore.limitations.free.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.members.max),
      t(`plans.limits.workspaces.boards.${planStore.limitations.free.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.max),
      t(`plans.limits.workspaces.boards.tasks.${planStore.limitations.free.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.tasks.max)
    ],
    button: {
      label: t('plans.free.action'),
      to: localePath('dashboard')
    }
  },
  {
    title: t('plans.team.name'),
    description: t('plans.team.description'),
    price: '$4.99',
    features: [
      t(`plans.limits.workspaces.${planStore.limitations.team.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.max),
      t(`plans.limits.workspaces.members.${planStore.limitations.team.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.members.max),
      t(`plans.limits.workspaces.boards.${planStore.limitations.team.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.max),
      t(`plans.limits.workspaces.boards.tasks.${planStore.limitations.team.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.tasks.max),
      t('plans.team.features.support')
    ],
    button: {
      label: t('plans.team.action'),
      to: ['team', 'business', 'enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
    },
    scale: true,
    highlight: true
  },
  {
    title: t('plans.business.name'),
    description: t('plans.business.description'),
    price: '$9.99',
    features: [
      t(`plans.limits.workspaces.${planStore.limitations.business.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.max),
      t(`plans.limits.workspaces.members.${planStore.limitations.business.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.members.max),
      t(`plans.limits.workspaces.boards.${planStore.limitations.business.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.max),
      t(`plans.limits.workspaces.boards.tasks.${planStore.limitations.business.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.tasks.max),
      t('plans.business.features.support')
    ],
    button: {
      label: t('plans.business.action'),
      to: ['business', 'enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
    }
  // },
  // {
  //   title: t('plans.enterprise.name'),
  //   description: t('plans.enterprise.description'),
  //   price: '$99.99',
  //   features: [
  //     t(`plans.limits.workspaces.${planStore.limitations.enterprise.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.max),
  //     t(`plans.limits.workspaces.members.${planStore.limitations.enterprise.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.members.max),
  //     t(`plans.limits.workspaces.boards.${planStore.limitations.enterprise.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.max),
  //     t(`plans.limits.workspaces.boards.tasks.${planStore.limitations.enterprise.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.tasks.max),
  //     t('plans.enterprise.features.support')
  //   ],
  //   button: {
  //     label: t('plans.enterprise.action'),
  //     to: ['enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
  //   }
  }
])
</script>
