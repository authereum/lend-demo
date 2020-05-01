import React, { FunctionComponent, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import * as ethers from 'ethers'
import GradientButton from '../GradientButton'
import Deploy from './Deploy'
import Lend from './Lend'
import Reclaim from './Reclaim'
import { useEthers, useAuthereumProvider } from '../../hooks'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '15.0rem',
    textAlign: 'center'
  }
}))

const LendPage: FunctionComponent<{}> = () => {
  const provider = useAuthereumProvider()
  const ethersProvider = useEthers()

  const GAS_LIMIT = '700000'

  const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'
  const daiInterface = new ethers.utils.Interface(['approve(address _spender, uint256 _value)'])

  const makerProxyFactoryAddress = '0x4678f0a6958e4d2bc4f1baf7bc52e8f3564f3fe4'
  const makerProxyFactoryInterface = new ethers.utils.Interface(['build()'])

  const makerImplementationAddress = '0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038'
  const makerInterface = new ethers.utils.Interface([
    'event NewCdp(address indexed usr, address indexed own, uint256 indexed cdp)',
    'openLockETHAndDraw(address manager,address jug,address ethJoin,address daiJoin,bytes32 ilk,uint256 wadD)',
    'wipeAllAndFreeETH(address manager, address ethJoin, address daiJoin, uint cdp, uint wadC)'
  ])
  const makerManagerAddress = '0x5ef30b9986345249bc32d8928B7ee64DE9435E39'
  const makerJugAddress = '0x19c0976f590D67707E62397C87829d896Dc0f1F1'
  const makerEthJoinAddress = '0x2F0b23f53734252Bda2277357e97e1517d6B042A'
  const makerDaiJoinAddress = '0x9759A6Ac90977b93B58547b4A71c78317f391A28'
  const makerIlk = '0x4554482d41000000000000000000000000000000000000000000000000000000'

  const makerProxyInterface = new ethers.utils.Interface(['execute(address _target, bytes _data)'])

  const cDaiAddress = '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643'
  const cDaiInterface = new ethers.utils.Interface([
    'mint(uint256)',
    'redeemUnderlying(uint256)'
  ])

  const ethLendAmount = ethers.utils.parseEther('0.23').toString()
  const daiLendAmount = ethers.utils.parseEther('20').toString()

  const [makerProxy, setMakerProxy] = useState(window.localStorage.getItem('makerProxy'))
  const [makerCDPNumber, setMakerCDPNumber] = useState(window.localStorage.getItem('makerCpdNumber'))

  const deployProxy = async () => {
    console.log('deployProxy')
    const data = makerProxyFactoryInterface.functions.build.encode([])

    await provider.sendTransaction({
      to: makerProxyFactoryAddress,
      data: data,
      value: '0',
      gasLimit: GAS_LIMIT
    })
  }

  const setCdpNumberForTxHash = async (txHash: string) => {
    const receipt = await ethersProvider.getTransactionReceipt(txHash)
    let cdpNumber: string = ''
    receipt.logs?.forEach( log => {
      const event = makerInterface.parseLog(log)
      if (event) {
        cdpNumber = event.values.cdp.toString()
      }
    })
    window.localStorage.setItem('makerCpdNumber', cdpNumber)
    setMakerCDPNumber(cdpNumber)
  }
  (window as any).getCdp = setCdpNumberForTxHash

  const lend = async () => {
    console.log('lend')

    // Open Vault and withdraw DAI

    const openVaultData = makerInterface.functions.openLockETHAndDraw.encode([
      makerManagerAddress,
      makerJugAddress,
      makerEthJoinAddress,
      makerDaiJoinAddress,
      makerIlk,
      daiLendAmount
    ])

    const openVaultProxyData = makerProxyInterface.functions.execute.encode([
      makerImplementationAddress,
      openVaultData
    ])

    const openVaultTransaction = {
      to: makerProxy,
      data: openVaultProxyData,
      value: ethLendAmount,
      gasLimit: GAS_LIMIT
    }

    // Approve DAI to cDAI contract

    const approveDaiData = daiInterface.functions.approve.encode([
      cDaiAddress,
      daiLendAmount
    ])

    const approveDaiTransaction = {
      to: daiAddress,
      data: approveDaiData,
      value: '0',
      gasLimit: GAS_LIMIT
    }

    // Lend DAI to Compound (Mint cDAI)

    const mintCDaiData = cDaiInterface.functions.mint.encode([
      daiLendAmount
    ])

    const mintCDaiTransaction = {
      to: cDaiAddress,
      data: mintCDaiData,
      value: '0',
      gasLimit: GAS_LIMIT
    }

    // Send Authereum batched transaction

    const tx = await provider.sendTransactionBatch([
      openVaultTransaction,
      approveDaiTransaction,
      mintCDaiTransaction
    ])

    // Save CDP number


  }

  const reclaim = async () => {
    console.log('reclaim')

    // Redeem cDAI for DAI

    const redeemCDaiData = cDaiInterface.functions.redeemUnderlying.encode([
      daiLendAmount
    ])

    const redeemCDaiTransaction = {
      to: cDaiAddress,
      data: redeemCDaiData,
      value: '0',
      gasLimit: GAS_LIMIT
    }

    // Approve DAI to Maker Proxy

    const approveDaiData = daiInterface.functions.approve.encode([
      cDaiAddress,
      daiLendAmount
    ])

    const approveDaiTransaction = {
      to: daiAddress,
      data: approveDaiData,
      value: '0',
      gasLimit: GAS_LIMIT
    }

    // Pay back DAI to Maker and withdraw ETH

    const closeVaultData = makerInterface.functions.wipeAllAndFreeETH.encode([
      makerManagerAddress,
      makerEthJoinAddress,
      makerDaiJoinAddress,
      makerCDPNumber,
      ethLendAmount
    ])

    const closeVaultProxyData = makerProxyInterface.functions.execute.encode([
      makerImplementationAddress,
      closeVaultData
    ])

    const closeVaultTransaction = {
      to: makerProxy,
      data: closeVaultProxyData,
      value: '0',
      gasLimit: GAS_LIMIT
    }

    // Send Authereum batched transaction

    await provider.sendTransactionBatch([
      redeemCDaiTransaction,
      approveDaiTransaction,
      closeVaultTransaction
    ])
  }

  const styles = useStyles()

  if (!makerProxy) {
    return (
      <div className={styles.root}>
        <Deploy deploy={deployProxy} />
      </div>
    )
  } else if (!makerCDPNumber) {
    return (
      <div className={styles.root}>
        <Lend lend={lend} />
      </div>
    )
  } else {
    return (
      <div className={styles.root}>
        <Reclaim reclaim={reclaim} />
      </div>
    )
  }
}


export default LendPage
