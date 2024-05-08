"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BoardContainer", {
  enumerable: true,
  get: function get() {
    return _BoardContainer.default;
  }
});
Object.defineProperty(exports, "Container", {
  enumerable: true,
  get: function get() {
    return _Container.default;
  }
});
Object.defineProperty(exports, "Draggable", {
  enumerable: true,
  get: function get() {
    return _Draggable.default;
  }
});
Object.defineProperty(exports, "Lane", {
  enumerable: true,
  get: function get() {
    return _Lane.default;
  }
});
Object.defineProperty(exports, "components", {
  enumerable: true,
  get: function get() {
    return _components.default;
  }
});
Object.defineProperty(exports, "createTranslate", {
  enumerable: true,
  get: function get() {
    return _createTranslate.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "locales", {
  enumerable: true,
  get: function get() {
    return _locales.default;
  }
});
Object.defineProperty(exports, "widgets", {
  enumerable: true,
  get: function get() {
    return _widgets.default;
  }
});
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _Draggable = _interopRequireDefault(require("./dnd/Draggable"));
var _Container = _interopRequireDefault(require("./dnd/Container"));
var _BoardContainer = _interopRequireDefault(require("./controllers/BoardContainer"));
var _Board = _interopRequireDefault(require("./controllers/Board"));
var _Lane = _interopRequireDefault(require("./controllers/Lane"));
var _deprecationWarnings = _interopRequireDefault(require("./helpers/deprecationWarnings"));
var _components = _interopRequireDefault(require("./components"));
var _locales = _interopRequireDefault(require("./locales"));
var _widgets = _interopRequireDefault(require("./widgets"));
var _createTranslate = _interopRequireDefault(require("./helpers/createTranslate"));
var _styledComponents = require("styled-components");
var _isPropValid = _interopRequireDefault(require("@emotion/is-prop-valid"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["components", "lang"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var DEFAULT_LANG = 'en';

// Enhanced default export using arrow function for simplicity
var TrelloBoard = _ref => {
  var _locales$lang;
  var {
      components,
      lang = DEFAULT_LANG
    } = _ref,
    otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  (0, _deprecationWarnings.default)(otherProps);
  var translate = (0, _createTranslate.default)(((_locales$lang = _locales.default[lang]) === null || _locales$lang === void 0 ? void 0 : _locales$lang.translation) || {});
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styledComponents.StyleSheetManager, {
    shouldForwardProp: shouldForwardProp,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Board.default, _objectSpread({
      t: translate,
      components: _objectSpread(_objectSpread({}, _components.default), components)
    }, otherProps)), ";"]
  });
};
var shouldForwardProp = (propName, target) => {
  if (typeof target === 'string') {
    return (0, _isPropValid.default)(propName);
  }
  return true;
};
var _default = exports.default = TrelloBoard;