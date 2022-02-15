import { intervalConsume } from './service';
import { connectMongo } from './database/mongodb';
import { connectWeb3 } from './web3';
import { PORT, MONGO_URI, WEB3_PROVIDER, STEP_BLOCK } from './config';
import { startApolloServer } from './apollo';
import { OrderDayStatistic } from './cron';

(async () => {
  try {
    await connectMongo(MONGO_URI)
    connectWeb3(WEB3_PROVIDER)
    await startApolloServer(PORT)
    await intervalConsume({ stepBlock: STEP_BLOCK })
    // OrderDayStatistic()
  } catch (error) {
    console.log(error);
    throw error
  }
})()

