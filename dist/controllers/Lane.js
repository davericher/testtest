"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));
var _v = _interopRequireDefault(require("uuid/v1"));
var _Container = _interopRequireDefault(require("../dnd/Container"));
var _Draggable = _interopRequireDefault(require("../dnd/Draggable"));
var laneActions = _interopRequireWildcard(require("../actions/LaneActions"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["id", "cards", "collapsibleLanes", "components", "onLaneClick", "onLaneScroll", "onCardClick", "onCardAdd", "onBeforeCardDelete", "onCardDelete", "onLaneDelete", "onLaneUpdate", "onCardUpdate", "onCardMoveAcrossLanes"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
class Lane extends _react.Component {
  constructor() {
    super(...arguments);
    (0, _defineProperty2.default)(this, "state", {
      loading: false,
      currentPage: this.props.currentPage,
      addCardMode: false,
      collapsed: false,
      isDraggingOver: false
    });
    (0, _defineProperty2.default)(this, "handleScroll", evt => {
      var node = evt.target;
      var elemScrollPosition = node.scrollHeight - node.scrollTop - node.clientHeight;
      var {
        onLaneScroll
      } = this.props;
      // In some browsers and/or screen sizes a decimal rest value between 0 and 1 exists, so it should be checked on < 1 instead of < 0
      if (elemScrollPosition < 1 && onLaneScroll && !this.state.loading) {
        var {
          currentPage
        } = this.state;
        this.setState({
          loading: true
        });
        var nextPage = currentPage + 1;
        onLaneScroll(nextPage, this.props.id).then(moreCards => {
          if ((moreCards || []).length > 0) {
            this.props.actions.paginateLane({
              laneId: this.props.id,
              newCards: moreCards,
              nextPage: nextPage
            });
          }
          this.setState({
            loading: false
          });
        });
      }
    });
    (0, _defineProperty2.default)(this, "laneDidMount", node => {
      if (node) {
        node.addEventListener('scroll', this.handleScroll);
      }
    });
    (0, _defineProperty2.default)(this, "removeCard", cardId => {
      if (this.props.onBeforeCardDelete && typeof this.props.onBeforeCardDelete === 'function') {
        this.props.onBeforeCardDelete(() => {
          this.props.onCardDelete && this.props.onCardDelete(cardId, this.props.id);
          this.props.actions.removeCard({
            laneId: this.props.id,
            cardId: cardId
          });
        });
      } else {
        this.props.onCardDelete && this.props.onCardDelete(cardId, this.props.id);
        this.props.actions.removeCard({
          laneId: this.props.id,
          cardId: cardId
        });
      }
    });
    (0, _defineProperty2.default)(this, "handleCardClick", (e, card) => {
      var {
        onCardClick
      } = this.props;
      onCardClick && onCardClick(card.id, card.metadata, card.laneId);
      e.stopPropagation();
    });
    (0, _defineProperty2.default)(this, "showEditableCard", () => {
      this.setState({
        addCardMode: true
      });
    });
    (0, _defineProperty2.default)(this, "hideEditableCard", () => {
      this.setState({
        addCardMode: false
      });
    });
    (0, _defineProperty2.default)(this, "addNewCard", params => {
      var laneId = this.props.id;
      var id = (0, _v.default)();
      this.hideEditableCard();
      var card = _objectSpread({
        id
      }, params);
      this.props.actions.addCard({
        laneId,
        card
      });
      this.props.onCardAdd(card, laneId);
    });
    (0, _defineProperty2.default)(this, "onDragStart", _ref => {
      var {
        payload
      } = _ref;
      var {
        handleDragStart
      } = this.props;
      handleDragStart && handleDragStart(payload.id, payload.laneId);
    });
    (0, _defineProperty2.default)(this, "shouldAcceptDrop", sourceContainerOptions => {
      return this.props.droppable && sourceContainerOptions.groupName === this.groupName;
    });
    (0, _defineProperty2.default)(this, "onDragEnd", (laneId, result) => {
      var {
        handleDragEnd
      } = this.props;
      var {
        addedIndex,
        payload
      } = result;
      if (this.state.isDraggingOver) {
        this.setState({
          isDraggingOver: false
        });
      }
      if (addedIndex != null) {
        var newCard = _objectSpread(_objectSpread({}, (0, _cloneDeep.default)(payload)), {}, {
          laneId
        });
        var response = handleDragEnd ? handleDragEnd(payload.id, payload.laneId, laneId, addedIndex, newCard) : true;
        if (response === undefined || !!response) {
          this.props.actions.moveCardAcrossLanes({
            fromLaneId: payload.laneId,
            toLaneId: laneId,
            cardId: payload.id,
            index: addedIndex
          });
          this.props.onCardMoveAcrossLanes(payload.laneId, laneId, payload.id, addedIndex);
        }
        return response;
      }
    });
    (0, _defineProperty2.default)(this, "updateCard", updatedCard => {
      this.props.actions.updateCard({
        laneId: this.props.id,
        card: updatedCard
      });
      this.props.onCardUpdate(this.props.id, updatedCard);
    });
    (0, _defineProperty2.default)(this, "renderDragContainer", isDraggingOver => {
      var {
        id,
        cards,
        laneSortFunction,
        editable,
        hideCardDeleteIcon,
        cardDraggable,
        cardDragClass,
        cardDropClass,
        tagStyle,
        cardStyle,
        components,
        t
      } = this.props;
      var {
        addCardMode,
        collapsed
      } = this.state;
      var showableCards = collapsed ? [] : cards;
      var cardList = this.sortCards(showableCards, laneSortFunction).map((card, idx) => {
        var onDeleteCard = () => this.removeCard(card.id);
        var cardToRender = /*#__PURE__*/(0, _jsxRuntime.jsx)(components.Card, _objectSpread({
          index: idx,
          style: card.style || cardStyle,
          className: "react-trello-card",
          onDelete: onDeleteCard,
          onClick: e => this.handleCardClick(e, card),
          onChange: updatedCard => this.updateCard(updatedCard),
          showDeleteButton: !hideCardDeleteIcon,
          tagStyle: tagStyle,
          cardDraggable: cardDraggable,
          editable: editable,
          t: t
        }, card), card.id);
        return cardDraggable && (!card.hasOwnProperty('draggable') || card.draggable) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Draggable.default, {
          children: cardToRender
        }, card.id) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: cardToRender
        }, card.id);
      });
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(components.ScrollableLane, {
        ref: this.laneDidMount,
        isDraggingOver: isDraggingOver,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Container.default, {
          orientation: "vertical",
          groupName: this.groupName,
          dragClass: cardDragClass,
          dropClass: cardDropClass,
          onDragStart: this.onDragStart,
          onDrop: e => this.onDragEnd(id, e),
          onDragEnter: () => this.setState({
            isDraggingOver: true
          }),
          onDragLeave: () => this.setState({
            isDraggingOver: false
          }),
          shouldAcceptDrop: this.shouldAcceptDrop,
          getChildPayload: index => this.props.getCardDetails(id, index),
          children: cardList
        }), editable && !addCardMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(components.AddCardLink, {
          onClick: this.showEditableCard,
          t: t,
          laneId: id
        }), addCardMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(components.NewCardForm, {
          onCancel: this.hideEditableCard,
          t: t,
          laneId: id,
          onAdd: this.addNewCard
        })]
      });
    });
    (0, _defineProperty2.default)(this, "removeLane", () => {
      var {
        id
      } = this.props;
      this.props.actions.removeLane({
        laneId: id
      });
      this.props.onLaneDelete(id);
    });
    (0, _defineProperty2.default)(this, "updateTitle", value => {
      this.props.actions.updateLane({
        id: this.props.id,
        title: value
      });
      this.props.onLaneUpdate(this.props.id, {
        title: value
      });
    });
    (0, _defineProperty2.default)(this, "renderHeader", pickedProps => {
      var {
        components
      } = this.props;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(components.LaneHeader, _objectSpread(_objectSpread({}, pickedProps), {}, {
        onDelete: this.removeLane,
        onDoubleClick: this.toggleLaneCollapsed,
        updateTitle: this.updateTitle
      }));
    });
    (0, _defineProperty2.default)(this, "toggleLaneCollapsed", () => {
      this.props.collapsibleLanes && this.setState(state => ({
        collapsed: !state.collapsed
      }));
    });
  }
  get groupName() {
    var {
      boardId
    } = this.props;
    return "TrelloBoard".concat(boardId, "Lane");
  }
  sortCards(cards, sortFunction) {
    if (!cards) return [];
    if (!sortFunction) return cards;
    return cards.concat().sort(function (card1, card2) {
      return sortFunction(card1, card2);
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!(0, _isEqual.default)(this.props.cards, nextProps.cards)) {
      this.setState({
        currentPage: nextProps.currentPage
      });
    }
  }
  render() {
    var {
      loading,
      isDraggingOver,
      collapsed
    } = this.state;
    var _this$props = this.props,
      {
        id,
        cards,
        collapsibleLanes,
        components,
        onLaneClick,
        onLaneScroll,
        onCardClick,
        onCardAdd,
        onBeforeCardDelete,
        onCardDelete,
        onLaneDelete,
        onLaneUpdate,
        onCardUpdate,
        onCardMoveAcrossLanes
      } = _this$props,
      otherProps = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
    var allClassNames = (0, _classnames.default)('react-trello-lane', this.props.className || '');
    var showFooter = collapsibleLanes && cards.length > 0;
    return /*#__PURE__*/(0, _react.createElement)(components.Section, _objectSpread(_objectSpread({}, otherProps), {}, {
      key: id,
      onClick: () => onLaneClick && onLaneClick(id),
      draggable: false,
      className: allClassNames
    }), this.renderHeader(_objectSpread({
      id,
      cards
    }, otherProps)), this.renderDragContainer(isDraggingOver), loading && /*#__PURE__*/(0, _jsxRuntime.jsx)(components.Loader, {}), showFooter && /*#__PURE__*/(0, _jsxRuntime.jsx)(components.LaneFooter, {
      onClick: this.toggleLaneCollapsed,
      collapsed: collapsed
    }));
  }
}
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
Lane.defaultProps = {
  style: {},
  titleStyle: {},
  labelStyle: {},
  label: undefined,
  editable: false,
  onLaneUpdate: () => {},
  onCardAdd: () => {},
  onCardUpdate: () => {}
};
var mapDispatchToProps = dispatch => ({
  actions: (0, _redux.bindActionCreators)(laneActions, dispatch)
});
var _default = exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Lane);