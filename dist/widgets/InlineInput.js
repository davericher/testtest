"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Base = require("../styles/Base");
var _autosize = _interopRequireDefault(require("autosize"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var InlineInputController = _ref => {
  var {
    onSave,
    border,
    placeholder,
    value,
    autoFocus,
    resize,
    onCancel
  } = _ref;
  var inputRef = (0, _react.useRef)(null);
  var [inputValue, setInputValue] = (0, _react.useState)(value);

  // Effect for autosizing and initial autoFocus
  (0, _react.useEffect)(() => {
    if (inputRef.current && resize !== 'none') {
      (0, _autosize.default)(inputRef.current);
    }
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
    }
  }, [resize, autoFocus]);

  // Effect to update value when props change
  (0, _react.useEffect)(() => {
    setInputValue(value);
  }, [value]);
  var handleFocus = e => e.target.select();
  var handleMouseDown = e => {
    if (document.activeElement !== e.target) {
      e.preventDefault();
      inputRef.current.focus();
    }
  };
  var handleBlur = () => {
    updateValue();
  };
  var handleKeyDown = e => {
    if (e.keyCode === 13) {
      // Enter
      inputRef.current.blur();
      e.preventDefault();
    } else if (e.keyCode === 27) {
      // Escape
      setInputValue(value); // Reset to initial value
      inputRef.current.blur();
      e.preventDefault();
    } else if (e.keyCode === 9) {
      // Tab
      if (inputValue.length === 0) {
        onCancel();
      }
      inputRef.current.blur();
      e.preventDefault();
    }
  };
  var updateValue = () => {
    if (inputValue !== value) {
      onSave(inputValue);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_Base.InlineInput, {
    ref: inputRef,
    border: border,
    onMouseDown: handleMouseDown,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    placeholder: inputValue.length === 0 ? undefined : placeholder,
    value: inputValue,
    onChange: e => setInputValue(e.target.value),
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: "false",
    dataGramm: "false",
    rows: 1,
    autoFocus: autoFocus
  });
};
InlineInputController.propTypes = {
  onSave: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  border: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  value: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  resize: _propTypes.default.oneOf(['none', 'vertical', 'horizontal'])
};
InlineInputController.defaultProps = {
  onSave: () => {},
  onCancel: () => {},
  placeholder: '',
  value: '',
  border: false,
  autoFocus: false,
  resize: 'none'
};
var _default = exports.default = InlineInputController;