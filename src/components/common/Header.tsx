import React, { FunctionComponent, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

import logo from '../../assets/authereum.svg'

const useStyles = makeStyles(() => ({
  root: {
    height: '8.0rem',
    padding: '0.0rem 3.5rem',
  },
  imgContainer: {
    position: 'relative',
  },
  img: {
    height: '3.4rem',
    position: 'absolute',
    top: '50%',
    // '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)'
  }
}))

const Header: FunctionComponent<{}> = () => {
  const styles = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={styles.root}
    >
      <Grid item>
        <a href="/" className={styles.imgContainer}>
          <img className={styles.img} src={logo} />
        </a>
      </Grid>
      <Grid item>
      </Grid>
    </Grid>
  )
}

export default Header