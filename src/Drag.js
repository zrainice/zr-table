/* **************************************************************************************
 * 个性化显示拖拽组件,样式见表格的个性化设置弹窗,固定显示为 标题: 显示列  分标题: 已显示  未显示,后续根据需求提供自定义
 * API:
 * 名字                  作用                                   数据类型
 * tableName        表格名称,用于获取localStorage 对应数据      string 字符串
 *                  务必确保不同表格拥有不同的名字防止表格
 *                  的个性化数据不被覆盖
 * onOk             点击确认的回调函数                          func 函数
 *
 * *************************************************************************************** */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, Icon } from 'antd';
import { getTableData } from './func';
import './drag.less';

export default class DragMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: getTableData({ name: this.props.tableName, tableKeys: this.props.tableKeys }),
      visible: false
    };
  }

  onOk() {
    window.localStorage.setItem(this.props.tableName, JSON.stringify(this.state.tableData));
    this.setState({
      visible: false
    });
    this.props.onOk(this.state.tableData);
  }
  onCancel() {
    this.setState({
      visible: false
    });
  }
  onClickIcon() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const { visible } = this.state;
    let dropWhere;
    const onDragOver = (e, item) => {
      e.preventDefault();
      e.stopPropagation();
      dropWhere = item;
      if (item !== 'true' && item !== 'false') {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.borderColor = '#108ee9';
      }
    };
    const onDragLeave = (e, item) => {
      e.stopPropagation();
      e.target.style.transform = 'scale(1)';
      if (item.show) {
        e.target.style.borderColor = '#49a9ee';
      } else {
        e.target.style.borderColor = '#e5e5e5';
      }
    };
    const onDragStart = (e, item, index) => {
      item.index = index;
      e.dataTransfer.setData('text/plain', JSON.stringify(item));
    };
    const onDrop = (e) => {
      e.stopPropagation();
      e.target.style.transform = 'scale(1)';
      let tableData = this.state.tableData;
      const drag = JSON.parse(e.dataTransfer.getData('text'));
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
      this.setState({
        tableData
      });
    };
    // 表格个性化展示弹出层
    const Title = (
      <div className="set">
        <div className="ctb-flex-row-sa">
          <div>
            <p className="ctb-title">已显示</p>
            <div onDrop={e => onDrop(e)} onDragOver={e => onDragOver(e, 'true')} >
              {
                this.state.tableData.map((item, index) => item.show ? <div key={`show${index}`} draggable onDragStart={e => onDragStart(e, item, index)} onDrop={e => onDrop(e)} onDragLeave={e => onDragLeave(e, item)} onDragOver={e => onDragOver(e, index)}><div className="hover">{item.text}</div></div> : null)
              }
            </div>
          </div>
          <div>
            <p className="ctb-title">未显示</p>
            <div onDrop={e => onDrop(e)} onDragOver={e => onDragOver(e, 'false')}>
              {
                this.state.tableData.map((item, index) => item.show ? null : <div key={`disshow${index}`} draggable onDragStart={e => onDragStart(e, item, index)} onDrop={e => onDrop(e)} onDragLeave={e => onDragLeave(e, item)} onDragOver={e => onDragOver(e, index)}><div className="hover">{item.text}</div></div>)
              }
            </div>
          </div>
        </div>
        <div>
          <p>拖动改变位置哦</p>
          <Button type="primary" onClick={() => this.onOk()} >确认</Button>
          <Button type="primary" onClick={() => this.onCancel()} >取消</Button>
        </div>
      </div>
    );
    return (
      <Popover title="显示列" visible={visible} content={Title} trigger="click" autoAdjustOverflow placement="bottomRight">
        <Icon type="setting" className="icon" onClick={() => this.onClickIcon()} />
      </Popover>
    );
  }
}

DragMenu.propTypes = {
  data: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  tableName: PropTypes.string
};
