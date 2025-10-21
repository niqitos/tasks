<template>
  <section>
    <h2
      class="text-3xl font-bold text-center mb-8 lg:mb-12"
      v-text="$t('plans.title')"
    />

    <div class="flex justify-end mb-4 md:mb-0">
      <USwitch
        v-model="cycle"
        :label="t(`plans.cycle.${planStore.cycle}.title`)"
      />
    </div>

    <UPricingTable
      :tiers
      :sections
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

const tiers = computed(() => [
  {
    id: 'free',
    title: t('plans.free.name'),
    description: t('plans.free.description'),
    button: {
      label: t('plans.free.action'),
      to: localePath('dashboard')
    }
  },
  {
    id: 'team',
    title: t('plans.team.name'),
    description: t('plans.team.description'),
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
    button: {
      label: t('plans.business.action'),
      to: ['business', 'enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
    }
  // },
  // {
  //   id: 'enterprise',
  //   title: t('plans.enterprise.name'),
  //   description: t('plans.enterprise.description'),
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

const sections = ref([
  {
    title: t('plans.limits.title'),
    features: [
      {
        title: t('plans.limits.workspaces.title'),
        tiers: {
          free: t(`plans.limits.${planStore.limitations.free.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.max),
          team: t(`plans.limits.${planStore.limitations.team.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.max),
          business: t(`plans.limits.${planStore.limitations.business.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.max),
          // enterprise: t(`plans.limits.${planStore.limitations.enterprise.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.max)
        }
      },
      {
        title: t('plans.limits.workspaces.members.title'),
        tiers: {
          free: t(`plans.limits.${planStore.limitations.free.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.members.max),
          team: t(`plans.limits.${planStore.limitations.team.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.members.max),
          business: t(`plans.limits.${planStore.limitations.business.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.members.max),
          // enterprise: t(`plans.limits.${planStore.limitations.enterprise.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.members.max)
        }
      },
      {
        title: t('plans.limits.workspaces.boards.title'),
        tiers: {
          free: t(`plans.limits.${planStore.limitations.free.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.max),
          team: t(`plans.limits.${planStore.limitations.team.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.max),
          business: t(`plans.limits.${planStore.limitations.business.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.max),
          // enterprise: t(`plans.limits.${planStore.limitations.enterprise.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.max)
        }
      },
      {
        title: t('plans.limits.workspaces.boards.tasks.title'),
        tiers: {
          free: t(`plans.limits.${planStore.limitations.free.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.tasks.max),
          team: t(`plans.limits.${planStore.limitations.team.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.tasks.max),
          business: t(`plans.limits.${planStore.limitations.business.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.tasks.max),
          // enterprise: t(`plans.limits.${planStore.limitations.enterprise.workspaces.boards.tasks.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.tasks.max)
        }
      },
      {
        title: t('plans.limits.workspaces.boards.tasks.files.title'),
        tiers: {
          free: t(`plans.limits.${planStore.limitations.free.workspaces.boards.tasks.files.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.tasks.files.max),
          team: t(`plans.limits.${planStore.limitations.team.workspaces.boards.tasks.files.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.tasks.files.max),
          business: t(`plans.limits.${planStore.limitations.business.workspaces.boards.tasks.files.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.tasks.files.max),
          // enterprise: t(`plans.limits.${planStore.limitations.enterprise.workspaces.boards.tasks.files.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.tasks.files.max)
        }
      },
      {
        title: t('plans.limits.workspaces.boards.tasks.assignees.title'),
        tiers: {
          free: t(`plans.limits.${planStore.limitations.free.workspaces.boards.tasks.assignees.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.tasks.assignees.max),
          team: t(`plans.limits.${planStore.limitations.team.workspaces.boards.tasks.assignees.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.tasks.assignees.max),
          business: t(`plans.limits.${planStore.limitations.business.workspaces.boards.tasks.assignees.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.tasks.assignees.max),
          // enterprise: t(`plans.limits.${planStore.limitations.enterprise.workspaces.boards.tasks.assignees.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.tasks.assignees.max)
        }
      }
    ]
  },
  {
    title: t('plans.features.title'),
    features: [
      {
        title: t('plans.features.calendar.title'),
        tiers: {
          free: planStore.limitations.free.view.calendar,
          team: planStore.limitations.team.view.calendar,
          business: planStore.limitations.business.view.calendar,
          // enterprise: planStore.limitations.enterprise.view.calendar
        }
      },
      {
        title: t('plans.features.support.title'),
        tiers: {
          free: planStore.limitations.free.support,
          team: planStore.limitations.team.support,
          business: planStore.limitations.business.support,
          // enterprise: planStore.limitations.enterprise.support
        }
      }
    ]
  }
])


</script>
