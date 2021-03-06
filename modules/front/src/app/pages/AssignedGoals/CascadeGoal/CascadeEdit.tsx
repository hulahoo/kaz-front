import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Form, Select} from "antd";
import {inject, observer} from "mobx-react";
import {CascadeGoalManagement} from "./CascadeGoalManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  Field,
  injectMainStore,
  MainStoreInjected,
  Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../../app/App.css";

import {AssignedPerformancePlan} from "../../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {PersonGroupExt} from "../../../../cuba/entities/base/base$PersonGroupExt";
import {ServiceDataCollectionStore} from "../../../util/ServiceDataCollectionStore";
import {restServices} from "../../../../cuba/services";
import {RootStoreProp} from "../../../store";
import {AssignedGoal} from "../../../../cuba/entities/base/tsadv$AssignedGoal";
import {SerializedEntity} from "@cuba-platform/rest";
import {Goal} from "../../../../cuba/entities/base/tsadv$Goal";
import {queryCollection, QueryDataCollectionStore} from "../../../util/QueryDataCollectionStore";
import {queryInstance} from "../../../util/QueryDataInstanceStore";
import Button, {ButtonType} from "../../../components/Button/Button";
import Section from "../../../hoc/Section";
import Page from "../../../hoc/PageContentHoc";
import Notification from "../../../util/Notification/Notification";
import {PositionGroupExt} from "../../../../cuba/entities/base/base$PositionGroupExt";
import TextArea from "antd/es/input/TextArea";
import Input from "../../../components/Input/Input";
import {AssignedGoalTypeEnum} from "../../../../cuba/enums/enums";
import {instanceStore} from "../../../util/InstanceStore";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId?: string;
  appId: string
};

type SelectLabelValue = {
  key: string,
  label: string
}

@injectMainStore
@inject("rootStore")
@observer
class CascadeEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp & MainStoreInjected> {

  fields = ["performancePlan", "goalString", "weight", "category", "goal", "goalSuccessCriteria", "successCriteria", "positionGroup"];

  dataInstance = instanceStore<AssignedGoal>(AssignedGoal.NAME, {
    view: "assignedGoal-portal-kpi-create-default",
    loadImmediately: false
  });

  assignedPerformancePlan = queryInstance<AssignedPerformancePlan>(
    AssignedPerformancePlan.NAME,
    "kpiEditPage",
    {appId: this.props.appId}
  );

  @observable
  positionGroups: DataCollectionStore<PositionGroupExt>;

  @observable
  managers: ServiceDataCollectionStore<PersonGroupExt>;

  @observable
  goalsDs: QueryDataCollectionStore<Goal>;

  @observable
  updated = false;

  reactionDisposer: IReactionDisposer;

