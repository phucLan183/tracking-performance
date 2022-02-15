import { MarketCollection } from '../../../database/mongodb';
import Web3 from 'web3-utils';
import BN from 'bn.js';

const typeBox = {
  gold: '0',
  platinum: '1',
  diamond: '2'
}

export const getBoxAlreadySold = async (parent: any, args: any) => {
  try {
    const { day, month, year } = args
    const date = new Date(year, month - 1, day, 7)
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    const dataComfirmed = await MarketCollection.find({
      event: "OrderConfirmed",
      timestamp: {
        $gte: date,
        $lt: tomorrow
      }
    }).toArray()

    return {
      totalBox: dataComfirmed.length,
      goldBox: FilterDataTypeBox(dataComfirmed, typeBox.gold),
      platiumBox: FilterDataTypeBox(dataComfirmed, typeBox.platinum),
      diamondBox: FilterDataTypeBox(dataComfirmed, typeBox.diamond),
    }
  } catch (error) {
    throw error
  }
}

export const getSubmitSellOrder = async (parent: any, args: any) => {
  try {
    const { day, month, year } = args
    const date = new Date(year, month - 1, day, 7)
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    const dataMarket = await MarketCollection.find({
      event: "OrderCreate",
      timestamp: {
        $gte: date,
        $lt: tomorrow
      }
    }).toArray()

    return {
      totalBox: dataMarket.length,
      goldBox: FilterDataTypeBox(dataMarket, typeBox.gold),
      platiumBox: FilterDataTypeBox(dataMarket, typeBox.platinum),
      diamondBox: FilterDataTypeBox(dataMarket, typeBox.diamond)
    }
  } catch (error) {
    throw error
  }
}

export const getMarketCap = async (parent: any, args: any) => {
  try {
    const { day, month, year } = args
    const date = new Date(year, month - 1, day, 7)
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    const dataComfirmed = await MarketCollection.find({
      event: "OrderConfirmed",
      timestamp: {
        $gte: date,
        $lt: tomorrow
      }
    }).toArray()

    return {
      totalBox: TotalBalance(dataComfirmed),
      goldBox: TotalBalance(dataComfirmed.filter((data: any) => data.typeBox === typeBox.gold)),
      platiumBox: TotalBalance(dataComfirmed.filter((data: any) => data.typeBox === typeBox.platinum)),
      diamondBox: TotalBalance(dataComfirmed.filter((data: any) => data.typeBox === typeBox.diamond)),
    }
  } catch (error) {
    throw error
  }
}

const TotalBalance = (dataBlock: any) => {
  if (dataBlock.length === 0) return 0
  const data = dataBlock.map((item: any) => item.price.toString())
  const totalData = data.reduce((pre: any, cur: any) => new BN(pre).add(new BN(cur)), 0)
  const formatted = Web3.fromWei(totalData, "ether")
  return Number(formatted)
}

const FilterDataTypeBox = (data: any, box: string) => {
  const dataBox = data.filter((data: any) => data.typeBox === box).length
  return dataBox
}