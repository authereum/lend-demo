import React, { FunctionComponent } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import GradientButton from '../GradientButton'

const useStyles = makeStyles(() => ({
  root: {

  },
  balance: {

  },
  eth: {

  }
}))

type ReclaimProps = {
  reclaim: any
}

const Reclaim: FunctionComponent<ReclaimProps> = ({ reclaim }) => {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <Grid container direction="column" spacing={10}>
        <Grid item>
          <Typography variant="h3" color="primary">
            You’re earning 💪
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h1" color="primary">
            <span className={styles.balance}>0.23</span> <span className={styles.eth}>ETH</span>
          </Typography>
        </Grid>
        <Grid item>
          <GradientButton onClick={reclaim} label="Reclaim" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Reclaim