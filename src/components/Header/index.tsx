import React, {
  FunctionComponent,
  useState,
  useContext,
  createContext,
  MouseEvent
} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

import { useEthers, useAuthereumProvider } from '../../hooks'

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
  const styles = useStyles()
  const ethers = useEthers()
  const provider = useAuthereumProvider()

  const login = (e: MouseEvent) => {
    e.preventDefault()
    console.log('log in')
    provider.enable()
  }

  const getGasPrice = async () => {
    const gasPrice = await ethers.getGasPrice()

    console.log('gasPrice: ', gasPrice.toString())
  }

  getGasPrice()

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
        <Button variant="outlined" onClick={login}>
          Log in
        </Button>
      </Grid>
    </Grid>
  )
}

export default Header
