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
  return /*#__PURE__*/_react.default.createElement(_Base.CardForm, null, /*#__PURE__*/_react.default.createElement(_Base.CardWrapper, null, /*#__PURE__*/_react.default.createElement(_Base.CardHeader, null, /*#__PURE__*/_react.default.createElement(_Base.CardTitle, null, /*#__PURE__*/_react.default.createElement(_EditableLabel.default, {
    placeholder: t('placeholder.title'),
    onChange: val => setTitle(val),
    autoFocus: true
  })), /*#__PURE__*/_react.default.createElement(_Base.CardRightContent, null, /*#__PURE__*/_react.default.createElement(_EditableLabel.default, {
    placeholder: t('placeholder.label'),
    onChange: val => setLabel(val)
  }))), /*#__PURE__*/_react.default.createElement(_Base.Detail, null, /*#__PURE__*/_react.default.createElement(_EditableLabel.default, {
    placeholder: t('placeholder.description'),
    onChange: val => setDescription(val)
  }))), /*#__PURE__*/_react.default.createElement(_Elements.AddButton, {
    onClick: handleAdd
  }, t('button.Add card')), /*#__PURE__*/_react.default.createElement(_Elements.CancelButton, {
    onClick: onCancel
  }, t('button.Cancel')));
};
NewCardForm.propTypes = {
  onCancel: _propTypes.default.func.isRequired,
  onAdd: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
};
var _default = exports.default = NewCardForm;