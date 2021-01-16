import * as React from "react";
import {FormEvent} from "react";
import {Alert, Button, Card, Form, message} from "antd";
import {inject, observer} from "mobx-react";
import {AssignedPerformancePlanManagement} from "./AssignedPerformancePlanManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

import {
  collection,
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText
} from "@cuba-platform/react";

import "../../../app/App.css";

import {AssignedPerformancePlan} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {PerformancePlan} from "../../../cuba/entities/base/tsadv$PerformancePlan";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import Page from "../../hoc/PageContentHoc";
import {RootStoreProp} from "../../store";
import LoadingPage from "../LoadingPage";
import FormContainer from "../../common/FormContainer";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@observer
class AssignedPerformancePlanEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp> {
  dataInstance = instance<AssignedPerformancePlan>(
    AssignedPerformancePlan.NAME,
    {view: "assignedPerformancePlan-myKpi-edit", loadImmediately: false}
  );

  performancePlansDc = collection<PerformancePlan>(PerformancePlan.NAME, {
    view: "_minimal"
  });

  assignedPersonsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  assigned_bysDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = [
    "result",

    "gzp",

    "status",

    "startDate",

    "endDate",

    "kpiScore",

    "assignedPerson",

    "assigned_by"
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

  render() {
    if (this.updated) {
      return <Redirect to={AssignedPerformancePlanManagement.PATH}/>;
    }

    const {status} = this.dataInstance;

    return (
      <Page
        pageName={this.props.intl.formatMessage({id: 'page.kpi'}, {"name": status === 'DONE' ? this.dataInstance.item!.performancePlan!.performancePlanName : ""})}>
        <Card className="narrow-layout large-section section-container">
          <div className={"section-header-container"}>{this.props.intl.formatMessage({id: "employeeInfo"})}</div>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <FormContainer>
              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="assignedPerson"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                optionsContainer={this.assignedPersonsDc}
                getFieldDecoratorOpts={{
                  rules: [{required: true}]
                }}
              />
              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="result"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{}}
              />

              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="gzp"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{}}
              />

              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="status"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{}}
              />

              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="startDate"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{}}
              />

              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="endDate"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{}}
              />

              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="kpiScore"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{}}
              />

              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="extraPoint"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{}}
              />

              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="finalScore"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{}}
              />

              <Field
                entityName={AssignedPerformancePlan.NAME}
                propertyName="assigned_by"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                optionsContainer={this.assigned_bysDc}
                getFieldDecoratorOpts={{}}
              />

              {this.globalErrors.length > 0 && (
                <Alert
                  message={<MultilineText lines={toJS(this.globalErrors)}/>}
                  type="error"
                  style={{marginBottom: "24px"}}
                />
              )}

              <Form.Item style={{textAlign: "center"}}>
                <Link to={AssignedPerformancePlanManagement.PATH}>
                  <Button htmlType="button">
                    <FormattedMessage id="management.editor.cancel"/>
                  </Button>
                </Link>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={status !== "DONE" && status !== "ERROR"}
                  loading={status === "LOADING"}
                  style={{marginLeft: "8px"}}
                >
                  <FormattedMessage id="management.editor.submit"/>
                </Button>
              </Form.Item>
            </FormContainer>
          </Form>
        </Card>
      </Page>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== AssignedPerformancePlanManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new AssignedPerformancePlan());
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
  })(AssignedPerformancePlanEditComponent)
);
