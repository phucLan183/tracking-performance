import { MarketCollection, mongoClient } from '../database/mongodb';
import { Decimal128 } from 'mongodb';
import { MarketContract, Box1Contract, Box2Contract } from '../web3'
import { ADDRESS_BOX1, ADDRESS_BOX2 } from '../config';

const getTypeBox = async (contractNft: string, nftId: string) => {
  let typeBox: any
  switch (contractNft) {
    case ADDRESS_BOX1: {
      typeBox = await Box1Contract.methods.boxDetails(Number(nftId)).call()
      break
    }
    case ADDRESS_BOX2: {
      typeBox = await Box2Contract.methods.boxDetails(Number(nftId)).call()
      break
    }
    // case ADDRESS_BOX3: {
    //   typeBox = await Box3Contract.methods.boxDetails(Number(nftId)).call()
    //   break
    // }
    default: {
      typeBox = ''
    }
  }
  return typeBox
}


export const getOrderCreate = async (options: any) => {
  const session = mongoClient.startSession()
  try {
    const orderCreateEvent = await MarketContract.getPastEvents('OrderCreate', options)
    console.log({ orderCreateEvent: orderCreateEvent.length });
    if (orderCreateEvent.length > 0) {
      for (const event of orderCreateEvent) {
        const typeBox = await getTypeBox(event.returnValues.contractNft, event.returnValues.nftId)
        await session.withTransaction(async () => {
          const timeEnd = Number(event.returnValues.timeEnd)
          const CheckDataOrder = await MarketCollection.findOne({ blockId: event["id"] })
          if (!CheckDataOrder && typeBox) {
            await MarketCollection.insertOne({
              blockId: event["id"],
              blockNumber: event.blockNumber,
              event: event.event,
              typeBox: typeBox.boxType,
              orderId: event.returnValues.orderId,
              contractNft: event.returnValues.contractNft,
              currency: event.returnValues.currency,
              nftId: event.returnValues.nftId,
              creator: event.returnValues.creator,
              timestamp: new Date(event.returnValues.timestamp * 1000),
              timeEnd: timeEnd > 1000000000000 ? new Date(Number(event.returnValues.timeEnd)) : new Date(Number(event.returnValues.timeEnd * 1000)),
              currentPrice: new Decimal128(event.returnValues.currentPrice),
              spotPrice: new Decimal128(event.returnValues.spotPrice)
            }, { session })
          }
        })
      }
    }
  } catch (error) {
    console.log(error)
    if (session.inTransaction()) {
      await session.abortTransaction()
    }
    throw error;
  } finally {
    await session.endSession()
  }
}

export const getOrderConfirmed = async (options: any) => {
  const session = mongoClient.startSession()
  try {
    const orderConfirmedEvent = await MarketContract.getPastEvents('OrderConfirmed', options)
    console.log({ orderConfirmedEvent: orderConfirmedEvent.length });

    if (orderConfirmedEvent.length > 0) {
      for (const event of orderConfirmedEvent) {
        await session.withTransaction(async () => {
          const CheckDataOrder = await MarketCollection.findOne({ blockId: event["id"] })
          if (!CheckDataOrder) {
            const dataCreate = await MarketCollection.findOne({ event: "OrderCreate", orderId: event.returnValues.orderId })
            await MarketCollection.insertOne({
              blockId: event["id"],
              blockNumber: event.blockNumber,
              event: event.event,
              typeBox: dataCreate!.typeBox,
              orderId: event.returnValues.orderId,
              buyer: event.returnValues.buyer,
              price: new Decimal128(event.returnValues.price),
              fee: new Decimal128(event.returnValues.fee),
              timestamp: new Date(event.returnValues.timestamp * 1000)
            }, { session })
          }
        })
      }
    }
  } catch (error) {
    console.log(error)
    if (session.inTransaction()) {
      await session.abortTransaction()
    }
    throw error;
  } finally {
    await session.endSession()
  }
}

export const getOrderCancel = async (options: any) => {
  const session = mongoClient.startSession()
  try {
    const orderCancelEvent = await MarketContract.getPastEvents('OrderCancel', options)
    console.log({ orderCancelEvent: orderCancelEvent.length });

    if (orderCancelEvent.length > 0) {
      for (const event of orderCancelEvent) {
        await session.withTransaction(async () => {
          const CheckDataOrder = await MarketCollection.findOne({ blockId: event["id"] })
          if (!CheckDataOrder) {
            const dataCreate = await MarketCollection.findOne({ event: "OrderCreate", orderId: event.returnValues.orderId })
            await MarketCollection.insertOne({
              blockId: event["id"],
              blockNumber: event.blockNumber,
              typeBox: dataCreate!.typeBox,
              event: event.event,
              orderId: event.returnValues.orderId,
              timestamp: new Date(event.returnValues.timestamp * 1000),
            }, { session })
          }
        })
      }
    }
  } catch (error) {
    console.log(error)
    if (session.inTransaction()) {
      await session.abortTransaction()
    }
    throw error;
  } finally {
    await session.endSession()
  }
}

export const getBidEvent = async (options: any) => {
  const session = mongoClient.startSession()
  try {
    const bidEvent = await MarketContract.getPastEvents('Bid', options)
    console.log({ bidEvent: bidEvent.length });

    if (bidEvent.length > 0) {
      for (const event of bidEvent) {
        await session.withTransaction(async () => {
          const dataBid = await MarketCollection.findOne({ blockId: event["id"] })
          if (!dataBid) {
            const dataCreate = await MarketCollection.findOne({ event: "OrderCreate", orderId: event.returnValues.orderId })
            await MarketCollection.insertOne({
              blockId: event["id"],
              blockNumber: event.blockNumber,
              event: event.event,
              typeBox: dataCreate!.typeBox,
              bidder: event.returnValues.bidder,
              timestamp: new Date(Number(event.returnValues.timestamp * 1000)),
              orderId: event.returnValues.orderId,
              price: new Decimal128(event.returnValues.price)
            }, { session })
          }
        })
      }
    }
  } catch (error) {
    console.log(error)
    if (session.inTransaction()) {
      await session.abortTransaction()
    }
    throw error;
  } finally {
    await session.endSession()
  }
}