<template>
  <UPopover>
    <UButton
      color="neutral"
      variant="subtle"
      icon="i-lucide:calendar"
      :ui="{
        base: 'w-full gap-2.5'
      }"
    >
      <div
        v-if="model.start || model.end"
        class="flex items-center flex-1 justify-between"
      >
        <div class="flex flex-col items-start">
          <div
            v-if="model.start"
            v-text="`${$t('task.startEndDates.startAt')} ${df.format(model.start.toDate(getLocalTimeZone()))}`"
          />

          <div
            v-if="model.end"
            v-text="`${$t('task.startEndDates.endAt')} ${df.format(model.end.toDate(getLocalTimeZone()))}`"
          />
        </div>

        <UButton
          color="neutral"
          variant="link"
          icon="i-lucide:x"
          @click.stop="clear()"
        />
      </div>

      <template v-else>
        {{ $t('task.startEndDates.placeholder') }}
      </template>
    </UButton>

    <template #content>
      <UCalendar
        v-model="model"
        class="p-2"
        :number-of-months="2"
        range
      />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { CalendarDateTime, DateFormatter, getLocalTimeZone, fromDate, toCalendarDate } from '@internationalized/date'
import type { DateRange } from 'reka-ui'

const { locale } = useI18n()

const df = new DateFormatter(locale.value, {
  dateStyle: 'full'
})

const emit = defineEmits<{
  (e: 'updated'): void
}>()

const task = defineModel('task', {
  type: Object as () => {
    startAt: Date | null
    endAt: Date | null
  },
  required: true
})

const model = shallowRef<DateRange>({
  start: task.value.startAt ? toCalendarDate(fromDate(new Date(task.value.startAt), getLocalTimeZone())) : undefined,
  end: task.value.endAt ? toCalendarDate(fromDate(new Date(task.value.endAt), getLocalTimeZone())) : undefined
})

const clear = () => {
  model.value = {
    start: undefined,
    end: undefined
  }
}

watch(
  model,
  (newVal) => {
    task.value.startAt = newVal.start ? newVal.start.toDate(getLocalTimeZone()) : null
    task.value.endAt = newVal.end
      // ? newVal.end.toDate(getLocalTimeZone())
      ? new CalendarDateTime(newVal.end.year, newVal.end.month, newVal.end.day, 23, 59, 59).toDate(getLocalTimeZone())
      : null

    emit('updated')
  },
  {
    deep: true
  }
)
</script>
