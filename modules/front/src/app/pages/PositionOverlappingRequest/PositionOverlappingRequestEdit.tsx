import * as React from "react";
import {createElement} from "react";
import {Card, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
import {injectIntl} from "react-intl";

import {collection, getCubaREST, injectMainStore, instance, Msg, withLocalizedForm} from "@cuba-platform/react";

import "../../../app/App.css";
import {restQueries} from "../../../cuba/queries";
import {PositionOverlappingRequest} from "../../../cuba/entities/kzm$PositionOverlappingRequest";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicPositionsOverlappingType} from "../../../cuba/entities/kzm$DicPositionsOverlappingType";
import LoadingPage from "../LoadingPage";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import {goBackOrHomePage} from "../../util/util";
import {ReadonlyField} from "../../components/ReadonlyField";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";
import moment from "moment";
import {OrganizationGroup} from "../../../cuba/entities/base/base$OrganizationGroup";
import TextArea from "antd/es/input/TextArea";
import MsgEntity from "../../components/MsgEntity";
import {Redirect} from "react-router-dom";
import {PositionOverlappingRequestManagement} from "./PositionOverlappingRequestManagement";
import {withRouter} from "react-router";
import {PositionGroupExt} from "../../../cuba/entities/base/base$PositionGroupExt";

type EditorProps = {
  entityId: string,
  personGroupId: any;
};

@inject("rootStore")
@injectMainStore
@observer
class PositionOverlappingRequestEditComponent extends AbstractBprocEdit<PositionOverlappingRequest, EditorProps> {
  processDefinitionKey = "positionOverlappingRequest";

  dataInstance = instance<PositionOverlappingRequest>(
    PositionOverlappingRequest.NAME,
    {view: "positionOverlappingRequest-edit", loadImmediately: false}
  );

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  positionOverlappingTypeDc = collection<DicPositionsOverlappingType>(
    DicPositionsOverlappingType.NAME,
    {view: "_minimal"}
  )

  @observable
  positionGroupDc = collection<PositionGroupExt>(
    PositionGroupExt.NAME,
    {
      view: "position.group.company",
      filter: {
        conditions: [
          {
            property: "company.code", operator: "=", value: this.props.rootStore!.userInfo.companyCode!
          }
        ]
      }
    }
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

    "workCompletionDate",

    "positionGroup",

    "department",

    "justification",

    "status",

    "type",
    "attachment"

  ];


  @observable
  person: PersonExt;

  organization: any;

  editedPositionOverlappingRequest: PositionOverlappingRequest;

  @observable
  mainStore = this.props.mainStore!;


  isUpdateBeforeOutcome = true;

  getUpdateEntityData(): any {
    if (this.isNotDraft())
      return super.getUpdateEntityData();
    return {
      personGroup: this.props.personGroupId,
      ...super.getUpdateEntityData()
    };
  }

  isNotDraft = () => {
    return this.dataInstance.item && this.dataInstance.item.status ? this.dataInstance.item.status.langValue3 !== "Draft" : true;
  };

  constructor(props:any) {
    super(props);
  }

  render() {
    if (!this.dataInstance) {
      return <LoadingPage/>
    }


    if (this.updated) {
      return <Redirect to={PositionOverlappingRequestManagement.PATH}/>;
    }


    const messages = this.mainStore.messages!;
    const entityName = this.dataInstance.entityName;


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
              disabled={this.isNotDraft()!}
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
              propertyName="department"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              optionsContainer={this.organizationGroupDc}
              disabled={this.isNotDraft()!}
              getFieldDecoratorOpts={{
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage(
                    {id: "form.validation.required"},
                    {fieldName: messages[PositionOverlappingRequest.NAME + '.department']})
                }],
                getValueFromEvent: organizationId => {
                  if (organizationId) {
                    this.positionGroupDc.filter = {
                      conditions: [
                        {
                          property: "company.code", operator: "=", value: this.props.rootStore!.userInfo.companyCode!
                        },
                        {
                          property: "organizationGroup.id",
                          operator: "=",
                          value: organizationId
                        }
                      ]
                    };
                  } else {
                    this.positionGroupDc.filter = {
                      conditions: [
                        {
                          property: "company.code", operator: "=", value: this.props.rootStore!.userInfo.companyCode!
                        }
                      ]
                    };
                  }
                  this.positionGroupDc.load()
                  return organizationId
                }
              }}
            />

            <ReadonlyField
              entityName={PositionOverlappingRequest.NAME}
              propertyName="positionGroup"
              form={this.props.form}
              disabled={this.isNotDraft()!}
              formItemOpts={{style: {marginBottom: "12px"}}}
              optionsContainer={this.positionGroupDc}
              getFieldDecoratorOpts={{
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage(
                    {id: "form.validation.required"},
                    {fieldName: messages[PositionOverlappingRequest.NAME + '.positionGroup']})
                }],
                getValueFromEvent: positionId => {
                  this.fillOrganization(positionId);
                  return positionId;
                }
              }}
            />


            <Form onSubmit={this.validate} layout="vertical">
              <ReadonlyField
                entityName={PositionOverlappingRequest.NAME}
                propertyName="workCompletionDate"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                disabled={this.isNotDraft()!}
                getFieldDecoratorOpts={{
                  rules: [{required: true,}]
                }}
              />
            </Form>
            <Form.Item
              label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "justification"})}>
              {this.props.form.getFieldDecorator("justification")(
                <TextArea
                  disabled={this.isNotDraft()!}
                  rows={4}/>
              )}
            </Form.Item>
            <ReadonlyField
              entityName={entityName}
              propertyName="attachment"
              form={this.props.form}
              disabled={this.isNotDraft()!}
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

  fillOrganization = (positionId: string) => {
    restQueries.organizationGroupByPositionId(positionId).then(values => {
      const organId = values.length < 1 ? "" : values[0].id;
      this.props.form.setFields({
        department: {
          value: organId
        }
      })
    });
  }

  onReactionDisposerEffect = (item: PositionOverlappingRequest | undefined) => {
    const personGroupId = item && item.personGroup ? item.personGroup.id! : this.props!.personGroupId!;
    const requestDate = item && item.requestDate ? item.requestDate : moment().toISOString();
    getCubaREST()!.searchEntities<PersonExt>(PersonExt.NAME, {
      conditions: [{
        property: "group.id",
        operator: '=',
        value: personGroupId
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

    const organizationId = item!.department!.id;
    console.log('organizationId2', organizationId);
    if (organizationId) {
      console.log('test');
      this.positionGroupDc = collection<PositionGroupExt>(
        PositionGroupExt.NAME,
        {
          view: "position.group.company",
          filter: {
            conditions: [
              {
                property: "company.code", operator: "=", value: this.props.rootStore!.userInfo.companyCode!
              },
              {
                property: "organizationGroup.id",
                operator: "=",
                value: organizationId
              }
            ]
          }
        }
      );
    }
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
  })(withRouter(PositionOverlappingRequestEditComponent))
);
