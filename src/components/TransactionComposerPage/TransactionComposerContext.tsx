import React, {
  Dispatch,
  FunctionComponent,
  useReducer,
  createContext
} from 'react'
import * as ethers from 'ethers'
import { useAuthereumProvider } from '../../hooks'
import Address from '../../models/Address'
import times from 'lodash.times'

interface Action {
  type: string
  payload?: any;
}

interface ContractTransactionFormState {
  to: string
  functionSignature: string
  inputs: string
  value: string
  transaction?: string
  error?: string
}

interface TransactionComposerState {
  transactionCount: string,
  contractTransactions: ContractTransactionFormState[],
  provider: any
}

interface IContextProps {
  state: TransactionComposerState,
  dispatch: Dispatch<Action>
}

export const TransactionComposerContext = createContext({} as IContextProps)

const initialState: ContractTransactionFormState = {
  to: "0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667",
  functionSignature: "tokenToTokenSwapInput(uint256 tokens_sold, uint256 min_tokens_bought, uint256 min_eth_bought, uint256 deadline, address token_addr)",
  inputs: "1000000000000000000,4000000000,1,1597957824,0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
  value: "0"
}

const reducer = (state: TransactionComposerState, action: Action) => {
  switch (action.type) {
    case 'update':
      return updateReducer(state, action)
    case 'sendTransaction':
      try {
        const transactions = state.contractTransactions.slice(0, parseInt(state.transactionCount))
        state.provider.sendTransactionBatch(transactions.map( contractTransactions =>
          formatTransaction(contractTransactions) 
        ))
      } catch (err) {
        console.error(err)
      }

      return state
    case 'setTransactionCount':
      let transactionCount
      if (action.payload) {
        const count = parseInt(action.payload)
        transactionCount = count.toString()
      }
      return {
        ...state,
        transactionCount
      } as TransactionComposerState
    default:
      throw new Error(`Unrecognized action ${action.type}`)
  }
}

const updateReducer = (state: TransactionComposerState, action: Action) => {
  let contractTransaction = state.contractTransactions[action.payload.index]
  contractTransaction = {
    ...contractTransaction,
    ...action.payload.update,
  }
  let formattedTransactionObject: Object
  try {
    formattedTransactionObject = {
      transaction: JSON.stringify(formatTransaction(contractTransaction), null, 2),
      error: undefined
    }
  } catch (err) {
    formattedTransactionObject = {
      transaction: undefined,
      error: err.message
    }
  }

  return {
    ...state,
    contractTransactions: state.contractTransactions.map( (contractTransactionFormState, index) => {
      if (index !== action.payload.index) {
        return contractTransactionFormState
      }

      return {
        ...contractTransactionFormState,
        ...action.payload.update,
        ...formattedTransactionObject
      } as ContractTransactionFormState
    })
  }
}

const encodeTransactionData = (state: ContractTransactionFormState): string => {
  if (!state.functionSignature || state.functionSignature === '') {
    return ''
  }

  // Create an Ethers Interface for the function signature
  const iface = new ethers.utils.Interface([state.functionSignature])
  const functionName = state.functionSignature.substr(0, state.functionSignature.indexOf('('))

  // Parse comma separated inputs
  let inputs: string[] = []
  if (state.inputs && state.inputs.length > 0) {
    inputs = state.inputs.replace(/\s/g,'').split(',')
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
      value: ethers.utils.parseEther(state.value).toString(),
      gasLimit: '700000'
    }
  } catch (err) {
    console.error(err)
    throw new Error('An error occurred while formatting the transaction')
  }

  return transaction
}

// const formatTransactionString = (transaction: any): string => {
//   let transactionString = `{\n`
//     transaction.keys.forEach()
//   transactionString += `}`
// }

export const TransactionComposerProvider: FunctionComponent<{}> = ({ children }) => {
  const provider = useAuthereumProvider()

  const [state, dispatch] = useReducer(reducer, {
    transactionCount: '2',
    contractTransactions: times(10, () => initialState),
    provider
  })

  return (
    <TransactionComposerContext.Provider value={{ state, dispatch }}>
      { children }
    </TransactionComposerContext.Provider>
  )
}
