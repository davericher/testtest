"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _kuikaSmoothDnd = require("kuika-smooth-dnd");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["render", "className", "children"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var {
  wrapperClass
} = _kuikaSmoothDnd.constants;
var Draggable = _ref => {
  var {
      render,
      className,
      children
    } = _ref,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (render) {
    // Use React.cloneElement to append the class to the rendered component
    return /*#__PURE__*/_react.default.cloneElement(render(), {
      className: "".concat(className ? className + ' ' : '').concat(wrapperClass)
    });
  }

  // Construct the class name from props, appending the wrapperClass
  var clsName = "".concat(className ? className + ' ' : '').concat(wrapperClass);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", _objectSpread(_objectSpread({}, props), {}, {
    className: clsName,
    children: children
  }));
};
Draggable.propTypes = {
  render: _propTypes.default.func,
  className: _propTypes.default.string,
  children: _propTypes.default.node
};
var _default = exports.default = Draggable;