import * as React from "react";
import {Alert, Card, Form} from "antd";
import {inject, observer} from "mobx-react";
import {toJS} from "mobx";
import {FormattedMessage, injectIntl} from "react-intl";

import {collection, injectMainStore, instance, MultilineText, withLocalizedForm} from "@cuba-platform/react";

import "../../../app/App.css";

import {AbsenceRequest} from "../../../cuba/entities/base/tsadv$AbsenceRequest";
import {withRouter} from "react-router";
import AbstractBprocEdit from "../bproc/abstract/AbstractBprocEdit";
import LoadingPage from "../LoadingPage";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {ReadonlyField} from "../../components/ReadonlyField";
import Button, {ButtonType} from "../../components/Button/Button";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicAbsenceType} from "../../../cuba/entities/base/tsadv$DicAbsenceType";
import {Redirect} from "react-router-dom";
import {AbsenceRequestManagement} from "./AbsenceRequestManagement";

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
    view: "_minimal"
  });

  fields = [
    "dateFrom",

    "dateTo",

    "absenceDays",

    "requestNumber",

    "requestDate",

    "status",

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
                    }]
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
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.dateFrom']})
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
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.dateTo']})
                    }]
                  }}
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
  })(withRouter(AbsenceRequestEditComponent))
);
