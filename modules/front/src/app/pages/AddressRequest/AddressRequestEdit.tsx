import * as React from "react";
import {createElement} from "react";
import {Card, Col, Form, Input, Row, Select} from "antd";
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
import {FormattedMessage, injectIntl} from "react-intl";

import {collection, getCubaREST, injectMainStore, instance, Msg, withLocalizedForm} from "@cuba-platform/react";

import "../../../app/App.css";

import {AddressRequest} from "../../../cuba/entities/base/tsadv$AddressRequest";
import {DicAddressType} from "../../../cuba/entities/base/tsadv$DicAddressType";
import {DicCountry} from "../../../cuba/entities/base/base$DicCountry";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicKato} from "../../../cuba/entities/base/tsadv_DicKato";
import {DicStreetType} from "../../../cuba/entities/base/tsadv_DicStreetType";
import {ReadonlyField} from "../../components/ReadonlyField";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";
import {PersonDocument} from "../../../cuba/entities/base/tsadv$PersonDocument";
import {Address} from "../../../cuba/entities/base/tsadv$Address";
import moment from "moment";
import {PersonDocumentRequestManagement} from "../PersonDocumentRequest/PersonDocumentRequestManagement";
import {goBackOrHomePage, isEquals, langValue} from "../../util/util";
import LoadingPage from "../LoadingPage";
import MsgEntity from "../../components/MsgEntity";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import Page from "../../hoc/PageContentHoc";
import {withRouter} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {SerializedEntity} from "@cuba-platform/rest/dist-node/model";
import {SearchSelect} from "../../components/SearchSelect";
import {formatDate} from "../../util/Date/Date";

type EditorProps = {
  entityId: string;
  addressId?: string;
};

@inject("rootStore")
@injectMainStore
@observer
class AddressRequestEditComponent extends AbstractBprocEdit<AddressRequest, EditorProps> {
  processDefinitionKey = "addressRequest";

  dicLangValue = 'langValue' + this.props.rootStore!.userInfo!.localeIndex;

  dataInstance = instance<AddressRequest>(AddressRequest.NAME, {
    view: "portal.my-profile",
    loadImmediately: false
  });

  addressTypesDc = collection<DicAddressType>(DicAddressType.NAME, {
    view: "_minimal",
    sort: this.dicLangValue
  });

  countrysDc = collection<DicCountry>(DicCountry.NAME, {
    view: "_local",
    sort: this.dicLangValue,
    filter: {
      conditions: [{
        value: 'TRUE',
        operator: '=',
        property: 'active'
      }]
    }
  });

  statussDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  katosDc = collection<DicKato>(DicKato.NAME,
    {view: "_minimal", loadImmediately: false, sort: this.dicLangValue});

  streetTypesDc = collection<DicStreetType>(DicStreetType.NAME, {
    view: "_minimal",
    sort: this.dicLangValue
  });

  @observable
  editAddress: Address;

  instanceEditAddress = instance<Address>(Address.NAME, {
    view: "portal.my-profile",
    loadImmediately: false
  });

  @observable
  changedMap = new Map<string, boolean>();

  @observable
  person: PersonExt;

  personGroupId: string;

  @observable
  isLocaleEn = this.props.rootStore!.userInfo.locale === 'en';

  @observable
  isKatoRequired = false;

  isUpdateBeforeOutcome = true;

  fields = [

    "requestNumber",

    "requestDate",

    "status",

    'comment',

    "startDate",

    "endDate",

    "addressType",

    "postalCode",

    "country",

    "kato",

    "streetType",

    "building",

    "block",

    "flat",

    'addressForExpats',

    'addressKazakh',

    'addressEnglish',

    'streetName',

    "attachments",
  ];

  update = () => {
    if (this.isNotDraft())
      return this.dataInstance.update(this.getUpdateEntityData());
    return this.dataInstance.update({
      personGroup: this.personGroupId,
      baseAddress: this.editAddress ? this.editAddress.id : undefined,
      ...this.getUpdateEntityData()
    });
  };

