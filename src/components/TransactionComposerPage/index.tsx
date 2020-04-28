import React, { FunctionComponent, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

import ContractTransactionForm from './ContractTransactionForm'
import {
  TransactionComposerContext,
  TransactionComposerProvider
} from './TransactionComposerContext'

const useStyles = makeStyles(() => ({
  root: {
    margin: '15% 0',
    textAlign: 'center'
  },
  textField: {
    width: '35.0rem'
  }
}))

const TransactionComposerContent: FunctionComponent<{}> = () => {

  const { dispatch } = useContext(TransactionComposerContext)

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
          <ContractTransactionForm />
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
