<template>
  <div class="flex flex-row items-start min-h-[inherit] w-full overflow-y-visible py-4 px-4 sm:px-6 lg:px-8 overflow-x-auto space-x-4">
    <FullCalendar
      ref="fullCalendarRef"
      :options="options"
      class="w-full"
    />

    <TaskEdit />
  </div>
</template>

<script lang="ts" setup>
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/vue3'
import type { CalendarOptions } from '@fullcalendar/core'
import allLocales from '@fullcalendar/core/locales-all'

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
})

const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const route = useRoute()

const fullCalendarRef = ref<any>()

useSeoMeta({
  title: `${t('calendar.title')} - ${t('app.name')}`,
  description: t('calendar.description'),
  ogTitle: `${t('calendar.title')} - ${t('app.name')}`,
  ogDescription: t('calendar.description'),
  ogImage: '/web-app-manifest-512.png',
  twitterCard: 'summary_large_image',
  ogUrl: localePath('index')
})

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: `${config.public.appUrl}${route.path}`
    }
  ]
}))

useRobotsRule({
  index: false,
  follow: false
})

const workspaceStore = useWorkspaceStore()
const boardStore = useBoardStore()

const workspaces = ref<any>(await $fetch('/api/workspaces'))

watch(
  () => workspaces.value,
  () => {
    if (workspaces.value.length > 0) {
      workspaceStore.workspaces = workspaces.value

      let workspace = workspaceStore.workspaces.find((w: any) => w.id === localStorage.getItem('workspace.current.id'))

      if (!workspace) {
        workspace = workspaceStore.workspaces[0]

        localStorage.setItem('workspace.current.id', workspace.id)
      }

      workspaceStore.current = workspace

      boardStore.boards = workspaceStore.current.boards
    }
  },
  {
    immediate: true
  }
)

const events = computed(() => boardStore.boards
  .map((b: any) => b.tasks)
  .flat()
  .filter((t: any) => t.startAt)
  .map((t: any) => ({
    title: t.name,
    start: t.startAt,
    end: t.endAt || t.startAt,
    url: localePath({ name: 'calendar-index-tasks-task', params: { task: t.id } })
  }))
)

const options = ref<CalendarOptions>({
  locale: 'uk',
  locales: allLocales,
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
  ],
  initialView: 'dayGridMonth',
  dateClick: (info: any) => {
    const calendarApi = fullCalendarRef.value.getApi()

    calendarApi.changeView('timeGridDay', info.dateStr)
  },
  stickyHeaderDates: true,
  editable: true,
  headerToolbar: {
    left: 'prevYear,prev,today,next,nextYear',
    center: 'title',
    right: 'timeGridDay,dayGridWeek,dayGridMonth,dayGridYear'
  },
  footerToolbar: {
    left: 'prevYear,prev,today,next,nextYear',
    center: '',
    right: 'timeGridDay,dayGridWeek,dayGridMonth,dayGridYear'
  },
  events: events.value,
  eventClick: (info: any) => {
    info.jsEvent.preventDefault()

    return navigateTo(info.event.url)
  }
})

watch(
  () => events.value,
  () => {
    options.value.events = events.value
  },
  {
    deep: true
  }
)
</script>