  render() {

    if (!this.mainStore) return <LoadingPage/>

    const messages = this.mainStore.messages;
    if (!messages) return <LoadingPage/>

    const entityName = this.dataInstance.entityName;
    const isNotDraft = this.isNotDraft();

    return (
      <Page pageName={<MsgEntity entityName={entityName}/>}>
        <Section className='large'>
          <Card className="narrow-layout card-actions-container"
                bordered={false}
                actions={[
                  <Button buttonType={ButtonType.FOLLOW}
                          onClick={() => goBackOrHomePage(this.props.history!)}>{this.props.intl.formatMessage({id: "close"})}</Button>,
                  this.getOutcomeBtns()]}>
            <Form layout="vertical">

              <ReadonlyField
                disabled
                entityName={entityName}
                propertyName="requestNumber"
                form={this.props.form}
              />

              <ReadonlyField
                disabled
                entityName={entityName}
                propertyName="requestDate"
                form={this.props.form}
              />

              <ReadonlyField
                disabled
                entityName={entityName}
                propertyName="status"
                form={this.props.form}
                optionsContainer={this.statussDc}
              />

              <Form.Item
                label={createElement(Msg, {entityName: entityName, propertyName: "personGroup"})}>
                <Input
                  value={this.person ? this.person['_instanceName'] || '' : ''}
                  disabled/>
              </Form.Item>

              {
                this.editAddress ?
                  <Row type={"flex"} className={"data-form"}>
                    <Col md={24} sm={24} lg={12}>
                      <div className={"section-header-container"}><FormattedMessage id={'currentValue'}/></div>
                      {this.renderAddress()}
                    </Col>
                    <Col md={24} sm={24} lg={12}>
                      <div className={"section-header-container"}><FormattedMessage id={'newValue'}/></div>
                      {this.renderAddressRequest()}
                    </Col>
                  </Row>
                  : this.renderAddressRequest()
              }

              <Form.Item
                label={createElement(Msg, {entityName: entityName, propertyName: "comment"})}>
                {this.props.form.getFieldDecorator("comment")(
                  <TextArea
                    rows={5}
                    disabled={isNotDraft}/>
                )}
              </Form.Item>

              <ReadonlyField
                entityName={entityName}
                propertyName="attachments"
                disabled={isNotDraft}
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
              />

            </Form>

            {this.takCard()}

          </Card>
        </Section>
      </Page>
    );
  }

