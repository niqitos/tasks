<template>
  <LoadingScreen />

  <AppHeader />

  <UMain>
    <slot />
  </UMain>

  <UserEdit />

  <SettingsEdit />
</template>
