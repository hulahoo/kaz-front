import * as React from "react";
import {observer} from "mobx-react";

import {action, IReactionDisposer, observable, reaction, runInAction} from "mobx";

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
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import Column from "antd/es/table/Column";
import {Goal} from "../../../../cuba/entities/base/tsadv$Goal";
import {restQueries} from "../../../../cuba/queries";
import {Link} from "react-router-dom";
import {RouteComponentProps, withRouter} from "react-router";
import {PersonGroupExt} from "../../../../cuba/entities/base/base$PersonGroupExt";
import {JobGroup} from "../../../../cuba/entities/base/tsadv$JobGroup";
import {OrganizationGroupExt} from "../../../../cuba/entities/base/base$OrganizationGroupExt";
import {OrganizationExt} from "../../../../cuba/entities/base/base$OrganizationExt";
import moment from "moment";

type Props = {
  assignedPerformancePlanId: string;
  setTotalWeight?: (totalWeight: number) => void
  readonly: boolean;
}

@injectMainStore
@observer
class AssignedGoalList extends React.Component<MainStoreInjected & WrappedComponentProps & Props & RouteComponentProps> {

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

  reactionDisposer: IReactionDisposer;

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
    return (
      <Table dataSource={this.dataCollection.length > 0 ? this.dataCollection.slice() : []} pagination={false}
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
                sorter={(a: any, b: any) => {
                  if (a.key) {
                    return a;
                  }
                  return a.goalString.localeCompare(b.goalString);
                }}
                render={((text, record, index) => {
                  return this.props.readonly
                    ? text
                    : <Link to={this.getGoalUrl(record)}>{text}</Link>
                })}/>
        <Column title={<Msg entityName={Goal.NAME} propertyName='successCriteria'/>}
                dataIndex="goal.successCriteria"
                key="successCriteria"
                sorter={(a: any, b: any) => {
                  if (a.key) {
                    return a;
                  }
                  if (a.goal && b.goal) {
                    if (a.goal.successCriteria && b.goal.successCriteria) {
                      return a.goal.successCriteria.localeCompare(b.goal.successCriteria)
                    } else if (a.goal.successCriteria) {
                      return 1;
                    } else if (b.goal.successCriteria) {
                      return -1;
                    }
                  } else if (a.goal!) {
                    return 1;
                  } else if (b.goal!) {
                    return -1;
                  }
                  return 0
                }}/>
        <Column title={<FormattedMessage id="kpi.goals.weight"/>}
                dataIndex="weight"
                key="weight"
                sorter={(a: any, b: any) => {
                  if (a.key) {
                    return a;
                  }
                  return a.weight - b.weight;
                }}/>
        <Column
          title=""
          key="action"
          render={ag => {
            return this.props.readonly
              ? <></>
              : <Button type="link"
                        style={{padding: 0}}
                        onClick={() => this.showDeletionDialog(ag)}>
                <Icon type="delete" style={{fontSize: '18px', cursor: 'pointer'}}/>
              </Button>
          }}
        />
      </Table>
    );
  }

  componentDidMount(): void {
    this.load();

    this.reactionDisposer = reaction(
      () => this.dataCollection,
      (item) => {
        if (this.props.setTotalWeight) {
          if (this.dataCollection.length > 0) {
            this.props.setTotalWeight(this.dataCollection.map((i: AssignedGoal) => i.weight ? i.weight : 0).reduce((i1, i2) => i1 + i2, 0));
          } else {
            this.props.setTotalWeight(0);
          }
        }
      }
    );
  }

  load = () => {
    restQueries.kpiAssignedGoals(this.props.assignedPerformancePlanId).then(ag => {
      runInAction(() => {
        this.dataCollection = ag
      })
    });
  };

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  getGoalUrl = (assignedGoal: AssignedGoal): string => {
    return `${this.props.match.url}${this.props.match.url[this.props.match.url.length - 1] === '/' ? '' : '/'}goal/${assignedGoal.goalLibrary ? "library" : assignedGoal.assignedByPersonGroup ? "cascade" : "individual"}/${assignedGoal.id}`;
  };
}

export default injectIntl(withRouter(AssignedGoalList));
