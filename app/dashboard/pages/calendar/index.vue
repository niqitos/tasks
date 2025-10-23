<template>
  <div class="flex flex-row items-start min-h-[inherit] w-full overflow-y-visible py-4 px-4 sm:px-6 lg:px-6 overflow-x-auto space-x-4">
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
  layout: 'dashboard',
  middleware: [
    'auth',
    'calendar'
  ]
})

const { t, locale } = useI18n()
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

const boardStore = useBoardStore()
const workspaceStore = useWorkspaceStore()

const events = computed(() => boardStore.boards
  .map((b: any) => b.tasks)
  .flat()
  .filter((t: any) => t.startAt)
  .map((t: any) => {
    const event = {
      title: `${t.name.length > 90 ? t.name.slice(0, 90) + '…' : t.name}${t.assignees.length ? ` • ${t.assignees[0].user.name}${t.assignees[0].user.lastname ? ` ${t.assignees[0].user.lastname}` : ''}` : ''}`,
      allDay: t.endAt > t.startAt,
      start: t.startAt,
      end: t.endAt || t.startAt,
      color: t.assignees.length
        ? (
          workspaceStore.current?.members.find((m: any) => m.user.id === t.assignees[0].user.id)?.color
            ? `var(--ui-${workspaceStore.current.members.find((m: any) => m.user.id === t.assignees[0].user.id)?.color})`
            : 'var(--ui-primary)'
        )
        : 'var(--ui-color-neutral-500)',
      url: localePath({ name: 'calendar-index-tasks-task', params: { task: t.id } })
    }

    return event
  })
)

const options = ref<CalendarOptions>({
  locale: locale.value,
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
