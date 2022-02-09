import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Order {
    _id: String
    addressFrom: String
    addressTo: String
    value: String
    timestamp: Float
  }

  type BoxAlreadySold {
    totalBox: Int
    goldBox: Int,
    platiumBox: Int
    diamondBox: Int
  }

  type SubmitSellOrder {
    totalSubmitBox: Int
    goldSubmitBox: Int
    platiumSubmitBox: Int
    diamondSubmitBox: Int
  }

  type MarketCap {
    totalMarketCap: String
    goldBox: String
    platiumBox: String
    diamondBox: String
  }

  type Query {
    getBoxAlreadySold(day: Int!, month: Int!, year: Int!): BoxAlreadySold
    getSubmitSellOrder(address: String!, day: Int!, month: Int!, year: Int!): SubmitSellOrder
    getMarketCap(day: Int!, month: Int!, year: Int!): MarketCap
  }
`