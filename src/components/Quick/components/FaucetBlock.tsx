import React from 'react'
import { useTheme } from 'styled-components'
import { Button } from './Button'
import { AddToken } from './AddToken'
import usdcImage from '../../../assets/usdc.png'
import peImage from '../../../assets/pe.png'

async function linkToBeta() {
  window.location.href = 'https://beta.peronio.ar'
}

export const FaucetBlock = () => {
  const { isDark } = useTheme()

  return (
    <div>
      <AddToken address="0xc2768beF7a6BB57F0FfA169a9ED4017c09696FF1" symbol="PE" decimals={6} image={peImage} />
      <br />
      <AddToken address="0x2791bca1f2de4661ed88a30c99a7a9449aa84174" symbol="USDC" decimals={6} image={usdcImage} />
      <br />
      <Button
        type="button"
        buttonStyle={isDark ? 'btn--primary--outline' : 'btn--success--outline'}
        buttonSize="btn--large"
        onClick={linkToBeta}
      >
        Entrar a la Beta
      </Button>
    </div>
  )
}
