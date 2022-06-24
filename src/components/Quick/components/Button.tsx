import React from 'react'
import { ReactElement } from 'react-markdown'
import './button.css'

const STYLES = [
  'btn--primary--solid',
  'btn--warning--solid',
  'btn--danger--solid',
  'btn--success--solid',
  'btn--primary--outline',
  'btn--warning--outline',
  'btn--danger--outline',
  'btn--success--outline',
]

const SIZES = ['btn--medium', 'btn--large']

interface IButton {
  children: string | ReactElement | ReactElement[] | string[] | any
  type: JSX.IntrinsicElements['button']['type']
  onClick: () => void
  buttonStyle: string
  buttonSize: string
}

export const Button = ({ children, type, onClick, buttonStyle, buttonSize }: IButton) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
