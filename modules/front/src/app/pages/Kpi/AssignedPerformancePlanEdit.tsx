import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Col, DatePicker, Form, message, Row} from "antd";
import {inject, observer} from "mobx-react";
import {AssignedPerformancePlanManagement} from "./AssignedPerformancePlanManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {action, IReactionDisposer, observable, reaction, toJS} from "mobx";
import {injectIntl, WrappedComponentProps} from "react-intl";
import GoalForm from './GoalForm';

import {
  clearFieldErrors,
  constructFieldsWithErrors,
  extractServerValidationErrors, getCubaREST, injectMainStore, MainStoreInjected, Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {AssignedPerformancePlan} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {PerformancePlan} from "../../../cuba/entities/base/tsadv$PerformancePlan";
import Page from "../../hoc/PageContentHoc";
import {RootStoreProp} from "../../store";
import FormContainer from "../../common/FormContainer";
import {ReadonlyField} from "../../components/ReadonlyField";
import Section from "../../hoc/Section";
import StatusSteps, {StatusStepProp} from "../../common/StatusSteps";
import DropdownButton from "../../components/Dropdown/DropdownButton";
import {MenuRaw} from "../../components/Dropdown/DefaultDropdown";
import Button, {ButtonType} from "../../components/Button/Button";
import {AssignmentExt} from "../../../cuba/entities/base/base$AssignmentExt";
import {queryInstance} from "../../util/QueryDataInstanceStore";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";
import moment from "moment";
import {EnumValueInfo} from "@cuba-platform/rest/dist-node/model";
import {AssignedGoal} from "../../../cuba/entities/base/tsadv$AssignedGoal";
import Notification from "../../util/notification/Notification";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class AssignedPerformancePlanEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp & MainStoreInjected> {

  dataInstance = queryInstance<AssignedPerformancePlan>(
    AssignedPerformancePlan.NAME,
    "kpiEditPage",
    {appId: this.props.entityId}
  );

  @observable
  totalWeight: number;

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = [

    "assignedPerson",

    "currentAssignment",

    "performancePlan",

    "startDate",

    "endDate",

    "hireDate"
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
      this.dataInstance
        .update(this.props.form.getFieldsValue(this.fields))
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

  sendOnApprove = () => {
    getCubaREST()!.searchEntities<AssignedGoal>(AssignedGoal.NAME, {
      conditions: [
        {
          property: "assignedPerformancePlan",
          operator: "=",
          value: this.props.entityId
        }]
    }, {view: "assigned-goal-weight"}).then((otherGoals) => {
      const otherGoalsWeights: number = otherGoals.map((i: AssignedGoal) => i.weight ? i.weight : 0).reduce((i1, i2) => i1 + i2, 0);

      if (otherGoalsWeights > 100) {
        Notification.error({
          message: this.props.intl.formatMessage({
            id: "goal.validation.error.totalWeightSum"
          })
        });
        return;
      }
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={AssignedPerformancePlanManagement.PATH}/>;
    }

    const {status} = this.dataInstance;
    const statusesPerformancePlan: EnumValueInfo[] = this.props.mainStore!.enums!.filter(e => e.name === "kz.uco.tsadv.modules.performance.enums.CardStatusEnum")[0].values;

    const statusSteps: StatusStepProp[] = statusesPerformancePlan.map((s, i) => {
      return {
        description: s.caption,
        title: i + 1
      }
    });

    const goalCreatePathUrl = AssignedPerformancePlanManagement.PATH + "/" + this.props.entityId + "/goal/create/";
    const createGoalsMenu: MenuRaw[] = [{
      id: goalCreatePathUrl + "individual",
      value: this.props.intl.formatMessage({id: "newGoal"})
    }, {
      id: goalCreatePathUrl + "library",
      value: this.props.intl.formatMessage({id: "fromLibrary"})
    }, {id: goalCreatePathUrl + "cascade", value: this.props.intl.formatMessage({id: "cascade"})}];

    return (
      <Page
        pageName={this.props.intl.formatMessage({id: 'page.kpi'}, {"name": status === 'DONE' ? this.dataInstance.item!.performancePlan!.performancePlanName : ""})}>
        <Card className="narrow-layout card-actions-container" actions={[
          <Link to={AssignedPerformancePlanManagement.PATH}>
            <Button buttonType={ButtonType.FOLLOW}>Закрыть</Button>
          </Link>,
          <Button buttonType={ButtonType.FOLLOW} onClick={this.sendOnApprove}>Отправить на согласование</Button>,
          <Link to={AssignedPerformancePlanManagement.PATH}>
            <Button buttonType={ButtonType.PRIMARY}>Сохранить</Button>
          </Link>]} bordered={false}>
          <div className={"large-section section-container"}>
            <div className={"section-header-container"}>{this.props.intl.formatMessage({id: "employeeInfo"})}</div>
            <Form onSubmit={this.handleSubmit} layout="vertical">
              <FormContainer>
                <Row className={"form-row"}>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="assignedPerson._instanceName"
                      form={this.props.form}
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        className: 'disabled',
                        label: <Msg entityName={AssignedPerformancePlan.NAME} propertyName={"assignedPerson"}/>
                      }}/>
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="currentAssignment.jobGroup._instanceName"
                      form={this.props.form}
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        className: 'disabled',
                        label: <Msg entityName={AssignmentExt.NAME} propertyName={"jobGroup"}/>
                      }}/>
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="currentAssignment.organizationGroup.organizationNameLang1"
                      form={this.props.form}
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        label: this.props.intl.formatMessage({id: "organizationGroup"})
                      }}
                    />
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={AssignedPerformancePlan.NAME}
                      propertyName="currentAssignment.organizationGroup.organization.organizationNameLang1"
                      form={this.props.form}
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        label: this.props.intl.formatMessage({id: "organization"})
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
                      formItemOpts={{
                        style: {marginBottom: "12px"},
                        label: <Msg entityName={PerformancePlan.NAME} propertyName={"endDate"}/>
                      }}
                    />
                  </Col>
                  <Col md={24} lg={6}>
                    <Form.Item label={<Msg entityName={PersonExt.NAME} propertyName='hireDate'/>}
                               key='hireDate'
                               style={{marginBottom: '12px'}}>{
                      this.props.form.getFieldDecorator('hireDate')(
                        <DatePicker disabled={true}/>
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
            </Form>
          </div>
          <Section size={"large"}>
            <StatusSteps steps={statusSteps}
                         currentIndex={this.dataInstance.item ? statusesPerformancePlan.filter(s => s.id === this.dataInstance.item!.status).map((s, i) => i)[0] : undefined}/>
          </Section>
          <Section size={"large"} visible={false}>
            <DropdownButton menu={createGoalsMenu}
                            buttonText={this.props.intl.formatMessage({id: "addGoal"})}/>
          </Section>
          <Section size={"large"} sectionName={<div>
            <div><h1>Цели</h1></div>
            <div><h1>Вес: {this.totalWeight}</h1></div>
          </div>}>
            <GoalForm assignedPerformancePlanId={this.props.entityId} setTotalWeight={this.setTotalWeight}/>
          </Section>
        </Card>
      </Page>
    );
  }

  componentDidMount() {
    this.loadInstanceData();
    this.reactionDisposer = reaction(
      () => this.dataInstance.item,
      (item) => {
        this.props.form.setFieldsValue(
          {
            // ...this.dataInstance.getFieldValues(this.fields),
            ...{
              assignedPerson: item!.assignedPerson!,
              currentAssignment: item!.assignedPerson!.assignments![0],
              performancePlan: item!.performancePlan,
              startDate: moment(item!.performancePlan!.startDate),
              endDate: moment(item!.performancePlan!.endDate),
              hireDate: moment(item!.assignedPerson!.person!.hireDate),
            }
          }
        );
      }
    );
  }

  componentWillUnmount() {
    this.reactionDisposer();
  }

  loadInstanceData = () => {
    if (this.props.entityId !== AssignedPerformancePlanManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new AssignedPerformancePlan());
    }
  };
}

export default injectIntl(
  withLocalizedForm<EditorProps>({
    onValuesChange: (props: any, changedValues: any) => {
      // Reset server-side errors when field is edited
      Object.keys(changedValues).forEach((fieldName: string) => {
          props.form.setFields({
            [fieldName]: {
              value: changedValues[fieldName]
            }
          });
        }
      );
    }
  })
  (AssignedPerformancePlanEditComponent)
);