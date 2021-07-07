import * as React from "react";
import {createElement} from "react";
import {Card, Col, Form, Input, Row} from "antd";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {observable} from "mobx";
import {FormattedMessage, injectIntl} from "react-intl";

import {collection, getCubaREST, injectMainStore, instance, Msg, withLocalizedForm} from "@cuba-platform/react";

import "../../../app/App.css";
import {DicDocumentType} from "../../../cuba/entities/base/tsadv$DicDocumentType";
import {DicIssuingAuthority} from "../../../cuba/entities/base/tsadv_DicIssuingAuthority";
import Page from "../../hoc/PageContentHoc";
import LoadingPage from "../LoadingPage";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {PersonDocumentRequest} from "../../../cuba/entities/base/tsadv_PersonDocumentRequest";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {ReadonlyField} from "../../components/ReadonlyField";
import {dictionaryCollection, DictionaryDataCollectionStore} from "../../util/DictionaryDataCollectionStore";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import MsgEntity from "../../components/MsgEntity";
import {PersonDocument} from "../../../cuba/entities/base/tsadv$PersonDocument";
import DefaultDatePicker from "../../components/Datepicker";
import moment from "moment";
import {PersonDocumentRequestManagement} from "./PersonDocumentRequestManagement";
import {isEquals} from "../../util/util";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";

type EditorProps = {
  entityId: string;
  documentId?: string;
};

@inject("rootStore")
@injectMainStore
@observer
class PersonDocumentRequestEditComponent extends AbstractBprocEdit<PersonDocumentRequest, EditorProps> {
  processDefinitionKey = "personDocumentRequest";

  dataInstance = instance<PersonDocumentRequest>(PersonDocumentRequest.NAME, {
    view: "portal.my-profile",
    loadImmediately: false
  });

  documentTypesDc: DictionaryDataCollectionStore<DicDocumentType>;

  statusDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  issuingAuthoritiesDc = collection<DicIssuingAuthority>(DicIssuingAuthority.NAME, {
    view: "_minimal"
  });

  @observable
  editDocument: PersonDocument;

  instanceEditDocument = instance<PersonDocument>(PersonDocument.NAME, {
    view: "portal.my-profile",
    loadImmediately: false
  });

  @observable
  changedMap = new Map<string, boolean>();

  @observable
  foreigner = false;

  @observable
  person: PersonExt;

  personGroupId: string;

  fields = [

    "requestNumber",

    "requestDate",

    "status",

    "documentType",

    "documentNumber",

    "issueDate",

    "issuedBy",

    "expiredDate",

    "issuingAuthority",

    "attachments"
  ];

  @observable
  mainStore = this.props.mainStore!;

  isUpdateBeforeOutcome = true;

  update = () => {
    if (this.isNotDraft())
      return this.dataInstance.update(this.getUpdateEntityData());
    return this.dataInstance.update({
      personGroup: this.personGroupId,
      editedPersonDocument: this.editDocument ? this.editDocument.id : undefined,
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

    return <Page pageName={<MsgEntity entityName={PersonDocumentRequest.NAME}/>}>
      <Section className='large'>
        <Card className="narrow-layout card-actions-container"
              bordered={false}
              actions={[
                <Button buttonType={ButtonType.FOLLOW}
                        onClick={this.props.history!.goBack}>{this.props.intl.formatMessage({id: "close"})}</Button>,
                this.getOutcomeBtns()]}>
          <Form layout="vertical">

            <ReadonlyField
              entityName={entityName}
              propertyName="requestNumber"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              disabled
            />

            <ReadonlyField
              entityName={entityName}
              propertyName="requestDate"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              disabled
            />

            <ReadonlyField
              entityName={entityName}
              propertyName="status"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              optionsContainer={this.statusDc}
              disabled
            />

            <Form.Item
              label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "personGroup"})}>
              <Input
                value={this.person ? this.person['_instanceName'] || '' : ''}
                disabled/>
            </Form.Item>

            {
              this.editDocument ?
                <Row type={"flex"} className={"data-form"}>
                  <Col md={24} sm={24} lg={12}>
                    <div className={"section-header-container"}><FormattedMessage id={'currentValue'}/></div>
                    {this.renderDocumentFields()}
                  </Col>
                  <Col md={24} sm={24} lg={12}>
                    <div className={"section-header-container"}><FormattedMessage id={'newValue'}/></div>
                    {this.renderDocumentRequestFields()}
                  </Col>
                </Row>
                : this.renderDocumentRequestFields()
            }

