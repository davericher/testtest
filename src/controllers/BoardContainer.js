import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Container from '../dnd/Container'
import Draggable from '../dnd/Draggable'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import Lane from './Lane'
import {PopoverWrapper} from 'react-popopo'

import * as boardActions from '../actions/BoardActions'
import * as laneActions from '../actions/LaneActions'

class BoardContainer extends Component {
  state = {
    addLaneMode: false
  }

  get groupName() {
    const {id} = this.props
    return `TrelloBoard${id}`
  }

  componentDidMount() {
    const {actions, eventBusHandle} = this.props
    actions.loadBoard(this.props.data)
    if (eventBusHandle) {
      this.wireEventBus()
    }
  }

  componentDidUpdate(prevProps) {
    const {data, reducerData, onDataChange, actions} = this.props;

    if (this.props.reducerData && !isEqual(reducerData, prevProps.reducerData)) {
      onDataChange(this.props.reducerData);
    }

    if (this.props.data && !isEqual(this.props.data, prevProps.data)) {
      actions.loadBoard(this.props.data);
      onDataChange(this.props.data);
    }
  }

  onDragStart = ({payload}) => {
    const {handleLaneDragStart} = this.props
    handleLaneDragStart(payload.id)
  }

  onLaneDrop = ({removedIndex, addedIndex, payload}) => {
    const {actions, handleLaneDragEnd} = this.props
    if (removedIndex !== addedIndex) {
      actions.moveLane({oldIndex: removedIndex, newIndex: addedIndex})
      handleLaneDragEnd(removedIndex, addedIndex, payload)
    }
  }

  getCardDetails = (laneId, cardIndex) => {
    return this.props.reducerData.lanes.find(lane => lane.id === laneId).cards[cardIndex]
  }

  getLaneDetails = index => {
    return this.props.reducerData.lanes[index]
  }

  wireEventBus = () => {
    const {actions, eventBusHandle} = this.props
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

  // + add
  hideEditableLane = () => {
    this.setState({addLaneMode: false})
  }

  showEditableLane = () => {
    this.setState({addLaneMode: true})
  }

  addNewLane = params => {
    this.hideEditableLane()
    this.props.actions.addLane(params)
    this.props.onLaneAdd(params)
  }

  render() {
    const {
      id,
      components,
      reducerData,
      draggable,
      laneDraggable,
      laneDragClass,
      laneDropClass,
      style,
      onDataChange,
      onCardAdd,
      onCardUpdate,
      onCardClick,
      onBeforeCardDelete,
      onCardDelete,
      onLaneScroll,
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
    } = this.props

    const {addLaneMode} = this.state
    // Stick to whitelisting attributes to segregate board and lane props
    const passthroughProps = pick(this.props, [
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
            onDragStart={this.onDragStart}
            dragClass={laneDragClass}
            dropClass={laneDropClass}
            onDrop={this.onLaneDrop}
            lockAxis="x"
            getChildPayload={index => this.getLaneDetails(index)}
            groupName={this.groupName}>
            {reducerData.lanes.map((lane, index) => {
              const {id, droppable, ...otherProps} = lane
              const laneToRender = (
                <Lane
                  key={id}
                  boardId={this.groupName}
                  components={components}
                  id={id}
                  getCardDetails={this.getCardDetails}
                  index={index}
                  droppable={droppable === undefined ? true : droppable}
                  style={laneStyle || lane.style || {}}
                  labelStyle={lane.labelStyle || {}}
                  cardStyle={this.props.cardStyle || lane.cardStyle}
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
              <components.NewLaneSection t={t} onClick={this.showEditableLane} />
            ) : (
              addLaneMode && <components.NewLaneForm onCancel={this.hideEditableLane} onAdd={this.addNewLane} t={t} />
            )}
          </Container>
        )}
      </components.BoardWrapper>
    )
  }
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

const mapStateToProps = state => {
  return state.lanes ? {reducerData: state} : {}
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators({...boardActions, ...laneActions}, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
