import * as React from "react";
import {createElement} from "react";
import {Card, Col, Form, Input, Row} from "antd";
import {inject, observer} from "mobx-react";
import {FormattedMessage, injectIntl} from "react-intl";

import {collection, getCubaREST, injectMainStore, instance, Msg, withLocalizedForm} from "@cuba-platform/react";

import "../../../app/App.css";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";
import {PersonalDataRequest} from "../../../cuba/entities/base/tsadv$PersonalDataRequest";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {observable} from "mobx";
import {ReadonlyField} from "../../components/ReadonlyField";
import moment from "moment";
import DefaultDatePicker from "../../components/Datepicker";
import Button, {ButtonType} from "../../components/Button/Button";
import {withRouter} from "react-router";
import Section from "../../hoc/Section";
import Page from "../../hoc/PageContentHoc";
import MsgEntity from "../../components/MsgEntity";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {PersonalDataRequestManagement} from "./PersonalDataRequestManagement";
import {goBackOrHomePage} from "../../util/util";

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class PersonalDataRequestEditComponent extends AbstractBprocEdit<PersonalDataRequest, EditorProps> {

  processDefinitionKey = "personalDataRequest";

  dataInstance = instance<PersonalDataRequest>(PersonalDataRequest.NAME, {
    view: "portal.my-profile",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  @observable
  person: PersonExt;

  @observable
  changedMap = new Map<string, boolean>();

  isUpdateBeforeOutcome = true;

  fields = [
    "lastName",

    "firstName",

    "middleName",

    "lastNameLatin",

    "firstNameLatin",

    "middleNameLatin",

    "requestNumber",

    "requestDate",

    "status",

    "attachments",

  ];

  update = () => {
    if (this.isNotDraft())
      return this.dataInstance.update(this.getUpdateEntityData());
    return this.dataInstance.update({
      personGroup: this.props.rootStore!.userInfo!.personGroupId,
      ...this.getUpdateEntityData()
    });
  };

  render() {
    const isNotDraft = this.isNotDraft();
    return (
      <Page pageName={<MsgEntity entityName={PersonalDataRequest.NAME}/>}>
        <Section size="large">
          <Card className="narrow-layout card-actions-container"
                bordered={false}
                actions={[
                  <Button buttonType={ButtonType.FOLLOW}
                          onClick={() => goBackOrHomePage(this.props.history!)}>{this.props.intl.formatMessage({id: "close"})}</Button>,
                  this.getOutcomeBtns()]}>
            <Form>
              {/*<div className={"section-header-container"}><FormattedMessage id={'additionalInformation'}/></div>*/}

              <Row type={"flex"} className={"data-form"}>

                <Col md={24} sm={24} lg={12}>

                  <ReadonlyField
                    entityName={this.dataInstance.entityName}
                    propertyName="requestNumber"
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    disabled={true}
                  />

                  <ReadonlyField
                    entityName={this.dataInstance.entityName}
                    propertyName="status"
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    optionsContainer={this.statusesDc}
                    disabled={true}
                  />

                  <Form.Item
                    label={<Msg entityName={PersonExt.NAME} propertyName={'sex'}/>}>
                    <Input value={this.person && this.person.sex ? this.person.sex['_instanceName'] || '' : undefined}
                           disabled/>
                  </Form.Item>

                  <Form.Item
                    label={createElement(Msg, {
                      entityName: this.dataInstance.entityName,
                      propertyName: "dateOfBirth"
                    })}>
                    <DefaultDatePicker value={this.person ? moment(this.person.dateOfBirth) : null}
                                       disabled/>
                  </Form.Item>

                </Col>

                <Col md={24} sm={24} lg={12}>

                  <ReadonlyField
                    entityName={this.dataInstance.entityName}
                    propertyName="requestDate"
                    form={this.props.form}
                    disabled={true}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                  />

                  <Form.Item
                    label={<Msg entityName={PersonExt.NAME} propertyName={'nationalIdentifier'}/>}>
                    <Input
                      value={this.person && this.person.nationalIdentifier ? this.person.nationalIdentifier || '' : undefined}
                      disabled/>
                  </Form.Item>

                  <Form.Item
                    label={<Msg entityName={PersonExt.NAME} propertyName={'nationality'}/>}>
                    <Input
                      value={this.person && this.person.nationality ? this.person.nationality['_instanceName'] || '' : undefined}
                      disabled/>
                  </Form.Item>

                  <Form.Item
                    label={<Msg entityName={PersonExt.NAME} propertyName={'birthPlace'}/>}>
                    <Input value={this.person && this.person.birthPlace ? this.person.birthPlace || '' : undefined}
                           disabled/>
                  </Form.Item>
                </Col>

              </Row>

              <Row type={"flex"} className={"data-form"}>
                <Col md={24} sm={24} lg={12}>

                  <div className={"section-header-container"}><FormattedMessage id={'currentValue'}/></div>

                  <Form.Item
                    label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "lastName"})}>
                    <Input
                      value={this.person ? this.person.lastName || '' : ''}
                      disabled/>
                  </Form.Item>

                  <Form.Item
                    label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "firstName"})}>
                    <Input
                      value={this.person ? this.person.firstName || '' : ''}
                      disabled/>
                  </Form.Item>

                  <Form.Item
                    label={createElement(Msg, {
                      entityName: this.dataInstance.entityName,
                      propertyName: "middleName"
                    })}>
                    <Input
                      value={this.person ? this.person.middleName || '' : ''}
                      disabled/>
                  </Form.Item>

                  <Form.Item
                    label={createElement(Msg, {
                      entityName: this.dataInstance.entityName,
                      propertyName: "lastNameLatin"
                    })}>
                    <Input
                      value={this.person ? this.person.lastNameLatin || '' : ''}
                      disabled/>
                  </Form.Item>

                  <Form.Item
                    label={createElement(Msg, {
                      entityName: this.dataInstance.entityName,
                      propertyName: "firstNameLatin"
                    })}>
                    <Input
                      value={this.person ? this.person.firstNameLatin || '' : ''}
                      disabled/>
                  </Form.Item>

                  <Form.Item
                    label={createElement(Msg, {
                      entityName: this.dataInstance.entityName,
                      propertyName: "middleNameLatin"
                    })}>
                    <Input
                      value={this.person ? this.person.middleNameLatin || '' : ''}
                      disabled/>
                  </Form.Item>

                </Col>
                <Col md={24} sm={24} lg={12}>

                  <div className={"section-header-container"}><FormattedMessage id={'newValue'}/></div>

                  <ReadonlyField
                    entityName={PersonExt.NAME}
                    propertyName="lastName"
                    disabled={isNotDraft}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.lastName']})
                      }],
                      getValueFromEvent: args => {
                        if (!args) return args;
                        const value = args.currentTarget.value;
                        this.changedMap.set('lastName', value !== this.person.lastName);
                        return value;
                      }
                    }}
                    form={this.props.form}
                    formItemOpts={{
                      hasFeedback: this.changedMap.get('lastName'),
                    }}
                  />
                  <ReadonlyField
                    entityName={PersonExt.NAME}
                    propertyName="firstName"
                    form={this.props.form}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.firstName']})
                      }],
                      getValueFromEvent: args => {
                        if (!args) return args;
                        const value = args.currentTarget.value;
                        this.changedMap.set('firstName', value !== this.person.firstName);
                        return value;
                      }
                    }}
                    disabled={isNotDraft}
                    formItemOpts={{
                      hasFeedback: this.changedMap.get('firstName'),
                    }}
                  />
                  <ReadonlyField
                    entityName={PersonExt.NAME}
                    propertyName="middleName"
                    form={this.props.form}
                    disabled={isNotDraft}
                    getFieldDecoratorOpts={{
                      getValueFromEvent: args => {
                        if (!args) return args;
                        const value = args.currentTarget.value;
                        this.changedMap.set('middleName', value !== this.person.middleName);
                        return value;
                      }
                    }}
                    formItemOpts={{
                      hasFeedback: this.changedMap.get('middleName'),
                      validateStatus: "success",
                    }}
                  />
                  <ReadonlyField
                    entityName={PersonExt.NAME}
                    propertyName="lastNameLatin"
                    disabled={isNotDraft}
                    form={this.props.form}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.lastNameLatin']})
                      }],
                      getValueFromEvent: args => {
                        if (!args) return args;
                        const value = args.currentTarget.value;
                        this.changedMap.set('lastNameLatin', value !== this.person.lastNameLatin);
                        return value;
                      }
                    }}
                    formItemOpts={{
                      hasFeedback: this.changedMap.get('lastNameLatin'),
                    }}
                  />
                  <ReadonlyField
                    entityName={PersonExt.NAME}
                    propertyName="firstNameLatin"
                    disabled={isNotDraft}
                    form={this.props.form}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.firstNameLatin']})
                      }],
                      getValueFromEvent: args => {
                        if (!args) return args;
                        const value = args.currentTarget.value;
                        this.changedMap.set('firstNameLatin', value !== this.person.firstNameLatin);
                        return value;
                      }
                    }}
                    formItemOpts={{
                      hasFeedback: this.changedMap.get('firstNameLatin'),
                    }}
                  />

                  <ReadonlyField
                    entityName={PersonExt.NAME}
                    propertyName="middleNameLatin"
                    disabled={isNotDraft}
                    form={this.props.form}
                    getFieldDecoratorOpts={{
                      getValueFromEvent: args => {
                        if (!args) return args;
                        const value = args.currentTarget.value;
                        this.changedMap.set('middleNameLatin', value !== this.person.middleNameLatin);
                        return value;
                      }
                    }}
                    formItemOpts={{
                      hasFeedback: this.changedMap.get('middleNameLatin'),
                      validateStatus: "success",
                    }}
                  />

                </Col>

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="attachments"
                  form={this.props.form}
                  disabled={isNotDraft}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.attachments']})
                    }],
                  }}
                />
              </Row>

            </Form>

            {this.takCard()}

          </Card>
        </Section>
      </Page>
    );
  }

  onReactionDisposerEffect = (item: PersonalDataRequest | undefined) => {
    const requestDate = item && item.requestDate ? item.requestDate : moment().toISOString();
    getCubaREST()!.searchEntities<PersonExt>(PersonExt.NAME, {
      conditions: [{
        property: "group.id",
        operator: '=',
        value: item && item.personGroup ? item.personGroup.id! : this.props.rootStore!.userInfo!.personGroupId!
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
      .then(value => {
        if (value && this.props.entityId === PersonalDataRequestManagement.NEW_SUBPATH) {
          this.props.form.setFieldsValue({
            lastName: value.lastName,
            firstName: value.firstName,
            middleName: value.middleName,
            lastNameLatin: value.lastNameLatin,
            firstNameLatin: value.firstNameLatin,
            middleNameLatin: value.middleNameLatin,
          })
        } else if (item && value) {
          this.changedMap.set('lastName', item.lastName !== value.lastName);
          this.changedMap.set('firstName', item.firstName !== value.firstName);
          this.changedMap.set('middleName', item.middleName !== value.middleName);
          this.changedMap.set('lastNameLatin', item.lastNameLatin !== value.lastNameLatin);
          this.changedMap.set('firstNameLatin', item.firstNameLatin !== value.firstNameLatin);
          this.changedMap.set('middleNameLatin', item.middleNameLatin !== value.middleNameLatin);
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
  })(withRouter(PersonalDataRequestEditComponent))
);
