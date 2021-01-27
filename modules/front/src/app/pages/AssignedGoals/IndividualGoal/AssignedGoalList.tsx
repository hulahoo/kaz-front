import * as React from "react";
import {observer} from "mobx-react";

import {action, observable, runInAction} from "mobx";

import {Modal, Button, Table, Tag, Icon} from "antd";

import {
  collection, getCubaREST,
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
import {restQueries} from "../../../../cuba/queries";
import {Goal} from "../../../../cuba/entities/base/tsadv$Goal";

type Props = {
  assignedPerformancePlanId: string;
  setTotalWeight?: (totalWeight: number) => void
}

@injectMainStore
@observer
class AssignedGoalList extends React.Component<MainStoreInjected & WrappedComponentProps & Props> {

  @observable
  dataCollection: SerializedEntity<AssignedGoal>[] = [];

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
      this.props.setTotalWeight(this.dataCollection.map((i: AssignedGoal) => i.weight ? i.weight : 0).reduce((i1, i2) => i1 + i2, 0));
    }

    return (
      <Table dataSource={this.dataCollection.length > 0 ? this.dataCollection : []} pagination={false}
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
    restQueries.kpiAssignedGoals(this.props.assignedPerformancePlanId).then(ag => {
      runInAction(() => {
        this.dataCollection = ag
      })
    });
  }

  getRecordById(id: string): SerializedEntity<AssignedGoal> {
    const record:
      | SerializedEntity<AssignedGoal>
      | undefined = this.dataCollection.find(record => record.id === id);

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
