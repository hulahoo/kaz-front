import React from 'react';
import {ColumnProps} from "antd/es/table";
import KzmTable, {SelectRowType} from "../../components/Table/KzmTable";
import {CardStatusEnum} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {inject} from "mobx-react";
import {MatchParams, RootStoreProp, RouteComponentProps} from "../../store";
import {restServices} from "../../../cuba/services";
import {formatDefaultDate} from "../../util/Date/Date";

export type MyKpiTableMeta = {
  id: string,
  performancePlanName: string,
  startDate: Date,
  endDate: Date,
  status: CardStatusEnum
}

const tableColumns: ColumnProps<MyKpiTableMeta>[] = [{
  title: "План",
  dataIndex: 'performancePlanName',
  key: "performance_plan_name",
  sorter: true,
  filtered: true
}, {
  title: "Оцениваемые периоды - начало",
  dataIndex: 'startDate',
  sorter: true,
  filtered: true,
  render: (value: string) => {
    return <span>{formatDefaultDate(new Date(value))}</span>
  }
}, {
  title: "Оцениваемые периоды - окончание",
  dataIndex: 'endDate',
  sorter: true,
  filtered: true,
  render: (value: string) => {
    return <span>{formatDefaultDate(new Date(value))}</span>
  }
}, {
  title: "Этап",
  dataIndex: 'statusName',
  sorter: true,
  filtered: true
}]

@inject("rootStore")
class MyKpi extends React.Component<RootStoreProp & RouteComponentProps<MatchParams>> {

  render() {
    const onRowClick = (record: MyKpiTableMeta, index: number, event: Event) => {
      this.props.history!.push("/kpi/" + record.id)
    }

    return (
      <div>
        <KzmTable columns={tableColumns} fetch={restServices.kpiService.myKpiList} onRowClick={onRowClick}
                  paginationPosition={"both"}
                  countFetch={restServices.kpiService.myKpiListCount} tableProps={{rowKey: "id"}}
        />
      </div>
    );
  }
}

export default MyKpi;