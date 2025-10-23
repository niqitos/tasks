import type { Channel } from 'pusher-js'

export const usePusher = () => {
  const { $pusher } = useNuxtApp()

  const subscribe = (channel: string) => $pusher.subscribe(channel)

  const unsubscribe = (channel: string) => $pusher.unsubscribe(channel)

  const bind = (channel: Channel, event: string, callback: (data: any) => void) => {
    channel.bind(event, callback)
  }

  const unbind = (channel: Channel, event: string, callback?: (data: any) => void) => {
    channel.unbind(event, callback)
  }

  return {
    pusher: $pusher,
    subscribe,
    unsubscribe,
    bind,
    unbind
  }
}
