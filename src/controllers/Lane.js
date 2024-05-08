import React, {useEffect, useRef, useState} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import {v1} from 'uuid'

import Container from '../dnd/Container'
import Draggable from '../dnd/Draggable'

import * as laneActions from '../actions/LaneActions'

const Lane = props => {
  console.dir(props)
  const [state, setState] = useState({
    loading: false,
    currentPage: props.currentPage,
    addCardMode: false,
    collapsed: false,
    isDraggingOver: false
  })

  const nodeRef = useRef(null)

  useEffect(() => {
    const node = nodeRef.current
    const handleScroll = evt => {
      const elemScrollPosition = node.scrollHeight - node.scrollTop - node.clientHeight
      if (elemScrollPosition < 1 && props.onLaneScroll && !state.loading) {
        const nextPage = state.currentPage + 1
        setState(prevState => ({...prevState, loading: true}))
        props.onLaneScroll(nextPage, props.id).then(moreCards => {
          if ((moreCards || []).length > 0) {
            props.actions.paginateLane({
              laneId: props.id,
              newCards: moreCards,
              nextPage: nextPage
            })
          }
          setState(prevState => ({...prevState, loading: false}))
        })
      }
    }

    if (node) {
      node.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (node) {
        node.removeEventListener('scroll', handleScroll)
      }
    }
  }, [props, state.loading, state.currentPage]) // dependencies may need adjustment

  // This effect is used to handle prop changes like 'cards' changing, similar to componentWillReceiveProps
  useEffect(() => {
    if (!isEqual(props.cards, state.cards)) {
      setState(prevState => ({...prevState, currentPage: props.currentPage}))
    }
  }, [props.cards, props.currentPage, state.cards])

  // Function to handle adding a new card
  const addNewCard = params => {
    const laneId = props.id
    const id = v1() // generate a unique ID for the new card
    hideEditableCard() // Assuming this function toggles the visibility of card add form
    let card = {id, ...params}
    props.actions.addCard({laneId, card})
    props.onCardAdd(card, laneId)
  }

  // Function to toggle visibility of add card mode
  const showEditableCard = () => {
    setState(prevState => ({...prevState, addCardMode: true}))
  }

  const hideEditableCard = () => {
    setState(prevState => ({...prevState, addCardMode: false}))
  }

  // Function to handle card removal
  const removeCard = cardId => {
    if (props.onBeforeCardDelete && typeof props.onBeforeCardDelete === 'function') {
      props.onBeforeCardDelete(() => {
        props.onCardDelete && props.onCardDelete(cardId, props.id)
        props.actions.removeCard({laneId: props.id, cardId: cardId})
      })
    } else {
      props.onCardDelete && props.onCardDelete(cardId, props.id)
      props.actions.removeCard({laneId: props.id, cardId: cardId})
    }
  }

  // Function to handle card clicks
  const handleCardClick = (e, card) => {
    const {onCardClick} = props
    onCardClick && onCardClick(card.id, card.metadata, card.laneId)
    e.stopPropagation()
  }

  // Function to update a card
  const updateCard = updatedCard => {
    props.actions.updateCard({laneId: props.id, card: updatedCard})
    props.onCardUpdate(props.id, updatedCard)
  }

  // Function to handle dragging start
  const onDragStart = ({payload}) => {
    const {handleDragStart} = props
    handleDragStart && handleDragStart(payload.id, payload.laneId)
  }

  // Function to determine if the lane should accept a drop
  const shouldAcceptDrop = sourceContainerOptions => {
    return props.droppable && sourceContainerOptions.groupName === groupName
  }

  // Function to handle drag end
  const onDragEnd = (laneId, result) => {
    const {handleDragEnd} = props
    const {addedIndex, payload} = result

    if (state.isDraggingOver) {
      setState(prevState => ({...prevState, isDraggingOver: false}))
    }

    if (addedIndex != null) {
      const newCard = {...cloneDeep(payload), laneId}
      const response = handleDragEnd ? handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, newCard) : true
      if (response === undefined || !!response) {
        props.actions.moveCardAcrossLanes({
          fromLaneId: payload.laneId,
          toLaneId: laneId,
          cardId: payload.id,
          index: addedIndex
        })
        props.onCardMoveAcrossLanes(payload.laneId, laneId, payload.id, addedIndex)
      }
      return response
    }
  }

  // Assuming groupName is used in shouldAcceptDrop and similar methods
  const groupName = `TrelloBoard${props.boardId}Lane`

  return (
    <props.components.Section
      key={props.id}
      onClick={() => props.onLaneClick && props.onLaneClick(props.id)}
      draggable={false}
      className={classNames('react-trello-lane', props.className || '')}>
      <props.components.LaneHeader
        id={props.id}
        cards={props.cards}
        onDelete={() => removeCard(props.id)}
        onDoubleClick={() => setState(prevState => ({...prevState, collapsed: !prevState.collapsed}))}
        updateTitle={value => {
          props.actions.updateLane({id: props.id, title: value})
          props.onLaneUpdate(props.id, {title: value})
        }}
        {...props}
      />
      <props.components.ScrollableLane ref={nodeRef} isDraggingOver={state.isDraggingOver}>
        <Container
          orientation="vertical"
          groupName={groupName}
          dragClass={props.cardDragClass}
          dropClass={props.cardDropClass}
          onDragStart={onDragStart}
          onDrop={e => onDragEnd(props.id, e)}
          onDragEnter={() => setState(prevState => ({...prevState, isDraggingOver: true}))}
          onDragLeave={() => setState(prevState => ({...prevState, isDraggingOver: false}))}
          shouldAcceptDrop={shouldAcceptDrop}
          getChildPayload={index => props.getCardDetails(props.id, index)}>
          {props.cards.map((card, idx) => {
            const cardToRender = (
              <props.components.Card
                key={card.id}
                index={idx}
                style={card.style || props.cardStyle}
                className="react-trello-card"
                onDelete={() => removeCard(card.id)}
                onClick={e => handleCardClick(e, card)}
                onChange={updatedCard => updateCard(updatedCard)}
                showDeleteButton={!props.hideCardDeleteIcon}
                tagStyle={props.tagStyle}
                cardDraggable={props.cardDraggable}
                editable={props.editable}
                t={props.t}
                {...card}
              />
            )
            return props.cardDraggable && (!card.hasOwnProperty('draggable') || card.draggable) ? (
              <Draggable key={card.id}>{cardToRender}</Draggable>
            ) : (
              <span key={card.id}>{cardToRender}</span>
            )
          })}
        </Container>
        {props.editable && !state.addCardMode && (
          <props.components.AddCardLink onClick={showEditableCard} t={props.t} laneId={props.id} />
        )}
        {state.addCardMode && (
          <props.components.NewCardForm onCancel={hideEditableCard} t={props.t} laneId={props.id} onAdd={addNewCard} />
        )}
      </props.components.ScrollableLane>
      {state.loading && <props.components.Loader />}
      {props.collapsibleLanes && props.cards.length > 0 && (
        <props.components.LaneFooter
          onClick={() => setState(prevState => ({...prevState, collapsed: !prevState.collapsed}))}
          collapsed={state.collapsed}
        />
      )}
    </props.components.Section>
  )
}

