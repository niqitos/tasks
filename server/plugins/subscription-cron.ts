import { runDueSubscriptions } from '@@/server/services/charge-scheduler'
import { CronJob } from 'cron'

export default defineNitroPlugin(() => {
  const job = new CronJob('*/5 * * * *', async () => {
    console.log('Running subscription scheduler...')

    await runDueSubscriptions()
  })

  job.start()

  console.log('Subscription cron started')
})
