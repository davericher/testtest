"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Base = require("../styles/Base");
var _Elements = require("../styles/Elements");
var _NewLaneTitleEditor = _interopRequireDefault(require("../widgets/NewLaneTitleEditor"));
var _uuid = require("uuid");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class NewLane extends _react.Component {
  constructor() {
    super(...arguments);
    (0, _defineProperty2.default)(this, "handleSubmit", () => {
      this.props.onAdd({
        id: (0, _uuid.v1)(),
        title: this.getValue()
      });
    });
    (0, _defineProperty2.default)(this, "getValue", () => this.refInput.getValue());
    (0, _defineProperty2.default)(this, "onClickOutside", (a, b, c) => {
      if (this.getValue().length > 0) {
        this.handleSubmit();
      } else {
        this.props.onCancel();
      }
    });
  }
  render() {
    var {
      onCancel,
      t
    } = this.props;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Base.Section, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.LaneTitle, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NewLaneTitleEditor.default, {
          ref: _ref => this.refInput = _ref,
          placeholder: t('placeholder.title'),
          onCancel: this.props.onCancel,
          onSave: this.handleSubmit,
          resize: "vertical",
          border: true,
          autoFocus: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Base.NewLaneButtons, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.AddButton, {
          onClick: this.handleSubmit,
          children: t('button.Add lane')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Elements.CancelButton, {
          onClick: onCancel,
          children: t('button.Cancel')
        })]
      })]
    });
  }
}
NewLane.propTypes = {
  onCancel: _propTypes.default.func.isRequired,
  onAdd: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
};
NewLane.defaultProps = {};
var _default = exports.default = NewLane;