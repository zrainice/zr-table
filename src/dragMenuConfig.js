/*
* 使用说明:
 * menuVersionNow 表示当前个性化的版本,每次修改个性化配置版本号加一,重要!!!!!!
 * dragMenuConfig 为个性化表格的数据,为一个对象类型格式如下
 * dragMenuConfig: {
 *  xxx(个性化表格数据的名称): {
 *    tableName: [使用该个性化表格数据的表格名称,数组里面的每个表示一个表格名称],
 *    init: {
 *      tableName: [] 初次使用个性化表格写入的初始数据,数组类型,上面每个 tableName 应在这里对应一个,重要
 *    },
 *    table: [{}] 个性化表格的数据写在此处
 *  },
 *  ...
 * } */

// 当前个性化的版本,每次修改个性化配置这个加一
const menuVersionNow = 29;
const dragMenuConfig = {
  // 测试
  test: {
    tableName: ['test'],
    init: {
      starImgManage: ['id', 'name', 'other']
    },
    table: [
      { show: true, text: 'ID', index: 0, key: 'id' },
      { show: true, text: '名称', index: 1, key: 'name' },
      { show: true, text: '性别', index: 2, key: 'sex' },
      { show: true, text: '其他', index: 2, key: 'other' }
    ]
  }
};

export { dragMenuConfig, menuVersionNow };
