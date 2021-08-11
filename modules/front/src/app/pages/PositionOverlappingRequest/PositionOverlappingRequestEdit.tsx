import * as React from "react";
import {createElement, FormEvent} from "react";
import { Card, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import { observable, reaction, toJS } from "mobx";
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
  MultilineText, collection, injectMainStore, Msg, getCubaREST
} from "@cuba-platform/react";

import "../../../app/App.css";

import { PositionOverlappingRequest } from "../../../cuba/entities/kzm$PositionOverlappingRequest";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {CertificateRequest} from "../../../cuba/entities/base/tsadv_CertificateRequest";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicPositionsOverlappingType} from "../../../cuba/entities/kzm$DicPositionsOverlappingType";
import LoadingPage from "../LoadingPage";
import {CertificateRequestManagement} from "../CertificateRequest/CertificateRequestManagement";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import {goBackOrHomePage} from "../../util/util";
import {ReadonlyField} from "../../components/ReadonlyField";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";
import {PersonGroup} from "../../../cuba/entities/base/base$PersonGroup";
import {InsuredPerson} from "../../../cuba/entities/base/tsadv$InsuredPerson";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";
import {AddressRequest} from "../../../cuba/entities/base/tsadv$AddressRequest";
import moment from "moment";
import {PositionGroup} from "../../../cuba/entities/base/base$PositionGroup";
import {OrganizationGroup} from "../../../cuba/entities/base/base$OrganizationGroup";
import TextArea from "antd/es/input/TextArea";
import MsgEntity from "../../components/MsgEntity";
import {PersonDocumentRequest} from "../../../cuba/entities/base/tsadv_PersonDocumentRequest";
import {PersonDocument} from "../../../cuba/entities/base/tsadv$PersonDocument";

type EditorProps = {
  entityId: string;
};
@inject("rootStore")
@injectMainStore
@observer
class PositionOverlappingRequestEditComponent extends AbstractBprocEdit<PositionOverlappingRequest, EditorProps> {
  processDefinitionKey = "positionOverlappingRequest";

  dataInstance = instance<PositionOverlappingRequest>(
    PositionOverlappingRequest.NAME,
    { view: "positionOverlappingRequest-edit", loadImmediately: false }
  );

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  positionOverlappingTypeDc = collection<DicPositionsOverlappingType>(
    DicPositionsOverlappingType.NAME,
    {view: "_minimal"}
  )

  positionGroupDc = collection<PositionGroup>(
    PositionGroup.NAME,
    {view: "_minimal"}
  )

  organizationGroupDc = collection<OrganizationGroup>(
    OrganizationGroup.NAME,
    {view: "_minimal"}
  )

  @observable
  editPositionOverlappingRequest: PositionOverlappingRequest;




  fields = [
    "requestNumber",

    "requestDate",

    "personGroup",

    "workCompletionDate",

    "positionGroup",

    "department",

    "justification",

    "status",

    "type",

  ];


  @observable
  person: PersonExt;

  personGroupId: string;

  @observable
  mainStore = this.props.mainStore!;


  isUpdateBeforeOutcome = true;

  update = () => {
    if (this.isNotDraft())
      return this.dataInstance.update(this.getUpdateEntityData());
    return this.dataInstance.update({
      personGroup: this.personGroupId,
      editedPositionOverlappingRequest: this.editPositionOverlappingRequest ?
      this.editPositionOverlappingRequest.id : undefined,
      ...this.getUpdateEntityData()
    });
  };


