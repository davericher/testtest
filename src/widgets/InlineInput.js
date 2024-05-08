import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {InlineInput} from '../styles/Base'
import autosize from 'autosize'

const InlineInputController = ({onSave, border, placeholder, value, autoFocus, resize, onCancel}) => {
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState(value)

  // Effect for autosizing and initial autoFocus
  useEffect(() => {
    if (inputRef.current && resize !== 'none') {
      autosize(inputRef.current)
    }
    if (inputRef.current && autoFocus) {
      inputRef.current.focus()
    }
  }, [resize, autoFocus])

  // Effect to update value when props change
  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleFocus = e => e.target.select()

  const handleMouseDown = e => {
    if (document.activeElement !== e.target) {
      e.preventDefault()
      inputRef.current.focus()
    }
  }

  const handleBlur = () => {
    updateValue()
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      // Enter
      inputRef.current.blur()
      e.preventDefault()
    } else if (e.keyCode === 27) {
      // Escape
      setInputValue(value) // Reset to initial value
      inputRef.current.blur()
      e.preventDefault()
    } else if (e.keyCode === 9) {
      // Tab
      if (inputValue.length === 0) {
        onCancel()
      }
      inputRef.current.blur()
      e.preventDefault()
    }
  }

  const updateValue = () => {
    if (inputValue !== value) {
      onSave(inputValue)
    }
  }

  return (
    <InlineInput
      ref={inputRef}
      border={border}
      onMouseDown={handleMouseDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={inputValue.length === 0 ? undefined : placeholder}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      dataGramm="false"
      rows={1}
      autoFocus={autoFocus}
    />
  )
}

InlineInputController.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  border: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  resize: PropTypes.oneOf(['none', 'vertical', 'horizontal'])
}

InlineInputController.defaultProps = {
  onSave: () => {},
  onCancel: () => {},
  placeholder: '',
  value: '',
  border: false,
  autoFocus: false,
  resize: 'none'
}

export default InlineInputController
