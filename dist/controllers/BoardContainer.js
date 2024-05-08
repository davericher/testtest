"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _Container = _interopRequireDefault(require("../dnd/Container"));
var _Draggable = _interopRequireDefault(require("../dnd/Draggable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _Lane = _interopRequireDefault(require("./Lane"));
var _reactPopopo = require("react-popopo");
var boardActions = _interopRequireWildcard(require("../actions/BoardActions"));
var laneActions = _interopRequireWildcard(require("../actions/LaneActions"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["id", "components", "reducerData", "draggable", "laneDraggable", "laneDragClass", "laneDropClass", "style", "onDataChange", "onCardAdd", "onCardUpdate", "onCardClick", "onBeforeCardDelete", "onCardDelete", "onLaneScroll", "onLaneClick", "onLaneAdd", "onLaneDelete", "onLaneUpdate", "editable", "canAddLanes", "laneStyle", "onCardMoveAcrossLanes", "t"],
  _excluded2 = ["id", "droppable"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
class BoardContainer extends _react.Component {
  constructor() {
    super(...arguments);
    (0, _defineProperty2.default)(this, "state", {
      addLaneMode: false
    });
    (0, _defineProperty2.default)(this, "onDragStart", _ref => {
      var {
        payload
      } = _ref;
      var {
        handleLaneDragStart
      } = this.props;
      handleLaneDragStart(payload.id);
    });
    (0, _defineProperty2.default)(this, "onLaneDrop", _ref2 => {
      var {
        removedIndex,
        addedIndex,
        payload
      } = _ref2;
      var {
        actions,
        handleLaneDragEnd
      } = this.props;
      if (removedIndex !== addedIndex) {
        actions.moveLane({
          oldIndex: removedIndex,
          newIndex: addedIndex
        });
        handleLaneDragEnd(removedIndex, addedIndex, payload);
      }
    });
    (0, _defineProperty2.default)(this, "getCardDetails", (laneId, cardIndex) => {
      return this.props.reducerData.lanes.find(lane => lane.id === laneId).cards[cardIndex];
    });
    (0, _defineProperty2.default)(this, "getLaneDetails", index => {
      return this.props.reducerData.lanes[index];
    });
    (0, _defineProperty2.default)(this, "wireEventBus", () => {
      var {
        actions,
        eventBusHandle
      } = this.props;
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
    });
    // + add
    (0, _defineProperty2.default)(this, "hideEditableLane", () => {
      this.setState({
        addLaneMode: false
      });
    });
    (0, _defineProperty2.default)(this, "showEditableLane", () => {
      this.setState({
        addLaneMode: true
      });
    });
    (0, _defineProperty2.default)(this, "addNewLane", params => {
      this.hideEditableLane();
      this.props.actions.addLane(params);
      this.props.onLaneAdd(params);
    });
  }
  get groupName() {
    var {
      id
    } = this.props;
    return "TrelloBoard".concat(id);
  }
  componentDidMount() {
    var {
      actions,
      eventBusHandle
    } = this.props;
    actions.loadBoard(this.props.data);
    if (eventBusHandle) {
      this.wireEventBus();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // nextProps.data changes when external Board input props change and nextProps.reducerData changes due to event bus or UI changes
    var {
      data,
      reducerData,
      onDataChange
    } = this.props;
    if (nextProps.reducerData && !(0, _isEqual.default)(reducerData, nextProps.reducerData)) {
      onDataChange(nextProps.reducerData);
    }
    if (nextProps.data && !(0, _isEqual.default)(nextProps.data, data)) {
      this.props.actions.loadBoard(nextProps.data);
      onDataChange(nextProps.data);
    }
  }
  render() {
    var _this$props = this.props,
      {
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
        t
      } = _this$props,
      otherProps = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
    var {
      addLaneMode
    } = this.state;
    // Stick to whitelisting attributes to segregate board and lane props
    var passthroughProps = (0, _pick.default)(this.props, ['onCardMoveAcrossLanes', 'onLaneScroll', 'onLaneDelete', 'onLaneUpdate', 'onCardClick', 'onBeforeCardDelete', 'onCardDelete', 'onCardAdd', 'onCardUpdate', 'onLaneClick', 'laneSortFunction', 'draggable', 'laneDraggable', 'cardDraggable', 'collapsibleLanes', 'canAddLanes', 'hideCardDeleteIcon', 'tagStyle', 'handleDragStart', 'handleDragEnd', 'cardDragClass', 'editLaneTitle', 't']);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(components.BoardWrapper, _objectSpread(_objectSpread({
      style: style
    }, otherProps), {}, {
      draggable: false,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPopopo.PopoverWrapper, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Container.default, {
          orientation: "horizontal",
          onDragStart: this.onDragStart,
          dragClass: laneDragClass,
          dropClass: laneDropClass,
          onDrop: this.onLaneDrop,
          lockAxis: "x",
          getChildPayload: index => this.getLaneDetails(index),
          groupName: this.groupName,
          children: reducerData.lanes.map((lane, index) => {
            var {
                id,
                droppable
              } = lane,
              otherProps = (0, _objectWithoutProperties2.default)(lane, _excluded2);
            var laneToRender = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Lane.default, _objectSpread(_objectSpread({
              boardId: this.groupName,
              components: components,
              id: id,
              getCardDetails: this.getCardDetails,
              index: index,
              droppable: droppable === undefined ? true : droppable,
              style: laneStyle || lane.style || {},
              labelStyle: lane.labelStyle || {},
              cardStyle: this.props.cardStyle || lane.cardStyle,
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
          onClick: this.showEditableLane
        }) : addLaneMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(components.NewLaneForm, {
          onCancel: this.hideEditableLane,
          onAdd: this.addNewLane,
          t: t
        })
      })]
    }));
  }
}
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
var mapStateToProps = state => {
  return state.lanes ? {
    reducerData: state
  } : {};
};
var mapDispatchToProps = dispatch => ({
  actions: (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, boardActions), laneActions), dispatch)
});
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BoardContainer);