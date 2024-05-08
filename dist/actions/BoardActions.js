"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBoard = exports.addLane = void 0;
var _reduxActions = require("redux-actions");
var loadBoard = exports.loadBoard = (0, _reduxActions.createAction)('LOAD_BOARD');
var addLane = exports.addLane = (0, _reduxActions.createAction)('ADD_LANE');