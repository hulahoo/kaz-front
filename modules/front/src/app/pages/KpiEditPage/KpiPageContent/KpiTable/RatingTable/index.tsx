import React, {Component} from 'react';
import {SectionHoc} from "../../../../../hoc/SectionHoc";
import KzmTable from "../../../../../components/Table/KzmTable";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../../../../store";
import {ColumnProps} from "antd/es/table";
import {Goal} from "../../../../../store/KpiStore";
import {NavLink} from "react-router-dom";

@inject("rootStore")
@observer
class RatingTable extends Component<RootStoreProp> {

  columns: ColumnProps<Goal>[] = [{
    title: "№",
    dataIndex: "rowNumber"
  }, {
    title: "Цель",
    dataIndex: "name",
    render: (text: any, record: Goal, index: number) => {
      return <NavLink to={"goal/edit/" + record.id}>{text}</NavLink>;
    }
  }, {
    title: "Вес цели",
    dataIndex: "weight"
  }, {
    title: "Комментарий",
    dataIndex: "comment"
  }]

  render() {
    return <div>{this.props.rootStore!.kpiEditStore.rating ? this.props.rootStore!.kpiEditStore.rating.map(goal => {
        const Section = SectionHoc(<KzmTable columns={this.columns} fetch={goal.goals} tableProps={{rowKey: "id"}}/>, {
          size: "large",
          visible: false,
          sectionName: goal.categoryName
        })
        return <Section/>
      }
    ) : <></>}</div>;
  }
}

export default RatingTable;