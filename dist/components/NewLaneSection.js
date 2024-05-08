"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Base = require("../styles/Base");
var _Elements = require("../styles/Elements");
var _jsxRuntime = require("react/jsx-runtime");
var NewLaneSectionComponent = _ref => {
  var {
    t,
    onClick
  } = _ref;
  var handleClick = event => {
    event.preventDefault();
    onClick();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.NewLaneSection, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.AddLaneLink, {
      t: t,
      onClick: handleClick,
      children: t('Add another lane')
    })
  });
};
var _default = exports.default = NewLaneSectionComponent;