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
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _Container = _interopRequireDefault(require("../dnd/Container"));
var _Draggable = _interopRequireDefault(require("../dnd/Draggable"));
var _Lane = _interopRequireDefault(require("./Lane"));
var _reactPopopo = require("react-popopo");
var boardActions = _interopRequireWildcard(require("../actions/BoardActions"));
var laneActions = _interopRequireWildcard(require("../actions/LaneActions"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["id", "components", "actions", "data", "reducerData", "onDataChange", "eventBusHandle", "handleLaneDragStart", "handleLaneDragEnd", "draggable", "laneDraggable", "laneDragClass", "laneDropClass", "style", "laneStyle", "editable", "canAddLanes", "t"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var BoardContainer = _ref => {
  var {
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
      t
    } = _ref,
    otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var [addLaneMode, setAddLaneMode] = (0, _react.useState)(false);
  var groupName = (0, _react.useMemo)(() => "TrelloBoard".concat(id), [id]);
  (0, _react.useEffect)(() => {
    actions.loadBoard(data);
    if (eventBusHandle) {
      wireEventBus();
    }
  }, [actions, data, eventBusHandle]);
  (0, _react.useEffect)(() => {
    if (!(0, _isEqual.default)(data, reducerData)) {
      onDataChange(reducerData);
    }
  }, [reducerData, data, onDataChange]);
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
    var _reducerData$lanes$fi;
    return (_reducerData$lanes$fi = reducerData.lanes.find(lane => lane.id === laneId)) === null || _reducerData$lanes$fi === void 0 ? void 0 : _reducerData$lanes$fi.cards[cardIndex];
  };
  var getLaneDetails = index => reducerData.lanes[index];
  var wireEventBus = () => {
    var eventBus = {
      publish: event => {
        var {
          type
        } = event;
        var handlers = {
          ADD_CARD: () => actions.addCard({
            laneId: event.laneId,
            card: event.card
          }),
          UPDATE_CARD: () => actions.updateCard({
            laneId: event.laneId,
            card: event.card
          }),
          REMOVE_CARD: () => actions.removeCard({
            laneId: event.laneId,
            cardId: event.cardId
          }),
          REFRESH_BOARD: () => actions.loadBoard(event.data),
          MOVE_CARD: () => actions.moveCardAcrossLanes({
            fromLaneId: event.fromLaneId,
            toLaneId: event.toLaneId,
            cardId: event.cardId,
            index: event.index
          }),
          UPDATE_CARDS: () => actions.updateCards({
            laneId: event.laneId,
            cards: event.cards
          }),
          UPDATE_LANE: () => actions.updateLane(event.lane),
          UPDATE_LANES: () => actions.updateLanes(event.lanes)
        };
        return handlers[type] && handlers[type]();
      }
    };
    eventBusHandle(eventBus);
  };
  var hideEditableLane = () => setAddLaneMode(false);
  var showEditableLane = () => setAddLaneMode(true);
  var addNewLane = params => {
    hideEditableLane();
    actions.addLane(params);
    otherProps.onLaneAdd(params);
  };
  var passthroughProps = (0, _pick.default)(otherProps, ['onCardMoveAcrossLanes', 'onLaneScroll', 'onLaneDelete', 'onLaneUpdate', 'onCardClick', 'onBeforeCardDelete', 'onCardDelete', 'onCardAdd', 'onCardUpdate', 'onLaneClick', 'laneSortFunction', 'draggable', 'laneDraggable', 'cardDraggable', 'collapsibleLanes', 'canAddLanes', 'hideCardDeleteIcon', 'tagStyle', 'handleDragStart', 'handleDragEnd', 'cardDragClass', 'editLaneTitle']);
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
        getChildPayload: getLaneDetails,
        groupName: groupName,
        children: reducerData.lanes.map((lane, index) => {
          var laneProps = _objectSpread({
            id: lane.id,
            droppable: lane.droppable !== undefined ? lane.droppable : true
          }, lane);
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Draggable.default, {
            draggable: draggable && laneDraggable,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Lane.default, _objectSpread(_objectSpread({
              t: t,
              data: data,
              boardId: groupName,
              components: components,
              id: lane.id,
              getCardDetails: getCardDetails,
              index: index,
              style: laneStyle || lane.style,
              editable: editable && !lane.disallowAddingCard
            }, laneProps), passthroughProps), lane.id)
          }, lane.id);
        })
      })
    }), canAddLanes && editable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Container.default, {
      orientation: "horizontal",
      children: !addLaneMode ? /*#__PURE__*/(0, _jsxRuntime.jsx)(components.NewLaneSection, {
        t: t,
        onClick: showEditableLane
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(components.NewLaneForm, {
        onCancel: hideEditableLane,
        onAdd: addNewLane,
        t: t
      })
    })]
  }));
};
BoardContainer.propTypes = {
  id: _propTypes.default.string,
  components: _propTypes.default.object,
  actions: _propTypes.default.object,
  data: _propTypes.default.object.isRequired,
  reducerData: _propTypes.default.object,
  onDataChange: _propTypes.default.func,
  eventBusHandle: _propTypes.default.func,
  onLaneScroll: _propTypes.default.func,
  onCardClick: _propTypes.default.func,
  onBeforeCardDelete: _propTypes.default.func,
  onCardDelete: _propTypes.default.func,
  onCardAdd: _propTypes.default.func,
  onCardUpdate: _propTypes.default.func,
  onLaneAdd: _propTypes.default.func,
  onLaneDelete: _propTypes.default.func,
  onLaneClick: _propTypes.default.func,
  onLaneUpdate: _propTypes.default.func,
  laneSortFunction: _propTypes.default.func,
  draggable: _propTypes.default.bool,
  collapsibleLanes: _propTypes.default.bool,
  editable: _propTypes.default.bool,
  canAddLanes: _propTypes.default.bool,
  hideCardDeleteIcon: _propTypes.default.bool,
  handleDragStart: _propTypes.default.func,
  handleDragEnd: _propTypes.default.func,
  handleLaneDragStart: _propTypes.default.func,
  handleLaneDragEnd: _propTypes.default.func,
  style: _propTypes.default.object,
  tagStyle: _propTypes.default.object,
  laneDraggable: _propTypes.default.bool,
  cardDraggable: _propTypes.default.bool,
  cardDragClass: _propTypes.default.string,
  laneDragClass: _propTypes.default.string,
  laneDropClass: _propTypes.default.string,
  onCardMoveAcrossLanes: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
};
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
};
var mapStateToProps = state => ({
  reducerData: state.lanes ? state : {}
});
var mapDispatchToProps = dispatch => ({
  actions: (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, boardActions), laneActions), dispatch)
});
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BoardContainer);