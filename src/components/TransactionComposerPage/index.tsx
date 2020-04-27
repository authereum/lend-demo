import React, { FunctionComponent } from 'react'
import { utils as ethersUtils } from 'ethers'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { useEthers, useAuthereumProvider } from '../../hooks'

const useStyles = makeStyles(() => ({
  root: {
    margin: '15% 0',
    textAlign: 'center'
  }
}))


const TransactionComposerPage: FunctionComponent<{}> = () => {
  const provider = useAuthereumProvider()

  const encoder = ethersUtils.defaultAbiCoder
  

  const sendTransaction = () => {
    provider.sendTransaction({
      to: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
      value: '0'
    })
  }

  const styles = useStyles()
  return (
    <div className={styles.root}>
      <Typography variant="body1" color="primary">
        <Button variant="outlined" onClick={sendTransaction}>
          Send Transaction
        </Button>
      </Typography>
    </div>
  )
}

export default TransactionComposerPage
