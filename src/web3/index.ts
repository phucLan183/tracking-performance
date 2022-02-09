import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { ABI_MARKET } from './abi/market'
import { ABI_BOX1 } from './abi/box1'
import { ABI_BOX2 } from './abi/box2'
import { ABI_BOX3 } from './abi/box3'
import { ADDRESS_MARKET, ADDRESS_BOX1, ADDRESS_BOX2} from '../config'

export let web3: Web3
export let MarketContract: Contract
export let Box1Contract: Contract
export let Box2Contract: Contract

export const connectWeb3 = async (provider: string) => {
  try {
    web3 = new Web3(new Web3.providers.HttpProvider(provider))
    MarketContract = new web3.eth.Contract(ABI_MARKET, ADDRESS_MARKET)
    Box1Contract = new web3.eth.Contract(ABI_BOX1, ADDRESS_BOX1)
    Box2Contract = new web3.eth.Contract(ABI_BOX2, ADDRESS_BOX2)
    if (web3) console.log('Connect to web3');
  } catch (error) {
    throw error
  }
}

