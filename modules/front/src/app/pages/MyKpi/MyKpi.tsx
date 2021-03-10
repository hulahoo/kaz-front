import React from 'react';
import {ColumnProps} from "antd/es/table";
import KzmTable, {SelectRowType} from "../../components/Table/KzmTable";
import {inject} from "mobx-react";
import {RootStoreProp} from "../../store";
import {formatDefaultDate} from "../../util/Date/Date";
import {kpiService} from "../../../cuba/kpi-service/kpiService";
import {RouteComponentProps, withRouter} from "react-router";

export type MyKpiTableMeta = {
  id: string,
  performancePlanName: string,
  startDate: Date,
  endDate: Date,
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
class MyKpi extends React.Component<RootStoreProp & RouteComponentProps<any>> {
  render() {
    const onRowClick = (record: MyKpiTableMeta, index: number, event: Event) => {
      this.props.history!.push("/kpi/" + record.id)
    };

    return (
      <div>
        <KzmTable columns={tableColumns} fetch={kpiService.myKpiList} onRowClick={onRowClick}
                  paginationPosition={"both"}
                  countFetch={kpiService.myKpiListCount} tableProps={{rowKey: "id"}}
        />
      </div>
    );
  }
}

export default withRouter(MyKpi);