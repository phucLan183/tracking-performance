import { START_BLOCK } from '../config';
import { web3, MarketContract } from '../web3';
import { getOrderCreate, getOrderConfirmed, getOrderCancel, getBidEvent } from './market';
import { MarketCollection } from '../database/mongodb'

const getPastEventsOptions = (startBlock: number, stepBlock: number, latestBlock: number) => {
  const currentBlockWithStepBlock = startBlock + stepBlock
  let toBlock = currentBlockWithStepBlock >= latestBlock ? latestBlock : currentBlockWithStepBlock
  return { fromBlock: startBlock, toBlock }
}

export const intervalConsume = async (options: { startBlock?: number, stepBlock: number }) => {
  let { startBlock, stepBlock } = options
  try {
    if (!startBlock) {
      const dataMarket = await MarketCollection.find().sort({ _id: -1 }).limit(1).toArray()
      startBlock = dataMarket.length ? dataMarket[0].blockNumber : START_BLOCK
    }
    const latestBlock = await web3.eth.getBlockNumber()
    if (startBlock! >= latestBlock) startBlock = latestBlock

    let options = getPastEventsOptions(startBlock!, stepBlock, latestBlock)

    console.table({ startBlock: options.fromBlock, toBlock: options.toBlock, latestBlock: latestBlock });

    // const orderCreateEvent = await MarketContract.getPastEvents('allEvents', options)
    // console.log(orderCreateEvent);

    await getOrderCreate(options)
    await getOrderConfirmed(options)
    await getOrderCancel(options)
    await getBidEvent(options)

    startBlock = options.toBlock
  } catch (error) {
    throw error
  } finally {
    setTimeout(() => {
      intervalConsume({ startBlock, stepBlock })
    }, 3000)
  }
}