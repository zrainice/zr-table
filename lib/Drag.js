"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _func = require("./func");

require("./drag.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DragMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DragMenu, _React$Component);

  function DragMenu(props) {
    var _this;

    _classCallCheck(this, DragMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DragMenu).call(this, props));
    _this.state = {
      tableData: (0, _func.getTableData)({
        name: _this.props.tableName,
        tableKeys: _this.props.tableKeys
      }),
      visible: false
    };
    return _this;
  }

  _createClass(DragMenu, [{
    key: "onOk",
    value: function onOk() {
      window.localStorage.setItem(this.props.tableName, JSON.stringify(this.state.tableData));
      this.setState({
        visible: false
      });
      this.props.onOk(this.state.tableData);
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: "onClickIcon",
    value: function onClickIcon() {
      this.setState({
        visible: !this.state.visible
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var visible = this.state.visible;
      var dropWhere;

      var _onDragOver = function onDragOver(e, item) {
        e.preventDefault();
        e.stopPropagation();
        dropWhere = item;

        if (item !== 'true' && item !== 'false') {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.borderColor = '#108ee9';
        }
      };

      var _onDragLeave = function onDragLeave(e, item) {
        e.stopPropagation();
        e.target.style.transform = 'scale(1)';

        if (item.show) {
          e.target.style.borderColor = '#49a9ee';
        } else {
          e.target.style.borderColor = '#e5e5e5';
        }
      };

      var _onDragStart = function onDragStart(e, item, index) {
        item.index = index;
        e.dataTransfer.setData('text/plain', JSON.stringify(item));
      };

      var _onDrop = function onDrop(e) {
        e.stopPropagation();
        e.target.style.transform = 'scale(1)';
        var tableData = _this2.state.tableData;
        var drag = JSON.parse(e.dataTransfer.getData('text'));

        if (dropWhere === 'true') {
          drag.show = true;
          tableData.splice(drag.index, 1);
          drag.index = tableData.length;
          tableData.push(drag);
        } else if (dropWhere === 'false') {
          drag.show = false;
          tableData.splice(drag.index, 1);
          drag.index = tableData.length;
          tableData.push(drag);
        } else if (typeof dropWhere === 'number') {
          if (tableData[dropWhere].show) {
            e.target.style.borderColor = '#49a9ee';
          } else {
            e.target.style.borderColor = '#e5e5e5';
          }

          drag.show = tableData[dropWhere].show;
          tableData.splice(drag.index, 1);
          tableData.splice(dropWhere, 0, drag);
        }

        _this2.setState({
          tableData: tableData
        });
      }; // 表格个性化展示弹出层


      var Title = _react.default.createElement("div", {
        className: "set"
      }, _react.default.createElement("div", {
        className: "ctb-flex-row-sa"
      }, _react.default.createElement("div", null, _react.default.createElement("p", {
        className: "ctb-title"
      }, "\u5DF2\u663E\u793A"), _react.default.createElement("div", {
        onDrop: function onDrop(e) {
          return _onDrop(e);
        },
        onDragOver: function onDragOver(e) {
          return _onDragOver(e, 'true');
        }
      }, this.state.tableData.map(function (item, index) {
        return item.show ? _react.default.createElement("div", {
          key: "show".concat(index),
          draggable: true,
          onDragStart: function onDragStart(e) {
            return _onDragStart(e, item, index);
          },
          onDrop: function onDrop(e) {
            return _onDrop(e);
          },
          onDragLeave: function onDragLeave(e) {
            return _onDragLeave(e, item);
          },
          onDragOver: function onDragOver(e) {
            return _onDragOver(e, index);
          }
        }, _react.default.createElement("div", {
          className: "hover"
        }, item.text)) : null;
      }))), _react.default.createElement("div", null, _react.default.createElement("p", {
        className: "ctb-title"
      }, "\u672A\u663E\u793A"), _react.default.createElement("div", {
        onDrop: function onDrop(e) {
          return _onDrop(e);
        },
        onDragOver: function onDragOver(e) {
          return _onDragOver(e, 'false');
        }
      }, this.state.tableData.map(function (item, index) {
        return item.show ? null : _react.default.createElement("div", {
          key: "disshow".concat(index),
          draggable: true,
          onDragStart: function onDragStart(e) {
            return _onDragStart(e, item, index);
          },
          onDrop: function onDrop(e) {
            return _onDrop(e);
          },
          onDragLeave: function onDragLeave(e) {
            return _onDragLeave(e, item);
          },
          onDragOver: function onDragOver(e) {
            return _onDragOver(e, index);
          }
        }, _react.default.createElement("div", {
          className: "hover"
        }, item.text));
      })))), _react.default.createElement("div", null, _react.default.createElement("p", null, "\u62D6\u52A8\u6539\u53D8\u4F4D\u7F6E\u54E6"), _react.default.createElement(_antd.Button, {
        type: "primary",
        onClick: function onClick() {
          return _this2.onOk();
        }
      }, "\u786E\u8BA4"), _react.default.createElement(_antd.Button, {
        type: "primary",
        onClick: function onClick() {
          return _this2.onCancel();
        }
      }, "\u53D6\u6D88")));

      return _react.default.createElement(_antd.Popover, {
        title: "\u663E\u793A\u5217",
        visible: visible,
        content: Title,
        trigger: "click",
        autoAdjustOverflow: true,
        placement: "bottomRight"
      }, _react.default.createElement(_antd.Icon, {
        type: "setting",
        className: "icon",
        onClick: function onClick() {
          return _this2.onClickIcon();
        }
      }));
    }
  }]);

  return DragMenu;
}(_react.default.Component);

exports.default = DragMenu;
DragMenu.propTypes = {
  data: _propTypes.default.object,
  onOk: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  tableName: _propTypes.default.string
};
