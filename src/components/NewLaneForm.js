import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { LaneTitle, NewLaneButtons, Section } from '../styles/Base'
import { AddButton, CancelButton } from '../styles/Elements'
import NewLaneTitleEditor from '../widgets/NewLaneTitleEditor'
import {v1} from 'uuid'

const NewLane = ({ onCancel, onAdd, t }) => {
  const refInput = useRef(null);

  const handleSubmit = () => {
    onAdd({
      id: v1(),
      title: getValue()
    })
  }

  const getValue = () => refInput.current.getValue()

  const onClickOutside = () => {
    if (getValue().length > 0) {
      handleSubmit()
    } else {
      onCancel()
    }
  }

  return (
    <Section>
      <LaneTitle>
        <NewLaneTitleEditor
          ref={refInput}
          placeholder={t('placeholder.title')}
          onCancel={onCancel}
          onSave={handleSubmit}
          resize="vertical"
          border
          autoFocus
        />
      </LaneTitle>
      <NewLaneButtons>
        <AddButton onClick={handleSubmit}>{t('button.Add lane')}</AddButton>
        <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
      </NewLaneButtons>
    </Section>
  )
}

NewLane.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default NewLane