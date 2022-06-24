import { Button, useModal } from 'peronio-uikit'
import React from 'react'
import { ReactElement } from 'react-markdown'
import Content from './ModalContent'
import '../styles.css'

interface QuickPeronio {
  title: string
  children: ReactElement | string
}

const QuickModal: React.FC<QuickPeronio> = (): ReactElement => {
  const [openModal] = useModal(<Content Title="Quick Peronio" />)
  return (
    <div>
      <Button onClick={openModal}>Quick</Button>
    </div>
  )
}

export default QuickModal
