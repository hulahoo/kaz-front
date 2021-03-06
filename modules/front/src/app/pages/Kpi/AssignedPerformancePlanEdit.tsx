import * as React from "react";
import {createElement, FormEvent} from "react";
import {Alert, Card, Col, Form, InputNumber, message, Row, Tree} from "antd";
import {inject, observer} from "mobx-react";
import {AssignedPerformancePlanManagement} from "./AssignedPerformancePlanManagement";
import {Redirect} from "react-router-dom";
import {action, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import GoalForm from './GoalForm';

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  getCubaREST,
  injectMainStore,
  instance,
  MainStoreInjected,
  Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {AssignedPerformancePlan} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {PerformancePlan} from "../../../cuba/entities/base/tsadv$PerformancePlan";
import Page from "../../hoc/PageContentHoc";
import FormContainer from "../../common/FormContainer";
import {ReadonlyField} from "../../components/ReadonlyField";
import Section from "../../hoc/Section";
import StatusSteps, {StatusStepProp} from "../../common/StatusSteps";
import DropdownButton from "../../components/Dropdown/DropdownButton";
import {MenuRaw} from "../../components/Dropdown/DefaultDropdown";
import Button, {ButtonType} from "../../components/Button/Button";
import moment from "moment";
import {EnumValueInfo, SerializedEntity} from "@cuba-platform/rest/dist-node/model";
import {AssignedGoal} from "../../../cuba/entities/base/tsadv$AssignedGoal";
import Notification from "../../util/Notification/Notification";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {getBusinessKey, goBackOrHomePage, isEquals} from "../../util/util";
import {withRouter} from "react-router";
import {restServices} from "../../../cuba/services";
import TextArea from "antd/es/input/TextArea";
import {ExtTaskData} from "../../../cuba/entities/base/tsadv_ExtTaskData";
import TaskDataTable from "../Bproc/TaskData/TaskDataTable";
import {AbstractBprocRequest} from "../../../cuba/entities/base/AbstractBprocRequest";
import {ScoreSetting} from "../../../cuba/entities/base/tsadv_ScoreSetting";
import {collectionWithAfterLoad, DataCollectionStoreWithAfterLoad} from "../../util/DataCollectionStoreWithAfterLoad";
import DefaultDatePicker from "../../components/Datepicker";
import {DicPerformanceStage} from "../../../cuba/entities/base/tsadv_DicPerformanceStage";

const {TreeNode} = Tree;

type EditorProps = {
  entityId: string;
};

@injectMainStore
@inject("rootStore")
@observer
class AssignedPerformancePlanEditComponent extends AbstractBprocEdit<AssignedPerformancePlan, EditorProps> {

  assignedGoalListUpdate = () => {
  };
  assignedGoalListValidate = () => true;

  changeState = (state: {
    update: () => void;
    validate: () => boolean;
  }) => {
    this.assignedGoalListUpdate = state.update;
    this.assignedGoalListValidate = state.validate;
  }

  dataInstance = instance<AssignedPerformancePlan>(AssignedPerformancePlan.NAME, {
    view: "assignedPerformancePlan-myKpi-edit",
    loadImmediately: false
  });

  @observable
  stageCollection = collection<DicPerformanceStage>(DicPerformanceStage.NAME, {
    view: "_local",
    sort: "order",
    filter: {
      conditions: [{
        property: 'active',
        operator: '=',
        value: 'TRUE'
      }]
    }
  });

  @observable
  scoreSettingsCollection: DataCollectionStoreWithAfterLoad<ScoreSetting>;

  @observable
  totalWeight: number;

  @observable
  cardStatusEnumValues: EnumValueInfo[];

  totalResult: number;

  totalResultRef: any;

  kpiScoreRef: any;

  extraPointRef: any;

  finalScoreRef: any;

  @observable
  updated = false;

  @observable
  readonly: boolean = true;

  @observable approverHrRoleCode?: string;

  @observable isUserManager?: boolean = false;

  @observable mapTasks = new Map<string, ExtTaskData[]>();

  fields = [
    "extraPoint",

    "file",

    "purpose"
  ];

  @observable
  globalErrors: string[] = [];

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }
      const entityPatch = {
        ...this.props.form.getFieldsValue(this.fields)
      };
      if (this.approverHrRoleCode === 'MANAGER') {
        entityPatch['lineManager'] = this.props.rootStore!.userInfo!.personGroupId;
      }
      this.dataInstance
        .update(entityPatch)
        .then(() => {
          message.success(
            this.props.intl.formatMessage({id: "management.editor.success"})
          );
          this.updated = true;
        })
        .catch((e: any) => {
          if (e.response && typeof e.response.json === "function") {
            e.response.json().then((response: any) => {
              clearFieldErrors(this.props.form);
              const {
                globalErrors,
                fieldErrors
              } = extractServerValidationErrors(response);
              this.globalErrors = globalErrors;
              if (fieldErrors.size > 0) {
                this.props.form.setFields(
                  constructFieldsWithErrors(fieldErrors, this.props.form)
                );
              }

              if (fieldErrors.size > 0 || globalErrors.length > 0) {
                message.error(
                  this.props.intl.formatMessage({
                    id: "management.editor.validationError"
                  })
                );
              } else {
                message.error(
                  this.props.intl.formatMessage({
                    id: "management.editor.error"
                  })
                );
              }
            });
          } else {
            message.error(
              this.props.intl.formatMessage({id: "management.editor.error"})
            );
          }
        });
    });
  };

  @action
  setTotalWeight = (value: number) => {
    this.totalWeight = value;
  };

  getPoint = (value?: number): number => {
    if (value === undefined || !this.scoreSettingsCollection || this.scoreSettingsCollection.status !== 'DONE' || this.scoreSettingsCollection.items.length <= 0) return 0;
    const scoreSetting = this.scoreSettingsCollection.items.find(scoreSetting => scoreSetting.minPercent <= value && value <= scoreSetting.maxPercent);
    if (scoreSetting) return scoreSetting.finalScore || 0;
    return 0;
  }

  @action
  setTotalResult = (value: number) => {
    this.totalResult = Math.round(value);
    if (this.totalResultRef) {
      this.totalResultRef.innerHTML = this.props.intl.formatMessage({id: "result"}) + ": " + this.totalResult!;
      this.setKpiScore();
    }
  };

  setKpiScore = (): void => {
    if (this.kpiScoreRef)
      this.kpiScoreRef.innerHTML = this.props.intl.formatMessage({id: "kpiScore"}) + ': ' + this.getPoint(this.totalResult);
    this.setFinalScore();
  }

  setExtraPoint = (extraPoint: number) => {
    if (this.extraPointRef)
      this.extraPointRef.innerHTML = this.props.intl.formatMessage({id: "extraPoint"}) + ': ' + (extraPoint || 0);
    this.setFinalScore(extraPoint);
  }

  setFinalScore = (extraPoint?: number) => {
    if (!extraPoint) extraPoint = this.props.form.getFieldValue("extraPoint") || 0;
    if (this.totalResult && this.extraPointRef && this.finalScoreRef)
      this.finalScoreRef.innerHTML = this.props.intl.formatMessage({id: "finalScore"}) + ': ' + (this.getPoint(this.totalResult) + (extraPoint || 0));
  }

  validate = (): Promise<boolean> => {
    let isValidatedSuccess = true;
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        isValidatedSuccess = false;
      }
    });

    if (isValidatedSuccess && this.assignedGoalListValidate) isValidatedSuccess = this.assignedGoalListValidate();

    if (!isValidatedSuccess) {
      return new Promise<boolean>((resolve, reject) => resolve(false));
    }

    return getCubaREST()!.searchEntities<AssignedGoal>(AssignedGoal.NAME, {
      conditions: [
        {
          property: "assignedPerformancePlan",
          operator: "=",
          value: this.props.entityId
        }]
    }, {view: "assigned-goal-weight"}).then((otherGoals) => {
      const otherGoalsWeights: number = otherGoals.map((i: AssignedGoal) => i.weight ? i.weight : 0).reduce((i1, i2) => i1 + i2, 0);

      if (otherGoalsWeights != 100) {
        Notification.error({
          message: this.props.intl.formatMessage({
            id: "goal.validation.error.totalWeightSum"
          })
        });
        return new Promise<boolean>((resolve, reject) => resolve(false));
      }
      return new Promise<boolean>((resolve, reject) => resolve(true));
    }).catch(() => {
      return new Promise<boolean>((resolve, reject) => resolve(false));
    });
  };

  extraPointValidator = (rule: any, value: any, callback: any) => {
    this.props.form.validateFields(['purpose'], {force: true});
    if (value === 0 || value && (value < 1 || value > 8)) {
      callback(this.props.intl.formatMessage({id: "assignedPerformancePlan.extraPoint.validation"}));
    }
    callback();
  };

  getStageCode = () => this.dataInstance.item && this.dataInstance.item.stage && this.dataInstance.item.stage.code;

  getAdditionalForm = () => {

    const {getFieldDecorator} = this.props.form;

    const stepIndex = this.stageCollection.items.findIndex(value => isEquals(value,this.dataInstance.item && this.dataInstance.item.stage));

    if (!stepIndex || stepIndex < 2 || this.approverHrRoleCode === 'INITIATOR') return <></>;

    const isExtraPointEnable = this.approverHrRoleCode === 'MANAGER';

    const isForm2Visible = this.getStatusCode() !== 'DRAFT' && this.approverHrRoleCode && this.approverHrRoleCode !== 'INITIATOR';

    const file = this.dataInstance.item && this.dataInstance.item.file ? this.dataInstance.item.file : undefined;

    return (<div style={!isForm2Visible ? {display: 'none'} : {}}>

      <div className={"ant-row ant-form-item"} style={{marginBottom: "12px", marginTop: '40px'}}>
        {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "extraPoint"})}
        <Form.Item>{getFieldDecorator("extraPoint", {
          rules: [{validator: this.extraPointValidator}],
          initialValue: this.dataInstance.item ? this.dataInstance.item.extraPoint : null
        })(
          <InputNumber
            onChange={this.setExtraPoint}
            disabled={!isExtraPointEnable}/>
        )}
        </Form.Item>
      </div>

      <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
        {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "purpose"})}
        <Form.Item>{getFieldDecorator("purpose", {
          initialValue: this.dataInstance.item ? this.dataInstance.item.purpose : null,
          rules: [
            {
              validator: (rule, value, callback) => {
                if (this.props.form.getFieldValue('extraPoint') && !value) {
                  callback(this.props.intl.formatMessage({id: "form.validation.required"},
                    {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.purpose']}));
                } else callback();
              }
            }
          ]
        })(
          <TextArea
            disabled={!isExtraPointEnable}
            rows={4}/>
        )}
        </Form.Item>
      </div>

      <ReadonlyField
        formItemKey={"file"}
        entityName={this.dataInstance.entityName}
        propertyName="file"
        form={this.props.form}
        disabled={!isExtraPointEnable}
        getFieldDecoratorOpts={{
          initialValue: file ? {id: file.id, name: file.name} : undefined
        }}
        formItemOpts={{style: {marginBottom: "12px"}}}
      />

    </div>)
  }

  render() {
    if (this.updated) {
      return <Redirect to={AssignedPerformancePlanManagement.PATH}/>;
    }

    const {status} = this.dataInstance;
    const {getFieldDecorator} = this.props.form;

    const statusesPerformancePlan = this.stageCollection.items;

    const stepIndex = this.stageCollection.items.findIndex(value => isEquals(value,this.dataInstance.item && this.dataInstance.item.stage));

    const statusSteps: StatusStepProp[] = statusesPerformancePlan.map((s, i) => {
      return {
        description: s._instanceName,
        title: i + 1
      }
    });

    const goalCreatePathUrl = AssignedPerformancePlanManagement.PATH + "/" + this.props.entityId + "/goal/";
    const createGoalsMenu: MenuRaw[] = [{
      id: goalCreatePathUrl + "individual/new",
      value: this.props.intl.formatMessage({id: "newGoal"})
    }, {
      id: goalCreatePathUrl + "library/new",
      value: this.props.intl.formatMessage({id: "fromLibrary"})
    }, {id: goalCreatePathUrl + "cascade/new", value: this.props.intl.formatMessage({id: "cascade"})}];

    return (
      <Page
        pageName={this.props.intl.formatMessage({id: 'page.kpi'}, {"name": status === 'DONE' ? (this.dataInstance.item!.performancePlan as SerializedEntity<PerformancePlan>)._instanceName : ""})}>
        <Card className="narrow-layout card-actions-container" actions={[
          <Button buttonType={ButtonType.FOLLOW}
                  onClick={() => {
                    if (this.approverHrRoleCode !== 'INITIATOR')
                      return goBackOrHomePage(this.props.history!);
                    else return this.props.history!.push(AssignedPerformancePlanManagement.PATH);
                  }}>{this.props.intl.formatMessage({id: "close"})}</Button>,
          ...this.pageActions()]}
              bordered={false}>
          <Form key={'form1'} onSubmit={this.handleSubmit} layout="vertical">
            <div className={"large-section section-container"}>

              <div className={"section-header-container"}>{this.props.intl.formatMessage({id: "employeeInfo"})}</div>

              <FormContainer>
                <Row className={"form-row"}>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="assignedPerson"
                      form={this.props.form}
                      disabled
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        className: 'disabled',
                        label: <FormattedMessage id="employee"/>
                      }}/>
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="jobGroup"
                      form={this.props.form}
                      disabled
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        className: 'disabled',
                        label: <FormattedMessage id="position"/>
                      }}/>
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="organizationGroup"
                      form={this.props.form}
                      disabled
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        label: <FormattedMessage id="unit"/>
                      }}
                    />
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="status"
                      form={this.props.form}
                      disabled
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        label: <Msg entityName={AssignedPerformancePlan.NAME} propertyName={"status"}/>
                      }}
                    />
                  </Col>
                </Row>
                <Row className={"form-row"}>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="startDate"
                      form={this.props.form}
                      disabled
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        label: <Msg entityName={PerformancePlan.NAME} propertyName={"startDate"}/>
                      }}
                    />
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="endDate"
                      form={this.props.form}
                      disabled
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        label: <Msg entityName={PerformancePlan.NAME} propertyName={"endDate"}/>
                      }}
                    />
                  </Col>
                  <Col md={24} lg={6}>
                    <Form.Item label={<FormattedMessage id="appe.hireDate"/>}
                               key='hireDate'
                               style={{marginBottom: '12px'}}>{
                      getFieldDecorator('hireDate')(
                        <DefaultDatePicker disabled/>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                {this.globalErrors.length > 0 && (
                  <Alert
                    message={<MultilineText lines={toJS(this.globalErrors)}/>}
                    type="error"
                    style={{marginBottom: "24px"}}
                  />
                )}

              </FormContainer>
              {/*</Form>*/}
            </div>

            <Section size={"large"}>
              <StatusSteps steps={statusSteps} currentIndex={stepIndex}/>
            </Section>

            {this.readonly
              ? <></>
              : <Section size={"large"} visible={false}>
                <DropdownButton menu={createGoalsMenu}
                                buttonText={this.props.intl.formatMessage({id: "addKpi"})}/>
              </Section>
            }
            <Section size={"large"} sectionName={
              <div>
                <div><h1>{this.props.intl.formatMessage({id: "menu.kpi"})}</h1></div>
                <div><h1>{this.props.intl.formatMessage({id: "weight"})}: {this.totalWeight}%</h1></div>
                <div><h1
                  id={'totalResult'}
                  ref={ref => {
                    this.totalResultRef = ref;
                  }}>
                  {this.props.intl.formatMessage({id: "result"})}: {Math.round(this.totalResult)}
                </h1></div>
                {stepIndex && stepIndex > 1 && (this.approverHrRoleCode && this.approverHrRoleCode !== 'INITIATOR' || this.isUserManager)
                  ? (<div>
                    <h1
                      id={'kpiScore'}
                      ref={ref => {
                        this.kpiScoreRef = ref;
                        this.setKpiScore();
                      }}>
                      {this.props.intl.formatMessage({id: "kpiScore"})}: {Math.round(this.dataInstance.item!.kpiScore)}
                    </h1>
                    <h1 id={'extraPoint'} ref={ref => this.extraPointRef = ref}>
                      {this.props.intl.formatMessage({id: "extraPoint"})}: {Math.round(this.dataInstance.item!.extraPoint || 0)}
                    </h1>
                    <h1 id={'finalScore'} ref={ref => this.finalScoreRef = ref}>
                      {this.props.intl.formatMessage({id: "finalScore"})}: {Math.round(this.dataInstance.item!.finalScore || 0)}
                    </h1>
                  </div>) : null}
              </div>
            }>

              <GoalForm assignedPerformancePlanId={this.props.entityId}
                        setAssignedPerformanceState={this.changeState}
                        approverHrRoleCode={this.approverHrRoleCode}
                        setTotalWeight={this.setTotalWeight}
                        setTotalResult={this.setTotalResult}
                        parentForm={this.props.form}
                        readonly={this.readonly}/>

              {this.getAdditionalForm()}

            </Section>

            {this.takCard()}

          </Form>
        </Card>
      </Page>
    );
  }

  @action
  setReadOnly = (): void => {
    this.readonly = !(this.dataInstance.item
      && !this.isNotDraft()
      && (this.getStageCode() === 'DRAFT' || this.getStageCode() === 'COMPLETED')
      && this.dataInstance.item.assignedPerson!.id! === this.props.rootStore!.userInfo.personGroupId!);
  };

  processDefinitionKey: string = AssignedPerformancePlan.PROCESS_DEFINITION_KEY;

  pageActions = (): JSX.Element[] => {
    if (this.isStartForm && this.dataInstance && this.dataInstance.item && this.dataInstance.item.assignedPerson
      && this.dataInstance.item.assignedPerson.id !== this.props.rootStore!.userInfo!.personGroupId)
      return [<></>];
    return [this.getOutcomeBtns() || <></>];
  };

  initVariablesByBproc = () => {
    if (this.activeUserTask && this.activeUserTask.hrRole && this.activeUserTask.hrRole.code) {
      this.approverHrRoleCode = this.activeUserTask.hrRole.code;
    } else if (this.isStartForm && this.dataInstance.item!.assignedPerson!.id === this.props.rootStore!.userInfo!.personGroupId) {
      this.approverHrRoleCode = 'INITIATOR';
    }
  }

  isUpdateBeforeOutcome = true;

  commentRequiredOutcomes = ['REJECT', 'REVISION', 'APPROVE', 'START'];

  isStartCommentVisible = true;

  componentDidMount() {

    this.setReactionDisposer();
    this.loadData();

    this.cardStatusEnumValues = this.props.mainStore!.enums!.filter(e => e.name === "kz.uco.tsadv.modules.performance.enums.CardStatusEnum")[0].values;
  }

  getUpdateEntityData = (): any => {
    return {
      personGroup: {
        id: this.props.rootStore!.userInfo.personGroupId
      },
      result: this.totalResult || 0,
      kpiScore: this.getPoint(this.totalResult),
      finalScore: this.getPoint(this.totalResult) + (this.props.form.getFieldValue("extraPoint") || 0),
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  update = () => {
    if (this.assignedGoalListUpdate) this.assignedGoalListUpdate();
    const updateEntityData = this.getUpdateEntityData();

    if (this.approverHrRoleCode === 'MANAGER' && ((this.dataInstance.item && this.dataInstance.item.stage && this.dataInstance.item.stage.code) === 'ASSESSMENT')) {
      updateEntityData['lineManager'] = this.props.rootStore!.userInfo!.personGroupId;
    }
    return this.dataInstance.update(updateEntityData);
  };

  setReactionDisposer = () => {
    this.reactionDisposer = reaction(
      () => this.dataInstance.item,
      (item) => {

        this.loadBpmProcessData();

        this.setReadOnly();

        if (item)
          this.scoreSettingsCollection = collectionWithAfterLoad<ScoreSetting>(ScoreSetting.NAME,
            this.setKpiScore,
            {
              view: "_local",
              loadImmediately: true,
              filter: {
                conditions: [{
                  property: 'performancePlan.id',
                  operator: '=',
                  value: item.performancePlan!.id
                }]
              }
            });

        restServices.employeeService.personProfile(item!.assignedPerson!.id).then(value => {
          this.props.form.setFieldsValue({
            jobGroup: value.positionName,
            organizationGroup: value.organizationName,
          })
        });

        restServices.organizationHrUserService.isManagerOrSupManager(
          {
            userId: this.props.rootStore!.userInfo!.id!,
            employeePersonGroupId: item!.assignedPerson!.id!
          }).then(value => this.isUserManager = value)

        const values = {
          ...{
            assignedPerson: (item!.assignedPerson! as SerializedEntity<PersonGroupExt>)._instanceName,
            startDate: moment(item!.performancePlan!.startDate),
            endDate: moment(item!.performancePlan!.endDate),
            hireDate: moment(item!.assignedPerson!.person!.hireDate),
            status: (item!.status! as SerializedEntity<AbstractBprocRequest>)._instanceName,
            purpose: item!.purpose,
            extraPoint: item!.extraPoint,
            file: item!.file,
          }
        };
        this.props.form.setFieldsValue(values);
        this.setFinalScore(item!.extraPoint);
      }
    );
  };

  loadBpmProcessData = () => {
    const processDefinitionKey = this.processDefinitionKey;
    if (this.props.entityId !== "new") {

      restServices.bprocService.processInstanceData({
        processInstanceBusinessKey: this.processInstanceBusinessKey(),
        processDefinitionKey: processDefinitionKey
      }).then(value => {
        this.isCalledProcessInstanceData = true;
        this.processInstanceData = value;
        if (value) {
          this.isUserInitiator = value.startUserId === this.props.rootStore!.userInfo!.id;
          restServices.bprocService.tasks({processInstanceData: value})
            .then(tasks => {
              this.tasks = tasks;
              this.activeTask = tasks.find(task => !task.endTime
              ) as ExtTaskData;

              this.activeUserTask = this.activeTask
              && this.activeTask.assigneeOrCandidates
              && this.activeTask.assigneeOrCandidates.some(user => user.id === this.props.rootStore!.userInfo.id)
                ? this.activeTask : null;

              if (this.activeUserTask)
                restServices.bprocFormService.getTaskFormData({taskId: this.activeUserTask.id!})
                  .then(formData => {
                    this.formData = formData;
                    this.isStartForm = false;
                    this.initVariablesByBproc();
                  });
              else {
                if (this.isUserInitiator && this.activeTask) {
                  // todo uncomment for cancel
                  // this.formData = {
                  //   outcomes: [{id: 'CANCEL'}]
                  // };
                  this.isStartForm = false;
                }
                this.initVariablesByBproc();
              }
            })
        } else {
          restServices.bprocService.getStartFormData({processDefinitionKey: processDefinitionKey})
            .then(formData => {
              this.formData = formData;
              this.isStartForm = true;
              this.initVariablesByBproc();
            });
        }
      })

      for (let businessKey of this.cardStatusEnumValues.map(value => this.props.entityId + '/' + value.id)) {
        restServices.bprocService.processInstanceData({
          processInstanceBusinessKey: businessKey,
          processDefinitionKey: processDefinitionKey
        }).then(value => {
          if (value) {
            restServices.bprocService.tasks({processInstanceData: value})
              .then(tasks => this.mapTasks.set(businessKey, tasks));
          }
        });
        if (businessKey === this.processInstanceBusinessKey()) break;
      }

    } else {
      const processDefinitionKey = this.processDefinitionKey;

      restServices.bprocService.getStartFormData({processDefinitionKey: processDefinitionKey})
        .then(formData => {
          this.formData = formData;
          this.isStartForm = true;
          this.initVariablesByBproc();
        });
    }
  }

  takCard = () => {
    if (!this.cardStatusEnumValues || this.mapTasks.size === 0) return <div/>;

    const treeNodes: any[] = [];

    this.cardStatusEnumValues.forEach(enumValues => {
      const key = this.props.entityId + '/' + enumValues.id!;
      const tasks = this.mapTasks.get(key);
      if (tasks) {
        treeNodes.push(<TreeNode
          title={this.cardStatusEnumValues.find(value1 => key.endsWith(value1.id! + ''))!.caption}
          key={key}>
          {[<TreeNode className={'display-contents-span'} title={<TaskDataTable tasks={tasks} key={key}/>}
                      key={`${key}-table`}/>]}
        </TreeNode>)
      }
    });

    return (
      <Card className="narrow-layout large-section section-container">
        <div
          className={"section-header-container"}>{this.props.intl.formatMessage({id: "bproc.participants"})}</div>
        <Tree>
          {treeNodes})}
        </Tree>
      </Card>
    )
  }

  afterSendOnApprove = () => {
    if (this.isStartForm)
      this.props.history!.push(AssignedPerformancePlanManagement.PATH);
    else this.props.history!.goBack();
  };

  processInstanceBusinessKey = (): string => {
    return getBusinessKey(this.dataInstance.item!);
  }
}

const onValuesChange = (props: any, changedValues: any) => {
  // Reset server-side errors when field is edited
  Object.keys(changedValues).forEach((fieldName: string) => {
      props.form.setFields({
        [fieldName]: {
          value: changedValues[fieldName]
        }
      });
    }
  );
};

const element = withLocalizedForm<EditorProps & WrappedComponentProps & MainStoreInjected>(
  {onValuesChange: onValuesChange}
)(withRouter(AssignedPerformancePlanEditComponent));

export default injectIntl(element);