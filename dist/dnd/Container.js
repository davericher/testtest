"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _kuikaSmoothDnd = _interopRequireWildcard(require("kuika-smooth-dnd"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
_kuikaSmoothDnd.default.dropHandler = _kuikaSmoothDnd.dropHandlers.reactDropHandler().handler;
_kuikaSmoothDnd.default.wrapChild = p => p;
var Container = props => {
  var containerDivRef = (0, _react.useRef)(null);
  var containerInstance = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    var getContainerOptions = () => {
      var functionProps = {
        onDragStart: props.onDragStart,
        onDragEnd: props.onDragEnd,
        onDrop: props.onDrop,
        getChildPayload: props.getChildPayload,
        shouldAnimateDrop: props.shouldAnimateDrop,
        shouldAcceptDrop: props.shouldAcceptDrop,
        onDragEnter: props.onDragEnter,
        onDragLeave: props.onDragLeave,
        onDropReady: props.onDropReady,
        getGhostParent: props.getGhostParent
      };
      return _objectSpread(_objectSpread({}, props), functionProps);
    };
    var updateContainer = () => {
      if (containerInstance.current) {
        containerInstance.current.dispose();
      }
      if (containerDivRef.current) {
        containerInstance.current = (0, _kuikaSmoothDnd.default)(containerDivRef.current, getContainerOptions());
      }
    };
    updateContainer();
    return () => {
      if (containerInstance.current) {
        containerInstance.current.dispose();
      }
    };
  }, [props]); // Dependencies array ensures effect runs on props change

  var setRef = element => {
    containerDivRef.current = element;
  };

  // Render function or default rendering
  if (props.render) {
    return props.render(setRef);
  } else {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: setRef,
      style: props.style,
      className: props.className,
      children: props.children
    });
  }
};
Container.propTypes = {
  behaviour: _propTypes.default.oneOf(['move', 'copy', 'drag-zone']),
  groupName: _propTypes.default.string,
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),
  style: _propTypes.default.object,
  dragHandleSelector: _propTypes.default.string,
  className: _propTypes.default.string,
  nonDragAreaSelector: _propTypes.default.string,
  dragBeginDelay: _propTypes.default.number,
  animationDuration: _propTypes.default.number,
  autoScrollEnabled: _propTypes.default.string,
  lockAxis: _propTypes.default.string,
  dragClass: _propTypes.default.string,
  dropClass: _propTypes.default.string,
  onDragStart: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDrop: _propTypes.default.func,
  getChildPayload: _propTypes.default.func,
  shouldAnimateDrop: _propTypes.default.func,
  shouldAcceptDrop: _propTypes.default.func,
  onDragEnter: _propTypes.default.func,
  onDragLeave: _propTypes.default.func,
  render: _propTypes.default.func,
  getGhostParent: _propTypes.default.func,
  removeOnDropOut: _propTypes.default.bool
};
Container.defaultProps = {
  behaviour: 'move',
  orientation: 'vertical',
  className: 'reactTrelloBoard'
};
var _default = exports.default = Container;