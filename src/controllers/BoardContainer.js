import React, {useEffect, useState} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Container from '../dnd/Container'
import Draggable from '../dnd/Draggable'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import Lane from './Lane'
import {PopoverWrapper} from 'react-popopo'

import * as boardActions from '../actions/BoardActions'
import * as laneActions from '../actions/LaneActions'

const BoardContainer = ({
  id,
  components,
  data,
  reducerData,
  onDataChange,
  eventBusHandle,
  onLaneScroll,
  onCardClick,
  onBeforeCardDelete,
  onCardDelete,
  onCardAdd,
  onCardUpdate,
  onLaneClick,
  onLaneAdd,
  onLaneDelete,
  onLaneUpdate,
  editable,
  canAddLanes,
  laneStyle,
  onCardMoveAcrossLanes,
  t,
  ...otherProps
}) => {
  const [addLaneMode, setAddLaneMode] = useState(false)

  const groupName = `TrelloBoard${id}`

  useEffect(() => {
    actions.loadBoard(data)
    if (eventBusHandle) {
      wireEventBus()
    }
  }, [data])

  useEffect(() => {
    if (reducerData && !isEqual(reducerData, data)) {
      onDataChange(reducerData)
    }
  }, [reducerData])

  const onDragStart = ({payload}) => {
    handleLaneDragStart(payload.id)
  }

  const onLaneDrop = ({removedIndex, addedIndex, payload}) => {
    if (removedIndex !== addedIndex) {
      actions.moveLane({oldIndex: removedIndex, newIndex: addedIndex})
      handleLaneDragEnd(removedIndex, addedIndex, payload)
    }
  }

  const getCardDetails = (laneId, cardIndex) => {
    return reducerData.lanes.find(lane => lane.id === laneId).cards[cardIndex]
  }

  const getLaneDetails = index => {
    return reducerData.lanes[index]
  }

  const wireEventBus = () => {
    let eventBus = {
      publish: event => {
        switch (event.type) {
          case 'ADD_CARD':
            return actions.addCard({laneId: event.laneId, card: event.card})
          case 'UPDATE_CARD':
            return actions.updateCard({laneId: event.laneId, card: event.card})
          case 'REMOVE_CARD':
            return actions.removeCard({laneId: event.laneId, cardId: event.cardId})
          case 'REFRESH_BOARD':
            return actions.loadBoard(event.data)
          case 'MOVE_CARD':
            return actions.moveCardAcrossLanes({
              fromLaneId: event.fromLaneId,
              toLaneId: event.toLaneId,
              cardId: event.cardId,
              index: event.index
            })
          case 'UPDATE_CARDS':
            return actions.updateCards({laneId: event.laneId, cards: event.cards})
          case 'UPDATE_CARD':
            return actions.updateCard({laneId: event.laneId, updatedCard: event.card})
          case 'UPDATE_LANES':
            return actions.updateLanes(event.lanes)
          case 'UPDATE_LANE':
            return actions.updateLane(event.lane)
        }
      }
    }
    eventBusHandle(eventBus)
  }

  const hideEditableLane = () => {
    setAddLaneMode(false)
  }

  const showEditableLane = () => {
    setAddLaneMode(true)
  }

  const addNewLane = params => {
    hideEditableLane()
    actions.addLane(params)
    onLaneAdd(params)
  }

  const passthroughProps = pick(otherProps, [
    'onCardMoveAcrossLanes',
    'onLaneScroll',
    'onLaneDelete',
    'onLaneUpdate',
    'onCardClick',
    'onBeforeCardDelete',
    'onCardDelete',
    'onCardAdd',
    'onCardUpdate',
    'onLaneClick',
    'laneSortFunction',
    'draggable',
    'laneDraggable',
    'cardDraggable',
    'collapsibleLanes',
    'canAddLanes',
    'hideCardDeleteIcon',
    'tagStyle',
    'handleDragStart',
    'handleDragEnd',
    'cardDragClass',
    'editLaneTitle',
    't'
  ])

  return (
    <components.BoardWrapper style={style} {...otherProps} draggable={false}>
      <PopoverWrapper>
        <Container
          orientation="horizontal"
          onDragStart={onDragStart}
          dragClass={laneDragClass}
          dropClass={laneDropClass}
          onDrop={onLaneDrop}
          lockAxis="x"
          getChildPayload={index => getLaneDetails(index)}
          groupName={groupName}>
          {reducerData.lanes.map((lane, index) => {
            const {id, droppable, ...otherProps} = lane
            const laneToRender = (
              <Lane
                key={id}
                boardId={groupName}
                components={components}
                id={id}
                getCardDetails={getCardDetails}
                index={index}
                droppable={droppable === undefined ? true : droppable}
                style={laneStyle || lane.style || {}}
                labelStyle={lane.labelStyle || {}}
                cardStyle={cardStyle || lane.cardStyle}
                editable={editable && !lane.disallowAddingCard}
                {...otherProps}
                {...passthroughProps}
              />
            )
            return draggable && laneDraggable ? <Draggable key={lane.id}>{laneToRender}</Draggable> : laneToRender
          })}
        </Container>
      </PopoverWrapper>
      {canAddLanes && (
        <Container orientation="horizontal">
          {editable && !addLaneMode ? (
            <components.NewLaneSection t={t} onClick={showEditableLane} />
          ) : (
            addLaneMode && <components.NewLaneForm onCancel={hideEditableLane} onAdd={addNewLane} t={t} />
          )}
        </Container>
      )}
    </components.BoardWrapper>
  )
}

const mapStateToProps = state => {
  return state.lanes ? {reducerData: state} : {}
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
