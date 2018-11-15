"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Drag = _interopRequireDefault(require("./Drag"));

var _antd = require("antd");

var _func = require("./func");

require("./customTable.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CustomTable =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CustomTable, _React$PureComponent);

  function CustomTable(props) {
    var _this;

    _classCallCheck(this, CustomTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomTable).call(this, props));
    _this.state = {
      reload: Math.random()
    };
    return _this;
  }

  _createClass(CustomTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          columns = _this$props.columns,
          dataSource = _this$props.dataSource,
          tableName = _this$props.tableName,
          defaultColumnsKey = _this$props.defaultColumnsKey,
          _this$props$defaultCo = _this$props.defaultColumnsNum,
          defaultColumnsNum = _this$props$defaultCo === void 0 ? 3 : _this$props$defaultCo,
          tableProps = _objectWithoutProperties(_this$props, ["columns", "dataSource", "tableName", "defaultColumnsKey", "defaultColumnsNum"]);

      if (!tableName) return;
      var initDataNum = Math.min(defaultColumnsNum, Object.keys(columns).length);
      var initShowKeys = defaultColumnsKey ? defaultColumnsKey : Object.keys(columns).filter(function (item, index) {
        return index < initDataNum;
      });
      var tableKeys = Object.entries(columns).map(function (_ref, index) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return {
          show: initShowKeys.includes(key),
          text: value.title,
          index: index,
          key: key
        };
      });
      var column = (0, _func.tableColumnsBuild)({
        tableName: tableName,
        columns: JSON.parse(JSON.stringify(columns)),
        initShowKeys: initShowKeys,
        tableKeys: tableKeys
      });

      var title = _react.default.createElement("div", {
        className: "setting",
        id: "setting"
      }, _react.default.createElement("span", null, column.length ? column[column.length - 1].title : ''), _react.default.createElement(_Drag.default, {
        tableName: tableName,
        tableKeys: tableKeys,
        onOk: function onOk(data) {
          return _this2.setState({
            reload: Math.random()
          });
        }
      }));

      if (column.length) {
        column[column.length - 1].title = title;
      }

      return _react.default.createElement(_antd.Table, _extends({}, tableProps, {
        columns: column,
        dataSource: dataSource
      }));
    }
  }]);

  return CustomTable;
}(_react.default.PureComponent);

exports.default = CustomTable;
CustomTable.prototypes = {
  dataSource: _propTypes.default.array,
  column: _propTypes.default.object,
  defaultColumnsKey: _propTypes.default.array,
  defaultColumnsNum: _propTypes.default.number
};
