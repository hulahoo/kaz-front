import * as React from "react";
import { createElement, FormEvent } from "react";
import { Alert, Button, Card, Form, message } from "antd";
import { observer } from "mobx-react";
import { ScheduleOffsetsRequestManagement } from "./ScheduleOffsetsRequestManagement";
import { FormComponentProps } from "antd/lib/form";
import { Link, Redirect } from "react-router-dom";
import { IReactionDisposer, observable, reaction, toJS } from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import { Input } from 'antd';

import {
  collection,
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText,
  Msg
} from "@cuba-platform/react";

import "../../../app/App.css";

import { ScheduleOffsetsRequest } from "../../../cuba/entities/base/tsadv_ScheduleOffsetsRequest";
import { PersonGroupExt } from "../../../cuba/entities/base/base$PersonGroupExt";
import { DicSchedulePurpose } from "../../../cuba/entities/base/tsadv_DicSchedulePurpose";
import { StandardSchedule } from "../../../cuba/entities/base/tsadv$StandardSchedule";
import { DicRequestStatus } from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import { restServices } from "../../../cuba/services";
import { ReadonlyField } from "../../components/ReadonlyField";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@observer
class ScheduleOffsetsRequestEditComponent extends React.Component<
Props & WrappedComponentProps
> {
  dataInstance = instance<ScheduleOffsetsRequest>(ScheduleOffsetsRequest.NAME, {
    view: "scheduleOffsetsRequest-for-my-team",
    loadImmediately: false
  });

  personGroupsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  purposesDc = collection<DicSchedulePurpose>(DicSchedulePurpose.NAME, {
    view: "_minimal"
  });

  currentSchedulesDc = collection<StandardSchedule>(StandardSchedule.NAME, {
    view: "_minimal"
  });

  newSchedulesDc = collection<StandardSchedule>(StandardSchedule.NAME, {
    view: "_minimal"
  });

  statussDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = [
    "purposeText",

    "dateOfNewSchedule",

    "dateOfStartNewSchedule",

    "detailsOfActualWork",

    "agree",

    "acquainted",

    "legacyId",

    "organizationBin",

    "integrationUserLogin",

    "requestNumber",

    "requestDate",

    "comment",

    "personGroup",

    "purpose",

    "currentSchedule",

    "newSchedule",

    "status"
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
            this.props.intl.formatMessage({ id: "management.editor.success" })
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
              this.props.intl.formatMessage({ id: "management.editor.error" })
            );
          }
        });
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={ScheduleOffsetsRequestManagement.PATH} />;
    }

    const { status } = this.dataInstance;

    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    let field_style = { marginBottom: "12px", margin: "10px", };
    let card_style = { margin: "10px", width: "500px" };
    return (
      <Card title="Заявка на график сменности" className="narrow-layout" style={card_style}>
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <ReadonlyField
            disabled={true}
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="requestNumber"
            form={this.props.form}
            formItemOpts={{ style: field_style }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />

          <ReadonlyField
            disabled={true}
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="status"
            form={this.props.form}
            formItemOpts={{ style: field_style }}
            optionsContainer={this.statussDc}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />

          <ReadonlyField
            disabled={true}
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="requestDate"
            form={this.props.form}
            formItemOpts={{ style: field_style }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />


          <ReadonlyField
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="personGroup"
            form={this.props.form}
            formItemOpts={{ style: field_style }}
            optionsContainer={this.personGroupsDc}
            getFieldDecoratorOpts={{}}
          />

          <ReadonlyField
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="purpose"
            form={this.props.form}
            formItemOpts={{ style: field_style }}
            optionsContainer={this.purposesDc}
            getFieldDecoratorOpts={{}}
          />
          <ReadonlyField
            disabled={true}
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="currentSchedule"
            form={this.props.form}
            formItemOpts={{ style: field_style }}
            optionsContainer={this.currentSchedulesDc}
            getFieldDecoratorOpts={{}}
          />

          <ReadonlyField
            disabled={true}
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="newSchedule"
            form={this.props.form}
            formItemOpts={{ style: field_style }}
            optionsContainer={this.newSchedulesDc}
            getFieldDecoratorOpts={{}}
          />

          {/* <ReadonlyField
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="purposeText"
            form={this.props.form}
            formItemOpts={{ style: field_style}}
            getFieldDecoratorOpts={{}}
          /> */}

          <ReadonlyField
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="dateOfNewSchedule"
            form={this.props.form}
            formItemOpts={{ style: field_style }}
            getFieldDecoratorOpts={{}}
          />

          <ReadonlyField
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="dateOfStartNewSchedule"
            form={this.props.form}
            formItemOpts={{ style: field_style }}
            getFieldDecoratorOpts={{}}
          />



          <div>
            {createElement(Msg, { entityName: this.dataInstance.entityName, propertyName: "detailsOfActualWork" })}
            <Form.Item>
              {getFieldDecorator("detailsOfActualWork")(
                <TextArea
                  rows={4} />
              )}
            </Form.Item>
          </div>

          {/*                 
          <ReadonlyField
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="detailsOfActualWork"
            form={this.props.form}
            formItemOpts={{
              style: {
                marginBottom: "12px",
                margin: "10px",
              }
            }}
            getFieldDecoratorOpts={{}}
          /> */}
          {/* 
          <ReadonlyField
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="agree"
            form={this.props.form}
            formItemOpts={{ style: field_style}}
            getFieldDecoratorOpts={{
              valuePropName: "checked"
            }}
          />

          <ReadonlyField
            entityName={ScheduleOffsetsRequest.NAME}
            propertyName="acquainted"
            form={this.props.form}
            formItemOpts={{ style: field_style}}
            getFieldDecoratorOpts={{
              valuePropName: "checked"
            }}
          /> */}









          {this.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(this.globalErrors)} />}
              type="error"
              style={{ marginBottom: "24px" }}
            />
          )}

          <Form.Item style={{ textAlign: "center" }}>
            <Link to={ScheduleOffsetsRequestManagement.PATH}>
              <Button htmlType="button">
                <FormattedMessage id="management.editor.cancel" />
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              disabled={status !== "DONE" && status !== "ERROR"}
              loading={status === "LOADING"}
              style={{ marginLeft: "8px" }}
            >
              <FormattedMessage id="management.editor.submit" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== ScheduleOffsetsRequestManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      restServices.documentService.getOffsetRequestsNew({}).then(val => {
        this.dataInstance.setItem(val);
      })

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
  })(ScheduleOffsetsRequestEditComponent)
);
