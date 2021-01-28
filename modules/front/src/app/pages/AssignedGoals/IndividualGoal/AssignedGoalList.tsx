import * as React from "react";
import {observer} from "mobx-react";

import {action, observable, runInAction} from "mobx";

import {Modal, Button, Table, Icon} from "antd";

import {
  getCubaREST,
  injectMainStore,
  MainStoreInjected,
  Msg
} from "@cuba-platform/react";

import {AssignedGoal} from "../../../../cuba/entities/base/tsadv$AssignedGoal";
import {SerializedEntity} from "@cuba-platform/rest";
import {
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import Column from "antd/es/table/Column";
import {Goal} from "../../../../cuba/entities/base/tsadv$Goal";
import {restServices} from "../../../../cuba/services";

type Props = {
  assignedPerformancePlanId: string;
  setTotalWeight?: (totalWeight: number) => void
}

@injectMainStore
@observer
class AssignedGoalList extends React.Component<MainStoreInjected & WrappedComponentProps & Props> {

  @observable
  dataCollection: any[] = [];

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

        return this.deleteGoal(e);
      }
    });
  };

  deleteGoal = (e: SerializedEntity<AssignedGoal>) => {
    if (e == null || e.id == null) {
      throw new Error('Unable to delete entity without ID');
    }
    getCubaREST()!.deleteEntity(AssignedGoal.NAME, e.id)
      .then(action(() => {
        this.load();
      }))
      .catch(action(() => {
      }));
  };


  render() {
    //TODO: переписать
    if (this.dataCollection.length > 0 && this.props.setTotalWeight) {
      this.props.setTotalWeight(
        this.dataCollection.map((e: any) => {
          return e.children
        }).map(g => g.map((g: AssignedGoal) => g.weight)
          .reduce((v1: number, v2: number) => v1 + v2, 0))
          .reduce((i1, i2) => i1 + i2, 0));
    }

    return (
      <Table dataSource={this.dataCollection.length > 0 ? this.dataCollection : []} pagination={false} indentSize={0}
             size="default" bordered={false} rowKey="id">
        <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='category'/>}
                dataIndex="key"
                key="key"
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
        <Column title={<Msg entityName={Goal.NAME} propertyName='successCriteria'/>}
                dataIndex="goal.successCriteria"
                key="successCriteria"
                sorter={(a: AssignedGoal, b: AssignedGoal) => {
                  return a.goal!.successCriteria!.localeCompare(b.goal!.successCriteria!)
                }}/>
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

  componentDidMount(): void {
    this.load();
  }

  load = () => {
    restServices.kpiService.kpiAssignedGoals({appId: this.props.assignedPerformancePlanId}).then(response => {
      runInAction(() => {
        this.dataCollection = response.map(pm => {
          return {
            key: pm.key,
            children: pm.value
          }
        });
      })
    });
  };

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };
}

export default injectIntl(AssignedGoalList);
