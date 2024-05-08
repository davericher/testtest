import React from 'react'
import {AddCardLink} from '../styles/Base'

const AddCardLinkComponent = ({onClick, t, laneId}) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  }

  return <AddCardLink onClick={handleClick}>{t('Click to add card')}</AddCardLink>
}

export default AddCardLinkComponent