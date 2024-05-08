"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Base = require("../styles/Base");
var _jsxRuntime = require("react/jsx-runtime");
var AddCardLinkComponent = _ref => {
  var {
    onClick,
    t,
    laneId
  } = _ref;
  var handleClick = event => {
    event.preventDefault();
    onClick();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.AddCardLink, {
    onClick: handleClick,
    children: t('Click to add card')
  });
};
var _default = exports.default = AddCardLinkComponent;