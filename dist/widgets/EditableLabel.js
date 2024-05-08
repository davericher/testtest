"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
class EditableLabel extends _react.default.Component {
  constructor(_ref) {
    var {
      value: _value
    } = _ref;
    super();
    (0, _defineProperty2.default)(this, "getText", el => {
      return el.innerText;
    });
    (0, _defineProperty2.default)(this, "onTextChange", ev => {
      var value = this.getText(ev.target);
      this.setState({
        value: value
      });
    });
    (0, _defineProperty2.default)(this, "onBlur", () => {
      this.props.onChange(this.state.value);
    });
    (0, _defineProperty2.default)(this, "onPaste", ev => {
      ev.preventDefault();
      var value = ev.clipboardData.getData('text');
      document.execCommand('insertText', false, value);
    });
    (0, _defineProperty2.default)(this, "getClassName", () => {
      var placeholder = this.state.value === '' ? 'comPlainTextContentEditable--has-placeholder' : '';
      return "comPlainTextContentEditable ".concat(placeholder);
    });
    (0, _defineProperty2.default)(this, "onKeyDown", e => {
      if (e.keyCode === 13) {
        this.props.onChange(this.state.value);
        this.refDiv.blur();
        e.preventDefault();
      }
      if (e.keyCode === 27) {
        this.refDiv.value = this.props.value;
        this.setState({
          value: this.props.value
        });
        // this.refDiv.blur()
        e.preventDefault();
        e.stopPropagation();
      }
    });
    this.state = {
      value: _value
    };
  }
  componentDidMount() {
    if (this.props.autoFocus) {
      this.refDiv.focus();
    }
  }
  render() {
    var placeholder = this.props.value.length > 0 ? false : this.props.placeholder;
    return /*#__PURE__*/_react.default.createElement("div", {
      ref: _ref2 => this.refDiv = _ref2,
      contentEditable: "true",
      className: this.getClassName(),
      onPaste: this.onPaste,
      onBlur: this.onBlur,
      onInput: this.onTextChange,
      onKeyDown: this.onKeyDown,
      placeholder: placeholder
    });
  }
}
EditableLabel.propTypes = {
  onChange: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  inline: _propTypes.default.bool,
  value: _propTypes.default.string
};
EditableLabel.defaultProps = {
  onChange: () => {},
  placeholder: '',
  autoFocus: false,
  inline: false,
  value: ''
};
var _default = exports.default = EditableLabel;