import { Market } from '../../../database/mongodb';
import Web3 from 'web3-utils';
import BN from 'bn.js';

export const getBoxAlreadySold = async (parent: any, args: any) => {
  try {
    const { day, month, year } = args
    const date = new Date(year, month - 1, day, 7)
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    const dataComfirmed = await Market.find({
      event: "OrderConfirmed",
      timestamp: {
        $gte: date,
        $lt: tomorrow
      }
    }).toArray()

    return {
      totalBox: dataComfirmed.length,
      goldBox: dataComfirmed.filter((item: any) => item.typeBox === '0').length,
      platiumBox: dataComfirmed.filter((item: any) => item.typeBox === '1').length,
      diamondBox: dataComfirmed.filter((item: any) => item.typeBox === '2').length,
    }
  } catch (error) {
    throw error
  }
}

export const getSubmitSellOrder = async (parent: any, args: any) => {
  try {
    const { address, day, month, year } = args
    const date = new Date(year, month - 1, day, 7)
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    const dataMarket = await Market.find({
      event: "OrderCreate",
      timestamp: {
        $gte: date,
        $lt: tomorrow
      }
    }).toArray()

    return {
      totalSubmitBox: dataMarket.length,
      goldSubmitBox: dataMarket.filter((data: any) => data.typeBox === '0').length,
      platiumSubmitBox: dataMarket.filter((data: any) => data.typeBox === '1').length,
      diamondSubmitBox: dataMarket.filter((data: any) => data.typeBox === '2').length
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
    const dataComfirmed = await Market.find({
      event: "OrderConfirmed",
      timestamp: {
        $gte: date,
        $lt: tomorrow
      }
    }).toArray()
    
    return {
      totalMarketCap: TotalBalance(dataComfirmed),
      goldBox: TotalBalance(dataComfirmed.filter((data: any) => data.typeBox === '0')),
      platiumBox: TotalBalance(dataComfirmed.filter((data: any) => data.typeBox === '1')),
      diamondBox: TotalBalance(dataComfirmed.filter((data: any) => data.typeBox === '2')),
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
  return formatted
}