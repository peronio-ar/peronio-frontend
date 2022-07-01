import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { Button } from './Button'

export const AddToken = ({ address, symbol, decimals, image }) => {
  const { isDark } = useTheme()
  const [addedToken, setAddedToken] = useState(false)
  const handleAddToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address, // The address that the token is at.
            symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals, // The number of decimals in the token
            image, // A string url of the token logo
          },
        },
      })

      if (wasAdded !== null) {
        setAddedToken(true)
      } else {
        console.error('Tenes que aceptar en Metamask')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {!addedToken ? (
        <Button
          type="button"
          buttonStyle={isDark ? 'btn--primary--outline' : 'btn--success--outline'}
          buttonSize="btn--large"
          onClick={handleAddToken}
        >
          Agregar {symbol} a Metamask
        </Button>
      ) : (
        <div>Token ({symbol}) agregado a Metamask!</div>
      )}
    </>
  )
}
