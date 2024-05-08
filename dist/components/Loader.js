"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Loader = require("../styles/Loader");
var _jsxRuntime = require("react/jsx-runtime");
var Loader = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Loader.LoaderDiv, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Loader.LoadingBar, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Loader.LoadingBar, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Loader.LoadingBar, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Loader.LoadingBar, {})]
});
var _default = exports.default = Loader;