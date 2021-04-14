import * as React from "react";
import {FormEvent} from "react";
import {Alert, Button, Card, Form, message} from "antd";
import {observer} from "mobx-react";
import {AbsenceRvdRequestManagement} from "./AbsenceRvdRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

import {
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText
} from "@cuba-platform/react";

import "../../../../../app/App.css";

import {AbsenceRvdRequest} from "../../../../../cuba/entities/base/tsadv_AbsenceRvdRequest";
import Page from "../../../../hoc/PageContentHoc";
import Section from "../../../../hoc/Section";
import {DictionaryDataCollectionStore} from "../../../../util/DictionaryDataCollectionStore";
import {DicRequestStatus} from "../../../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicAbsenceType} from "../../../../../cuba/entities/base/tsadv$DicAbsenceType";
import AbstractBprocEdit from "../../../Bproc/abstract/AbstractBprocEdit";
import {ReadonlyField} from "../../../../components/ReadonlyField";
import {rootStore} from "../../../../store";
import {restServices} from "../../../../../cuba/services";
import {CertificateRequest} from "../../../../../cuba/entities/base/tsadv_CertificateRequest";
import LoadingPage from "../../../LoadingPage";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string | undefined;
};

@observer
class AbsenceRvdRequestEditComponent extends AbstractBprocEdit<AbsenceRvdRequest, EditorProps & Props & WrappedComponentProps> {
  dataInstance = instance<AbsenceRvdRequest>(AbsenceRvdRequest.NAME, {
    view: "absenceRvdRequest.edit",
    loadImmediately: false
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  @observable
  isJustRequired = false;

  @observable
  isOriginalSheet = false;

  @observable
  isVacationDate = false;

  @observable
  isAbsenceIntersected = false;

  fields = [
    "purposeText",

    "timeOfStarting",

    "timeOfFinishing",

    "totalHours",

    "compencation",

    "vacationDay",

    "acquainted",

    "agree",

    "legacyId",

    "organizationBin",

    "integrationUserLogin",

    "requestNumber",

    "requestDate",

    "comment"
  ];

  @observable
  globalErrors: string[] = [];

  @observable
  absenceTypesDc: DictionaryDataCollectionStore<DicRequestStatus>;


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
      return <Redirect to={AbsenceRvdRequestManagement.PATH}/>;
    }

    const {status} = this.dataInstance;

    return (
      <Page pageName={this.props.intl.formatMessage({id: "absenceRvdRequest"})}>
        <Section size="large">

          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="purposeText"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="timeOfStarting"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="timeOfFinishing"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="totalHours"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="compencation"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{
                valuePropName: "checked"
              }}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="vacationDay"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{
                valuePropName: "checked"
              }}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="acquainted"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{
                valuePropName: "checked"
              }}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="agree"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{
                valuePropName: "checked"
              }}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="legacyId"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="organizationBin"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="integrationUserLogin"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="requestNumber"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{
                rules: [{required: true}]
              }}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="requestDate"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{
                rules: [{required: true}]
              }}
            />

              {/*
              <Field
                entityName={AbsenceRvdRequest.NAME}
                propertyName="type"
                form={this.props.form}
                optionsContainer={this.absenceTypesDc}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: false,
                  }],
                }}
              />*/}


            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="comment"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
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
              <Link to={AbsenceRvdRequestManagement.PATH}>
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
          </Form>
        </Section>
      </Page>
    );
  }

  calcAbsenceDays = (type?: string | null, dateFrom?: any, dateTo?: any) => {
    type = type || this.props.form.getFieldValue(`type`);
    dateFrom = dateFrom || this.props.form.getFieldValue(`timeOfStarting`);
    dateTo = dateTo || this.props.form.getFieldValue(`timeOfFinishing`);

    const personGroupId = rootStore.userInfo.personGroupId;

    if (type && dateTo && dateFrom && personGroupId) {
      restServices.absenceService.countDays({
        dateFrom: dateFrom,
        dateTo: dateTo,
        absenceTypeId: type,
        personGroupId: personGroupId
      }).then(value => {
        this.props.form.setFields({"totalHours": {value: value}});
        this.props.form.validateFields(['totalHours'], {force: true})
      })
    }
  }

  componentDidMount() {
    if (this.props.entityId !== AbsenceRvdRequestManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId as string);
    } else {
      this.dataInstance.setItem(new AbsenceRvdRequest());
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
  })(AbsenceRvdRequestEditComponent)
);
