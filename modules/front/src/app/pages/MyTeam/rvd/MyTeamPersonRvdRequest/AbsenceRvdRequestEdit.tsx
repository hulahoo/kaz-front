import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Form, message} from "antd";
import {inject, observer} from "mobx-react";
import {AbsenceRvdRequestManagement} from "./AbsenceRvdRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect, RouteComponentProps} from "react-router-dom";
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
  MultilineText, collection, injectMainStore
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
import {DicDocumentType} from "../../../../../cuba/entities/base/tsadv$DicDocumentType";
import {DicPurposeAbsence} from "../../../../../cuba/entities/base/tsadv_DicPurposeAbsence";
import {DicAbsencePurpose} from "../../../../../cuba/entities/base/tsadv_DicAbsencePurpose";
import {MyTeamStructureManagement} from "../../MyTeamStructureManagement";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {withRouter} from "react-router";


type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string | undefined;
};

@inject("rootStore")
@injectMainStore
@observer
class AbsenceRvdRequestEditComponent extends AbstractBprocEdit<AbsenceRvdRequest, EditorProps & Props & WrappedComponentProps> {
  dataInstance = instance<AbsenceRvdRequest>(AbsenceRvdRequest.NAME, {
    view: "absenceRvdRequest.edit",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });


  absenceTypeDc = collection<DicAbsenceType>(DicAbsenceType.NAME, {
    view: "_minimal"
  });

  purposeDc = collection<DicAbsencePurpose>(DicAbsencePurpose.NAME, {
    view: "_base"
  });

  personGroupId: string;

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
    "requestNumber",

    "requestDate",

    "status",

    "personGroup",

    "type",

    "purpose",

    "timeOfStarting",

    "timeOfFinishing",

    "totalHours",

    "compencation",

    "vacationDay",

    "agree",
  ];

  @observable
  globalErrors: string[] = [];

  @observable
  absenceTypesDc: DictionaryDataCollectionStore<DicRequestStatus>;

  getUpdateEntityData = (): any => {
    if (this.isNotDraft()) return {...this.props.form.getFieldsValue(this.fields)};
    return {
      personGroup: {
        id: this.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  processDefinitionKey = "absenceRvdRequest";

  isUpdateBeforeOutcome = true;

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
    console.log(this.props.history!.goBack);
    return (
      <Page pageName={this.props.intl.formatMessage({id: "absenceRvdRequest"})}>
        <Section size="large">
          <Card actions={[
            <Button buttonType={ButtonType.FOLLOW} onClick={this.props.history!.goBack}>
              {this.props.intl.formatMessage({ id: "close" })}
            </Button>,
            this.getOutcomeBtns()]}>

          <Form onSubmit={this.validate} layout="vertical">

            <ReadonlyField
              entityName={this.dataInstance.entityName}
              propertyName="requestNumber"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              disabled={true}
              getFieldDecoratorOpts={{
                rules: [{required: true,}],
              }}
            />

            <ReadonlyField
              entityName={AbsenceRvdRequest.NAME}
              propertyName="requestDate"
              form={this.props.form}
              disabled={true}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <ReadonlyField
              entityName={AbsenceRvdRequest.NAME}
              propertyName="status"
              optionsContainer={this.statusesDc}
              form={this.props.form}
              disabled={true}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{
                rules: [{required: true,}],
              }}
            />

     {/*       <ReadonlyField
              entityName={AbsenceRvdRequest.NAME}
              propertyName="personGroup"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              disabled={true}
              getFieldDecoratorOpts={{}}
            />
*/}
            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="type"
              form={this.props.form}
              optionsContainer={this.absenceTypeDc}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={AbsenceRvdRequest.NAME}
              propertyName="purpose"
              form={this.props.form}
              optionsContainer={this.purposeDc}
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

            <ReadonlyField
              entityName={AbsenceRvdRequest.NAME}
              propertyName="totalHours"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              disabled={true}
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


            {this.globalErrors.length > 0 && (
              <Alert
                message={<MultilineText lines={toJS(this.globalErrors)}/>}
                type="error"
                style={{marginBottom: "24px"}}
              />
            )}
{/*
            <Form.Item style={{textAlign: "center"}}>
              <Link to={MyTeamStructureManagement.PATH}>
                <Button htmlType="button">
                  <FormattedMessage id="management.editor.cancel"/>
                </Button>
              </Link>
              <Link to={MyTeamStructureManagement.PATH}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={status !== "DONE" && status !== "ERROR"}
                  loading={status === "LOADING"}
                  style={{marginLeft: "8px"}}
                >
                  <FormattedMessage id="management.editor.submit"/>
                </Button>
              </Link>
            </Form.Item>*/}

            {this.takCard()}

          </Form>
          </Card>
        </Section>
      </Page>
    );
  }
  //buttons
//upload
  //takCard
  calcHours = (type?: string | null, dateFrom?: any, dateTo?: any) => {
    type = type || this.props.form.getFieldValue(`type`);
    dateFrom = dateFrom || this.props.form.getFieldValue(`timeOfStarting`);
    dateTo = dateTo || this.props.form.getFieldValue(`timeOfFinishing`);

    const personGroupId = rootStore.userInfo.personGroupId;

    if (type && dateTo && dateFrom && personGroupId) {
      restServices.absenceRvdService.countTotalHours({
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
}

const component = injectIntl(
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
  })(withRouter(AbsenceRvdRequestEditComponent))
);

export default (component);