Lane.propTypes = {
  actions: PropTypes.object,
  id: PropTypes.string.isRequired,
  boardId: PropTypes.string,
  title: PropTypes.node,
  index: PropTypes.number,
  laneSortFunction: PropTypes.func,
  style: PropTypes.object,
  cardStyle: PropTypes.object,
  tagStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  cards: PropTypes.array,
  label: PropTypes.string,
  currentPage: PropTypes.number,
  draggable: PropTypes.bool,
  collapsibleLanes: PropTypes.bool,
  droppable: PropTypes.bool,
  onCardMoveAcrossLanes: PropTypes.func,
  onCardClick: PropTypes.func,
  onBeforeCardDelete: PropTypes.func,
  onCardDelete: PropTypes.func,
  onCardAdd: PropTypes.func,
  onCardUpdate: PropTypes.func,
  onLaneDelete: PropTypes.func,
  onLaneUpdate: PropTypes.func,
  onLaneClick: PropTypes.func,
  onLaneScroll: PropTypes.func,
  editable: PropTypes.bool,
  laneDraggable: PropTypes.bool,
  cardDraggable: PropTypes.bool,
  cardDragClass: PropTypes.string,
  cardDropClass: PropTypes.string,
  canAddLanes: PropTypes.bool,
  t: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(laneActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Lane)
