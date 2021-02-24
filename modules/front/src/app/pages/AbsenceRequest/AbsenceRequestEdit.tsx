import * as React from "react";
import {Alert, Card, Form} from "antd";
import {inject, observer} from "mobx-react";
import {toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  collection,
  injectMainStore,
  instance,
  MainStoreInjected,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {AbsenceRequest} from "../../../cuba/entities/base/tsadv$AbsenceRequest";
import {RouteComponentProps, withRouter} from "react-router";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import LoadingPage from "../LoadingPage";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {ReadonlyField} from "../../components/ReadonlyField";
import Button, {ButtonType} from "../../components/Button/Button";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicAbsenceType} from "../../../cuba/entities/base/tsadv$DicAbsenceType";
import {Redirect} from "react-router-dom";
import {AbsenceRequestManagement} from "./AbsenceRequestManagement";
import {restServices} from "../../../cuba/services";
import {rootStore, RootStoreProp} from "../../store";

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class AbsenceRequestEditComponent extends AbstractBprocEdit<AbsenceRequest, EditorProps> {
  dataInstance = instance<AbsenceRequest>(AbsenceRequest.NAME, {
    view: "absenceRequest.edit",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  absenceTypesDc = collection<DicRequestStatus>(DicAbsenceType.NAME, {
    view: "_minimal",
    filter: {
      conditions: [{property: "useInSelfService", operator: "=", value: 'TRUE'}]
    }
  });

  fields = [
    "dateFrom",

    "type",

    "dateTo",

    "absenceDays",

    "requestNumber",

    "requestDate",

    "status",

    "absenceDays",

    "comment"
  ];

  assignmentGroupId: string;

  getUpdateEntityData = (): any => {
    return {
      personGroup: {
        id: this.props.rootStore!.userInfo.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  processDefinitionKey = "absenceRequest";

  dateValidator = () => {
    const dateFrom = this.props.form.getFieldValue("dateFrom");
    const dateTo = this.props.form.getFieldValue("dateTo");

    if (dateFrom) dateFrom.startOf('day');
    if (dateTo) dateTo.startOf('day');

    return dateFrom && dateTo && dateFrom <= dateTo;
  }

  render() {

    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    if (this.updated) {
      return <Redirect to={AbsenceRequestManagement.PATH}/>;
    }

    const messages = this.mainStore.messages!;

    const isDraft = this.isDraft();

    return (
      <Page pageName={this.props.intl.formatMessage({id: "absenceRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout" bordered={false}>
              <Form onSubmit={this.validate} layout="vertical">

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="requestNumber"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="status"
                  disabled={true}
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.statusesDc}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}],
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="type"
                  form={this.props.form}
                  disabled={isDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.absenceTypesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.type']})
                    }
                    ]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="dateFrom"
                  form={this.props.form}
                  disabled={isDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "validation.absenceRequest.dateFrom"}),
                      validator: this.dateValidator
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="dateTo"
                  form={this.props.form}
                  disabled={isDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "validation.absenceRequest.dateTo"}),
                      validator: this.dateValidator
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="vacationDurationType"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="absenceDays"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="requestDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />


                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="comment"
                  form={this.props.form}
                  disabled={isDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                {this.takCard()}

                {this.globalErrors.length > 0 && (
                  <Alert
                    message={<MultilineText lines={toJS(this.globalErrors)}/>}
                    type="error"
                    style={{marginBottom: "24px"}}
                  />
                )}

                <Form.Item style={{textAlign: "center"}}>

                  {this.getOutcomeBtns()}

                  <Button buttonType={ButtonType.FOLLOW} htmlType="button" onClick={() => this.props.history!.goBack()}>
                    <FormattedMessage id="management.editor.cancel"/>
                  </Button>
                </Form.Item>
              </Form>
            </Card>

          </div>
        </Section>
      </Page>
    );
  }
}

const onValuesChange = (props: any, changedValues: any) => {
  // Reset server-side errors when field is edited
  Object.keys(changedValues).forEach((fieldName: string) => {
    props.form.setFields({
      [fieldName]: {
        value: changedValues[fieldName]
      }
    });

    if (fieldName === "dateTo" || fieldName === "dateFrom") {
      props.form.validateFields();
    }

    if (rootStore && rootStore.userInfo && rootStore.userInfo.personGroupId) {
      const type = props.form.getFieldValue(`type`);
      const dateFrom = props.form.getFieldValue(`dateFrom`);
      const dateTo = props.form.getFieldValue(`dateTo`);

      const personGroupId = rootStore.userInfo.personGroupId;

      if ((fieldName === "dateFrom" || fieldName === "type") && personGroupId && type && dateFrom) {
        restServices.absenceService.vacationDurationType({
          personGroupId: personGroupId,
          absenceTypeId: type,
          dateFrom: dateFrom
        }).then(value => {
          value = value ? value.substring(1, value.length - 1) : value;
          props.form.setFields({"vacationDurationType": {value: props.intl.formatMessage({id: value})}});
        });
      }
      if ((fieldName === "type" || fieldName === "dateFrom" || fieldName === "dateTo")
        && type && dateTo && dateFrom && personGroupId) {
        restServices.absenceService.countDays({
          dateFrom: dateFrom,
          dateTo: dateTo,
          absenceTypeId: type,
          personGroupId: personGroupId
        }).then(value => {
          props.form.setFields({"absenceDays": {value: value}});
        })
      }
    }
  });
};
const component = injectIntl(withLocalizedForm<EditorProps & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>>({onValuesChange})(AbsenceRequestEditComponent));
export default withRouter(component);
