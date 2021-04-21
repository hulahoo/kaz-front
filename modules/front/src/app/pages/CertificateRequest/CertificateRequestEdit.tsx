import * as React from "react";
import {Alert, Card, Form} from "antd";
import {inject, observer} from "mobx-react";
import {CertificateRequestManagement} from "./CertificateRequestManagement";
import {Redirect} from "react-router-dom";
import {toJS} from "mobx";
import {FormattedMessage, injectIntl} from "react-intl";

import {collection, injectMainStore, instance, MultilineText, withLocalizedForm} from "@cuba-platform/react";

import "../../App.css";

import {CertificateRequest} from "../../../cuba/entities/base/tsadv_CertificateRequest";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicReceivingType} from "../../../cuba/entities/base/tsadv_DicReceivingType";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import {DicLanguage} from "../../../cuba/entities/base/tsadv$DicLanguage";
import {DicCertificateType} from "../../../cuba/entities/base/tsadv_DicCertificateType";
import {ReadonlyField} from "../../components/ReadonlyField";
import LoadingPage from "../LoadingPage";
import Button, {ButtonType} from "../../components/Button/Button";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {withRouter} from "react-router";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";

type EditorProps = {
  entityId: string;
}

@inject("rootStore")
@injectMainStore
@observer
class CertificateRequestEditComponent extends AbstractBprocEdit<CertificateRequest, EditorProps> {

  dataInstance = instance<CertificateRequest>(CertificateRequest.NAME, {
    view: "portal.certificateRequest-edit",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  receivingTypesDc = collection<DicReceivingType>(DicReceivingType.NAME, {
    view: "_local"
  });

  filesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  languagesDc = collection<DicLanguage>(DicLanguage.NAME, {view: "_minimal"});

  certificateTypesDc = collection<DicCertificateType>(DicCertificateType.NAME, {
    view: "_minimal"
  });

  fields = [
    "requestNumber",

    "requestDate",

    "showSalary",

    "numberOfCopy",

    "status",

    "receivingType",

    "file",

    "language",

    "certificateType"
  ];

  getUpdateEntityData = (): any => {
    return {
      personGroup: {
        id: this.props.rootStore!.userInfo.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  processDefinitionKey = "certificateRequest";

  render() {
    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const fieldValue = this.props.form.getFieldValue("receivingType");

    const val = this.receivingTypesDc.items.find(value => value.id === fieldValue)!;
    const isNeedBpm = fieldValue && val && val.code === 'ON_HAND';

    if (this.updated) {
      return <Redirect to={CertificateRequestManagement.PATH}/>;
    }

    const isNotDraft = this.isNotDraft();

    const messages = this.mainStore.messages!;

    if (!messages) return <LoadingPage/>

    return (
      <Page pageName={this.props.intl.formatMessage({id: "certificateRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout" bordered={false}>
              <Form onSubmit={this.validate} layout="vertical">
                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="requestNumber"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
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
                  entityName={CertificateRequest.NAME}
                  propertyName="requestDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  format={DEFAULT_DATE_PATTERN}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="receivingType"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.receivingTypesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.receivingType']})
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="certificateType"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.certificateTypesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.certificateType']})
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="language"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.languagesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.language']})
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="showSalary"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    valuePropName: "checked"
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="numberOfCopy"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.numberOfCopy']})
                    }]
                  }}

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

                  {this.getOutcomeBtns(isNeedBpm)}

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
    onValuesChange: (props: any, changedValues: any, allValues: any) => {
      // Reset server-side errors when field is edited
      Object.keys(changedValues).forEach((fieldName: string) => {
        props.form.setFields({
          [fieldName]: {
            value: changedValues[fieldName]
          }
        });
      });
    }
  })(withRouter(CertificateRequestEditComponent))
);
