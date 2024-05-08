"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _Container = _interopRequireDefault(require("../dnd/Container"));
var _Draggable = _interopRequireDefault(require("../dnd/Draggable"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _Lane = _interopRequireDefault(require("./Lane"));
var _reactPopopo = require("react-popopo");
var boardActions = _interopRequireWildcard(require("../actions/BoardActions"));
var laneActions = _interopRequireWildcard(require("../actions/LaneActions"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["id", "components", "data", "reducerData", "onDataChange", "eventBusHandle", "onLaneScroll", "onCardClick", "onBeforeCardDelete", "onCardDelete", "onCardAdd", "onCardUpdate", "onLaneClick", "onLaneAdd", "onLaneDelete", "onLaneUpdate", "editable", "canAddLanes", "laneStyle", "onCardMoveAcrossLanes", "t"],
  _excluded2 = ["id", "droppable"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var BoardContainer = _ref => {
  var {
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
      t
    } = _ref,
    otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var [addLaneMode, setAddLaneMode] = (0, _react.useState)(false);
  var groupName = "TrelloBoard".concat(id);
  (0, _react.useEffect)(() => {
    actions.loadBoard(data);
    if (eventBusHandle) {
      wireEventBus();
    }
  }, [data]);
  (0, _react.useEffect)(() => {
    if (reducerData && !(0, _isEqual.default)(reducerData, data)) {
      onDataChange(reducerData);
    }
  }, [reducerData]);
  var onDragStart = _ref2 => {
    var {
      payload
    } = _ref2;
    handleLaneDragStart(payload.id);
  };
  var onLaneDrop = _ref3 => {
    var {
      removedIndex,
      addedIndex,
      payload
    } = _ref3;
    if (removedIndex !== addedIndex) {
      actions.moveLane({
        oldIndex: removedIndex,
        newIndex: addedIndex
      });
      handleLaneDragEnd(removedIndex, addedIndex, payload);
    }
  };
  var getCardDetails = (laneId, cardIndex) => {
    return reducerData.lanes.find(lane => lane.id === laneId).cards[cardIndex];
  };
  var getLaneDetails = index => {
    return reducerData.lanes[index];
  };
  var wireEventBus = () => {
    var eventBus = {
      publish: event => {
        switch (event.type) {
          case 'ADD_CARD':
            return actions.addCard({
              laneId: event.laneId,
              card: event.card
            });
          case 'UPDATE_CARD':
            return actions.updateCard({
              laneId: event.laneId,
              card: event.card
            });
          case 'REMOVE_CARD':
            return actions.removeCard({
              laneId: event.laneId,
              cardId: event.cardId
            });
          case 'REFRESH_BOARD':
            return actions.loadBoard(event.data);
          case 'MOVE_CARD':
            return actions.moveCardAcrossLanes({
              fromLaneId: event.fromLaneId,
              toLaneId: event.toLaneId,
              cardId: event.cardId,
              index: event.index
            });
          case 'UPDATE_CARDS':
            return actions.updateCards({
              laneId: event.laneId,
              cards: event.cards
            });
          case 'UPDATE_CARD':
            return actions.updateCard({
              laneId: event.laneId,
              updatedCard: event.card
            });
          case 'UPDATE_LANES':
            return actions.updateLanes(event.lanes);
          case 'UPDATE_LANE':
            return actions.updateLane(event.lane);
        }
      }
    };
    eventBusHandle(eventBus);
  };
  var hideEditableLane = () => {
    setAddLaneMode(false);
  };
  var showEditableLane = () => {
    setAddLaneMode(true);
  };
  var addNewLane = params => {
    hideEditableLane();
    actions.addLane(params);
    onLaneAdd(params);
  };
  var passthroughProps = (0, _pick.default)(otherProps, ['onCardMoveAcrossLanes', 'onLaneScroll', 'onLaneDelete', 'onLaneUpdate', 'onCardClick', 'onBeforeCardDelete', 'onCardDelete', 'onCardAdd', 'onCardUpdate', 'onLaneClick', 'laneSortFunction', 'draggable', 'laneDraggable', 'cardDraggable', 'collapsibleLanes', 'canAddLanes', 'hideCardDeleteIcon', 'tagStyle', 'handleDragStart', 'handleDragEnd', 'cardDragClass', 'editLaneTitle', 't']);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(components.BoardWrapper, _objectSpread(_objectSpread({
    style: style
  }, otherProps), {}, {
    draggable: false,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPopopo.PopoverWrapper, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Container.default, {
        orientation: "horizontal",
        onDragStart: onDragStart,
        dragClass: laneDragClass,
        dropClass: laneDropClass,
        onDrop: onLaneDrop,
        lockAxis: "x",
        getChildPayload: index => getLaneDetails(index),
        groupName: groupName,
        children: reducerData.lanes.map((lane, index) => {
          var {
              id,
              droppable
            } = lane,
            otherProps = (0, _objectWithoutProperties2.default)(lane, _excluded2);
          var laneToRender = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Lane.default, _objectSpread(_objectSpread({
            boardId: groupName,
            components: components,
            id: id,
            getCardDetails: getCardDetails,
            index: index,
            droppable: droppable === undefined ? true : droppable,
            style: laneStyle || lane.style || {},
            labelStyle: lane.labelStyle || {},
            cardStyle: cardStyle || lane.cardStyle,
            editable: editable && !lane.disallowAddingCard
          }, otherProps), passthroughProps), id);
          return draggable && laneDraggable ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Draggable.default, {
            children: laneToRender
          }, lane.id) : laneToRender;
        })
      })
    }), canAddLanes && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Container.default, {
      orientation: "horizontal",
      children: editable && !addLaneMode ? /*#__PURE__*/(0, _jsxRuntime.jsx)(components.NewLaneSection, {
        t: t,
        onClick: showEditableLane
      }) : addLaneMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(components.NewLaneForm, {
        onCancel: hideEditableLane,
        onAdd: addNewLane,
        t: t
      })
    })]
  }));
};
var mapStateToProps = state => {
  return state.lanes ? {
    reducerData: state
  } : {};
};
var mapDispatchToProps = dispatch => ({
  actions: (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, boardActions), laneActions), dispatch)
});
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BoardContainer);