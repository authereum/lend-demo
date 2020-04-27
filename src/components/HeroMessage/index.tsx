import React, { FunctionComponent } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  root: {
    margin: '15% 0',
    textAlign: 'center'
  }
}))

type HeroMessageProps = {
  message: string
}

const HeroMessage: FunctionComponent<HeroMessageProps> = ({ message }) => {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <Typography variant="body1" color="primary">
        {message}
      </Typography>
    </div>
  )
}

export default HeroMessage
