"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThreeDepthCheckedComponent = exports.TwoDepthCheckedComponent = exports.OneDepthCheckedComponent = exports.default = exports.compare = void 0;

var _every2 = _interopRequireDefault(require("lodash/every"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isEqualWith2 = _interopRequireDefault(require("lodash/isEqualWith"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var compare = function compare(depth) {
  return function (curr, next) {
    return (0, _isEqualWith2.default)(curr, next, function (c, n) {
      if (_typeof(c) !== _typeof(n) || !(0, _isEqual2.default)((0, _keys2.default)(curr), (0, _keys2.default)(next))) {
        return false;
      } // object already has same length + same keys


      if (depth >= 0 && (0, _isObject2.default)(c)) {
        return (0, _every2.default)(c, function (cc, i) {
          return compare(depth - 1)(cc, n[i]);
        });
      }

      return c === n;
    });
  };
};

exports.compare = compare;

var createChecker = function createChecker() {
  var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(NDepthChecker, _React$Component);

      function NDepthChecker() {
        _classCallCheck(this, NDepthChecker);

        return _possibleConstructorReturn(this, (NDepthChecker.__proto__ || Object.getPrototypeOf(NDepthChecker)).apply(this, arguments));
      }

      _createClass(NDepthChecker, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          var f = compare(depth);
          return f(this.props, nextProps) && f(this.state, nextState);
        }
      }]);

      return NDepthChecker;
    }(_react.default.Component)
  );
};

var _default = createChecker;
exports.default = _default;
var OneDepthCheckedComponent = createChecker(1);
exports.OneDepthCheckedComponent = OneDepthCheckedComponent;
var TwoDepthCheckedComponent = createChecker(2);
exports.TwoDepthCheckedComponent = TwoDepthCheckedComponent;
var ThreeDepthCheckedComponent = createChecker(3);
exports.ThreeDepthCheckedComponent = ThreeDepthCheckedComponent;
