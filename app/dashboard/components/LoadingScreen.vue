<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-default"
    >
      <div class="flex flex-col items-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-kanban-icon lucide-square-kanban stroke-primary size-50">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path id="board-1" d="M8 7v7" />
          <path id="board-2" d="M12 7v4" />
          <path id="board-3" d="M16 7v9" />
        </svg>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const workspaceStore = useWorkspaceStore()

const mounted = ref(true)

const visible = computed(() => mounted.value && !workspaceStore.loading)

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      mounted.value = false
    }, 500)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#board-1 {
  animation: fade-in 1s ease 0s infinite alternate forwards;
}

#board-2 {
  animation: fade-in 1s ease 0.333s infinite alternate forwards;
}

#board-3 {
  animation: fade-in 1s ease 0.666s infinite alternate none;
}
</style>
