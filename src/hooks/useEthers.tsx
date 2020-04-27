import * as ethers from 'ethers'
import Authereum from 'authereum'
import { createContext, useContext } from 'react'

const authereum = new Authereum('mainnet')
const provider = authereum.getProvider()

const AuthereumProviderContext = createContext(provider)

const useAuthereumProvider = () => useContext(AuthereumProviderContext)

const ethersProvider = new ethers.providers.Web3Provider(provider)

const EthersContext = createContext(ethersProvider)

const useEthers = () => useContext(EthersContext)

export default EthersContext
export { useEthers, useAuthereumProvider }
