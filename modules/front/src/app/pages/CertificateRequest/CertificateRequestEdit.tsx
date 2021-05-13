import * as React from "react";
import {createElement} from "react";
import {Card, Form} from "antd";
import {inject, observer} from "mobx-react";
import {CertificateRequestManagement} from "./CertificateRequestManagement";
import {Redirect} from "react-router-dom";
import {observable} from "mobx";
import {FormattedMessage, injectIntl} from "react-intl";

import {collection, injectMainStore, instance, Msg, withLocalizedForm} from "@cuba-platform/react";

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
import TextArea from "antd/es/input/TextArea";
import {restServices} from "../../../cuba/services";

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

    "placeOfDelivery",

    "certificateType"
  ];

  @observable
  isCompanyVcm = this.props.rootStore!.userInfo!.companyCode === 'VCM';

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
            <Card className="narrow-layout card-actions-container"
                  actions={[
                    <Button buttonType={ButtonType.FOLLOW} htmlType="button"
                            onClick={() => this.props.history!.goBack()}>
                      <FormattedMessage id="close"/>
                    </Button>,
                    this.getOutcomeBtns(isNeedBpm)
                  ]}
                  bordered={false}>
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
                  disabled={isNotDraft || this.isCompanyVcm}
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

                <Form.Item style={this.isCompanyVcm ? {marginBottom: "12px"} : {display: 'none'}}>
                  <div className={'ant-form-item-required'}>
                    {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "placeOfDelivery"})}
                  </div>
                  {this.props.form.getFieldDecorator("placeOfDelivery", {
                    rules: [{
                      required: true,
                      validator: (rule, value, callback) => {
                        if (!value && this.isCompanyVcm)
                          return callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.placeOfDelivery']}));
                        return callback();
                      }
                    }]
                  })(
                    <TextArea
                      disabled={isNotDraft}
                      rows={4}/>
                  )}
                </Form.Item>

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
                  formItemOpts={{style: this.isCompanyVcm ? {display: 'none'} : {marginBottom: "12px"}}}
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

              </Form>
            </Card>

          </div>
        </Section>
      </Page>
    );
  }

  protected initItem(request: CertificateRequest): void {
    if (this.isCompanyVcm)
      request.receivingType = this.receivingTypesDc.items.find(value => value.code == "ON_HAND") as DicReceivingType;

    super.initItem(request);
  }

  onReactionDisposerEffect = (item: CertificateRequest | undefined) => {
    if (item) {
      restServices.employeeService.personProfile(item.personGroup!.id)
        .then(value => this.isCompanyVcm = value.companyCode === 'VCM');
    }
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
