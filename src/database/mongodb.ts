import { MongoClient, ReadPreference, Collection } from "mongodb";
import { MarketIndexes, Market } from './models/Market';

export let mongoClient: MongoClient

// Export collection
export let MarketCollection: Collection<Market>
export let MarketStatistic: any

export const connectMongo = async (MONGO_URI: any) => {
  try {
    // Connect Database
    mongoClient = await new MongoClient(MONGO_URI, {
      ignoreUndefined: true, // find: {xxx: {$exists: false}}
      readPreference: ReadPreference.PRIMARY,
    }).connect();
    

    mongoClient.on('error', async (e) => {
      try {
        await mongoClient.close()
        await connectMongo(MONGO_URI)
      } catch (e) {
        setTimeout(connectMongo, 1000)
        throw e
      }
    })

    mongoClient.on('timeout', async () => {
      try {
        await mongoClient.close()
        await connectMongo(MONGO_URI)
      } catch (e) {
        setTimeout(connectMongo, 1000)
        throw e
      }
    })

    const db = mongoClient.db()
    
    // Connect collection
    MarketCollection = db.collection('market-mainnet-v2')
    MarketStatistic = db.collection('market-statistic')
    await Promise.all([
      MarketCollection.createIndexes(MarketIndexes),
    ])
    console.log('💾 Connected successfully to mongodb');
  } catch (error) {
    console.log('Mongodb: Disconnected');
    await mongoClient?.close(true)
    setTimeout(connectMongo, 1000)
    throw error
  }
}
