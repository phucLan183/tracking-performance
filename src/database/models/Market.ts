import { IndexDescription, Decimal128 } from "mongodb";

export interface Market {
  blockId: string
  blockNumber: number
  orderId: number
  typeBox: string
  event: string
  timestamp: Date
  contractNft?: string
  currency?: Decimal128
  creator?: string
  nftId?: number
  timeEnd?: Date
  currentPrice?: Decimal128
  spotPrice?: Decimal128
  buyer?: string
  price?: Decimal128
  fee?: Decimal128
  bidder?: string
}

export const MarketIndexes: IndexDescription[] = [
  { key: { blockId: 1 }, unique: true, background: true },
  { key: { blockNumber: 1 }, background: true },
  { key: { event: 1 }, background: true },
  { key: { typeBox: 1 }, background: true },
  { key: { orderId: 1 }, background: true },
  { key: { timestamp: 1 }, background: true },
]