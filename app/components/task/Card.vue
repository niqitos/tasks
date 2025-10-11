<template>
  <UCard
    class="mb-4"
    draggable="true"
    :ui="{
      body: 'p-3 sm:p-3'
    }"
    @click="show(task.id)"
  >
    <strong v-text="name" />

    <p
      v-text="description"
      class="text-muted text-sm"
    />
  </UCard>
</template>

<script lang="ts" setup>
const props = defineProps({
  task: {
    required: true,
    type: Object
  }
})

const router = useRouter()
const localePath = useLocalePath()

const show = (id: string) => {
  router.push(localePath({ name: 'index-tasks-id', params: { id } }))
}

const name = computed(() => props.task.name.length > 50
  ? props.task.name.slice(0, 50) + '…'
  : props.task.name
)

const description = computed(() => props.task.description.length > 50
  ? props.task.description.slice(0, 50) + '…'
  : props.task.description
)

// Get preview of HTML
// const getPreview: any = (html: string, maxLength: number = 50) => {
//   if (!html) return ''

//   const div = document.createElement('div')
//   div.innerHTML = html.trim()

//   const firstEl = div.firstElementChild
//   if (!firstEl) return ''

//   const text = firstEl.textContent?.trim() || ''

//   return text.length > maxLength
//     ? text.slice(0, maxLength) + '…'
//     : text
// }
</script>
