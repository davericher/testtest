"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _kuikaSmoothDnd = _interopRequireWildcard(require("kuika-smooth-dnd"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
_kuikaSmoothDnd.default.dropHandler = _kuikaSmoothDnd.dropHandlers.reactDropHandler().handler;
_kuikaSmoothDnd.default.wrapChild = p => p; // dont wrap children they will already be wrapped

class Container extends _react.Component {
  constructor(props) {
    super(props);
    this.getContainerOptions = this.getContainerOptions.bind(this);
    this.setRef = this.setRef.bind(this);
    this.prevContainer = null;
  }
  componentDidMount() {
    this.containerDiv = this.containerDiv || _reactDom.default.findDOMNode(this);
    this.prevContainer = this.containerDiv;
    this.container = (0, _kuikaSmoothDnd.default)(this.containerDiv, this.getContainerOptions());
  }
  componentWillUnmount() {
    this.container.dispose();
    this.container = null;
  }
  componentDidUpdate() {
    this.containerDiv = this.containerDiv || _reactDom.default.findDOMNode(this);
    if (this.containerDiv) {
      if (this.prevContainer && this.prevContainer !== this.containerDiv) {
        this.container.dispose();
        this.container = (0, _kuikaSmoothDnd.default)(this.containerDiv, this.getContainerOptions());
        this.prevContainer = this.containerDiv;
      }
    }
  }
  render() {
    if (this.props.render) {
      return this.props.render(this.setRef);
    } else {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: this.props.style,
        ref: this.setRef,
        children: this.props.children
      });
    }
  }
  setRef(element) {
    this.containerDiv = element;
  }
  getContainerOptions() {
    var _this = this;
    var functionProps = {};
    if (this.props.onDragStart) {
      functionProps.onDragStart = function () {
        return _this.props.onDragStart(...arguments);
      };
    }
    if (this.props.onDragEnd) {
      functionProps.onDragEnd = function () {
        return _this.props.onDragEnd(...arguments);
      };
    }
    if (this.props.onDrop) {
      functionProps.onDrop = function () {
        return _this.props.onDrop(...arguments);
      };
    }
    if (this.props.getChildPayload) {
      functionProps.getChildPayload = function () {
        return _this.props.getChildPayload(...arguments);
      };
    }
    if (this.props.shouldAnimateDrop) {
      functionProps.shouldAnimateDrop = function () {
        return _this.props.shouldAnimateDrop(...arguments);
      };
    }
    if (this.props.shouldAcceptDrop) {
      functionProps.shouldAcceptDrop = function () {
        return _this.props.shouldAcceptDrop(...arguments);
      };
    }
    if (this.props.onDragEnter) {
      functionProps.onDragEnter = function () {
        return _this.props.onDragEnter(...arguments);
      };
    }
    if (this.props.onDragLeave) {
      functionProps.onDragLeave = function () {
        return _this.props.onDragLeave(...arguments);
      };
    }
    if (this.props.render) {
      functionProps.render = function () {
        return _this.props.render(...arguments);
      };
    }
    if (this.props.onDropReady) {
      functionProps.onDropReady = function () {
        return _this.props.onDropReady(...arguments);
      };
    }
    if (this.props.getGhostParent) {
      functionProps.getGhostParent = function () {
        return _this.props.getGhostParent(...arguments);
      };
    }
    return Object.assign({}, this.props, functionProps);
  }
}
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