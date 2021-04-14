import * as React from "react";
import {Alert, Card, Form} from "antd";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {injectMainStore, instance, MainStoreInjected, MultilineText, withLocalizedForm} from "@cuba-platform/react";

import {ScheduleOffsetsRequest} from "../../../../../cuba/entities/base/tsadv_ScheduleOffsetsRequest";
import AbstractBprocEdit from "../../../Bproc/abstract/AbstractBprocEdit";
import LoadingPage from "../../../LoadingPage";
import Page from "../../../../hoc/PageContentHoc";
import Section from "../../../../hoc/Section";
import {ReadonlyField} from "../../../../components/ReadonlyField";
import {RouteComponentProps, withRouter} from "react-router";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {CurrentScheduleRequestManagement} from "./CurrentScheduleRequestManagement";
import {RootStoreProp} from "../../../../store";


type EditorProps = {
  entityId: string | undefined;
}

@inject("rootStore")
@injectMainStore
@observer
class CurrentScheduleRequestEdit extends AbstractBprocEdit<ScheduleOffsetsRequest, EditorProps> {

  dataInstance = instance<ScheduleOffsetsRequest>(ScheduleOffsetsRequest.NAME, {
    view: "scheduleOffsetsRequest-for-my-team",
    loadImmediately: false
  });

  fields = [
    "id",
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
    "status",
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


    if (this.updated) {
      return <Redirect to={CurrentScheduleRequestManagement.PATH}/>;
    }


    const messages = this.mainStore.messages!;

    if (!messages) return <LoadingPage/>

    return (
      <Page pageName={this.props.intl.formatMessage({id: "scheduleOffsetsRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout" bordered={false}>
              <Form onSubmit={this.validate} layout="vertical">
                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="id"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="purposeText"
                  disabled={true}
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}],
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="dateOfNewSchedule"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="dateOfStartNewSchedule"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="detailsOfActualWork"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="agree"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="acquainted"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="legacyId"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="organizationBin"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="integrationUserLogin"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="requestNumber"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="requestDate"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="comment"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="purpose"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="newSchedule"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="status"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <Form.Item style={{textAlign: "center"}}>
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

const onValuesChange = (props: any, changedValues: any, allValues: any) => {
  // Reset server-side errors when field is edited
  Object.keys(changedValues).forEach((fieldName: string) => {
      props.form.setFields({
        [fieldName]: {
          value: changedValues[fieldName]
        }
      });
    }
  );
};

const component = injectIntl(withLocalizedForm<EditorProps & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>>({onValuesChange})(CurrentScheduleRequestEdit));
export default withRouter(component);
