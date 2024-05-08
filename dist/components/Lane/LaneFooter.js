"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Base = require("../../styles/Base");
var _Elements = require("../../styles/Elements");
var _jsxRuntime = require("react/jsx-runtime");
var _default = _ref => {
  var {
    onClick,
    collapsed
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.LaneFooter, {
    onClick: onClick,
    children: collapsed ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.ExpandBtn, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.CollapseBtn, {})
  });
};
exports.default = _default;