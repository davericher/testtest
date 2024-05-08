"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));
var _uuid = require("uuid");
var _Container = _interopRequireDefault(require("../dnd/Container"));
var _Draggable = _interopRequireDefault(require("../dnd/Draggable"));
var laneActions = _interopRequireWildcard(require("../actions/LaneActions"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Lane = props => {
  var [state, setState] = (0, _react.useState)({
    loading: false,
    currentPage: props.currentPage,
    addCardMode: false,
    collapsed: false,
    isDraggingOver: false
  });
  var nodeRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    var node = nodeRef.current;
    var handleScroll = evt => {
      var elemScrollPosition = node.scrollHeight - node.scrollTop - node.clientHeight;
      if (elemScrollPosition < 1 && props.onLaneScroll && !state.loading) {
        var nextPage = state.currentPage + 1;
        setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
          loading: true
        }));
        props.onLaneScroll(nextPage, props.id).then(moreCards => {
          if ((moreCards || []).length > 0) {
            props.actions.paginateLane({
              laneId: props.id,
              newCards: moreCards,
              nextPage: nextPage
            });
          }
          setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
            loading: false
          }));
        });
      }
    };
    if (node) {
      node.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (node) {
        node.removeEventListener('scroll', handleScroll);
      }
    };
  }, [props, state.loading, state.currentPage]); // dependencies may need adjustment

  // This effect is used to handle prop changes like 'cards' changing, similar to componentWillReceiveProps
  (0, _react.useEffect)(() => {
    if (!(0, _isEqual.default)(props.cards, state.cards)) {
      setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
        currentPage: props.currentPage
      }));
    }
  }, [props.cards, props.currentPage, state.cards]);

  // Function to handle adding a new card
  var addNewCard = params => {
    var laneId = props.id;
    var id = (0, _uuid.v1)(); // generate a unique ID for the new card
    hideEditableCard(); // Assuming this function toggles the visibility of card add form
    var card = _objectSpread({
      id
    }, params);
    props.actions.addCard({
      laneId,
      card
    });
    props.onCardAdd(card, laneId);
  };

  // Function to toggle visibility of add card mode
  var showEditableCard = () => {
    setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
      addCardMode: true
    }));
  };
  var hideEditableCard = () => {
    setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
      addCardMode: false
    }));
  };

  // Function to handle card removal
  var removeCard = cardId => {
    if (props.onBeforeCardDelete && typeof props.onBeforeCardDelete === 'function') {
      props.onBeforeCardDelete(() => {
        props.onCardDelete && props.onCardDelete(cardId, props.id);
        props.actions.removeCard({
          laneId: props.id,
          cardId: cardId
        });
      });
    } else {
      props.onCardDelete && props.onCardDelete(cardId, props.id);
      props.actions.removeCard({
        laneId: props.id,
        cardId: cardId
      });
    }
  };

  // Function to handle card clicks
  var handleCardClick = (e, card) => {
    var {
      onCardClick
    } = props;
    onCardClick && onCardClick(card.id, card.metadata, card.laneId);
    e.stopPropagation();
  };

  // Function to update a card
  var updateCard = updatedCard => {
    props.actions.updateCard({
      laneId: props.id,
      card: updatedCard
    });
    props.onCardUpdate(props.id, updatedCard);
  };

  // Function to handle dragging start
  var onDragStart = _ref => {
    var {
      payload
    } = _ref;
    var {
      handleDragStart
    } = props;
    handleDragStart && handleDragStart(payload.id, payload.laneId);
  };

  // Function to determine if the lane should accept a drop
  var shouldAcceptDrop = sourceContainerOptions => {
    return props.droppable && sourceContainerOptions.groupName === groupName;
  };

  // Function to handle drag end
  var onDragEnd = (laneId, result) => {
    var {
      handleDragEnd
    } = props;
    var {
      addedIndex,
      payload
    } = result;
    if (state.isDraggingOver) {
      setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
        isDraggingOver: false
      }));
    }
    if (addedIndex != null) {
      var newCard = _objectSpread(_objectSpread({}, (0, _cloneDeep.default)(payload)), {}, {
        laneId
      });
      var response = handleDragEnd ? handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, newCard) : true;
      if (response === undefined || !!response) {
        props.actions.moveCardAcrossLanes({
          fromLaneId: payload.laneId,
          toLaneId: laneId,
          cardId: payload.id,
          index: addedIndex
        });
        props.onCardMoveAcrossLanes(payload.laneId, laneId, payload.id, addedIndex);
      }
      return response;
    }
  };

  // Assuming groupName is used in shouldAcceptDrop and similar methods
  var groupName = "TrelloBoard".concat(props.boardId, "Lane");
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(props.components.Section, {
    onClick: () => props.onLaneClick && props.onLaneClick(props.id),
    draggable: false,
    className: (0, _classnames.default)('react-trello-lane', props.className || ''),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(props.components.LaneHeader, _objectSpread({
      id: props.id,
      cards: props.cards,
      onDelete: () => removeCard(props.id),
      onDoubleClick: () => setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
        collapsed: !prevState.collapsed
      })),
      updateTitle: value => {
        props.actions.updateLane({
          id: props.id,
          title: value
        });
        props.onLaneUpdate(props.id, {
          title: value
        });
      }
    }, props)), /*#__PURE__*/(0, _jsxRuntime.jsxs)(props.components.ScrollableLane, {
      ref: nodeRef,
      isDraggingOver: state.isDraggingOver,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Container.default, {
        orientation: "vertical",
        groupName: groupName,
        dragClass: props.cardDragClass,
        dropClass: props.cardDropClass,
        onDragStart: onDragStart,
        onDrop: e => onDragEnd(props.id, e),
        onDragEnter: () => setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
          isDraggingOver: true
        })),
        onDragLeave: () => setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
          isDraggingOver: false
        })),
        shouldAcceptDrop: shouldAcceptDrop,
        getChildPayload: index => props.getCardDetails(props.id, index),
        children: props.cards.map((card, idx) => {
          var cardToRender = /*#__PURE__*/(0, _jsxRuntime.jsx)(props.components.Card, _objectSpread({
            index: idx,
            style: card.style || props.cardStyle,
            className: "react-trello-card",
            onDelete: () => removeCard(card.id),
            onClick: e => handleCardClick(e, card),
            onChange: updatedCard => updateCard(updatedCard),
            showDeleteButton: !props.hideCardDeleteIcon,
            tagStyle: props.tagStyle,
            cardDraggable: props.cardDraggable,
            editable: props.editable,
            t: props.t
          }, card), card.id);
          return props.cardDraggable && (!card.hasOwnProperty('draggable') || card.draggable) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Draggable.default, {
            children: cardToRender
          }, card.id) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: cardToRender
          }, card.id);
        })
      }), props.editable && !state.addCardMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(props.components.AddCardLink, {
        onClick: showEditableCard,
        t: props.t,
        laneId: props.id
      }), state.addCardMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(props.components.NewCardForm, {
        onCancel: hideEditableCard,
        t: props.t,
        laneId: props.id,
        onAdd: addNewCard
      })]
    }), state.loading && /*#__PURE__*/(0, _jsxRuntime.jsx)(props.components.Loader, {}), props.collapsibleLanes && props.cards.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(props.components.LaneFooter, {
      onClick: () => setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
        collapsed: !prevState.collapsed
      })),
      collapsed: state.collapsed
    })]
  }, props.id);
};
Lane.propTypes = {
  actions: _propTypes.default.object,
  id: _propTypes.default.string.isRequired,
  boardId: _propTypes.default.string,
  title: _propTypes.default.node,
  index: _propTypes.default.number,
  laneSortFunction: _propTypes.default.func,
  style: _propTypes.default.object,
  cardStyle: _propTypes.default.object,
  tagStyle: _propTypes.default.object,
  titleStyle: _propTypes.default.object,
  labelStyle: _propTypes.default.object,
  cards: _propTypes.default.array,
  label: _propTypes.default.string,
  currentPage: _propTypes.default.number,
  draggable: _propTypes.default.bool,
  collapsibleLanes: _propTypes.default.bool,
  droppable: _propTypes.default.bool,
  onCardMoveAcrossLanes: _propTypes.default.func,
  onCardClick: _propTypes.default.func,
  onBeforeCardDelete: _propTypes.default.func,
  onCardDelete: _propTypes.default.func,
  onCardAdd: _propTypes.default.func,
  onCardUpdate: _propTypes.default.func,
  onLaneDelete: _propTypes.default.func,
  onLaneUpdate: _propTypes.default.func,
  onLaneClick: _propTypes.default.func,
  onLaneScroll: _propTypes.default.func,
  editable: _propTypes.default.bool,
  laneDraggable: _propTypes.default.bool,
  cardDraggable: _propTypes.default.bool,
  cardDragClass: _propTypes.default.string,
  cardDropClass: _propTypes.default.string,
  canAddLanes: _propTypes.default.bool,
  t: _propTypes.default.func.isRequired
};
var mapDispatchToProps = dispatch => ({
  actions: (0, _redux.bindActionCreators)(laneActions, dispatch)
});
var _default = exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Lane);