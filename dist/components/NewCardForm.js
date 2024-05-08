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
var _EditableLabel = _interopRequireDefault(require("../widgets/EditableLabel"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var NewCardForm = _ref => {
  var {
    onCancel,
    onAdd,
    t
  } = _ref;
  var [title, setTitle] = (0, _react.useState)('');
  var [label, setLabel] = (0, _react.useState)('');
  var [description, setDescription] = (0, _react.useState)('');
  var handleAdd = () => {
    onAdd({
      title,
      label,
      description
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Base.CardForm, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Base.CardWrapper, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Base.CardHeader, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.CardTitle, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditableLabel.default, {
            placeholder: t('placeholder.title'),
            onChange: val => setTitle(val),
            autoFocus: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.CardRightContent, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditableLabel.default, {
            placeholder: t('placeholder.label'),
            onChange: val => setLabel(val)
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.Detail, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditableLabel.default, {
          placeholder: t('placeholder.description'),
          onChange: val => setDescription(val)
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.AddButton, {
      onClick: handleAdd,
      children: t('button.Add card')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.CancelButton, {
      onClick: onCancel,
      children: t('button.Cancel')
    })]
  });
};
NewCardForm.propTypes = {
  onCancel: _propTypes.default.func.isRequired,
  onAdd: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
};
var _default = exports.default = NewCardForm;