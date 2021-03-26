import * as React from "react";
import {observer} from "mobx-react";

import {action, IReactionDisposer, observable, reaction, runInAction, toJS} from "mobx";

import {Button, Form, Icon, InputNumber, message, Modal, Table} from "antd";

import {getCubaREST, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";

import {AssignedGoal} from "../../../../cuba/entities/base/tsadv$AssignedGoal";
import {SerializedEntity} from "@cuba-platform/rest";
import Column from "antd/es/table/Column";
import {Goal} from "../../../../cuba/entities/base/tsadv$Goal";
import {restQueries} from "../../../../cuba/queries";
import {Link} from "react-router-dom";
import {queryInstance} from "../../../util/QueryDataInstanceStore";
import {AssignedPerformancePlan} from "../../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import Notification from "../../../util/Notification/Notification";
import {RouteComponentProps, withRouter} from "react-router";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {restServices} from "../../../../cuba/services";
import {rootStore} from "../../../store";

type Props = {
  assignedPerformancePlanId: string;
  approverHrRoleCode?: string;
  setTotalWeight?: (totalWeight: number) => void
  setTotalResult?: (totalResult: number) => void
  readonly: boolean;
  parentForm: any;
  setAssignedPerformanceState?: (state: {
    update: () => void;
    validate: () => boolean;
  }) => void;
}

@injectMainStore
@observer
class AssignedGoalList extends React.Component<MainStoreInjected & WrappedComponentProps & Props & RouteComponentProps> {

  @observable
  dataCollection: any[] = [];

  @observable isUserManager: boolean = false;

  kpiDataInstance = queryInstance<AssignedPerformancePlan>(
    AssignedPerformancePlan.NAME,
    "kpiEditPage",
    {appId: this.props.assignedPerformancePlanId},
    () => {
      restServices.organizationHrUserService.isManagerOrSupManager(
        {
          userId: rootStore.userInfo!.id!,
          employeePersonGroupId: this.kpiDataInstance.item!.assignedPerson!.id!
        }).then(value => this.isUserManager = value)
    }
  );

  fields = [
    "category",

    "goalString",

    "weight",

    "startDate",

    "endDate"
  ];

  @observable selectedRowKey: string | undefined;

  reactionDisposer: IReactionDisposer;

  form = this.props.parentForm;

  @observable messages = this.props.mainStore!.messages!;

  isManager = (): boolean => this.props.approverHrRoleCode === 'MANAGER';
  isInitiator = (): boolean => this.props.approverHrRoleCode === 'INITIATOR';

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

  recalcTotalResult = () => {
    if (this.props.setTotalResult) {
      if (this.dataCollection.length > 0) {

        this.props.setTotalResult(this.dataCollection
          .map((value: AssignedGoal) => (value.weight || 0) * (value.managerAssessment || value.assessment || 0) / 100)
          .reduce((i1, i2) => i1 + i2, 0));

      } else this.props.setTotalResult(0);
    }
  }

  assessmentValidator = (rule: any, value: any, callback: any) => {
    if (value && (value < 0 || value > 100)) {
      callback(this.props.intl.formatMessage({id: "assignedGoal.assessment.validation"}));
    }
    callback();
  };

  managerAssessmentColumnRender = (text: string, record: any) => {
    const isSecondStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'COMPLETED';
    return (
      <div>
        <Form.Item>
          {
            this.form.getFieldDecorator('managerAssessment/' + record.id, {
              initialValue: record.managerAssessment,
              rules: [{
                validator: this.assessmentValidator
              }]
            })(
              <InputNumber disabled={!this.isManager() || !isSecondStep}
                           onChange={value => {
                             record.managerAssessment = value;
                             record.result = record.managerAssessment || record.assessment;
                             this.recalcTotalResult();
                           }}/>
            )}
        </Form.Item>
      </div>
    )
  }

  assessmentColumnRender = (text: string, record: any) => {
    const isSecondStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'COMPLETED';
    return (
      <div>
        <Form.Item>
          {
            this.form.getFieldDecorator('assessment/' + record.id, {
              initialValue: record.assessment,
              rules: [{
                required: true,
                message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.messages[AssignedGoal.NAME + '.' + 'assessment']})
              }, {
                validator: this.assessmentValidator
              }]
            })(
              <InputNumber disabled={!this.isInitiator() || !isSecondStep}
                           onChange={value => {
                             record.assessment = value;
                             record.result = record.managerAssessment || record.assessment;
                             this.recalcTotalResult();
                           }}/>
            )}
        </Form.Item>
      </div>
    )
  }

  validate = (): boolean => {
    const isSecondStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'COMPLETED';
    let isValidatedSuccess = true;
    if (isSecondStep)
      this.form.validateFields((err: any, values: any) => {
        isValidatedSuccess = !err;
        if (err) {
          message.error(
            this.props.intl.formatMessage({
              id: "management.editor.validationError"
            })
          );
        }
      });
    return isValidatedSuccess;
  }

  update = () => {
    const isSecondStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'COMPLETED';
    if (isSecondStep && this.dataCollection)
      this.dataCollection.forEach(value => {
        getCubaREST()!.commitEntity(AssignedGoal.NAME, toJS(value))
          .catch(reason => {
            Notification.error({
              message: this.props.intl.formatMessage({id: "management.editor.error"})
            });
          });
      })
  }

  render() {
    const isFirstStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'DRAFT';
    const isSecondStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'COMPLETED';
    const assessmentColumn = !isFirstStep
      ? <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='assessment'/>}
                dataIndex="assessment"
                key="assessment"
                render={this.assessmentColumnRender}/>
      : null;

    const managerAssessmentColumn = !isFirstStep && (this.isUserManager || !isSecondStep)
      ? <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='managerAssessment'/>}
                dataIndex="managerAssessment"
                key="managerAssessment"
                render={this.managerAssessmentColumnRender}/>
      : null;

    return (
      <Table
        dataSource={this.dataCollection.length > 0 ? this.dataCollection.slice() : []} pagination={false}
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

        {assessmentColumn}

        {managerAssessmentColumn}

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
    this.kpiDataInstance.load();

    this.reactionDisposer = reaction(
      () => this.dataCollection,
      (item) => {
        if (this.props.setTotalWeight) {
          if (this.dataCollection.length > 0) {
            const reduce = this.dataCollection.map((i: AssignedGoal) => i.weight ? i.weight : 0).reduce((i1, i2) => i1 + i2, 0);
            this.props.setTotalWeight(reduce);
          } else {
            this.props.setTotalWeight(0);
          }
        }
        this.recalcTotalResult();
      }
    );

    if (this.props.setAssignedPerformanceState)
      this.props.setAssignedPerformanceState({
        update: this.update,
        validate: this.validate
      })
  }

  load = () => {
    restQueries.kpiAssignedGoals(this.props.assignedPerformancePlanId).then(ag => {
      runInAction(() => {
        this.dataCollection = ag;
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