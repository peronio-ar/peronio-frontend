import { Modal, Button, Image, Text } from 'peronio-uikit'
import logo from 'assets/logo.png'
import logoDark from 'assets/logo-black.png'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'styled-components'
import { OnBoarding } from '../components/OnBoarding'

const Content = ({ Title }) => {
  const { ethereum } = window
  const [addr, setAddr] = useState('')
  const [chainId, setChainId] = useState(0)
  const { isDark } = useTheme()
  const handleGetAcount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    setAddr(account)
    setChainId(parseInt(ethereum.chainId, 16))
  }

  useEffect(() => {
    if (ethereum) {
      setChainId(parseInt(ethereum.chainId, 16))

      // On account change
      ethereum.on('accountsChanged', (accounts: React.SetStateAction<string>[]) => {
        setAddr(accounts[0])
      })
      // On chain change
      ethereum.on('chainChanged', (_chainId: string) => {
        setChainId(parseInt(_chainId, 16))
      })
    }
  }, [ethereum])

  return (
    <Modal hideCloseButton title={Title}>
      <div>
        <Image alt="Peronio Logo" src={isDark ? logo : logoDark} width={700} height={300} />
        <Text>
          <h1>Como arrancar?</h1>
        </Text>
        {ethereum && (
          <>
            <Text>
              <h3>Tenes Metamask instalado!</h3>
            </Text>
            <div>
              <Text>Tu billetera vive en el explorador, podes acceder a ella desde el ícono arriba a la derecha</Text>
              {!addr ? <Text>Hacé click en Conectar a Metamask</Text> : <Text>Ya estas conectado!</Text>}
            </div>
            {!addr ? (
              <Button type="button" onClick={handleGetAcount}>
                Conectar a Metamask
              </Button>
            ) : (
              <OnBoarding addr={addr} chainId={chainId} />
            )}
          </>
        )}
        <br />
        {!ethereum && (
          <Text>
            <h1>Seguí estos pasos</h1>
            <p>Recomendamos hacerlo en una computadora</p>
            <h3>Primero bajate Metamask</h3>
            <div>
              <a target="blank" href="https://metamask.io/">
                Descargar Metamask
              </a>
            </div>
            <p>Configurá la billetera y refrescá esta página</p>
          </Text>
        )}
      </div>
    </Modal>
  )
}

export default Content
