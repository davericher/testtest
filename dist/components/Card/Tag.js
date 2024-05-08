"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Base = require("../../styles/Base");
var _excluded = ["title", "color", "bgcolor", "tagStyle"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Tag = _ref => {
  var {
      title,
      color,
      bgcolor,
      tagStyle
    } = _ref,
    otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var style = _objectSpread({
    color: color || 'white',
    backgroundColor: bgcolor || 'orange'
  }, tagStyle);
  return /*#__PURE__*/_react.default.createElement(_Base.TagSpan, (0, _extends2.default)({
    style: style
  }, otherProps), title);
};
Tag.propTypes = {
  title: _propTypes.default.string.isRequired,
  color: _propTypes.default.string,
  bgcolor: _propTypes.default.string,
  tagStyle: _propTypes.default.object
};
var _default = exports.default = Tag;