            <ReadonlyField
              entityName={entityName}
              propertyName="attachments"
              form={this.props.form}
              disabled={isNotDraft}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.attachments']})
                }]
              }}
            />

          </Form>

          {this.takCard()}

        </Card>
      </Section>
    </Page>;
  }

  renderDocumentFields = () => {
    return (
      <div>
        <Form.Item
          label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "documentType"})}>
          <Input
            value={this.editDocument && this.editDocument.documentType ? this.editDocument.documentType['_instanceName'] || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "issuingAuthority"})}>
          <Input
            value={this.editDocument && this.editDocument.issuingAuthority ? this.editDocument.issuingAuthority['_instanceName'] || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "issuedBy"})}>
          <Input
            value={this.editDocument ? this.editDocument.issuedBy || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {
            entityName: this.dataInstance.entityName,
            propertyName: "issueDate"
          })}>
          <DefaultDatePicker value={this.editDocument ? moment(this.editDocument.issueDate) : null}
                             disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {
            entityName: this.dataInstance.entityName,
            propertyName: "expiredDate"
          })}>
          <DefaultDatePicker value={this.editDocument ? moment(this.editDocument.expiredDate) : null}
                             disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {
            entityName: this.dataInstance.entityName,
            propertyName: "documentNumber"
          })}>
          <Input
            value={this.editDocument ? this.editDocument.documentNumber || '' : ''}
            disabled/>
        </Form.Item>
      </div>
    )
  }

  renderDocumentRequestFields = () => {
    const {entityName} = this.dataInstance;
    const messages = this.mainStore.messages!;
    const isNotDraft = this.isNotDraft();

    return (
      <div>
        <ReadonlyField
          entityName={entityName}
          propertyName="documentType"
          disabled={isNotDraft}
          form={this.props.form}
          optionsContainer={this.documentTypesDc}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.documentType']})
            }],
            getValueFromEvent: args => {

              const documentType = this.documentTypesDc.items.find(value => value.id === args);
              this.foreigner = !!(documentType && documentType.foreigner);

              if (this.editDocument)
                this.changedMap.set('documentType', args !== (this.editDocument.documentType ? this.editDocument.documentType.id : undefined));
              return args;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('documentType'),
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="issuingAuthority"
          disabled={isNotDraft}
          form={this.props.form}
          mainStore={this.mainStore}
          optionsContainer={this.issuingAuthoritiesDc}
          getFieldDecoratorOpts={{
            rules: [{
              required: !this.foreigner && !isNotDraft,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.issuingAuthority']})
            }],
            getValueFromEvent: args => {
              if (this.editDocument)
                this.changedMap.set('issuingAuthority', args !== (this.editDocument.issuingAuthority ? this.editDocument.issuingAuthority.id : undefined));
              return args;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('issuingAuthority'),
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="issuedBy"
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            rules: [{
              required: this.foreigner && !isNotDraft,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.issuedBy']})
            }],
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editDocument)
                this.changedMap.set('issuedBy', value !== this.editDocument.issuedBy);
              return value;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('issuedBy'),
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="issueDate"
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.issueDate']})
            }, {
              validator: (rule, value, callback) => {
                this.props.form.validateFields(['expiredDate'], {force: true});
                return callback();
              }
            }],
            getValueFromEvent: args => {
              if (this.editDocument)
                this.changedMap.set('issueDate', !(this.editDocument.issueDate && args ? moment(this.editDocument.issueDate).isSame(args, 'day') : !this.editDocument.issueDate && !args));
              return args;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('issueDate'),
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="expiredDate"
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.expiredDate']})
            }, {
              validator: (rule, value, callback) => {
                const issueDate = this.props.form.getFieldValue('issueDate');
                if (value && issueDate && (value as moment.Moment).isBefore(issueDate, 'day')) {
                  return callback(this.props.intl.formatMessage({id: 'validation.compare.date'}, {
                    startDate: messages[this.dataInstance.entityName + '.issueDate'],
                    endDate: messages[this.dataInstance.entityName + '.expiredDate']
                  }));
                }

                return callback();
              }
            }],
            getValueFromEvent: args => {
              if (this.editDocument) {
                this.changedMap.set('expiredDate', !(this.editDocument.expiredDate && args ? moment(this.editDocument.expiredDate).isSame(args, 'day') : !this.editDocument.expiredDate && !args));
              }
              return args;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('expiredDate'),
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="documentNumber"
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.documentNumber']})
            }],
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editDocument)
                this.changedMap.set('documentNumber', value !== this.editDocument.documentNumber);
              return value;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('documentNumber'),
          }}
        />
      </div>
    )
  }

  onReactionDisposerEffect = (item: PersonDocumentRequest | undefined) => {
    this.personGroupId = item && item.personGroup ? item.personGroup.id! : this.props.rootStore!.userInfo!.personGroupId!;

    this.foreigner = !!(item && item.documentType && item.documentType.foreigner);

    this.documentTypesDc = dictionaryCollection<DicDocumentType>(DicDocumentType.NAME,
      this.personGroupId, {
        view: "_local",
      });

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

    const documentId = this.props.documentId || (item && item.editedPersonDocument ? item.editedPersonDocument.id : undefined)

    if (documentId)
      getCubaREST()!.loadEntity(PersonDocument.NAME, documentId, {view: 'portal.my-profile'})
        .then(value => this.editDocument = value as PersonDocument)
        .then(value => {
          this.instanceEditDocument.setItem(value);
          const properties = [
            "documentType", "documentNumber", "issueDate", "issuedBy", "expiredDate", "issuingAuthority",
          ];
          if (this.props.entityId === PersonDocumentRequestManagement.NEW_SUBPATH) {
            this.props.form.setFieldsValue(this.instanceEditDocument.getFieldValues(properties));
          } else if (item) {
            properties.forEach(field => {
              this.changedMap.set(field, !isEquals(value[field], item[field]));
            });
          }
        });
  }
}

export default injectIntl(
  withLocalizedForm({
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
  })(withRouter(PersonDocumentRequestEditComponent))
);