"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Elements = require("../styles/Elements");
var DeleteButton = props => {
  return /*#__PURE__*/_react.default.createElement(_Elements.DeleteWrapper, props, /*#__PURE__*/_react.default.createElement(_Elements.DelButton, null, "\u2716"));
};
var _default = exports.default = DeleteButton;