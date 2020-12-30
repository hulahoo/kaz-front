import React from 'react';
import {Table} from "antd";
import {ColumnProps} from "antd/es/table";
import {observable} from "mobx";
import {AssignedGoal} from "../../../cuba/entities/base/tsadv$AssignedGoal";

const tableColumns: ColumnProps<AssignedGoal>[] = [{
  title: "Процедура",
  dataIndex: 'procedure',
  sorter: true,
  filtered: true
}, {
  title: "Оцениваемые периоды - начало",
  dataIndex: 'startDate',
  sorter: true,
  filtered: true
}, {
  title: "Оцениваемые периоды - окончание",
  dataIndex: 'endDate',
  sorter: true,
  filtered: true
}, {
  title: "Этап",
  dataIndex: 'stage',
  sorter: true,
  filtered: true
}, {
  title: "Мои действия",
  dataIndex: 'action',
  sorter: true,
  filtered: true
}]

class MyKpi extends React.Component {

  render() {
    return (
      <div>
        <Table columns={tableColumns}>

        </Table>
      </div>
    );
  }
}

export default MyKpi;