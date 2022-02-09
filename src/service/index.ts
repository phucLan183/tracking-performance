import { STEP_BLOCK } from '../config';
import { web3, MarketContract } from '../web3';
import { getOrderCreate, getOrderConfirmed, getOrderCancel, getBidEvent } from './market';

const getPastEventsOptions = (startBlock: number, latestBlock: number) => {
  const currentBlockWithStepBlock = startBlock + STEP_BLOCK
  let toBlock = currentBlockWithStepBlock >= latestBlock ? latestBlock : currentBlockWithStepBlock
  return { fromBlock: startBlock, toBlock }
}

export const intervalConsume = async (startBlock: number) => {
  try {
    const latestBlock = await web3.eth.getBlockNumber()
    if (startBlock >= latestBlock) startBlock = latestBlock

    let options = getPastEventsOptions(startBlock, latestBlock)

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
      intervalConsume(startBlock)
    }, 3000)
  }
}