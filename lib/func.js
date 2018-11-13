"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableColumnsBuild = tableColumnsBuild;
exports.getTableData = getTableData;

var _dragMenuConfig = require("./dragMenuConfig");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// 组装表格数据函数
function tableColumnsBuild(_ref) {
  var tableName = _ref.tableName,
      columns = _ref.columns,
      initShowKeys = _ref.initShowKeys,
      tableKeys = _ref.tableKeys;
  // 此函数为 表格数据组装函数,需要注意的是 默认第一项 title 与 最后一项
  // operator 是必须的,如需取消第一项请设置第三个参数 firstPush 为 'none'
  // 如需设置第一项为其他名字,第三个参数请 传 对应名字的字符串
  // 如果版本过时先重新写入 local 新的数据
  // if (Number(window.localStorage.menuVersion) < menuVersionNow) getTableData(tableName);
  getTableData({
    name: tableName,
    tableKeys: tableKeys
  });
  var temp = [];

  if (window.localStorage[tableName] === '' || !window.localStorage[tableName]) {
    // Object.entries(dragMenuConfig).forEach(([keyOut, valueOut]) => {
    //   Object.entries(valueOut.init).forEach(([key, value]) => {
    //     if (tableName === key) {
    //       value.forEach(item => temp.push(columns[item]));
    //     }
    //   });
    // });
    initShowKeys.forEach(function (item) {
      return temp.push(columns[item]);
    }); // 匹配不到写入默认数据

    if (!temp.length) {
      temp = Object.entries(columns).map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        return value;
      });
    }
  } else {
    var data = JSON.parse(window.localStorage[tableName]);

    for (var i = 0; i < data.length; i++) {
      data[i].show && temp.push(columns[data[i].key]);
    }
  }

  return temp;
} // 表格显示的个性化数据


function getTableData(_ref4) {
  var name = _ref4.name,
      tableKeys = _ref4.tableKeys;

  /* 当前个性化数据的版本, 每次修改个性化的数据 !! 务必  !! 把版本号加一,不然新加的数据不会显示,请求版本号控制变量 menuVersionNow 来控制版本
   注意相对上个版本最多加一,避免版本混乱,本地调试请 通过 清空 localStorage 或者 屏蔽下面把版本号写入localStorage来保证个性化表格数据最新 */
  var tableNameNow = []; // Object.entries(dragMenuConfig).forEach(([key, value]) => {
  //   value.tableName.forEach((item) => {
  //     tableNameNow.push({ value: item, data: value.table });
  //   });
  // });

  tableNameNow.push({
    value: name,
    data: tableKeys
  }); // 现有表格名称
  // const tableNameNow = [
  //   { value: 'majiaHomePageComment', data: majiaHomePageComment }
  // ];
  // 引入个性化数据版本概念,如果之前没有版本设置初始版本
  // if (window.localStorage.menuVersion === '' || !window.localStorage.menuVersion) {
  //   window.localStorage.setItem('menuVersion', '0');  // 应设置为当前版本,   防遗忘标记 !!!!!!!
  // }
  // 如果没有使用过 个性化设置 ,写入初始数据

  if (window.localStorage[name] === '' || !window.localStorage[name]) {
    var temp = tableNameNow.find(function (item) {
      return item.value === name;
    });

    if (temp) {
      window.localStorage.setItem(name, JSON.stringify(temp.data));
    }
  } // 如果版本过时,依据最新数据改装并写入 localStorage
  // if (Number(window.localStorage.menuVersion) < menuVersionNow) {


  tableNameNow.map(function (item) {
    var localData = window.localStorage[item.value];

    if (localData) {
      var newData = []; // 新的数据

      var _temp = JSON.parse(localData); // 现如今的数据


      var dataLength = item.data.length;

      var _loop = function _loop(i) {
        var ifHave = _temp.find(function (it) {
          return it.text === item.data[i].text && it.key === item.data[i].key;
        });

        if (ifHave) {
          newData.push(ifHave);
        } else if (item.data[i]) {
          newData.push(item.data[i]);
        }
      };

      for (var i = 0; i < dataLength; i++) {
        _loop(i);
      }

      window.localStorage.setItem(item.value, JSON.stringify(newData)); // 修改当前版本号, 本地 调试个性化 可以注释掉这句话使个性化数据最新
      // window.localStorage.setItem('menuVersion', menuVersionNow);
    }

    return null;
  }); // }

  return JSON.parse(window.localStorage[name]);
}