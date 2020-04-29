import React, {
  FunctionComponent,
  useContext,
  ChangeEvent
} from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import { TransactionComposerContext } from './TransactionComposerContext'

const useStyles = makeStyles(() => ({
  root: {
  },
  textField: {
    width: '55.0rem'
  }
}))

interface ContractTransactionFormProps {
  index: number
}

const ContractTransactionForm: FunctionComponent<ContractTransactionFormProps> = ({ index }) => {
  const { state, dispatch } = useContext(TransactionComposerContext)

  const updateField = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'update',
      payload: {
        index,
        update: {
          [e.target.name]: e.target.value
        }
      }
    })
  }

  const styles = useStyles()
  const contractTransaction = state.contractTransactions[index]
  return (
    <div className={styles.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3" color="primary">
            Transaction [{index}]
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            className={styles.textField}
            name="to"
            label="To"
            value={contractTransaction.to}
            onChange={updateField}
          />
        </Grid>
        <Grid item>
          <TextField
            className={styles.textField}
            name="functionSignature"
            label="Function signature"
            value={contractTransaction.functionSignature}
            onChange={updateField}
          />
        </Grid>
        <Grid item>
          <TextField
            className={styles.textField}
            name="inputs"
            label="Inputs"
            value={contractTransaction.inputs}
            onChange={updateField}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default ContractTransactionForm
