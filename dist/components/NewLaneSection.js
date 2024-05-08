"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Base = require("../styles/Base");
var _Elements = require("../styles/Elements");
var NewLaneSectionComponent = _ref => {
  var {
    t,
    onClick
  } = _ref;
  var handleClick = event => {
    event.preventDefault();
    onClick();
  };
  return /*#__PURE__*/_react.default.createElement(_Base.NewLaneSection, null, /*#__PURE__*/_react.default.createElement(_Elements.AddLaneLink, {
    t: t,
    onClick: handleClick
  }, t('Add another lane')));
};
var _default = exports.default = NewLaneSectionComponent;