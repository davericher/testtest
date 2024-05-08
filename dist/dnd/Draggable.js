"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _kuikaSmoothDnd = require("kuika-smooth-dnd");
var _excluded = ["render", "className", "children"];
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
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, props, {
    className: clsName
  }), children);
};
Draggable.propTypes = {
  render: _propTypes.default.func,
  className: _propTypes.default.string,
  children: _propTypes.default.node
};
var _default = exports.default = Draggable;