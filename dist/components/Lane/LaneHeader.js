"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _InlineInput = _interopRequireDefault(require("../../widgets/InlineInput"));
var _Base = require("../../styles/Base");
var _LaneMenu = _interopRequireDefault(require("./LaneHeader/LaneMenu"));
var _jsxRuntime = require("react/jsx-runtime");
var LaneHeaderComponent = _ref => {
  var {
    updateTitle,
    canAddLanes,
    onDelete,
    onDoubleClick,
    editLaneTitle,
    label,
    title,
    titleStyle,
    labelStyle,
    t,
    laneDraggable
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Base.LaneHeader, {
    onDoubleClick: onDoubleClick,
    editLaneTitle: editLaneTitle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.Title, {
      draggable: laneDraggable,
      style: titleStyle,
      children: editLaneTitle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_InlineInput.default, {
        value: title,
        border: true,
        placeholder: t('placeholder.title'),
        resize: "vertical",
        onSave: updateTitle
      }) : title
    }), label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.RightContent, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: labelStyle,
        children: label
      })
    }), canAddLanes && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LaneMenu.default, {
      t: t,
      onDelete: onDelete
    })]
  });
};
LaneHeaderComponent.propTypes = {
  updateTitle: _propTypes.default.func,
  editLaneTitle: _propTypes.default.bool,
  canAddLanes: _propTypes.default.bool,
  laneDraggable: _propTypes.default.bool,
  label: _propTypes.default.string,
  title: _propTypes.default.string,
  onDelete: _propTypes.default.func,
  onDoubleClick: _propTypes.default.func,
  t: _propTypes.default.func.isRequired
};
LaneHeaderComponent.defaultProps = {
  updateTitle: () => {},
  editLaneTitle: false,
  canAddLanes: false
};
var _default = exports.default = LaneHeaderComponent;