  renderAddress = () => {

    const entityName = this.dataInstance.entityName;

    return (
      <div>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "startDate"})}>
          <Input
            value={formatDate(this.editAddress.startDate)}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "endDate"})}>
          <Input
            value={formatDate(this.editAddress.endDate)}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "addressType"})}>
          <Input
            value={this.editAddress && this.editAddress.addressType ? this.editAddress.addressType['_instanceName'] || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "postalCode"})}>
          <Input
            value={this.editAddress ? this.editAddress.postalCode || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "country"})}>
          <Input
            value={this.editAddress && this.editAddress.country ? this.editAddress.country['_instanceName'] || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "kato"})}>
          <Input
            value={this.editAddress && this.editAddress.kato ? this.editAddress.kato['_instanceName'] || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "streetType"})}>
          <Input
            value={this.editAddress && this.editAddress.streetType ? this.editAddress.streetType['_instanceName'] || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "streetName"})}>
          <Input
            value={this.editAddress ? this.editAddress.streetName || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "building"})}>
          <Input
            value={this.editAddress ? this.editAddress.building || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "block"})}>
          <Input
            value={this.editAddress ? this.editAddress.block || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "flat"})}>
          <Input
            value={this.editAddress ? this.editAddress.flat || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          label={createElement(Msg, {entityName: entityName, propertyName: "addressForExpats"})}>
          <Input
            value={this.editAddress ? this.editAddress.addressForExpats || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          style={this.isLocaleEn ? {display: 'none'} : {}}
          label={createElement(Msg, {entityName: entityName, propertyName: "addressKazakh"})}>
          <Input
            value={this.editAddress ? this.editAddress.addressKazakh || '' : ''}
            disabled/>
        </Form.Item>

        <Form.Item
          style={!this.isLocaleEn ? {display: 'none'} : {}}
          label={createElement(Msg, {entityName: entityName, propertyName: "addressEnglish"})}>
          <Input
            value={this.editAddress ? this.editAddress.addressEnglish || '' : ''}
            disabled/>
        </Form.Item>

      </div>
    );
  }

  renderAddressRequest = () => {

    const messages = this.mainStore.messages!;

    const entityName = this.dataInstance.entityName;
    const isNotDraft = this.isNotDraft();

    return (
      <div>

        <ReadonlyField
          entityName={entityName}
          propertyName="startDate"
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            rules: [{
              required: !isNotDraft,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.startDate']})
            }],
            getValueFromEvent: args => {
              if (this.editAddress)
                this.changedMap.set('startDate', this.editAddress.startDate ? !moment(this.editAddress.startDate).isSame(args, 'day') : !!args);
              return args;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('startDate'),
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="endDate"
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            rules: [{
              required: !isNotDraft,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.endDate']})
            }],
            getValueFromEvent: args => {
              if (this.editAddress)
                this.changedMap.set('endDate', this.editAddress.endDate ? !moment(this.editAddress.endDate).isSame(args, 'day') : !!args);
              return args;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('endDate'),
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="addressType"
          form={this.props.form}
          optionsContainer={this.addressTypesDc}
          disabled={isNotDraft}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.addressType']})
            }],
            getValueFromEvent: args => {
              if (this.editAddress)
                this.changedMap.set('addressType', args !== (this.editAddress.addressType ? this.editAddress.addressType.id : undefined));
              return args;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('addressType'),
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="postalCode"
          form={this.props.form}
          disabled={isNotDraft}
          getFieldDecoratorOpts={{
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editAddress)
                this.changedMap.set('postalCode', value !== this.editAddress.postalCode);
              return value;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('postalCode'),
            validateStatus: "success",
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="country"
          disabled={isNotDraft}
          form={this.props.form}
          optionsContainer={this.countrysDc}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.country']})
            }],
            getValueFromEvent: args => {
              const country = this.countrysDc.items.find(value => value.id === args);
              this.isKatoRequired = !!(country && country.code === 'KZ');
              if (this.editAddress)
                this.changedMap.set('country', args !== (this.editAddress.country ? this.editAddress.country.id : undefined));
              return args;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('country'),
          }}
        />

        <Form.Item
          hasFeedback={this.changedMap.get('kato')}
          label={<Msg entityName={entityName} propertyName={"kato"}/>}>
          {this.props.form.getFieldDecorator("kato", {
            rules: [{
              required: this.isKatoRequired,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.kato']})
            }],
            getValueFromEvent: args => {
              if (this.editAddress)
                this.changedMap.set('kato', args !== (this.editAddress.kato ? this.editAddress.kato.id : undefined));
              return args;
            }
          })(<SearchSelect onSearch={this.onSearchKato}
                           disabled={isNotDraft}
                           placeholder={this.props.intl.formatMessage({id: 'search'})}
                           loading={this.katosDc.status === 'LOADING'}
                           options={this.katosDc && this.katosDc.items.map(d => <Select.Option
                             key={d.id!}>{d._instanceName}</Select.Option>)}/>)
          }
        </Form.Item>

        <ReadonlyField
          entityName={entityName}
          propertyName="streetType"
          disabled={isNotDraft}
          form={this.props.form}
          optionsContainer={this.streetTypesDc}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[entityName + '.streetType']})
            }],
            getValueFromEvent: args => {
              if (this.editAddress)
                this.changedMap.set('streetType', args !== (this.editAddress.streetType ? this.editAddress.streetType.id : undefined));
              return args;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('streetType'),
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName="streetName"
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editAddress)
                this.changedMap.set('streetName', value !== this.editAddress.streetName);
              return value;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('streetName'),
            validateStatus: "success",
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName='building'
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editAddress)
                this.changedMap.set('building', value !== this.editAddress.building);
              return value;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('building'),
            validateStatus: "success",
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName='block'
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editAddress)
                this.changedMap.set('block', value !== this.editAddress.block);
              return value;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('block'),
            validateStatus: "success",
          }}
        />

        <ReadonlyField
          entityName={entityName}
          propertyName='flat'
          disabled={isNotDraft}
          form={this.props.form}
          getFieldDecoratorOpts={{
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editAddress)
                this.changedMap.set('flat', value !== this.editAddress.flat);
              return value;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('flat'),
            validateStatus: "success",
          }}
        />

        <ReadonlyField
          entityName={entityName}
          disabled={isNotDraft}
          propertyName='addressForExpats'
          form={this.props.form}
          getFieldDecoratorOpts={{
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editAddress)
                this.changedMap.set('addressForExpats', value !== this.editAddress.addressForExpats);
              return value;
            }
          }}
          formItemOpts={{
            hasFeedback: this.changedMap.get('addressForExpats'),
            validateStatus: "success",
          }}
        />

        <ReadonlyField
          entityName={entityName}
          disabled={isNotDraft}
          propertyName='addressKazakh'
          form={this.props.form}
          getFieldDecoratorOpts={{
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editAddress)
                this.changedMap.set('addressKazakh', value !== this.editAddress.addressKazakh);
              return value;
            }
          }}
          formItemOpts={{
            style: this.isLocaleEn ? {display: 'none'} : {},
            hasFeedback: this.changedMap.get('addressKazakh'),
            validateStatus: "success",
          }}
        />

        <ReadonlyField
          entityName={entityName}
          disabled={isNotDraft}
          propertyName='addressEnglish'
          form={this.props.form}
          formItemOpts={{
            style: !this.isLocaleEn ? {display: 'none'} : {},
            hasFeedback: this.changedMap.get('addressEnglish'),
            validateStatus: "success",
          }}
          getFieldDecoratorOpts={{
            getValueFromEvent: args => {
              const value = args.currentTarget.value;
              if (this.editAddress)
                this.changedMap.set('addressEnglish', value !== this.editAddress.addressEnglish);
              return value;
            }
          }}
        />
      </div>
    );
  }

  onSearchKato = (value: string) => {
    this.katosDc.items = [];
    if (value && value.length >= 4) {
      this.katosDc.filter = {
        conditions: [
          {
            property: this.dicLangValue,
            operator: 'contains',
            value: value
          }
        ]
      }

      this.katosDc.load();
    }
  };

  onReactionDisposerEffect = (item: AddressRequest | undefined) => {
    this.personGroupId = item && item.personGroup ? item.personGroup.id! : this.props.rootStore!.userInfo!.personGroupId!;

    const requestDate = item && item.requestDate ? item.requestDate : moment().toISOString();

    if (item && item.kato) {
      this.katosDc.items = [item.kato as SerializedEntity<DicKato>];
      this.katosDc.status = 'DONE';
    }

    this.isKatoRequired = !!(item && item.country && item.country.code === 'KZ');

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

    const addressId = this.props.addressId || (item && item.baseAddress ? item.baseAddress.id : undefined)

    if (addressId)
      getCubaREST()!.loadEntity(Address.NAME, addressId, {view: 'portal.my-profile'})
        .then(value => this.editAddress = value as PersonDocument)
        .then(value => {
          this.instanceEditAddress.setItem(value);
          const properties = ["addressType", "postalCode", "country", "kato", "streetType", "building", "block", "flat", 'addressForExpats', 'addressKazakh', 'addressEnglish', 'streetName', 'startDate', 'endDate'];
          if (this.props.entityId === PersonDocumentRequestManagement.NEW_SUBPATH) {
            this.props.form.setFieldsValue(this.instanceEditAddress.getFieldValues(properties));
            if (this.instanceEditAddress.item && this.instanceEditAddress.item.kato)
              this.katosDc.items = [this.instanceEditAddress.item.kato as SerializedEntity<DicKato>]
          } else if (item) {
            properties.forEach(field => {
              this.changedMap.set(field, !isEquals(value[field], item[field]));
            });
          }
        });
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
  })(withRouter(AddressRequestEditComponent))
);
