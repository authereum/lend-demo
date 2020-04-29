import React, { FunctionComponent, useContext, ChangeEvent } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import times from 'lodash.times'

import ContractTransactionForm from './ContractTransactionForm'
import {
  TransactionComposerContext,
  TransactionComposerProvider
} from './TransactionComposerContext'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '5.0rem',
    textAlign: 'center'
  }
}))

const TransactionComposerContent: FunctionComponent<{}> = () => {
  const { state, dispatch } = useContext(TransactionComposerContext)

  const setTransactionCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setTransactionCount',
      payload: e.target.value
    })
  }
  const sendTransaction = () => { dispatch({ type: 'sendTransaction' }) }

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3" color="primary">
            Compose your transaction
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Number of transactions"
            value={state.transactionCount}
            onChange={setTransactionCount}
          />
        </Grid>
        <Grid item>
          { times(parseInt(state.transactionCount), (index) =>
            <ContractTransactionForm index={index} key={index}/>
          )}
          
          {/* { state.contractTransactions.map( (_, index) => 
            <ContractTransactionForm index={index} key={index}/>
          )} */}
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={sendTransaction}>
            Send Transaction
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

const TransactionComposerPage: FunctionComponent<{}> = () => {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <TransactionComposerProvider>
        <TransactionComposerContent />
      </TransactionComposerProvider>
    </div>
  )
}

export default TransactionComposerPage
