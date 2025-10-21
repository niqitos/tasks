<template>
  <div class="w-full overflow-auto p-4 sm:px-6">
    <UFormField
      :label="$t('task.comments.label')"
      :ui="{
        root: 'mb-4'
      }"
    >
      <UTextarea
        v-model="newComment"
        :placeholder="$t('task.comments.placeholder')"
        autoresize
        :rows="3"
        :ui="{
          root: 'w-full',
          trailing: 'pr-1.5'
        }"
      >
        <template #trailing>
          <Transition name="fade">
            <UButton
              v-if="newComment.trim()"
              icon="i-lucide:arrow-up"
              @click="submitComment(null)"
            />
          </Transition>
        </template>
      </UTextarea>
    </UFormField>

    <UPageList
      divide
      :class="{
        'mt-4': comments.length
      }"
    >
      <UPageCard
        v-for="(comment, index) in comments"
        :key="index"
        variant="ghost"
        :ui="{
          container: 'py-4 px-0 sm:py-4 sm:px-0',
          body: 'w-full'
        }"
      >
        <template #body>
          <div class="flex flex-1 gap-2">
            <UUser
              :name="`${comment.author?.name}${comment.author?.lastname ? ` ${comment.author?.lastname}` : ''}`"
              :description="dateFormatter(comment.createdAt)"
              :avatar="{
                src: comment.author?.avatar,
                alt: `${comment.author?.name}${comment.author?.lastname ? ` ${comment.author?.lastname}` : ''}`
              }"
              :ui="{
                name: 'space-x-2'
              }"
            >
              <template #name>
                <span v-text="`${comment.author?.name}${comment.author?.lastname ? ` ${comment.author?.lastname}` : ''}`" />

                <UButton
                  :label="replyingTo === comment.id ? 'Cancel' : 'Reply'"
                  variant="link"
                  size="xs"
                  :ui="{
                    base: 'p-0'
                  }"
                  @click="replyingTo = replyingTo === comment.id ? null : comment.id"
                />
              </template>
            </UUser>


          </div>

          <div
            class="my-2"
            v-text="comment.content"
          />

          <div class="flex flex-col gap-1">
            <UTextarea
              v-if="replyingTo === comment.id"
              v-model="replyContent"
              placeholder="Write a reply..."
              autoresize
              :rows="2"
              :ui="{
                root: 'w-full',
                trailing: 'pr-1.5'
              }"
            >
              <template #trailing>
                <UButton
                  :label="'Reply'"
                  :disabled="!replyContent.trim()"
                  @click="submitComment(comment.id)"
                />
              </template>
            </UTextarea>

            <div
              v-if="comment.replies.length"
              class="mt-2 border-l pl-4 sm:pl-6 space-y-3"
            >
              <UPageList divide>
                <UPageCard
                  v-for="(reply, index) in comment.replies"
                  :key="index"
                  variant="ghost"
                  :ui="{
                    container: 'py-4 px-0 sm:py-4 sm:px-0',
                    body: 'w-full'
                  }"
                >
                  <template #body>
                    <UUser
                      :name="`${reply.author?.name}${reply.author?.lastname ? ` ${reply.author?.lastname}` : ''}`"
                      :description="dateFormatter(reply.createdAt)"
                      :avatar="{
                        src: reply.author?.avatar,
                        alt: `${reply.author?.name}${reply.author?.lastname ? ` ${reply.author?.lastname}` : ''}`
                      }"
                    />

                    <div
                      class="mt-2"
                      v-text="reply.content"
                    />
                  </template>
                </UPageCard>
              </UPageList>
            </div>
          </div>
        </template>
      </UPageCard>
    </UPageList>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  task: {
    type: Object as any,
    required: true
  }
})

const comments = ref<any>([])
const newComment = ref('')
const replyContent = ref('')
const replyingTo = ref<string | null>(null)

const { data } = await useFetch(`/api/tasks/${props.task.id}/comments`)

comments.value = data.value || []

const submitComment = async (parentId: string | null = null) => {
  const content = parentId ? replyContent.value : newComment.value
  if (!content.trim()) return

  const response = await $fetch(`/api/tasks/${props.task.id}/comments`, {
    method: 'POST',
    body: {
      content,
      parentId
    }
  })

  newComment.value = ''
  replyContent.value = ''
  replyingTo.value = null

  if (parentId) {
    console.log(comments.value.find((c: any) => c.id === parentId))
    comments.value.find((c: any) => c.id === parentId).replies.push(response)
  } else {
    comments.value.push(response)
  }
}

const dateFormatter = (vale: string) => {
  const date = new Date(vale)

  return date.toLocaleDateString([], {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}
</script>
