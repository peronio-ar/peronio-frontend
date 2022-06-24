import React from 'react'
import { Button } from './Button'
import { FaucetBlock } from './FaucetBlock'

const requiredNetwork = 137

export const OnBoarding = ({ addr, chainId }) => {
  return (
    <div>
      <p>Tu direccion: {addr}</p>
      <div>
        {chainId === requiredNetwork ? (
          <FaucetBlock />
        ) : (
          <>
            <NotPolygon />
            <p>Red actual: {chainId} </p>
          </>
        )}
      </div>
    </div>
  )
}

const NotPolygon = () => {
  return (
    <div>
      <p>Necesitas utilizar la red de Polygon</p>
      <Button buttonStyle="btn--primary--outline" buttonSize="btn--large" onClick={changeNetwork} type={undefined}>
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
