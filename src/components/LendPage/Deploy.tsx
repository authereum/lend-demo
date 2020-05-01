import React, { FunctionComponent } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import GradientButton from '../GradientButton'

const useStyles = makeStyles(() => ({
  root: {

  }
}))

type DeployProps = {
  deploy: any
}

const Deploy: FunctionComponent<DeployProps> = ({ deploy }) => {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <Grid container direction="column" spacing={10}>
        <Grid item>
          <Typography variant="h3" color="primary">
            Deploy Maker Proxy to get started
          </Typography>
        </Grid>
        <Grid item>
          <GradientButton onClick={deploy} label="Deploy" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Deploy