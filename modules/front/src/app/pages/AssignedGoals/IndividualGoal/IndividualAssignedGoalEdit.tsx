import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Form, InputNumber, Select} from "antd";
import {observer} from "mobx-react";
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
  instance,
  MainStoreInjected,
  Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../../app/App.css";

import {AssignedGoal} from "../../../../cuba/entities/base/tsadv$AssignedGoal";
import {DicGoalCategory} from "../../../../cuba/entities/base/tsadv$DicGoalCategory";
import Section from "../../../hoc/Section";
import Page from "../../../hoc/PageContentHoc";
import {AssignedPerformancePlan} from "../../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import Button, {ButtonType} from "../../../components/Button/Button";
import Notification from "../../../util/Notification/Notification";
import SecurityStateAssignedGoal from "../SecurityStateAssignedGoal";
import TextArea from "antd/es/input/TextArea";
import {AssignedGoalTypeEnum} from "../../../../cuba/enums/enums";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string,
  appId: string
};

@injectMainStore
@observer
class IndividualAssignedGoalEdit extends SecurityStateAssignedGoal<Props & WrappedComponentProps & MainStoreInjected> {

  dataInstance = instance<AssignedGoal>(AssignedGoal.NAME, {
    view: "assignedGoal-portal-kpi-create-default",
    loadImmediately: false
  });

  categorysDc = collection<DicGoalCategory>(DicGoalCategory.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;

  reactionDisposer: IReactionDisposer;

  fields = [
    "category",

    "goalString",

    "weight",

    "startDate",

    "endDate",

    "successCriteria"
  ];

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
            message: this.props.intl.formatMessage({id: "goal.management.editor.success"})
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
                  message: this.props.intl.formatMessage({
                    id: "management.editor.validationError"
                  })
                });
              } else {

                Notification.error({
                  message: this.props.intl.formatMessage({
                    id: "management.editor.error"
                  })
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

  checkWeightRange = (rule: any, value: any, callback: any) => {
    const messages = this.props.mainStore!.messages!;
    if (value <= 0) {
      callback(this.props.intl.formatMessage({id: "form.validation.number.min"}, {
        fieldName: messages[AssignedGoal.NAME + '.' + 'weight'],
        value: 1
      }));
    }
    callback();
  };

  render() {
    if (this.updated) {
      return <Redirect to={"/kpi/" + this.props.appId}/>;
    }

    const messages = this.props.mainStore!.messages!;

    return (
      <Page pageName={this.props.intl.formatMessage({id: "goal.individual.create"})}>
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <Card className="narrow-layout card-actions-container" actions={[
            <Link to={"/kpi/" + this.props.appId}>
              <Button buttonType={ButtonType.FOLLOW}>
                <FormattedMessage id="management.editor.cancel"/>
              </Button>
            </Link>,
            this.pageActions()
          ]} bordered={false}>
            <Section size={"large"}>
              <Field
                entityName={AssignedGoal.NAME}
                propertyName="category"
                form={this.props.form}
                formItemOpts={{
                  style: {marginBottom: "12px"},
                  label: this.props.intl.formatMessage({ id: "goalLibrary" })
                }}
                optionsContainer={this.categorysDc}

              />

              <Field
                entityName={AssignedGoal.NAME}
                propertyName="goalString"
                form={this.props.form}
                formItemOpts={{
                  style: {marginBottom: "12px"},
                  label: this.props.intl.formatMessage({ id: "goal" })
                }}
                getFieldDecoratorOpts={{}}
              />
              <Form.Item label={<Msg entityName={AssignedGoal.NAME} propertyName='weight'/>}
                         key='weight'
                         style={{marginBottom: '12px'}}>{
                this.props.form.getFieldDecorator('weight', {
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[AssignedGoal.NAME + '.' + 'weight']})
                  }, {
                    validator: this.checkWeightRange
                  }]
                })(
                  <InputNumber/>
                )}
              </Form.Item>

              <Form.Item label={<Msg entityName={AssignedGoal.NAME} propertyName='successCriteria'/>}
                         key='successCriteria'
                         style={{marginBottom: '12px'}}>{
                this.props.form.getFieldDecorator('successCriteria')(
                  <TextArea/>
                )}
              </Form.Item>

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

  pageActions = (): JSX.Element[] => {
    if (!this.readonly) {
      const {status} = this.dataInstance;

      return [<Button
        buttonType={ButtonType.PRIMARY}
        htmlType="submit"
        disabled={status !== "DONE" && status !== "ERROR" && status !== "CLEAN"}
        loading={status === "LOADING"}
        style={{marginLeft: "8px"}}
      >
        <FormattedMessage id="management.editor.submit"/>
      </Button>]
    }
    return [];
  };

  componentDidMount() {
    super.componentDidMount();

    if (this.props.entityId !== 'new') {
      this.dataInstance.load(this.props.entityId);
    } else {
      const assignedPerformancePlan = new AssignedPerformancePlan();
      assignedPerformancePlan.id = this.props.appId;

      const assignedGoal = new AssignedGoal();
      assignedGoal.assignedPerformancePlan = assignedPerformancePlan;
      assignedGoal.goalType = AssignedGoalTypeEnum.INDIVIDUAL;

      this.dataInstance.setItem(assignedGoal);
    }
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
  })(IndividualAssignedGoalEdit)
);
