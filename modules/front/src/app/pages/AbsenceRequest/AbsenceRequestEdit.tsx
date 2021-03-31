import * as React from "react";
import {createElement} from "react";
import {Card, Form} from "antd";
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";

import {collection, injectMainStore, instance, MainStoreInjected, Msg, withLocalizedForm} from "@cuba-platform/react";

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
import {restServices} from "../../../cuba/services";
import {rootStore, RootStoreProp} from "../../store";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import TextArea from "antd/es/input/TextArea";
import {queryCollection} from "../../util/QueryDataCollectionStore";
import {observable, reaction} from "mobx";
import moment from "moment/moment";

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

  absenceTypesDc = queryCollection<DicRequestStatus>(DicAbsenceType.NAME,
    'absenceTypes',
    {personGroupId: this.props.rootStore!.userInfo.personGroupId!});

  filesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  @observable
  isJustRequired = false;

  @observable
  isOriginalSheet = false;

  fields = [
    "dateFrom",

    "type",

    "dateTo",

    "requestNumber",

    "requestDate",

    "status",

    "absenceDays",

    "comment",

    "originalSheet",

    "reason",

    "attachment"
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

  afterSendOnApprove = () => {
    this.props.history!.push("/absence/3");
  };

  dateValidator = (fieldName: string) => {
    const dateFrom = this.props.form.getFieldValue("dateFrom");
    const dateTo = this.props.form.getFieldValue("dateTo");

    if (dateFrom) dateFrom.startOf('day');
    if (dateTo) dateTo.startOf('day');

    return (dateFrom && dateTo && dateFrom <= dateTo) === true;
  }

  render() {

    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const {getFieldDecorator} = this.props.form;
    const messages = this.mainStore.messages!;

    const isNotDraft = this.isNotDraft();

    return (
      <Page pageName={this.props.intl.formatMessage({id: "absenceRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout card-actions-container" actions={[
              <Button buttonType={ButtonType.FOLLOW}
                      onClick={this.props.history!.goBack}>{this.props.intl.formatMessage({id: "close"})}</Button>,
              this.getOutcomeBtns()]}
                  bordered={false}>
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
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.absenceTypesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.type']})
                    }],
                    getValueFromEvent: typeId => {
                      const absenceType = this.absenceTypesDc.items.find(value => value.id === typeId) as DicAbsenceType;
                      this.isJustRequired = !!absenceType.isJustRequired;
                      this.isOriginalSheet = !!absenceType.isOriginalSheet;
                      return typeId;
                    },
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="dateFrom"
                  form={this.props.form}
                  disabled={isNotDraft}
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
                  disabled={isNotDraft}
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

                {this.originalSheetField(isNotDraft)}

                {this.reasonField(isNotDraft)}

                <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                  {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "comment"})}
                  <Form.Item>
                    {getFieldDecorator("comment")(
                      <TextArea
                        disabled={isNotDraft}
                        rows={4}/>
                    )}
                  </Form.Item>
                </div>

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="attachment"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.filesDc}
                  getFieldDecoratorOpts={{}}/>

                {this.takCard()}

              </Form>
            </Card>

          </div>
        </Section>
      </Page>
    );
  }

  originalSheetField = (isNotDraft: boolean) => {
    return <div style={!this.isOriginalSheet ? {display: 'none'} : {}}>
      <ReadonlyField
        entityName={this.dataInstance.entityName}
        propertyName="originalSheet"
        form={this.props.form}
        disabled={isNotDraft}
        getFieldDecoratorOpts={{valuePropName: 'checked'}}
        formItemOpts={{style: {marginBottom: "12px"}}}
      />
    </div>
  }

  reasonField = (isNotDraft: boolean) => {
    if (!this.isJustRequired) return <></>;
    return <Form.Item style={{marginBottom: "12px"}}>
      {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "reason"})}
      {this.props.form.getFieldDecorator("reason",
        {
          initialValue: this.dataInstance.item!.reason,
          rules: [{
            required: true,
            message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.reason']})
          }]
        })(
        <TextArea
          disabled={isNotDraft}
          rows={4}/>
      )}
    </Form.Item>
  }

  setReactionDisposer = () => {
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {

        this.isJustRequired = !!(item && item.type && item.type.isJustRequired);
        this.isOriginalSheet = !!(item && item.type && item.type.isOriginalSheet);

        const obj = {
          originalSheet: (item && item.originalSheet) === true,
          ...this.dataInstance.getFieldValues(this.fields)
        };
        if (this.isCalledProcessInstanceData && !this.processInstanceData) {
          const now = moment();
          now.locale(this.props.rootStore!.userInfo.locale!);
          obj["requestDate"] = now;
        }
        console.log(obj);
        this.props.form.setFieldsValue(obj);
      }
    );
  };
}

const onValuesChange = (props: any, changedValues: any) => {
  // Reset server-side errors when field is edited
  Object.keys(changedValues).forEach((fieldName: string) => {
    props.form.setFields({
      [fieldName]: {
        value: changedValues[fieldName]
      }
    });

    if (rootStore && rootStore.userInfo && rootStore.userInfo.personGroupId) {
      const type = props.form.getFieldValue(`type`);
      const dateFrom = props.form.getFieldValue(`dateFrom`);
      const dateTo = props.form.getFieldValue(`dateTo`);

      const personGroupId = rootStore.userInfo.personGroupId;

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
  if (changedValues["dateTo"] != null) props.form.validateFields(['dateFrom'], {force: true});
  if (changedValues["dateFrom"] != null) props.form.validateFields(['dateTo'], {force: true});
};
const component = injectIntl(withLocalizedForm<EditorProps & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>>({onValuesChange})(AbsenceRequestEditComponent));
export default withRouter(component);
