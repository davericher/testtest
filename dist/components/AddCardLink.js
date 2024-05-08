"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Base = require("../styles/Base");
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
  return /*#__PURE__*/_react.default.createElement(_Base.AddCardLink, {
    onClick: handleClick
  }, t('Click to add card'));
};
var _default = exports.default = AddCardLinkComponent;