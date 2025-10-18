<template>
  <section>
    <h2
      class="text-3xl font-bold text-center mb-8 lg:mb-12"
      v-text="$t('plans.title')"
    />

    <UPricingTable
      :tiers
      :sections
    />
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const localePath = useLocalePath()

const planStore = usePlanStore()
const userStore = useUserStore()

const tiers = computed(() => [
  {
    id: 'free',
    title: t('plans.free.name'),
    description: t('plans.free.description'),
    price: '$0',
    // features: [
    //   t(`plans.limits.workspaces.${planStore.limitations.free.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.max),
    //   t(`plans.limits.workspaces.boards.${planStore.limitations.free.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.boards.max),
    //   t(`plans.limits.workspaces.members.${planStore.limitations.free.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.free.workspaces.members.max)
    // ],
    button: {
      label: t('plans.free.action'),
      to: localePath('dashboard')
    }
  },
  {
    id: 'team',
    title: t('plans.team.name'),
    description: t('plans.team.description'),
    price: '$4.99',
    // features: [
    //   t(`plans.limits.workspaces.${planStore.limitations.team.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.max),
    //   t(`plans.limits.workspaces.boards.${planStore.limitations.team.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.boards.max),
    //   t(`plans.limits.workspaces.members.${planStore.limitations.team.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.team.workspaces.members.max)
    // ],
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
    price: '$9.99',
    // features: [
    //   t(`plans.limits.workspaces.${planStore.limitations.business.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.max),
    //   t(`plans.limits.workspaces.boards.${planStore.limitations.business.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.boards.max),
    //   t(`plans.limits.workspaces.members.${planStore.limitations.business.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.business.workspaces.members.max)
    // ],
    button: {
      label: t('plans.business.action'),
      to: ['business', 'enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
    }
  // },
  // {
  //   id: 'enterprise',
  //   title: t('plans.enterprise.name'),
  //   description: t('plans.enterprise.description'),
  //   price: '$99.99',
  //   features: [
  //     t(`plans.limits.workspaces.${planStore.limitations.enterprise.workspaces.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.max),
  //     t(`plans.limits.workspaces.boards.${planStore.limitations.enterprise.workspaces.boards.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.boards.max),
  //     t(`plans.limits.workspaces.members.${planStore.limitations.enterprise.workspaces.members.max === planStore.unlimited ? 'unlimited' : 'limited'}`, planStore.limitations.enterprise.workspaces.members.max)
  //   ],
  //   button: {
  //     label: t('plans.enterprise.action'),
  //     to: ['enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
  //   }
  }
])

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
      }
    ]
  },
  {
    title: t('plans.features.title'),
    features: [
      {
        title: t('plans.features.support.title'),
        tiers: {
          free: false,
          team: true,
          business: true,
          // enterprise: true
        }
      }
    ]
  }
])


</script>
