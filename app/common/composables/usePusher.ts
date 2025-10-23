import type { Channel } from 'pusher-js'

export const usePusher = () => {
  const { $pusher } = useNuxtApp()

  const subscribe = (channelName: string) => $pusher.subscribe(channelName)

  const unsubscribe = (channelName: string) => {
    $pusher.unsubscribe(channelName)
  }

  const bind = (channel: Channel, eventName: string, callback: (data: any) => void) => {
    channel.bind(eventName, callback)
  }

  const unbind = (channel: Channel, eventName: string, callback?: (data: any) => void) => {
    channel.unbind(eventName, callback)
  }

  return {
    pusher: $pusher,
    subscribe,
    unsubscribe,
    bind,
    unbind
  }
}
