"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Base = require("../styles/Base");
var _InlineInput = _interopRequireDefault(require("../widgets/InlineInput"));
var _Tag = _interopRequireDefault(require("./Card/Tag"));
var _DeleteButton = _interopRequireDefault(require("../widgets/DeleteButton"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
class Card extends _react.Component {
  constructor() {
    super(...arguments);
    (0, _defineProperty2.default)(this, "onDelete", e => {
      this.props.onDelete();
      e.stopPropagation();
    });
  }
  render() {
    var {
      showDeleteButton,
      style,
      tagStyle,
      onClick,
      onDelete,
      onChange,
      className,
      id,
      title,
      label,
      description,
      tags,
      cardDraggable,
      editable,
      t
    } = this.props;
    var updateCard = card => {
      onChange(_objectSpread(_objectSpread({}, card), {}, {
        id
      }));
    };
    return /*#__PURE__*/_react.default.createElement(_Base.MovableCardWrapper, {
      "data-id": id,
      onClick: onClick,
      style: style,
      className: className
    }, /*#__PURE__*/_react.default.createElement(_Base.CardHeader, null, /*#__PURE__*/_react.default.createElement(_Base.CardTitle, {
      draggable: cardDraggable
    }, editable ? /*#__PURE__*/_react.default.createElement(_InlineInput.default, {
      value: title,
      border: true,
      placeholder: t('placeholder.title'),
      resize: "vertical",
      onSave: value => updateCard({
        title: value
      })
    }) : title), /*#__PURE__*/_react.default.createElement(_Base.CardRightContent, null, editable ? /*#__PURE__*/_react.default.createElement(_InlineInput.default, {
      value: label,
      border: true,
      placeholder: t('placeholder.label'),
      resize: "vertical",
      onSave: value => updateCard({
        label: value
      })
    }) : label), showDeleteButton && /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      onClick: this.onDelete
    })), /*#__PURE__*/_react.default.createElement(_Base.Detail, null, editable ? /*#__PURE__*/_react.default.createElement(_InlineInput.default, {
      value: description,
      border: true,
      placeholder: t('placeholder.description'),
      resize: "vertical",
      onSave: value => updateCard({
        description: value
      })
    }) : description), tags && tags.length > 0 && /*#__PURE__*/_react.default.createElement(_Base.Footer, null, tags.map(tag => /*#__PURE__*/_react.default.createElement(_Tag.default, (0, _extends2.default)({
      key: tag.title
    }, tag, {
      tagStyle: tagStyle
    })))));
  }
}
Card.propTypes = {
  showDeleteButton: _propTypes.default.bool,
  onDelete: _propTypes.default.func,
  onClick: _propTypes.default.func,
  style: _propTypes.default.object,
  tagStyle: _propTypes.default.object,
  className: _propTypes.default.string,
  id: _propTypes.default.string.isRequired,
  title: _propTypes.default.string.isRequired,
  label: _propTypes.default.string,
  description: _propTypes.default.string,
  tags: _propTypes.default.array
};
Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  style: {},
  tagStyle: {},
  title: 'no title',
  description: '',
  label: '',
  tags: [],
  className: ''
};
var _default = exports.default = Card;