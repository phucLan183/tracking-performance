import { IndexDescription } from "mongodb";

export interface OrderCreate {
  blockId: number
  blockNumber: number
  orderId: number
  contractNft: string
  currency: string
  creator: string
  timestamp: number
  nftId: number
  timeEnd: number
  currentPrice: number
  spotPrice: number
}

export interface OrderConfirmed {
  blockNumber: number
  orderId: number
  buyer: string
  price: number
  fee: number
  timestamp: number
}

export interface OrderCancel {
  blockNumber: number
  orderId: number
  timestamp: number
}

export const MarketIndexes: IndexDescription[] = [
  { key: { blockId: 1 }, unique: true, background: true },
  { key: { blockNumber: 1 }, background: true },
  { key: { orderId: 1 }, background: true },
  { key: { timestamp: 1 }, background: true },
]