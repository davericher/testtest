import React from 'react'
import {DelButton, DeleteWrapper} from '../styles/Elements'

const DeleteButton = props => {
  return (
    <DeleteWrapper {...props}>
      <DelButton>&#10006;</DelButton>
    </DeleteWrapper>
  )
}

export default DeleteButton
