<template>
  <LoadingScreen />

  <DashboardHeader />

  <UMain>
    <slot />
  </UMain>

  <UserEdit />

  <SettingsEdit />
</template>