  @observable
  globalErrors: string[] = [];

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        Notification.error({
          message: this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        });
        return;
      }
      this.dataInstance
        .update(this.props.form.getFieldsValue(this.fields))
        .then(() => {
          Notification.success({
            message: this.props.intl.formatMessage({id: "management.editor.success"})
          });
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
                Notification.error({
                  message: this.props.intl.formatMessage({id: "management.editor.validationError"})
                });
              } else {
                Notification.error({
                  message: this.props.intl.formatMessage({id: "management.editor.error"})
                });
              }
            });
          } else {
            Notification.error({
              message: this.props.intl.formatMessage({id: "management.editor.error"})
            });
          }
        });
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={"/kpi/" + this.props.appId}/>;
    }

    const messages = this.props.mainStore!.messages!;

    const {status} = this.dataInstance;

    return (
      <Page>
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <Card className="narrow-layout card-actions-container" actions={[
            <Link to={"/kpi/" + this.props.appId}>
              <Button htmlType="button" buttonType={ButtonType.FOLLOW}>
                <FormattedMessage id="management.editor.cancel"/>
              </Button>
            </Link>,
            <Button
              type="primary"
              htmlType="submit"
              disabled={status !== "DONE" && status !== "ERROR"}
              loading={status === "LOADING"}
              style={{marginLeft: "8px"}}>
              <FormattedMessage id="management.editor.submit"/>
            </Button>
          ]} bordered={false}>
            <Section size={"large"}>
              <Form.Item label={<Msg entityName={AssignedGoal.NAME} propertyName='positionGroup'/>}
                         key='positionGroup'
                         style={{marginBottom: '12px'}}>
                {this.props.form.getFieldDecorator('positionGroup', {
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[AssignedGoal.NAME + '.' + 'positionGroup']})
                  }],
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <Select onChange={this.onChangeManager}>{this.positionGroups
                    ? this.positionGroups.items.map(pg =>
                      <Select.Option
                        value={pg.id}>{pg._instanceName}</Select.Option>)
                    : null}</Select>)}
              </Form.Item>
              <Form.Item label={<FormattedMessage id="cascade.goal"/>}
                         key='goal'
                         style={{marginBottom: '12px'}}>
                {this.props.form.getFieldDecorator('goal', {
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[AssignedGoal.NAME + '.' + 'goal']})
                  }]
                })(
                  <Select onChange={this.onChangeGoal}>{this.goalsDs ? this.goalsDs.items.map(g => {
                    // @ts-ignore
                    return <Select.Option category={g.library ? g.library.category!.id : ""}
                                          value={g.id}>{(g as SerializedEntity<Goal>)._instanceName}</Select.Option>
                  }) : null}</Select>
                )}
              </Form.Item>

              <Form.Item label={<FormattedMessage id="goal.description"/>}
                         key='goalSuccessCriteria'
                         style={{marginBottom: '12px'}}>
                {this.props.form.getFieldDecorator('goalSuccessCriteria')(
                  (<Input disabled/>)
                )}
              </Form.Item>

              <Form.Item label={<FormattedMessage id="my.goal"/>}
                         key='goalString'
                         style={{marginBottom: '12px'}}>
                {this.props.form.getFieldDecorator('goalString', {
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[AssignedGoal.NAME + '.' + 'goalString']})
                  }]
                })(
                  (<Input/>)
                )}
              </Form.Item>

              <Form.Item label={<FormattedMessage id="my.goal.description"/>}
                         key='successCriteria'
                         style={{marginBottom: '12px'}}>{
                this.props.form.getFieldDecorator('successCriteria')(
                  <TextArea/>
                )}
              </Form.Item>

              <Field
                entityName={AssignedGoal.NAME}
                propertyName="category"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px", display: 'none'}}}
              />
              <Field
                entityName={AssignedGoal.NAME}
                propertyName="weight"
                form={this.props.form}
                formItemOpts={{
                  style: {marginBottom: "12px"},
                  label: this.props.intl.formatMessage({id: "goal.weight"})
                }}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[AssignedGoal.NAME + '.' + 'weight']})
                  }]
                }}
              />

              {this.globalErrors.length > 0 && (
                <Alert
                  message={<MultilineText lines={toJS(this.globalErrors)}/>}
                  type="error"
                  style={{marginBottom: "24px"}}
                />
              )}
            </Section>
          </Card>
        </Form>
      </Page>
    );
  }

  onChangeManager = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    this.loadGoals(value);
  };

  loadGoals = (positionGroupId: string) => {
    this.goalsDs = queryCollection<Goal>(Goal.NAME, "positionGroupGoals", {positionGroupId: positionGroupId});
  };

  onChangeGoal = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    const goalId = option!.props["value"] as any;
    const goal = this.findSelectedGoal(goalId);

    const successCriteria = goal ? (goal as any).successCriteriaLang : null;

    this.goalSelectUpdateProperties(option.props['children'], option.props['category'], successCriteria, successCriteria);
  };

  findSelectedGoal = (goalId: string) => {
    return this.goalsDs.items.find(goal => goal.id === goalId);
  };

  goalSelectUpdateProperties = (goalString: any, category: any, successCriteria?: string | null, goalSuccessCriteria?: string | null) => {
    this.props.form.setFieldsValue({
      successCriteria: successCriteria,
      goalSuccessCriteria: goalSuccessCriteria,
      goalString: goalString,
      category: category
    });
  };

  componentDidMount() {
    this.assignedPerformancePlan.afterLoad = () => {
      const positionGroupId = this.props.rootStore!.userInfo.positionGroupId!;
      restServices.positionService.getManager(positionGroupId)
        .then(managerPosition => {
          const managerId = this.dataInstance.item && this.dataInstance.item.positionGroup
            ? this.dataInstance.item.positionGroup.id
            : managerPosition.id;
          this.positionGroups = collection<PositionGroupExt>(PositionGroupExt.NAME, {
            filter: {
              conditions: [{
                property: 'id',
                operator: '=',
                value: managerId
              }]
            },
            view: 'assigned-goal-cascade-positionGroupExt-view'
          });
        })
    };

    if (this.props.entityId && this.props.entityId !== CascadeGoalManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId).then(() => {
        const thisGoal = this.dataInstance.item;
        this.goalsDs = queryCollection<Goal>(Goal.NAME, "positionGroupGoals", {positionGroupId: thisGoal!.positionGroup!.id}, {loadImmediately: true});
        this.goalsDs.afterLoad = () => {
          const goal = this.findSelectedGoal(thisGoal!.goal!.id);
          const successCriteria = goal ? (goal as any).successCriteriaLang : null;
          this.props.form.setFieldsValue({
            goalSuccessCriteria: successCriteria
          });
        }
      });
    } else {
      const assignedPerformancePlan = new AssignedPerformancePlan();
      assignedPerformancePlan.id = this.props.appId;

      const assignedGoal = new AssignedGoal();
      assignedGoal.assignedPerformancePlan = assignedPerformancePlan;
      assignedGoal.goalType = AssignedGoalTypeEnum.CASCADE;

      this.dataInstance.setItem(assignedGoal);
      this.assignedPerformancePlan.load();
    }

    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {

        this.assignedPerformancePlan.load();

        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
        );
      }
    );
  }

  componentWillUnmount() {
    this.reactionDisposer();
  }
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
      });
    }
  })(CascadeEditComponent)
);
