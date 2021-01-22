import * as React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Modal, Button, Table, Tag, Icon} from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  DataTable, Msg
} from "@cuba-platform/react";

import {AssignedGoal} from "../../../../cuba/entities/base/tsadv$AssignedGoal";
import {SerializedEntity} from "@cuba-platform/rest";
import {AssignedGoalManagement} from "./AssignedGoalManagement";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import Column from "antd/es/table/Column";

type Props = {
  assignedPerformancePlanId: string;
}

@injectMainStore
@observer
class AssignedGoalList extends React.Component<MainStoreInjected & WrappedComponentProps & Props> {
  dataCollection = collection<AssignedGoal>(AssignedGoal.NAME, {
    view: "assignedGoal-portal-kpi-create-default",
    filter: {
      conditions: [
        {
          property: "assignedPerformancePlan",
          operator: "=",
          value: this.props.assignedPerformancePlanId
        }
      ]
    },
    sort: "-updateTs"
  });

  fields = [
    "category",

    "goalString",

    "weight",

    "startDate",

    "endDate"
  ];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<AssignedGoal>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        {id: "management.browser.delete.areYouSure"},
        {instanceName: e._instanceName}
      ),
      okText: this.props.intl.formatMessage({
        id: "management.browser.delete.ok"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "management.browser.delete.cancel"
      }),
      onOk: () => {
        this.selectedRowKey = undefined;

        return this.dataCollection.delete(e);
      }
    });
  };

  render() {
    return (
      <Table dataSource={this.dataCollection.items.length > 0 ? this.dataCollection.items : []} pagination={false}
             size="default" bordered={false} rowKey="id">
        <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='category'/>}
                dataIndex="category.langValue1"
                key="category"
                sorter={(a: AssignedGoal, b: AssignedGoal) =>
                  a.category!.langValue1!.localeCompare(b.category!.langValue1!)
                }/>
        <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='goalString'/>}
                dataIndex="goalString"
                key="goalString"
                sorter={(a: AssignedGoal, b: AssignedGoal) =>
                  a.goalString!.localeCompare(b.goalString!)
                }/>
        <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='weight'/>}
                dataIndex="weight"
                key="weight"
                sorter={(a: AssignedGoal, b: AssignedGoal) => {
                  return (a.weight! as number) - (b.weight! as number)
                }}/>
        <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='startDate'/>}
                dataIndex="startDate"
                key="startDate"
                sorter={(a: AssignedGoal, b: AssignedGoal) =>
                  a.startDate!.localeCompare(b.startDate!)
                }/>
        <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='endDate'/>}
                dataIndex="endDate"
                key="endDate"
                sorter={(a: AssignedGoal, b: AssignedGoal) =>
                  a.endDate!.localeCompare(b.endDate!)
                }/>
        <Column
          title=""
          key="action"
          render={ag => (
            <Button type="link"
                    style={{padding: 0}}
                    onClick={() => this.showDeletionDialog(ag)}>
              <Icon type="delete" style={{fontSize: '18px', cursor: 'pointer'}}/>
            </Button>
          )}
        />
      </Table>
    );
  }

  getRecordById(id: string): SerializedEntity<AssignedGoal> {
    const record:
      | SerializedEntity<AssignedGoal>
      | undefined = this.dataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowKey!));
  };
}

export default injectIntl(AssignedGoalList);
