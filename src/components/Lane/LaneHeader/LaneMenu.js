import React from 'react'

import {Popover} from 'react-popopo'

import {CustomPopoverContainer, CustomPopoverContent} from '../../../styles/Base'

import {
  DeleteWrapper,
  GenDelButton,
  LaneMenuContent,
  LaneMenuHeader,
  LaneMenuItem,
  LaneMenuTitle,
  MenuButton
} from '../../../styles/Elements'

const LaneMenu = ({t, onDelete}) => {
  const handleDelete = event => {
    event.preventDefault()
    onDelete()
  }
console.log(  DeleteWrapper,
  GenDelButton,
  LaneMenuContent,
  LaneMenuHeader,
  LaneMenuItem,
  LaneMenuTitle,
  MenuButton);
  return (
    <Popover
      position="bottom"
      PopoverContainer={CustomPopoverContainer}
      PopoverContent={CustomPopoverContent}
      trigger={<MenuButton>⋮</MenuButton>}>
      <LaneMenuHeader>
        <LaneMenuTitle>{t('Lane actions')}</LaneMenuTitle>
        <DeleteWrapper>
          <GenDelButton onClick={handleDelete}>&#10006;</GenDelButton>
        </DeleteWrapper>
      </LaneMenuHeader>
      <LaneMenuContent>
        <LaneMenuItem onClick={handleDelete}>{t('Delete lane')}</LaneMenuItem>
      </LaneMenuContent>
    </Popover>
  )
}

export default LaneMenu
