import React, { FunctionComponent } from 'react'
import HeroMessage from '../../common/HeroMessage'

const HomePage: FunctionComponent<{}> = () => {
  return (
    <HeroMessage message="Compose a transaction" />
  )
}

export default HomePage