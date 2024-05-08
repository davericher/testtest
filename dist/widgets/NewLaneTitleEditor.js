"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Base = require("../styles/Base");
var _autosize = _interopRequireDefault(require("autosize"));
var _jsxRuntime = require("react/jsx-runtime");
class NewLaneTitleEditor extends _react.default.Component {
  constructor() {
    super(...arguments);
    (0, _defineProperty2.default)(this, "onKeyDown", e => {
      if (e.keyCode === 13) {
        this.refInput.blur();
        this.props.onSave();
        e.preventDefault();
      }
      if (e.keyCode === 27) {
        this.cancel();
        e.preventDefault();
      }
      if (e.keyCode === 9) {
        if (this.getValue().length === 0) {
          this.cancel();
        } else {
          this.props.onSave();
        }
        e.preventDefault();
      }
    });
    (0, _defineProperty2.default)(this, "cancel", () => {
      this.setValue('');
      this.props.onCancel();
      this.refInput.blur();
    });
    (0, _defineProperty2.default)(this, "getValue", () => this.refInput.value);
    (0, _defineProperty2.default)(this, "setValue", value => this.refInput.value = value);
    (0, _defineProperty2.default)(this, "saveValue", () => {
      if (this.getValue() !== this.props.value) {
        this.props.onSave(this.getValue());
      }
    });
    (0, _defineProperty2.default)(this, "focus", () => this.refInput.focus());
    (0, _defineProperty2.default)(this, "setRef", ref => {
      this.refInput = ref;
      if (this.props.resize !== 'none') {
        (0, _autosize.default)(this.refInput);
      }
    });
  }
  render() {
    var {
      autoFocus,
      resize,
      border,
      autoResize,
      value,
      placeholder
    } = this.props;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.InlineInput, {
      style: {
        resize: resize
      },
      ref: this.setRef,
      border: border,
      onKeyDown: this.onKeyDown,
      placeholder: value.length === 0 ? undefined : placeholder,
      defaultValue: value,
      rows: 3,
      autoResize: autoResize,
      autoFocus: autoFocus
    });
  }
}
NewLaneTitleEditor.propTypes = {
  onSave: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  border: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  value: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  autoResize: _propTypes.default.bool,
  resize: _propTypes.default.oneOf(['none', 'vertical', 'horizontal'])
};
NewLaneTitleEditor.defaultProps = {
  inputRef: () => {},
  onSave: () => {},
  onCancel: () => {},
  placeholder: '',
  value: '',
  border: false,
  autoFocus: false,
  autoResize: false,
  resize: 'none'
};
var _default = exports.default = NewLaneTitleEditor;