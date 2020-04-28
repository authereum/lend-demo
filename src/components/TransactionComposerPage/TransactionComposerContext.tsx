import React, {
  Dispatch,
  FunctionComponent,
  useReducer,
  createContext
} from 'react'
import * as ethers from 'ethers'
import { useAuthereumProvider } from '../../hooks'
import Address from '../../models/Address'

interface Action {
  type: string
  payload?: any;
}

interface ContractTransactionFormState {
  to: string
  functionSignature: string
  inputs: string
}

interface TransactionComposerState {
  contractTransaction: ContractTransactionFormState,
  provider: any
}

interface IContextProps {
  state: TransactionComposerState,
  dispatch: Dispatch<Action>
}

const TransactionComposerContext = createContext({} as IContextProps)

const initialState: ContractTransactionFormState ={
  to: "0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667",
  functionSignature: "tokenToTokenSwapInput(uint256 tokens_sold, uint256 min_tokens_bought, uint256 min_eth_bought, uint256 deadline, address token_addr)",
  inputs: "1000000000000000000,4000000000,1,1597957824,0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"
}

const reducer = (state: TransactionComposerState, action: Action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        contractTransaction: {
          ...state.contractTransaction,
          ...action.payload
        }
      }
    case 'sendTransaction':
      state.provider.sendTransaction(
        formatTransaction(state.contractTransaction)
      )
      return state
    default:
      throw new Error(`Unrecognized action ${action.type}`)
  }
}

const encodeTransactionData = (state: ContractTransactionFormState): any => {
  if (!state.functionSignature || state.functionSignature === '') {
    throw new Error('Missing function signature')
  }

  // Create an Ethers Interface for the function signature
  const iface = new ethers.utils.Interface([state.functionSignature])
  const functionName = state.functionSignature.substr(0, state.functionSignature.indexOf('('))

  // Parse comma separated inputs
  let inputs: string[] = []
  if (state.inputs && state.inputs.length > 0) {
    inputs = state.inputs.trim().split(',')
  }

  // Encode transaction parameters
  const data = iface.functions[functionName].encode(inputs)
  return data
}

const formatTransaction = (state: ContractTransactionFormState): any => {
  let transaction
  try {
    transaction = {
      to: (new Address(state.to)).toString(),
      data: encodeTransactionData(state),
      value: '0'
    }
  } catch (err) {
    console.error(err)
    throw new Error('An error occurred while formatting the transaction')
  }

  return transaction
}

const TransactionComposerProvider: FunctionComponent<{}> = ({ children }) => {
  const provider = useAuthereumProvider()

  const [state, dispatch] = useReducer(reducer, {
    contractTransaction: initialState,
    provider
  })

  return (
    <TransactionComposerContext.Provider value={{ state, dispatch }}>
      { children }
    </TransactionComposerContext.Provider>
  )
}

export { TransactionComposerContext, TransactionComposerProvider }
