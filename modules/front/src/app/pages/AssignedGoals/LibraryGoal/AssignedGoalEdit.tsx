import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Form, InputNumber, message, Select} from "antd";
import {observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  DataCollectionStore,
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
import {Goal} from "../../../../cuba/entities/base/tsadv$Goal";
import {GoalLibrary} from "../../../../cuba/entities/base/tsadv$GoalLibrary";
import Section from "../../../hoc/Section";
import Page from "../../../hoc/PageContentHoc";
import Notification from "../../../util/Notification/Notification";
import {FormComponentProps} from "antd/es/form";
import Button, {ButtonType} from "../../../components/Button/Button";
import SecurityStateAssignedGoal from "../SecurityStateAssignedGoal";
import Input from "../../../components/Input/Input";
import {AssignedGoalTypeEnum} from "../../../../cuba/enums/enums";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  appId: string,
  entityId: string,
};

@injectMainStore
@observer
class AssignedGoalEditComponent extends SecurityStateAssignedGoal<Props & WrappedComponentProps & MainStoreInjected> {
  dataInstance = instance<AssignedGoal>(AssignedGoal.NAME, {
    view: "assignedGoal-library",
    loadImmediately: false
  });

  @observable
  goalsDc: DataCollectionStore<Goal>;

  goalLibrarysDc = collection<GoalLibrary>(GoalLibrary.NAME, {
    view: "goal-library-category"
  });

  @observable
  updated = false;

  @observable
  loadingGoals = false;

  reactionDisposer: IReactionDisposer;

  fields = ["goal", "weight", "goalLibrary", "goalString", "category", "goalSuccessCriteria"];

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

      const fieldsValue = this.props.form.getFieldsValue(this.fields);
      this.dataInstance
        .update({
          ...fieldsValue,
          assignedPerformancePlan: {
            id: this.props.appId
          }
        })
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

  changeGoalLibrary = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    this.props.form.setFieldsValue({
      category: option ? option!.props["category"] : undefined,
      goal: undefined,
      goalString: undefined,
      goalSuccessCriteria: undefined,
    });
    this.goalsDc = collection<Goal>(Goal.NAME, {
      filter: {
        conditions: [{
          property: "library",
          operator: "=",
          value: value
        }]
      }, view: "_local"
    });
  };

  selectGoal = (value: string, option: React.ReactElement<HTMLLIElement>) => {

    const goalId = option!.props["value"];
    const goal = this.goalsDc && this.goalsDc.items ? this.goalsDc.items.find(goal => goal.id === goalId) : undefined;

    const successCriteria = goal ? goal.successCriteria : null;

    this.props.form.setFieldsValue({
      goalString: option.props["children"],
      goalSuccessCriteria: successCriteria,
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
    const {Option} = Select;
    const {status} = this.dataInstance;

    return (
      <Page pageName={""}>
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <Card className="narrow-layout card-actions-container" actions={
            [<Link to={"/kpi/" + this.props.appId}>
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
              </Button>]
          } bordered={false}>
            <Section size={"large"}>
              <Form.Item label={this.props.intl.formatMessage({id: "goalLibrary"})}
                         key='goalLibrary'
                         style={{marginBottom: '12px'}}>
                {this.props.form.getFieldDecorator('goalLibrary', {
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <Select onChange={this.changeGoalLibrary}>
                    {this.goalLibrarysDc.items.map(gl => {
                      //@ts-ignore
                      return <Option value={gl.id}
                                     category={gl.category!.id}>{gl._instanceName}</Option>
                    })}
                  </Select>
                )}
              </Form.Item>

              <Form.Item label={this.props.intl.formatMessage({id: "goal"})}
                         key='goal'
                         style={{marginBottom: '12px'}}>
                {this.props.form.getFieldDecorator('goal', {
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <Select onChange={this.selectGoal}>{this.goalsDc ? this.goalsDc.items.map(gl => <Option
                    value={gl.id}>{gl._instanceName}</Option>) : null}</Select>
                )}
              </Form.Item>


              <Form.Item label={<Msg entityName={Goal.NAME} propertyName='successCriteria'/>}
                         key='goalSuccessCriteria'
                         style={{marginBottom: '12px'}}>
                {this.props.form.getFieldDecorator('goalSuccessCriteria')(
                  (<Input disabled/>)
                )}
              </Form.Item>

              <Form.Item label={<Msg entityName={AssignedGoal.NAME} propertyName='weight'/>}
                         key='weight'
                         style={{marginBottom: '12px'}} className={"button-actions-group"}>{
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
              <Field
                entityName={AssignedGoal.NAME}
                propertyName="goalString"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px", display: 'none'}}}
                getFieldDecoratorOpts={{}}
              />
              <Field
                entityName={AssignedGoal.NAME}
                propertyName="category"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px", display: 'none'}}}
                getFieldDecoratorOpts={{}}
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

  pageActions = (): JSX.Element[] => {
    if (!this.readonly) {
      const {status} = this.dataInstance;

      return [<Button
        buttonType={ButtonType.PRIMARY}
        htmlType="submit"
        disabled={status !== "DONE" && status !== "ERROR" && status !== "CLEAN"}
        loading={status === "LOADING"}
        style={{marginLeft: "8px"}}>
        <FormattedMessage id="management.editor.submit"/>
      </Button>]
    }
    return [];
  };

  componentDidMount() {
    if (this.props.entityId !== "new") {
      this.dataInstance.load(this.props.entityId);
    } else {
      const assignedGoal = new AssignedGoal();
      assignedGoal.goalType = AssignedGoalTypeEnum.LIBRARY;

      this.dataInstance.setItem(assignedGoal);
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
        const goalLibrary = this.dataInstance.getFieldValues(["goalLibrary"]).goalLibrary;
        if (goalLibrary) {
          this.goalsDc = collection<Goal>(Goal.NAME, {
            filter: {
              conditions: [{
                property: "library",
                operator: "=",
                value: goalLibrary
              }]
            }, view: "_local"
          });
        }
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
        }
      );
    }
  })(AssignedGoalEditComponent));
