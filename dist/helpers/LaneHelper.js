"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var LaneHelper = {
  initialiseLanes: (state, _ref) => {
    var {
      lanes
    } = _ref;
    var newLanes = lanes.map(lane => {
      lane.currentPage = 1;
      lane.cards && lane.cards.forEach(c => c.laneId = lane.id);
      return lane;
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: newLanes
      }
    });
  },
  paginateLane: (state, _ref2) => {
    var {
      laneId,
      newCards,
      nextPage
    } = _ref2;
    var updatedLanes = LaneHelper.appendCardsToLane(state, {
      laneId: laneId,
      newCards: newCards
    });
    updatedLanes.find(lane => lane.id === laneId).currentPage = nextPage;
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: updatedLanes
      }
    });
  },
  appendCardsToLane: (state, _ref3) => {
    var {
      laneId,
      newCards,
      index
    } = _ref3;
    var lane = state.lanes.find(lane => lane.id === laneId);
    newCards = newCards.map(c => (0, _immutabilityHelper.default)(c, {
      laneId: {
        $set: laneId
      }
    })).filter(c => lane.cards.find(card => card.id === c.id) == null);
    return state.lanes.map(lane => {
      if (lane.id === laneId) {
        if (index !== undefined) {
          return (0, _immutabilityHelper.default)(lane, {
            cards: {
              $splice: [[index, 0, ...newCards]]
            }
          });
        } else {
          var cardsToUpdate = [...lane.cards, ...newCards];
          return (0, _immutabilityHelper.default)(lane, {
            cards: {
              $set: cardsToUpdate
            }
          });
        }
      } else {
        return lane;
      }
    });
  },
  appendCardToLane: (state, _ref4) => {
    var {
      laneId,
      card,
      index
    } = _ref4;
    var newLanes = LaneHelper.appendCardsToLane(state, {
      laneId: laneId,
      newCards: [card],
      index
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: newLanes
      }
    });
  },
  addLane: (state, lane) => {
    var newLane = _objectSpread({
      cards: []
    }, lane);
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $push: [newLane]
      }
    });
  },
  updateLane: (state, updatedLane) => {
    var newLanes = state.lanes.map(lane => {
      if (updatedLane.id == lane.id) {
        return _objectSpread(_objectSpread({}, lane), updatedLane);
      } else {
        return lane;
      }
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: newLanes
      }
    });
  },
  removeCardFromLane: (state, _ref5) => {
    var {
      laneId,
      cardId
    } = _ref5;
    var lanes = state.lanes.map(lane => {
      if (lane.id === laneId) {
        var newCards = lane.cards.filter(card => card.id !== cardId);
        return (0, _immutabilityHelper.default)(lane, {
          cards: {
            $set: newCards
          }
        });
      } else {
        return lane;
      }
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: lanes
      }
    });
  },
  moveCardAcrossLanes: (state, _ref6) => {
    var {
      fromLaneId,
      toLaneId,
      cardId,
      index
    } = _ref6;
    var cardToMove = null;
    var interimLanes = state.lanes.map(lane => {
      if (lane.id === fromLaneId) {
        cardToMove = lane.cards.find(card => card.id === cardId);
        var newCards = lane.cards.filter(card => card.id !== cardId);
        return (0, _immutabilityHelper.default)(lane, {
          cards: {
            $set: newCards
          }
        });
      } else {
        return lane;
      }
    });
    var updatedState = (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: interimLanes
      }
    });
    return LaneHelper.appendCardToLane(updatedState, {
      laneId: toLaneId,
      card: cardToMove,
      index: index
    });
  },
  updateCardsForLane: (state, _ref7) => {
    var {
      laneId,
      cards
    } = _ref7;
    var lanes = state.lanes.map(lane => {
      if (lane.id === laneId) {
        return (0, _immutabilityHelper.default)(lane, {
          cards: {
            $set: cards
          }
        });
      } else {
        return lane;
      }
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: lanes
      }
    });
  },
  updateCardForLane: (state, _ref8) => {
    var {
      laneId,
      card: updatedCard
    } = _ref8;
    var lanes = state.lanes.map(lane => {
      if (lane.id === laneId) {
        var cards = lane.cards.map(card => {
          if (card.id === updatedCard.id) {
            return _objectSpread(_objectSpread({}, card), updatedCard);
          } else {
            return card;
          }
        });
        return (0, _immutabilityHelper.default)(lane, {
          cards: {
            $set: cards
          }
        });
      } else {
        return lane;
      }
    });
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: lanes
      }
    });
  },
  updateLanes: (state, lanes) => {
    return _objectSpread(_objectSpread({}, state), {
      lanes: lanes
    });
  },
  moveLane: (state, _ref9) => {
    var {
      oldIndex,
      newIndex
    } = _ref9;
    var laneToMove = state.lanes[oldIndex];
    var tempState = (0, _immutabilityHelper.default)(state, {
      lanes: {
        $splice: [[oldIndex, 1]]
      }
    });
    return (0, _immutabilityHelper.default)(tempState, {
      lanes: {
        $splice: [[newIndex, 0, laneToMove]]
      }
    });
  },
  removeLane: (state, _ref10) => {
    var {
      laneId
    } = _ref10;
    var updatedLanes = state.lanes.filter(lane => lane.id !== laneId);
    return (0, _immutabilityHelper.default)(state, {
      lanes: {
        $set: updatedLanes
      }
    });
  }
};
var _default = exports.default = LaneHelper;