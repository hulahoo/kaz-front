import * as React from "react";
import {observer} from "mobx-react";

import {action, IReactionDisposer, observable, reaction, runInAction, toJS} from "mobx";

import {Button, Form, Icon, InputNumber, message, Modal, Table} from "antd";

import {getCubaREST, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";

import {AssignedGoal} from "../../../../cuba/entities/base/tsadv$AssignedGoal";
import {SerializedEntity} from "@cuba-platform/rest";
import Column from "antd/es/table/Column";
import {restQueries} from "../../../../cuba/queries";
import {Link} from "react-router-dom";
import {queryInstance} from "../../../util/QueryDataInstanceStore";
import {AssignedPerformancePlan} from "../../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import Notification from "../../../util/Notification/Notification";
import {RouteComponentProps, withRouter} from "react-router";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {restServices} from "../../../../cuba/services";
import {rootStore} from "../../../store";
import {DicGoalCategory} from "../../../../cuba/entities/base/tsadv$DicGoalCategory";
import {AssignedGoalTypeEnum} from "../../../../cuba/enums/enums";
import {ReactComponent as CascadeSvg} from "../../../../resources/icons/goal/cascade-goal.svg";
import {ReactComponent as IndividualSvg} from "../../../../resources/icons/goal/individual-goal.svg";
import {ReactComponent as LibrarySvg} from "../../../../resources/icons/goal/library-goal.svg";

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
        .then(() => this.recalcTotalResult());
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
    const isSecondStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'COMPLETED';
    if (this.props.setTotalResult) {
      if (this.dataCollection.length > 0) {

        this.props.setTotalResult(this.dataCollection
          .map((value: AssignedGoal) => (value.weight || 0)
            * (((this.isUserManager || !isSecondStep) ? value.managerAssessment : 0) || value.assessment || 0) / 100)
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
    const isThirdStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'ASSESSMENT';
    return (
      <div>
        <Form.Item>
          {
            this.form.getFieldDecorator('managerAssessment/' + record.id, {
              initialValue: record.managerAssessment,
              rules: [{
                required: true,
                message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.messages[AssignedGoal.NAME + '.' + 'managerAssessment']})
              }, {
                validator: this.assessmentValidator
              }]
            })(
              <InputNumber disabled={!this.isManager() || !isThirdStep}
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
    const isThirdStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'ASSESSMENT';
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
              <InputNumber disabled={!this.isInitiator() || !isThirdStep}
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
    const isThirdStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'ASSESSMENT';
    let isValidatedSuccess = true;
    if (isThirdStep)
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
    const isThirdStep = this.kpiDataInstance.item && this.kpiDataInstance.item.stepStageStatus === 'ASSESSMENT';
    if (isThirdStep && this.dataCollection)
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
    const isDraft = !this.kpiDataInstance.item || !this.kpiDataInstance.item.status || this.kpiDataInstance.item.status.code == 'DRAFT'

    const assessmentColumn = !isFirstStep && !isSecondStep
      ? <Column title={<FormattedMessage id="goalForm.column.assessment"/>}
                dataIndex="assessment"
                key="assessment"
                render={this.assessmentColumnRender}/>
      : null;

    const managerAssessmentColumn = !isFirstStep && !isSecondStep && (!this.isInitiator() || !isDraft)
      ? <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='managerAssessment'/>}
                dataIndex="managerAssessment"
                key="managerAssessment"
                render={this.managerAssessmentColumnRender}/>
      : null;

    return (
      <Table
        dataSource={this.dataCollection.length > 0 ? this.dataCollection.slice() : []} pagination={false}
        size="default" bordered={false} rowKey="id">
        <Column key="category"
                render={((text, record: AssignedGoal, index) => {
                  const GoalTypeIcon = this.getGoalTypeIcon(record.goalType);
                  return GoalTypeIcon ? <GoalTypeIcon style={{width: '14px'}}/> : null
                })}/>
        <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='category'/>}
                dataIndex="category._instanceName"
                key="category"
                sorter={(a: AssignedGoal, b: AssignedGoal) => {
                  console.log((a.category as SerializedEntity<DicGoalCategory>));
                  return (a.category as SerializedEntity<DicGoalCategory>)._instanceName!.localeCompare((b.category as SerializedEntity<DicGoalCategory>)._instanceName)
                }}/>
        <Column title={<FormattedMessage id="goalForm.column.kpiName"/>}
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
        <Column title={<FormattedMessage id="goalForm.column.kpiDetails"/>}
                dataIndex="successCriteria"
                key="successCriteria"
                sorter={(a: any, b: any) => {
                  if (a.key) {
                    return a;
                  }
                  const aSuccessCriteria = a.successCriteria || (a.goal ? a.goal.successCriteria : undefined);
                  const bSuccessCriteria = b.successCriteria || (b.goal ? b.goal.successCriteria : undefined);

                  if (aSuccessCriteria && bSuccessCriteria) {
                    return aSuccessCriteria.localeCompare(bSuccessCriteria);
                  }
                  if (aSuccessCriteria) return 1;
                  if (bSuccessCriteria) return 1;
                  return 0;
                }}
                render={(text, record) => {
                  const assignedGoal = record as AssignedGoal;
                  return text || (assignedGoal.goal ? assignedGoal.goal.successCriteria : '');
                }}
        />
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

  getGoalTypeIcon = (goalType: AssignedGoalTypeEnum | undefined) => {
    switch (goalType) {
      case AssignedGoalTypeEnum.CASCADE: {
        return CascadeSvg;
      }
      case AssignedGoalTypeEnum.LIBRARY: {
        return LibrarySvg;
      }
      case AssignedGoalTypeEnum.INDIVIDUAL: {
        return IndividualSvg;
      }
      default: {
        return null;
      }
    }
  }
}

export default injectIntl(withRouter(AssignedGoalList));