import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Box {
    totalBox: Float
    goldBox: Float
    platiumBox: Float
    diamondBox: Float
  }

  type Query {
    getBoxAlreadySold(day: Int!, month: Int!, year: Int!): Box
    getSubmitSellOrder(day: Int!, month: Int!, year: Int!): Box
    getMarketCap(day: Int!, month: Int!, year: Int!): Box
  }
`