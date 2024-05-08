"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactPopopo = require("react-popopo");
var _Base = require("../../../styles/Base");
var _Elements = require("../../../styles/Elements");
var _jsxRuntime = require("react/jsx-runtime");
var LaneMenu = _ref => {
  var {
    t,
    onDelete
  } = _ref;
  var handleDelete = event => {
    event.preventDefault();
    onDelete();
  };
  console.log(_Elements.DeleteWrapper, _Elements.GenDelButton, _Elements.LaneMenuContent, _Elements.LaneMenuHeader, _Elements.LaneMenuItem, _Elements.LaneMenuTitle, _Elements.MenuButton);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactPopopo.Popover, {
    position: "bottom",
    PopoverContainer: _Base.CustomPopoverContainer,
    PopoverContent: _Base.CustomPopoverContent,
    trigger: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.MenuButton, {
      children: "\u22EE"
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Elements.LaneMenuHeader, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.LaneMenuTitle, {
        children: t('Lane actions')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.DeleteWrapper, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.GenDelButton, {
          onClick: handleDelete,
          children: "\u2716"
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.LaneMenuContent, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.LaneMenuItem, {
        onClick: handleDelete,
        children: t('Delete lane')
      })
    })]
  });
};
var _default = exports.default = LaneMenu;