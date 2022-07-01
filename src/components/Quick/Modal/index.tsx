import { Button, useModal } from 'peronio-uikit'
import React from 'react'
import { ReactElement } from 'react-markdown'
import '../styles.css'
import Content from './ModalContent'

interface QuickPeronio {
  title: string
  children: ReactElement | string
}

const QuickModal: React.FC<QuickPeronio> = (): ReactElement => {
  const [openModal] = useModal(<Content Title="Guia Rapida Peronio" />)
  return <Button onClick={openModal}>Quick</Button>
}

export default QuickModal
