<template>
  <UDashboardPanel
    id="inbox-2"
  >
    <UDashboardNavbar
      :title
      :toggle="false"
    >
      <template #leading>
        <UButton
          icon="i-lucide:x"
          color="neutral"
          variant="ghost"
          class="-ms-1.5"
          @click="emits('close')"
        />
      </template>

      <template #right>
        <UDropdownMenu
          :items="dropdownItems"
        >
          <UButton
            icon="i-lucide:ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </template>
    </UDashboardNavbar>

    <div class="flex flex-col sm:flex-row justify-between gap-1 p-4 sm:px-6 border-b border-default">
      <div class="flex items-start gap-4 sm:my-1.5">
        <UAvatar
          :src="model?.creator.avatar"
          :alt="fullname"
          size="3xl"
        />

        <div class="min-w-0">
          <p
            class="font-semibold text-highlighted"
            v-text="fullname"
          />

          <p
            class="text-muted"
            v-text="model?.creator.email"
          />
        </div>
      </div>

      <p
        v-if="model?.createdAt"
        class="max-sm:pl-16 text-muted text-sm sm:mt-2"
        v-text="format(new Date(model?.createdAt), 'dd MMM HH:mm')"
      />
    </div>

    <div class="flex-1 p-4 sm:p-6 overflow-y-auto">
      <p
        class="whitespace-pre-wrap"
        v-html="body"
      />
    </div>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

const model = defineModel<InboxItem>({
  required: true
})

const { t } = useI18n()
const { inboxItemTitle } = useInbox()

const emits = defineEmits(['close'])

const dropdownItems = computed(() => [
  [
    {
      label: t(`inbox.items.mark.${model.value.isRead ? 'unread' : 'read'}`),
      icon: model.value.isRead ? 'i-lucide:mail' : 'i-lucide:mail-open',
      onSelect: ((e: Event) => update({ isRead: !model.value.isRead }))
    },
    {
      label: t(`inbox.items.mark.${model.value.important ? 'unimportant' : 'important'}`),
      icon: 'i-lucide:star',
      onSelect: ((e: Event) => update({ important: !model.value.important }))
    }
  ],
  // [
  //   {
  //     label: 'Star thread',
  //     icon: 'i-lucide:star'
  //   },
  //   {
  //     label: 'Mute thread',
  //     icon: 'i-lucide:circle-pause'
  //   }
  // ]
])

const fullname = computed(() => `${model.value?.creator.name}${model.value?.creator.lastname ? ` ${model.value?.creator.lastname}` : ''}`)

const title = computed(() => inboxItemTitle(model.value))

const body = computed(() => inboxItemTitle(model.value))

const update = async (body: any) : Promise<any> => {
  await useFetch(`/api/inbox/items/${model.value?.id}`, {
    method: 'PATCH',
    body
  })

  model.value = {
    ...model.value,
    ...body
  }
}

watch(
  model,
  async () : Promise<any> => {
    if (!model.value.isRead) {
      await update({
        isRead: true
      })
    }
  },
  {
    immediate: true
  }
)
</script>
