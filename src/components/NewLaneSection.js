import React from 'react'
import {NewLaneSection} from '../styles/Base'
import {AddLaneLink} from '../styles/Elements'

const NewLaneSectionComponent = ({t, onClick}) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  }

  return (
    <NewLaneSection>
      <AddLaneLink t={t} onClick={handleClick}>
        {t('Add another lane')}
      </AddLaneLink>
    </NewLaneSection>
  )
}

export default NewLaneSectionComponent