  render() {
    if (!this.mainStore) {
      return <LoadingPage/>
    }

    const messages = this.mainStore.messages!;
    if (!messages) {
      return <LoadingPage/>
    }

    const entityName = this.dataInstance.entityName;
    const isNotDraft = this.isNotDraft();


    return <Page pageName={<MsgEntity entityName={PositionOverlappingRequest.NAME}/>}>
              <Section size="large">
                  <Card className="narrow-layout card-actions-container"
                        bordered={false}
                        actions={[
                          <Button buttonType={ButtonType.FOLLOW}
                                  onClick={() => goBackOrHomePage(this.props.history!)}>{this.props.intl.formatMessage({id: "close"})}</Button>,
                          this.getOutcomeBtns()]}
                  >
                    <Form onSubmit={this.validate} layout="vertical">

                      <ReadonlyField
                        entityName={PositionOverlappingRequest.NAME}
                        propertyName="requestNumber"
                        form={this.props.form}
                        formItemOpts={{style: {marginBottom: "12px"}}}
                        disabled={true}
                        getFieldDecoratorOpts={{
                          rules: [{required: true,}]
                        }}
                      />

                      <ReadonlyField
                        entityName={PositionOverlappingRequest.NAME}
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
                        entityName={PositionOverlappingRequest.NAME}
                        propertyName="requestDate"
                        form={this.props.form}
                        disabled={true}
                        formItemOpts={{style: {marginBottom: "12px"}}}
                        format={DEFAULT_DATE_PATTERN}
                        getFieldDecoratorOpts={{
                          rules: [{required: true,}]
                        }}
                      />

                      <Form.Item
                        label={createElement(Msg, {entityName: entityName, propertyName: "personGroup"})}>
                        <Input
                          value={this.person ? this.person['_instanceName'] || '' : ''}
                          disabled/>
                      </Form.Item>

                      <ReadonlyField
                        entityName={PositionOverlappingRequest.NAME}
                        propertyName="type"
                        form={this.props.form}
                        formItemOpts={{style: {marginBottom: "12px"}}}
                        optionsContainer={this.positionOverlappingTypeDc}
                        getFieldDecoratorOpts={{
                          rules: [{
                            required: true,
                            message: this.props.intl.formatMessage(
                              {id: "form.validation.required"},
                              {fieldName: messages[PositionOverlappingRequest.NAME + '.type']})
                          }]
                        }}
                      />

                      <ReadonlyField
                        entityName={PositionOverlappingRequest.NAME}
                        propertyName="positionGroup"
                        form={this.props.form}
                        formItemOpts={{style: {marginBottom: "12px"}}}
                        optionsContainer={this.positionGroupDc}
                        getFieldDecoratorOpts={{
                          rules: [{
                            required: true,
                            message: this.props.intl.formatMessage(
                              {id: "form.validation.required"},
                              {fieldName: messages[PositionOverlappingRequest.NAME + '.positionGroup']})
                          }]
                        }}
                      />

                      <ReadonlyField
                        entityName={PositionOverlappingRequest.NAME}
                        propertyName="department"
                        form={this.props.form}
                        formItemOpts={{style: {marginBottom: "12px"}}}
                        optionsContainer={this.organizationGroupDc}
                        getFieldDecoratorOpts={{
                          rules: [{
                            required: true,
                            message: this.props.intl.formatMessage(
                              {id: "form.validation.required"},
                              {fieldName: messages[PositionOverlappingRequest.NAME + '.department']})
                          }]
                        }}
                      />
                      <Form onSubmit={this.validate} layout="vertical">
                        <ReadonlyField
                          entityName={PositionOverlappingRequest.NAME}
                          propertyName="workCompletionDate"
                          form={this.props.form}
                          formItemOpts={{style: {marginBottom: "12px"}}}
                          disabled={false}
                          getFieldDecoratorOpts={{
                            rules: [{required: true,}]
                          }}
                        />
                      </Form>
                      <Form.Item
                        label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "justification"})}>
                        {this.props.form.getFieldDecorator("justification")(
                          <TextArea
                            disabled={isNotDraft}
                            rows={4}/>
                        )}
                      </Form.Item>
                      <ReadonlyField
                        entityName={entityName}
                        propertyName="attachment"
                        form={this.props.form}
                        disabled={isNotDraft}
                        formItemOpts={{style: {marginBottom: "12px"}}}
                        getFieldDecoratorOpts={{
                          rules: [{
                            required: true,
                            message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.attachment']})
                          }]
                        }}
                      />
                    </Form>
                    {this.takCard()}
                  </Card>
              </Section>
            </Page>;

  }

  onReactionDisposerEffect = (item: PositionOverlappingRequest | undefined) => {

    this.personGroupId = item && item.personGroup ? item.personGroup.id! : this.props.rootStore!.userInfo!.personGroupId!;
    const requestDate = item && item.requestDate ? item.requestDate : moment().toISOString();
    getCubaREST()!.searchEntities<PersonExt>(PersonExt.NAME, {
      conditions: [{
        property: "group.id",
        operator: '=',
        value: this.personGroupId
      }, {
        property: 'startDate',
        operator: '<=',
        value: requestDate,
      }, {
        property: 'endDate',
        operator: '>=',
        value: requestDate,
      }]
    }, {
      view: 'person-edit'
    }).then(value => value[0])
      .then(value => this.person = value)
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
  })(PositionOverlappingRequestEditComponent)
);
