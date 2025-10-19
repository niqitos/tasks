<template>
  <section>
    <h2
      class="text-3xl font-bold text-center mb-8 lg:mb-12"
      v-text="$t('plans.title')"
    />

    <div class="flex justify-end mb-4">
      <USwitch
        v-model="cycle"
        :label="t(`plans.cycle.${planStore.cycle}.title`)"
      />
    </div>

    <UPricingPlans
      :plans
    />
  </section>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()

const planStore = usePlanStore()
const userStore = useUserStore()

const cycle = computed({
  get: () => planStore.cycle === 'annually',
  set: (value: boolean) => {
    planStore.cycle = value ? 'annually' : 'monthly'
  }
})

const plans = computed(() => [
  {
    id: 'free',
    title: t('plans.free.name'),
    description: t('plans.free.description'),
    features: [
      t(`plans.limits.workspaces.${planStore.limitations.free.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.max),
      t(`plans.limits.workspaces.members.${planStore.limitations.free.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.members.max),
      t(`plans.limits.workspaces.boards.${planStore.limitations.free.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.max),
      t(`plans.limits.workspaces.boards.tasks.${planStore.limitations.free.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.tasks.max),
      t(`plans.limits.workspaces.boards.tasks.files.${planStore.limitations.free.workspaces.boards.tasks.files.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.tasks.files.max),
      t(`plans.limits.workspaces.boards.tasks.assignees.${planStore.limitations.free.workspaces.boards.tasks.assignees.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.tasks.assignees.max)
    ],
    button: {
      label: t('plans.free.action'),
      to: localePath('dashboard')
    }
  },
  {
    id: 'team',
    title: t('plans.team.name'),
    description: t('plans.team.description'),
    features: [
      t(`plans.limits.workspaces.${planStore.limitations.team.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.max),
      t(`plans.limits.workspaces.members.${planStore.limitations.team.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.members.max),
      t(`plans.limits.workspaces.boards.${planStore.limitations.team.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.max),
      t(`plans.limits.workspaces.boards.tasks.${planStore.limitations.team.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.tasks.max),
      t(`plans.limits.workspaces.boards.tasks.files.${planStore.limitations.team.workspaces.boards.tasks.files.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.tasks.files.max),
      t(`plans.limits.workspaces.boards.tasks.assignees.${planStore.limitations.team.workspaces.boards.tasks.assignees.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.tasks.assignees.max),
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
    id: 'business',
    title: t('plans.business.name'),
    description: t('plans.business.description'),
    features: [
      t(`plans.limits.workspaces.${planStore.limitations.business.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.max),
      t(`plans.limits.workspaces.members.${planStore.limitations.business.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.members.max),
      t(`plans.limits.workspaces.boards.${planStore.limitations.business.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.max),
      t(`plans.limits.workspaces.boards.tasks.${planStore.limitations.business.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.tasks.max),
      t(`plans.limits.workspaces.boards.tasks.files.${planStore.limitations.business.workspaces.boards.tasks.files.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.tasks.files.max),
      t(`plans.limits.workspaces.boards.tasks.assignees.${planStore.limitations.business.workspaces.boards.tasks.assignees.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.tasks.assignees.max),
      t('plans.business.features.support')
    ],
    button: {
      label: t('plans.business.action'),
      to: ['business', 'enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
    }
  // },
  // {
  //   id: 'enterprise',
  //   title: t('plans.enterprise.name'),
  //   description: t('plans.enterprise.description'),
  //   features: [
  //     t(`plans.limits.workspaces.${planStore.limitations.enterprise.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.max),
  //     t(`plans.limits.workspaces.members.${planStore.limitations.enterprise.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.members.max),
  //     t(`plans.limits.workspaces.boards.${planStore.limitations.enterprise.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.max),
  //     t(`plans.limits.workspaces.boards.tasks.${planStore.limitations.enterprise.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.tasks.max),
  //     t(`plans.limits.workspaces.boards.tasks.files.${planStore.limitations.enterprise.workspaces.boards.tasks.files.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.tasks.files.max),
  //     t(`plans.limits.workspaces.boards.tasks.assignees.${planStore.limitations.enterprise.workspaces.boards.tasks.assignees.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.tasks.assignees.max),
  //     t('plans.enterprise.features.support')
  //   ],
  //   button: {
  //     label: t('plans.enterprise.action'),
  //     to: ['enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
  //   }
  }
].map((tier: any) => {
  const price = planStore.prices[tier.id][planStore.currency][planStore.cycle]

  if (price !== false) {
    tier.price = new Intl.NumberFormat(locale.value, {
      style: 'currency',
      currencyDisplay: 'narrowSymbol',
      currency: planStore.currency,
    }).format(price)
  }

  if (price !== false && price > 0) {
    tier.billingCycle =t(`plans.cycle.${planStore.cycle}.per`),
    tier.billingPeriod =t(`plans.cycle.${planStore.cycle}.title`)
  }

  return tier
})
)
</script>
