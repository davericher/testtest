import React, {useEffect, useMemo, useState} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import Container from '../dnd/Container'
import Draggable from '../dnd/Draggable'
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

  const groupName = useMemo(() => `TrelloBoard${id}`, [id])

  useEffect(() => {
    actions.loadBoard(data)
    if (eventBusHandle) {
      wireEventBus()
    }
  }, [actions, data, eventBusHandle])

  useEffect(() => {
    if (!isEqual(data, reducerData)) {
      onDataChange(reducerData)
    }
  }, [reducerData, data, onDataChange])

  const onDragStart = ({payload}) => {
    handleLaneDragStart(payload.id)
  }

  const onLaneDrop = ({removedIndex, addedIndex, payload}) => {
    if (removedIndex !== addedIndex) {
      actions.moveLane({oldIndex: removedIndex, newIndex: addedIndex})
      handleLaneDragEnd(removedIndex, addedIndex, payload)
    }
  }

  const getCardDetails = (laneId, cardIndex) => reducerData.lanes.find(lane => lane.id === laneId)?.cards[cardIndex]
  const getLaneDetails = index => reducerData.lanes[index]

  const wireEventBus = () => {
    const eventBus = {
      publish: event => {
        const {type} = event
        const handlers = {
          ADD_CARD: () => actions.addCard({laneId: event.laneId, card: event.card}),
          UPDATE_CARD: () => actions.updateCard({laneId: event.laneId, card: event.card}),
          REMOVE_CARD: () => actions.removeCard({laneId: event.laneId, cardId: event.cardId}),
          REFRESH_BOARD: () => actions.loadBoard(event.data),
          MOVE_CARD: () =>
            actions.moveCardAcrossLanes({
              fromLaneId: event.fromLaneId,
              toLaneId: event.toLaneId,
              cardId: event.cardId,
              index: event.index
            }),
          UPDATE_CARDS: () => actions.updateCards({laneId: event.laneId, cards: event.cards}),
          UPDATE_LANE: () => actions.updateLane(event.lane),
          UPDATE_LANES: () => actions.updateLanes(event.lanes)
        }
        return handlers[type] && handlers[type]()
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
    'editLaneTitle'
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
          getChildPayload={getLaneDetails}
          groupName={groupName}>
          {reducerData.lanes.map((lane, index) => {
            const laneProps = {id: lane.id, droppable: lane.droppable !== undefined ? lane.droppable : true, ...lane}
            return (
              <Draggable key={lane.id} draggable={draggable && laneDraggable}>
                <Lane
                  t={t}
                  data={data}
                  key={lane.id}
                  boardId={groupName}
                  components={components}
                  id={lane.id}
                  getCardDetails={getCardDetails}
                  index={index}
                  style={laneStyle || lane.style}
                  editable={editable && !lane.disallowAddingCard}
                  {...laneProps}
                  {...passthroughProps}
                />
              </Draggable>
            )
          })}
        </Container>
      </PopoverWrapper>
      {canAddLanes && editable && (
        <Container orientation="horizontal">
          {!addLaneMode ? (
            <components.NewLaneSection t={t} onClick={showEditableLane} />
          ) : (
            <components.NewLaneForm onCancel={hideEditableLane} onAdd={addNewLane} t={t} />
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
