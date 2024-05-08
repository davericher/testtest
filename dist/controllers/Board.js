"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _classnames = _interopRequireDefault(require("classnames"));
var _redux = require("redux");
var _reduxLogger = _interopRequireDefault(require("redux-logger"));
var _v = _interopRequireDefault(require("uuid/v1"));
var _BoardContainer = _interopRequireDefault(require("./BoardContainer"));
var _BoardReducer = _interopRequireDefault(require("../reducers/BoardReducer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var middlewares = process.env.REDUX_LOGGING ? [_reduxLogger.default] : [];
class Board extends _react.Component {
  constructor(_ref) {
    var {
      id
    } = _ref;
    super();
    (0, _defineProperty2.default)(this, "getStore", () => {
      //When you create multiple boards, unique stores are created for isolation
      return (0, _redux.createStore)(_BoardReducer.default, (0, _redux.applyMiddleware)(...middlewares));
    });
    this.store = this.getStore();
    this.id = id || (0, _v.default)();
  }
  render() {
    var {
      id,
      className,
      components
    } = this.props;
    var allClassNames = (0, _classnames.default)('react-trello-board', className || '');
    return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
      store: this.store
    }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(components.GlobalStyle, null), /*#__PURE__*/_react.default.createElement(_BoardContainer.default, (0, _extends2.default)({
      id: this.id
    }, this.props, {
      className: allClassNames
    }))));
  }
}
exports.default = Board;