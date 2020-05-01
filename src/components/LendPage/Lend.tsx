import React, { FunctionComponent, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import * as ethers from 'ethers'
import GradientButton from '../GradientButton'
import { useEthers, useAuthereumProvider } from '../../hooks'

const useStyles = makeStyles(() => ({
  root: {

  },
  balance: {

  },
  eth: {

  }
}))

type LendProps = {
  lend: any
}

const Lend: FunctionComponent<LendProps> = ({ lend }) => {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <Grid container direction="column" spacing={10}>
        <Grid item>
          <Typography variant="h3" color="primary">
            Lend your ETH to earn interest
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h1" color="primary">
            <span className={styles.balance}>0.23</span> <span className={styles.eth}>ETH</span>
          </Typography>
        </Grid>
        <Grid item>
          <GradientButton onClick={lend} label="Lend" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Lend