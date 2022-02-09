import { config } from "dotenv";
config()

if (!process.env.PORT) throw new Error("PORT must be provided")
export const PORT = process.env.PORT

if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be provided")
export const MONGO_URI = process.env.MONGO_URI

if (!process.env.WEB3_PROVIDER) throw new Error("WEB3_PROVIDER must be provided")
export const WEB3_PROVIDER = process.env.WEB3_PROVIDER

if (!process.env.ADDRESS_MARKET) throw new Error("ADDRESS_MARKET must be provided")
export const ADDRESS_MARKET = process.env.ADDRESS_MARKET

if (!process.env.ADDRESS_BOX1) throw new Error("ADDRESS_BOX1 must be provided")
export const ADDRESS_BOX1 = process.env.ADDRESS_BOX1

if (!process.env.ADDRESS_BOX2) throw new Error("ADDRESS_BOX2 must be provided")
export const ADDRESS_BOX2 = process.env.ADDRESS_BOX2

// if (!process.env.ADDRESS_BOX3) throw new Error("ADDRESS_BOX3 must be provided")
// export const ADDRESS_BOX3 = process.env.ADDRESS_BOX3

if (!process.env.START_BLOCK) throw new Error("STARTBLOCK must be provided")
export const START_BLOCK = Number(process.env.START_BLOCK)

if (!process.env.STEP_BLOCK) throw new Error("STEPBLOCK must be provided")
export const STEP_BLOCK = Number(process.env.STEP_BLOCK)