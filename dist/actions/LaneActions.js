"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLanes = exports.updateLane = exports.updateCards = exports.updateCard = exports.removeLane = exports.removeCard = exports.paginateLane = exports.moveLane = exports.moveCardAcrossLanes = exports.addCard = void 0;
var _reduxActions = require("redux-actions");
var addCard = exports.addCard = (0, _reduxActions.createAction)('ADD_CARD');
var updateCard = exports.updateCard = (0, _reduxActions.createAction)('UPDATE_CARD');
var removeCard = exports.removeCard = (0, _reduxActions.createAction)('REMOVE_CARD');
var moveCardAcrossLanes = exports.moveCardAcrossLanes = (0, _reduxActions.createAction)('MOVE_CARD');
var updateCards = exports.updateCards = (0, _reduxActions.createAction)('UPDATE_CARDS');
var updateLanes = exports.updateLanes = (0, _reduxActions.createAction)('UPDATE_LANES');
var updateLane = exports.updateLane = (0, _reduxActions.createAction)('UPDATE_LANE');
var paginateLane = exports.paginateLane = (0, _reduxActions.createAction)('PAGINATE_LANE');
var moveLane = exports.moveLane = (0, _reduxActions.createAction)('MOVE_LANE');
var removeLane = exports.removeLane = (0, _reduxActions.createAction)('REMOVE_LANE');