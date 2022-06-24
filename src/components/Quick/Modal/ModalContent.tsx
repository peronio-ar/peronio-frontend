import { Modal, Button } from 'peronio-uikit'
import logo from 'assets/logo.png'
import React, { useState, useEffect } from 'react'
import { OnBoarding } from '../components/OnBoarding'

const Content = ({ Title }) => {
  const { ethereum } = window
  const [addr, setAddr] = useState('')
  const [chainId, setChainId] = useState(0)
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
    <Modal title={Title}>
      <img alt="Peronio Logo" src={logo} className="logo" />
      <h1>Como arrancar?</h1>
      {ethereum && (
        <>
          <h3>Tenes Metamask instalado!</h3>
          <div>
            <p>Tu billetera vive en el explorador, podes acceder a ella desde el ícono arriba a la derecha</p>
            {!addr ? <p>Hacé click en Conectar a Metamask</p> : 'Ya estas conectado!'}
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
        <p>
          <h1>Seguí estos pasos</h1>
          <p>Recomendamos hacerlo en una computadora</p>
          <h3>Primero bajate Metamask</h3>
          <div>
            <a target="blank" href="https://metamask.io/">
              Descargar Metamask
            </a>
          </div>
          <p>Configurá la billetera y refrescá esta página</p>
        </p>
      )}
    </Modal>
  )
}

export default Content
