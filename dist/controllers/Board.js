"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _classnames = _interopRequireDefault(require("classnames"));
var _redux = require("redux");
var _reduxLogger = _interopRequireDefault(require("redux-logger"));
var _uuid = require("uuid");
var _BoardContainer = _interopRequireDefault(require("./BoardContainer"));
var _BoardReducer = _interopRequireDefault(require("../reducers/BoardReducer"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var middlewares = process.env.REDUX_LOGGING ? [_reduxLogger.default] : [];
var Board = _ref => {
  var {
    id,
    className,
    components
  } = _ref;
  var [storeId] = (0, _react.useState)(id || (0, _uuid.v1)());
  var [store] = (0, _react.useState)(() => (0, _redux.createStore)(_BoardReducer.default, (0, _redux.applyMiddleware)(...middlewares)));
  var allClassNames = (0, _classnames.default)('react-trello-board', className || '');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRedux.Provider, {
    store: store,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(components.GlobalStyle, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BoardContainer.default, {
        id: storeId,
        className: allClassNames
      })]
    })
  });
};
var _default = exports.default = Board;