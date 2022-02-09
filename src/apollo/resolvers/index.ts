import { getBoxAlreadySold, getSubmitSellOrder, getMarketCap } from '../resolvers/Queries'

export const resolvers = {
  Query:{
    getBoxAlreadySold,
    getSubmitSellOrder,
    getMarketCap
  }
}