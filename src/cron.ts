import cron from 'cron';
import { MarketStatistic, MarketCollection } from './database/mongodb'

export const OrderDayStatistic = new cron.CronJob('*/5 * * * *', async () => {
  const present = new Date()
  const fiveMinuteAgo = new Date(Date.now() - 6 * 60 * 1000)
  const dataMarket = await MarketCollection.find({
    event: '',
    timestamp: {
      $gte: fiveMinuteAgo,
      $lte: present
    }
  }).toArray()
  console.log(dataMarket);
}, null, true, 'UTC')
OrderDayStatistic.start()