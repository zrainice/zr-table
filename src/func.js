import { dragMenuConfig } from './dragMenuConfig';

// 组装表格数据函数
function tableColumnsBuild({ tableName, columns, initShowKeys, tableKeys }) {
  // 此函数为 表格数据组装函数,需要注意的是 默认第一项 title 与 最后一项
  // operator 是必须的,如需取消第一项请设置第三个参数 firstPush 为 'none'
  // 如需设置第一项为其他名字,第三个参数请 传 对应名字的字符串

  // 如果版本过时先重新写入 local 新的数据
  // if (Number(window.localStorage.menuVersion) < menuVersionNow) getTableData(tableName);
  getTableData({ name: tableName, tableKeys });
  let temp = [];
  if (window.localStorage[tableName] === '' || !window.localStorage[tableName]) {
    // Object.entries(dragMenuConfig).forEach(([keyOut, valueOut]) => {
    //   Object.entries(valueOut.init).forEach(([key, value]) => {
    //     if (tableName === key) {
    //       value.forEach(item => temp.push(columns[item]));
    //     }
    //   });
    // });
    initShowKeys.forEach(item => temp.push(columns[item]));
    // 匹配不到写入默认数据
    if (!temp.length) {
      temp = Object.entries(columns).map(([key, value]) => (value))
    }
  } else {
    const data = JSON.parse(window.localStorage[tableName]);
    for (let i = 0; i < data.length; i++) {
      data[i].show && temp.push(columns[data[i].key]);
    }
  }
  return temp;
}

// 表格显示的个性化数据
function getTableData({ name, tableKeys }) {
  /* 当前个性化数据的版本, 每次修改个性化的数据 !! 务必  !! 把版本号加一,不然新加的数据不会显示,请求版本号控制变量 menuVersionNow 来控制版本
   注意相对上个版本最多加一,避免版本混乱,本地调试请 通过 清空 localStorage 或者 屏蔽下面把版本号写入localStorage来保证个性化表格数据最新 */

  const tableNameNow = [];
  // Object.entries(dragMenuConfig).forEach(([key, value]) => {
  //   value.tableName.forEach((item) => {
  //     tableNameNow.push({ value: item, data: value.table });
  //   });
  // });
  tableNameNow.push({ value: name, data: tableKeys });
  // 现有表格名称
  // const tableNameNow = [
  //   { value: 'majiaHomePageComment', data: majiaHomePageComment }
  // ];

  // 引入个性化数据版本概念,如果之前没有版本设置初始版本
  // if (window.localStorage.menuVersion === '' || !window.localStorage.menuVersion) {
  //   window.localStorage.setItem('menuVersion', '0');  // 应设置为当前版本,   防遗忘标记 !!!!!!!
  // }
  // 如果没有使用过 个性化设置 ,写入初始数据
  if (window.localStorage[name] === '' || !window.localStorage[name]) {
    const temp = tableNameNow.find(item => item.value === name);
    if (temp) {
      window.localStorage.setItem(name, JSON.stringify(temp.data));
    }
  }
  // 如果版本过时,依据最新数据改装并写入 localStorage
  // if (Number(window.localStorage.menuVersion) < menuVersionNow) {
    tableNameNow.map((item) => {
      const localData = window.localStorage[item.value];
      if (localData) {
        let newData = [];   // 新的数据
        let temp = JSON.parse(localData);   // 现如今的数据
        const dataLength = item.data.length;
        for (let i = 0; i < dataLength; i++) {
          const ifHave = temp.find(it => it.text === item.data[i].text && it.key === item.data[i].key);
          if (ifHave) {
            newData.push(ifHave);
          } else if (item.data[i]) {
            newData.push(item.data[i]);
          }
        }
        window.localStorage.setItem(item.value, JSON.stringify(newData));
        // 修改当前版本号, 本地 调试个性化 可以注释掉这句话使个性化数据最新
        // window.localStorage.setItem('menuVersion', menuVersionNow);
      }
      return null;
    });
  // }

  return JSON.parse(window.localStorage[name]);
}

export {
  tableColumnsBuild,
  getTableData
}
