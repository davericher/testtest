import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CardForm, CardHeader, CardRightContent, CardTitle, CardWrapper, Detail } from '../styles/Base'
import { AddButton, CancelButton } from '../styles/Elements'
import EditableLabel from '../widgets/EditableLabel'

const NewCardForm = ({ onCancel, onAdd, t }) => {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    onAdd({ title, label, description });
  }

  return (
    <CardForm>
      <CardWrapper>
        <CardHeader>
          <CardTitle>
            <EditableLabel
              placeholder={t('placeholder.title')}
              onChange={val => setTitle(val)}
              autoFocus
            />
          </CardTitle>
          <CardRightContent>
            <EditableLabel placeholder={t('placeholder.label')} onChange={val => setLabel(val)} />
          </CardRightContent>
        </CardHeader>
        <Detail>
          <EditableLabel
            placeholder={t('placeholder.description')}
            onChange={val => setDescription(val)}
          />
        </Detail>
      </CardWrapper>
      <AddButton onClick={handleAdd}>{t('button.Add card')}</AddButton>
      <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
    </CardForm>
  )
}

NewCardForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default NewCardForm