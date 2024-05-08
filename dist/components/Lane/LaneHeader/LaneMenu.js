"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactPopopo = require("react-popopo");
var _Base = require("../../../styles/Base");
var _Elements = require("../../../styles/Elements");
var TEST = _propTypes.default.elementType;
var LaneMenu = _ref => {
  var {
    t,
    onDelete
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactPopopo.Popover, {
    position: "bottom",
    PopoverContainer: _Base.CustomPopoverContainer,
    PopoverContent: _Base.CustomPopoverContent,
    trigger: /*#__PURE__*/_react.default.createElement(_Elements.MenuButton, null, "\u22EE")
  }, /*#__PURE__*/_react.default.createElement(_Elements.LaneMenuHeader, null, /*#__PURE__*/_react.default.createElement(_Elements.LaneMenuTitle, null, t('Lane actions')), /*#__PURE__*/_react.default.createElement(_Elements.DeleteWrapper, null, /*#__PURE__*/_react.default.createElement(_Elements.GenDelButton, null, "\u2716"))), /*#__PURE__*/_react.default.createElement(_Elements.LaneMenuContent, null, /*#__PURE__*/_react.default.createElement(_Elements.LaneMenuItem, {
    onClick: onDelete
  }, t('Delete lane'))));
};
var _default = exports.default = LaneMenu;