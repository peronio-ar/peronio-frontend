import React from 'react'
import { Text } from 'peronio-uikit'
import { useTheme } from 'styled-components'
import { Button } from './Button'
import { FaucetBlock } from './FaucetBlock'

const requiredNetwork = 137

export const OnBoarding = ({ addr, chainId }) => {
  return (
    <div>
      <Text>Tu direccion: {addr}</Text>
      <div>
        {chainId === requiredNetwork ? (
          <FaucetBlock />
        ) : (
          <>
            <NotPolygon />
            <Text>Red actual: {chainId} </Text>
          </>
        )}
      </div>
    </div>
  )
}

const NotPolygon = () => {
  const { isDark } = useTheme()
  return (
    <div>
      <Text>Necesitas utilizar la red de Polygon</Text>
      <Button
        buttonStyle={isDark ? 'btn--primary--outline' : 'btn--success--outline'}
        buttonSize="btn--large"
        onClick={changeNetwork}
        type={undefined}
      >
        Cambiar a Red Polygon
      </Button>
    </div>
  )
}

const changeNetwork = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x89', // A 0x-prefixed hexadecimal string
            chainName: 'Polygon',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC', // 2-6 characters long
              decimals: 18,
            },
            rpcUrls: ['https://polygon-mainnet.infura.io/v3/2343217699c44b45851935789f1f89e6'],
            blockExplorerUrls: ['https://polygonscan.com'],
            iconUrls: ['https://cryptologos.cc/logos/polygon-matic-logo.png?v=014'],
          },
        ], // chainId must be in hexadecimal numbers
      })
    } catch (error) {
      console.error(error)
    }
  }
}
