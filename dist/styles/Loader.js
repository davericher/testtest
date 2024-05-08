"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingBar = exports.LoaderDiv = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _templateObject, _templateObject2, _templateObject3;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var keyframeAnimation = (0, _styledComponents.keyframes)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n    0% {\n        transform: scale(1);\n    }\n    20% {\n        transform: scale(1, 2.2);\n    }\n    40% {\n        transform: scale(1);\n    }\n"])));
var LoaderDiv = exports.LoaderDiv = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  text-align: center;\n  margin: 15px 0;\n"])));
var LoadingBar = exports.LoadingBar = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: inline-block;\n  margin: 0 2px;\n  width: 4px;\n  height: 18px;\n  border-radius: 4px;\n  animation: ", " 1s ease-in-out infinite;\n  background-color: #777;\n\n  &:nth-child(1) {\n    animation-delay: 0.0001s;\n  }\n\n  &:nth-child(2) {\n    animation-delay: 0.09s;\n  }\n\n  &:nth-child(3) {\n    animation-delay: 0.18s;\n  }\n\n  &:nth-child(4) {\n    animation-delay: 0.27s;\n  }\n"])), keyframeAnimation);