import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Col, Form, InputNumber, message, Row} from "antd";
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
  Field, getCubaREST, injectMainStore,
  instance, MainStoreInjected, Msg,
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
import Notification from "../../../util/notification/Notification";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string,
  assignedPerformancePlanId: string;
};

@observer
@injectMainStore
class IndividualAssignedGoalEdit extends React.Component<Props & WrappedComponentProps & MainStoreInjected> {
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

    "endDate"
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

      getCubaREST()!.searchEntities<AssignedGoal>(AssignedGoal.NAME, {
        conditions: [
          {
            property: "assignedPerformancePlan",
            operator: "=",
            value: this.props.assignedPerformancePlanId
          }]
      }, {view: "assigned-goal-weight"}).then((otherGoals) => {
        const otherGoalsWeights: number = otherGoals.map((i: AssignedGoal) => i.weight ? i.weight : 0).reduce((i1, i2) => i1 + i2, 0);
        const weightInput = Number(this.props.form.getFieldValue("weight"));

        if ((otherGoalsWeights + weightInput) > 100) {
          Notification.error({
            message: this.props.intl.formatMessage({
              id: "goal.validation.error.totalWeightSum"
            }, {totalSumWeight: otherGoalsWeights + weightInput})
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
      return <Redirect to={"/kpi/" + this.props.assignedPerformancePlanId}/>;
    }

    const messages = this.props.mainStore!.messages!;
    const {status} = this.dataInstance;

    return (
      <Page pageName={"Создание индивидуальной цели"}>
        <Card className="narrow-layout" bordered={false}>
          <Section size={"large"}>
            <Form onSubmit={this.handleSubmit} layout="vertical">
              <Row className={"form-row"}>
                <Col md={24} lg={8}>
                  <Field
                    entityName={AssignedGoal.NAME}
                    propertyName="category"
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    optionsContainer={this.categorysDc}
                    getFieldDecoratorOpts={{}}
                  />
                </Col>
                <Col md={24} lg={8}>
                  <Field
                    entityName={AssignedGoal.NAME}
                    propertyName="goalString"
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    getFieldDecoratorOpts={{}}
                  />
                </Col>
                <Col md={24} lg={8}>
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
                </Col>
              </Row>
              {this.globalErrors.length > 0 && (
                <Alert
                  message={<MultilineText lines={toJS(this.globalErrors)}/>}
                  type="error"
                  style={{marginBottom: "24px"}}
                />
              )}

              <Form.Item style={{textAlign: "center"}}>
                <Link to={"/kpi/" + this.props.assignedPerformancePlanId}>
                  <Button buttonType={ButtonType.FOLLOW}>
                    <FormattedMessage id="management.editor.cancel"/>
                  </Button>
                </Link>
                <Button
                  buttonType={ButtonType.PRIMARY}
                  htmlType="submit"
                  disabled={status !== "DONE" && status !== "ERROR" && status !== "CLEAN"}
                  loading={status === "LOADING"}
                  style={{marginLeft: "8px"}}
                >
                  <FormattedMessage id="management.editor.submit"/>
                </Button>
              </Form.Item>
            </Form>
          </Section>
        </Card>
      </Page>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== 'new') {
      this.dataInstance.load(this.props.entityId);
    } else {
      const assignedPerformancePlan = new AssignedPerformancePlan();
      assignedPerformancePlan.id = this.props.assignedPerformancePlanId;

      const assignedGoal = new AssignedGoal();
      assignedGoal.assignedPerformancePlan = assignedPerformancePlan;

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
