"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Base = require("../styles/Base");
var _Elements = require("../styles/Elements");
var _NewLaneTitleEditor = _interopRequireDefault(require("../widgets/NewLaneTitleEditor"));
var _v = _interopRequireDefault(require("uuid/v1"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var NewLane = _ref => {
  var {
    onCancel,
    onAdd,
    t
  } = _ref;
  var refInput = (0, _react.useRef)(null);
  var handleSubmit = () => {
    onAdd({
      id: (0, _v.default)(),
      title: getValue()
    });
  };
  var getValue = () => refInput.current.getValue();
  var onClickOutside = () => {
    if (getValue().length > 0) {
      handleSubmit();
    } else {
      onCancel();
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Base.Section, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.LaneTitle, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NewLaneTitleEditor.default, {
        ref: refInput,
        placeholder: t('placeholder.title'),
        onCancel: onCancel,
        onSave: handleSubmit,
        resize: "vertical",
        border: true,
        autoFocus: true
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Base.NewLaneButtons, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.AddButton, {
        onClick: handleSubmit,
        children: t('button.Add lane')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.CancelButton, {
        onClick: onCancel,
        children: t('button.Cancel')
      })]
    })]
  });
};
NewLane.propTypes = {
  onCancel: _propTypes.default.func.isRequired,
  onAdd: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
};
var _default = exports.default = NewLane;