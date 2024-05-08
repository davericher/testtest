"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _classnames = _interopRequireDefault(require("classnames"));
var _toolkit = require("@reduxjs/toolkit");
var _uuid = require("uuid");
var _BoardContainer = _interopRequireDefault(require("./BoardContainer"));
var _BoardReducer = _interopRequireDefault(require("../reducers/BoardReducer"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["id", "className", "components"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Board = _ref => {
  var {
      id,
      className,
      components
    } = _ref,
    additionalProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var [storeId] = (0, _react.useState)(id || (0, _uuid.v1)());
  var [store] = (0, _react.useState)(() => (0, _toolkit.configureStore)({
    reducer: _BoardReducer.default,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
  }));
  var allClassNames = (0, _classnames.default)('react-trello-board', className || '');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRedux.Provider, {
    store: store,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(components.GlobalStyle, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BoardContainer.default, _objectSpread(_objectSpread({
        components: components
      }, additionalProps), {}, {
        id: storeId,
        className: allClassNames
      }))]
    })
  });
};
var _default = exports.default = Board;