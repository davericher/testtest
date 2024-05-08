"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _kuikaSmoothDnd = require("kuika-smooth-dnd");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var {
  wrapperClass
} = _kuikaSmoothDnd.constants;
class Draggable extends _react.Component {
  render() {
    if (this.props.render) {
      return /*#__PURE__*/_react.default.cloneElement(this.props.render(), {
        className: wrapperClass
      });
    }
    var clsName = "".concat(this.props.className ? this.props.className + ' ' : '');
    return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, this.props, {
      className: "".concat(clsName).concat(wrapperClass)
    }), this.props.children);
  }
}
Draggable.propTypes = {
  render: _propTypes.default.func
};
var _default = exports.default = Draggable;