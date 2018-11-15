import React from 'react';
import PropTypes from 'prop-types';
import DragMenu from './Drag';
import { Table } from 'antd';
import { tableColumnsBuild } from './func';
import './customTable.less';

export default class CustomTable extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = { reload: Math.random() }
  }
  render() {
    const { columns, dataSource, tableName, defaultColumnsKey, defaultColumnsNum = 3, ...tableProps } = this.props;
    if (!tableName) return;
    const initDataNum = Math.min(defaultColumnsNum, Object.keys(columns).length);
    const initShowKeys = defaultColumnsKey ? defaultColumnsKey : Object.keys(columns).filter((item, index) => index < initDataNum);
    const tableKeys = Object.entries(columns).map(([key, value], index) => ({ show: initShowKeys.includes(key), text: value.title, index, key }));
    let column = tableColumnsBuild({
      tableName,
      columns: JSON.parse(JSON.stringify(columns)),
      initShowKeys,
      tableKeys
    });

    const title = <div className="setting" id="setting">
      <span>{column.length ? column[column.length - 1].title : ''}</span>
      <DragMenu tableName={tableName} tableKeys={tableKeys} onOk={data => this.setState({ reload: Math.random() })} />
    </div>;
    if (column.length) {
      column[column.length - 1].title = title;
    }
    return (
      <Table
        {...tableProps}
        columns={column}
        dataSource={dataSource}
      />
    );
  }
}
CustomTable.prototypes = {
  dataSource: PropTypes.array,
  column: PropTypes.object,
  defaultColumnsKey: PropTypes.array,
  defaultColumnsNum: PropTypes.number
};
