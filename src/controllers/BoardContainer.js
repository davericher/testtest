import React, {useEffect, useState} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'
import Container from '../dnd/Container'
import Lane from './Lane'
import {PopoverWrapper} from 'react-popopo'

import * as boardActions from '../actions/BoardActions'
import * as laneActions from '../actions/LaneActions'

const BoardContainer = ({
  id,
  components,
  actions,
  data,
  reducerData,
  onDataChange,
  eventBusHandle,
  handleLaneDragStart,
  handleLaneDragEnd,
  draggable,
  laneDraggable,
  laneDragClass,
  laneDropClass,
  style,
  laneStyle,
  editable,
  canAddLanes,
  t,
  ...otherProps
}) => {
  const [addLaneMode, setAddLaneMode] = useState(false)

  useEffect(() => {
    actions.loadBoard(data)
    if (eventBusHandle) {
      wireEventBus()
    }
  }, [actions, data, eventBusHandle])

  useEffect(() => {
    if (reducerData) {
      onDataChange(reducerData)
    }
  }, [reducerData, onDataChange])

  const groupName = useMemo(() => `TrelloBoard${id}`, [id])

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
    const eventBus = {
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
          case 'UPDATE_LANES':
            return actions.updateLanes(event.lanes)
          case 'UPDATE_LANE':
            return actions.updateLane(event.lane)
        }
      }
    }
    eventBusHandle(eventBus)
  }

  const hideEditableLane = () => setAddLaneMode(false)
  const showEditableLane = () => setAddLaneMode(true)
  const addNewLane = params => {
    hideEditableLane()
    actions.addLane(params)
    otherProps.onLaneAdd(params)
  }

  // Stick to whitelisting attributes to segregate board and lane props
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
    <components.BoardWrapper style={style} draggable={false}>
      <PopoverWrapper>
        <Container
          orientation="horizontal"
          onDragStart={onDragStart}
          dragClass={laneDragClass}
          dropClass={laneDropClass}
          onDrop={onLaneDrop}
          lockAxis="x"
          getChildPayload={getLaneDetails}
          groupName={groupName}>
          {reducerData.lanes.map((lane, index) => (
            <Lane
              key={lane.id}
              {...{
                boardId: groupName,
                components,
                getCardDetails,
                index,
                style: laneStyle || lane.style || {},
                editable,
                ...lane,
                ...passthroughProps
              }}
            />
          ))}
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

BoardContainer.propTypes = {
  id: PropTypes.string,
  components: PropTypes.object,
  actions: PropTypes.object,
  data: PropTypes.object.isRequired,
  reducerData: PropTypes.object,
  onDataChange: PropTypes.func,
  eventBusHandle: PropTypes.func,
  onLaneScroll: PropTypes.func,
  onCardClick: PropTypes.func,
  onBeforeCardDelete: PropTypes.func,
  onCardDelete: PropTypes.func,
  onCardAdd: PropTypes.func,
  onCardUpdate: PropTypes.func,
  onLaneAdd: PropTypes.func,
  onLaneDelete: PropTypes.func,
  onLaneClick: PropTypes.func,
  onLaneUpdate: PropTypes.func,
  laneSortFunction: PropTypes.func,
  draggable: PropTypes.bool,
  collapsibleLanes: PropTypes.bool,
  editable: PropTypes.bool,
  canAddLanes: PropTypes.bool,
  hideCardDeleteIcon: PropTypes.bool,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleLaneDragStart: PropTypes.func,
  handleLaneDragEnd: PropTypes.func,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  laneDraggable: PropTypes.bool,
  cardDraggable: PropTypes.bool,
  cardDragClass: PropTypes.string,
  laneDragClass: PropTypes.string,
  laneDropClass: PropTypes.string,
  onCardMoveAcrossLanes: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

BoardContainer.defaultProps = {
  t: v => v,
  onDataChange: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleLaneDragStart: () => {},
  handleLaneDragEnd: () => {},
  onCardUpdate: () => {},
  onLaneAdd: () => {},
  onLaneDelete: () => {},
  onCardMoveAcrossLanes: () => {},
  onLaneUpdate: () => {},
  editable: false,
  canAddLanes: false,
  hideCardDeleteIcon: false,
  draggable: false,
  collapsibleLanes: false,
  laneDraggable: true,
  cardDraggable: true,
  cardDragClass: 'react_trello_dragClass',
  laneDragClass: 'react_trello_dragLaneClass',
  laneDropClass: ''
}

const mapStateToProps = state => ({
  reducerData: state.lanes ? state : {}
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
