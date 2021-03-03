import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Form, message, Select} from "antd";
import {inject, observer} from "mobx-react";
import {CascadeGoalManagement} from "./CascadeGoalManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors,
  constructFieldsWithErrors,
  DataCollectionStore,
  extractServerValidationErrors,
  Field, injectMainStore,
  instance, MainStoreInjected,
  Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../../app/App.css";

import {AssignedPerformancePlan} from "../../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {PersonGroupExt} from "../../../../cuba/entities/base/base$PersonGroupExt";
import {serviceCollection, ServiceDataCollectionStore} from "../../../util/ServiceDataCollectionStore";
import {restServices} from "../../../../cuba/services";
import {RootStoreProp} from "../../../store";
import {AssignedGoal} from "../../../../cuba/entities/base/tsadv$AssignedGoal";
import {SerializedEntity} from "@cuba-platform/rest";
import {PositionExt} from "../../../../cuba/entities/base/base$PositionExt";
import {Goal} from "../../../../cuba/entities/base/tsadv$Goal";
import {queryCollection} from "../../../util/QueryDataCollectionStore";
import {queryInstance} from "../../../util/QueryDataInstanceStore";
import Button, {ButtonType} from "../../../components/Button/Button";
import Section from "../../../hoc/Section";
import Page from "../../../hoc/PageContentHoc";
import Notification from "../../../util/Notification/Notification";

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

  fields = ["performancePlan", "assignedByPersonGroup", "goalString", "weight", "result", "category", "goal"];

  dataInstance = instance<AssignedGoal>(AssignedGoal.NAME, {
    view: "assignedGoal-portal-kpi-create-default",
    loadImmediately: false
  });

  assignedPerformancePlan = queryInstance<AssignedPerformancePlan>(
    AssignedPerformancePlan.NAME,
    "kpiEditPage",
    {appId: this.props.appId}
  );

  @observable
  managers: ServiceDataCollectionStore<PersonGroupExt>;

  @observable
  goalsDs: DataCollectionStore<Goal>;

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
              <Form.Item label={<Msg entityName={AssignedGoal.NAME} propertyName='assignedByPersonGroup'/>}
                         key='assignedByPersonGroup'
                         style={{marginBottom: '12px'}}>
                {this.props.form.getFieldDecorator('assignedByPersonGroup', {
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[AssignedGoal.NAME + '.' + 'assignedByPersonGroup']})
                  }],
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <Select onChange={this.onChangeManager}>{this.managers ? this.managers.items.map(m => <Select.Option
                    value={m.id}
                    position-group-id={m.assignments![0].positionGroup!.id}>{(m.assignments![0].positionGroup!.position! as SerializedEntity<PositionExt>)._instanceName}</Select.Option>) : null}</Select>
                )}
              </Form.Item>
              <Form.Item label={<Msg entityName={AssignedGoal.NAME} propertyName='goal'/>}
                         key='goal'
                         style={{marginBottom: '12px'}}>
                {this.props.form.getFieldDecorator('goal', {
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[AssignedGoal.NAME + '.' + 'goal']})
                  }]
                })(
                  <Select onChange={this.onChangeGoal}>{this.goalsDs ? this.goalsDs.items.map(g => {
                    return <Select.Option
                      value={g.id}>{(g as SerializedEntity<Goal>)._instanceName}</Select.Option>
                  }) : null}</Select>
                )}
              </Form.Item>
              <Field
                entityName={AssignedGoal.NAME}
                propertyName="goalString"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[AssignedGoal.NAME + '.' + 'goalString']})
                  }]
                }}
              />
              <Field
                entityName={AssignedGoal.NAME}
                propertyName="weight"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[AssignedGoal.NAME + '.' + 'weight']})
                  }]
                }}
              />
              <Field
                entityName={AssignedGoal.NAME}
                propertyName="result"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
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
    this.goalsDs = queryCollection<Goal>(Goal.NAME, "positionGroupGoals", {positionGroupId: option!.props["position-group-id"]});
  };

  onChangeGoal = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    this.props.form.setFieldsValue({
      goalString: option.props['children']
    })
  };

  componentDidMount() {
    if (this.props.entityId && this.props.entityId !== CascadeGoalManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      const assignedPerformancePlan = new AssignedPerformancePlan();
      assignedPerformancePlan.id = this.props.appId;

      const assignedGoal = new AssignedGoal();
      assignedGoal.assignedPerformancePlan = assignedPerformancePlan;

      this.dataInstance.setItem(assignedGoal);
    }
    this.assignedPerformancePlan.afterLoad = () => {
      const positionGroupId = this.assignedPerformancePlan.item!.assignedPerson!.assignments![0].positionGroup!.id;
      this.managers = serviceCollection<PersonGroupExt>(restServices.employeeService.findManagerListByPositionGroup.bind(null, {
        positionGroupId: positionGroupId,
        showAll: false,
        viewName: "personGroup-with-position"
      }));
      this.managers.load();

      this.managers.afterLoad = () => {
        this.goalsDs = queryCollection<Goal>(Goal.NAME, "positionGroupGoals", {positionGroupId: this.dataInstance.item!.assignedByPersonGroup!.assignments![0].positionGroup!.id});
        this.goalsDs.load();
      };
    };

    this.assignedPerformancePlan.load();

    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
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