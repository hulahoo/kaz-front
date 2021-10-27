import * as React from "react";
import {createElement} from "react";
import {Alert, Card, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import {PunishmentAssignmentRequestManagement} from "./PunishmentAssignmentRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Redirect} from "react-router-dom";
import {observable, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  collection,
  getCubaREST,
  injectMainStore,
  instance,
  MainStoreInjected,
  Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../../App.css";

import {DicPunishmentTypes} from "../../../../../cuba/entities/base/tsadv$DicPunishmentTypes";
import {DicOffenceType} from "../../../../../cuba/entities/base/tsadv$DicOffenceType";
import {DicRequestStatus} from "../../../../../cuba/entities/base/tsadv$DicRequestStatus";
import AbstractBprocEdit from "../../../Bproc/abstract/AbstractBprocEdit";
import Section from "../../../../hoc/Section";
import Page from "../../../../hoc/PageContentHoc";
import {PersonExt} from "../../../../../cuba/entities/base/base$PersonExt";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {goBackOrHomePage} from "../../../../util/util";
import {runReport} from "../../../../util/reportUtil";
import moment from "moment";
import {parseToJsonFromFieldValue} from "../../../../components/MultiFileUpload";
import {ExecutiveAssistantsManagement} from "../../../ExecutiveAssistants/ExecutiveAssistantsManagement";
import {MyTeamStructureManagement} from "../../MyTeamStructureManagement";
import Notification from "../../../../util/Notification/Notification";
import {withRouter} from "react-router";
import {ReadonlyField} from "../../../../components/ReadonlyField";

import DefaultDatePicker from "../../../../components/Datepicker";
import {restServices} from "../../../../../cuba/services";
import {PunishmentRequestType} from "../../../../../cuba/enums/enums";
import {PunishmentAssignmentRequest} from "../../../../../cuba/entities/base/tsadv$PunishmentAssignmentRequest";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import {dictionaryCollection} from "../../../../util/DictionaryDataCollectionStore";
import TextArea from "antd/es/input/TextArea";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string | undefined;
  personGroupId: string;
};

type PersonProfile = {
  id: string,
  groupId: string,
  positionGroupId: string,
  assignmentGroupId: string,
  positionId: string,
  fullName: string,
  firstLastName: string,
  hireDate?: any,
  birthDate?: any,
  sex?: string,
  cityOfResidence?: string,
  citizenship?: string,
  nationality?: string,
  imageId?: string,
  organizationName?: string,
  positionName?: string,
  email?: string,
  phone?: string,
  companyCode?: string,
}

@inject("rootStore")
@injectMainStore
@observer
class PunishmentAssignmentRequestEditComponent extends AbstractBprocEdit<PunishmentAssignmentRequest, EditorProps & Props & WrappedComponentProps & MainStoreInjected> {
  dataInstance = instance<PunishmentAssignmentRequest>(PunishmentAssignmentRequest.NAME, {
    view: "punishmentAssignmentRequest-view",
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_local"
  });

  @observable
  offenceTypesDc: DataCollectionStore<DicOffenceType>;

  @observable
  typesDc: DataCollectionStore<DicPunishmentTypes>;

  @observable
  updated = false;

  fields = [
    "requestNumber",
    "requestDate",
    "status",
    "assignmentDate",
    "punishmentType",
    "offenceType",
    "accident",
    "hasDeclaratory",
    "declaratoryFile",
    "hasRefusal",
    "refusalFile",
    "additionalFiles",
  ];

  @observable
  approverHrRoleCode: string;

  personGroupId: string;

  processDefinitionKey = "punishmentAssignmentRequest";

  path = PunishmentAssignmentRequestManagement.PATH;

  isUpdateBeforeOutcome = true;

  @observable
  reportCode?: string = undefined;

  @observable
  person: PersonExt;

  @observable
  personProfile?: PersonProfile;

  initVariablesByBproc = () => {
    if (this.activeUserTask && this.activeUserTask.hrRole && this.activeUserTask.hrRole.code) {
      this.approverHrRoleCode = this.activeUserTask.hrRole.code;
    }
  }


  onReactionDisposerEffect = (item: PunishmentAssignmentRequest | undefined) => {
    this.personGroupId = (item && item.personGroup ? (item.personGroup.id || this.props.personGroupId) : this.props.personGroupId) as string;
    this.loadPerson(this.personGroupId)
      .then(value => this.person = value);
    this.setEmployee(this.personGroupId);
    this.loadPersonProfile();

    this.offenceTypesDc = dictionaryCollection<DicOffenceType>(DicOffenceType.NAME, this.personGroupId, {
      view: '_local',
    });
    this.typesDc = dictionaryCollection<DicPunishmentTypes>(DicPunishmentTypes.NAME, this.personGroupId, {
      view: '_local',
    });
  }

  getUpdateEntityData = (): any => {
    if (this.isNotDraft()) return {
      ...this.props.form.getFieldsValue(this.fields),
      additionalFiles: parseToJsonFromFieldValue(this.props.form.getFieldValue('additionalFiles')),
    };
    return {
      personGroup: {
        id: this.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields),
      additionalFiles: parseToJsonFromFieldValue(this.props.form.getFieldValue('additionalFiles')),
    }
  };

  report = () => {
    const data = {
      parameters: [{
        name: "req",
        value: this.props.entityId
      }]
    };

    runReport(this.reportCode!, data, this.props.intl);
  }

  actions = () => {
    const {status} = this.dataInstance;

    const actions = [];

    actions.push(<Button buttonType={ButtonType.FOLLOW}
                         disabled={status !== "DONE" && status !== "ERROR"}
                         loading={status === "LOADING"}
                         onClick={this.saveRequest}>
      <FormattedMessage id="management.editor.submit"/>
    </Button>);

    actions.push(<Button buttonType={ButtonType.FOLLOW}
                         onClick={event => goBackOrHomePage(this.props.history)}>
      {this.props.intl.formatMessage({id: "close"})}
    </Button>);

    if (!this.isNewEntity()) {
      if (this.reportCode)
        actions.push(<Button buttonType={ButtonType.FOLLOW}
                             onClick={this.report}>
          {this.props.intl.formatMessage({id: "report"})}
        </Button>);

      actions.push(this.getOutcomeBtns());
    }
    return actions;
  }

  loadPerson = (personGroupId: string): Promise<PersonExt> => {
    this.dataInstance.update({requestType: PunishmentRequestType.ASSIGNMENT});
    return getCubaREST()!.searchEntities(PersonExt.NAME, {
      conditions: [{
        property: 'group.id',
        operator: '=',
        value: personGroupId,
      }, {
        property: 'startDate',
        operator: '<',
        value: moment().format('YYYY-MM-DD'),
      }, {
        property: 'endDate',
        operator: '>',
        value: moment().format('YYYY-MM-DD'),

      }]
    }, {
      view: '_minimal'
    }).then(value => value[0] as PersonExt);
  }

  render() {
    if (this.updated) {
      return <Redirect to={PunishmentAssignmentRequestManagement.PATH} />;
    }
    const {getFieldDecorator} = this.props.form;
    const messages = this.mainStore.messages!;
    return (
      <Page pageName={this.props.intl.formatMessage({id: "PunishmentAssignmentRequest"})}>
        <Section size="large">
          <Card className="narrow-layout card-actions-container"
                actions={this.actions()}
                bordered={false}>
            <Form layout="vertical">

              {getFieldDecorator('requestType', )(<Input type="hidden"/>)}

              <ReadonlyField
                entityName={PunishmentAssignmentRequest.NAME}
                propertyName="requestNumber"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                disabled
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.requestNumber']}),
                  }]
                }}
              />

              <ReadonlyField
                entityName={PunishmentAssignmentRequest.NAME}
                propertyName="requestDate"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                disabled
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.requestDate']}),
                  }]
                }}
              />

              <ReadonlyField
                entityName={PunishmentAssignmentRequest.NAME}
                propertyName="status"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                optionsContainer={this.statusesDc}
                disabled
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />

              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "personGroup"})}
                <Input disabled
                       value={this.personProfile ? this.personProfile.fullName || '' : ''}
                />
              </div>

              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                <FormattedMessage id="employee.positionName"/>
                <Input disabled
                       value={this.personProfile ? this.personProfile.positionName || '' : ''}
                />
              </div>

              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                <FormattedMessage id="employee.organizationName"/>
                <Input disabled
                       value={this.personProfile ? this.personProfile.organizationName || '' : ''}
                />
              </div>

              <FormattedMessage id="employee.hireDate"/>
              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                <DefaultDatePicker disabled
                                   value={this.personProfile ? moment(this.personProfile.hireDate) || '' : null}
                />
              </div>

              <ReadonlyField
                entityName={PunishmentAssignmentRequest.NAME}
                propertyName="offenceType"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } , label: this.props.intl.formatMessage({id: "PunishmentAssignmentRequest.offenceType"})}}
                optionsContainer={this.offenceTypesDc}
                disabled={!this.isDraft() && !this.isRevise()}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.offenceType']}),
                  }]
                }}
              />

              <ReadonlyField
                entityName={PunishmentAssignmentRequest.NAME}
                propertyName="assignmentDate"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                disabled={!this.isDraft() && !this.isRevise()}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.date']}),
                  }]
                }}
              />

              <Form.Item
                style={{width: '100%'}}
                label={this.props.intl.formatMessage({id: "PunishmentAssignmentRequest.accident"})}>
                {getFieldDecorator("accident", {
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.accident']})
                  }]
                })(
                  <TextArea
                    disabled={!this.isDraft() && !this.isRevise()}
                    rows={4}/>
                )}
              </Form.Item>
              <ReadonlyField
                entityName={PunishmentAssignmentRequest.NAME}
                propertyName="hasDeclaratory"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                disabled={(!this.isDraft() && !this.isRevise()) || this.isApproved() || this.props.form.getFieldValue('hasRefusal') || this.approverHrRoleCode === 'ORG_MANGER' || this.approverHrRoleCode === 'IER_COMPANY'}
                getFieldDecoratorOpts={{
                  valuePropName: "checked"
                }}
              />

              <ReadonlyField
                entityName={this.dataInstance.entityName}
                propertyName="declaratoryFile"
                form={this.props.form}
                disabled={(!this.isDraft() && !this.isRevise()) || this.isApproved() || !this.props.form.getFieldValue('hasDeclaratory') || this.approverHrRoleCode === 'ORG_MANGER' || this.approverHrRoleCode === 'IER_COMPANY'}
                formItemOpts={{style: {marginBottom: "12px"}, label: this.props.intl.formatMessage({id: "PunishmentAssignmentRequest.declaratoryFile"})}}/>

              <ReadonlyField
                entityName={PunishmentAssignmentRequest.NAME}
                propertyName="hasRefusal"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                disabled={(!this.isDraft() && !this.isRevise()) || this.isApproved() || this.props.form.getFieldValue('hasDeclaratory') || this.approverHrRoleCode === 'ORG_MANGER' || this.approverHrRoleCode === 'IER_COMPANY'}
                getFieldDecoratorOpts={{
                  valuePropName: "checked"
                }}
              />

              <ReadonlyField
                entityName={this.dataInstance.entityName}
                propertyName="refusalFile"
                form={this.props.form}
                disabled={(!this.isDraft() && !this.isRevise()) || this.isApproved() || !this.props.form.getFieldValue('hasRefusal') || this.approverHrRoleCode === 'ORG_MANGER' || this.approverHrRoleCode === 'IER_COMPANY'}
                formItemOpts={{style: {marginBottom: "12px"}, label: this.props.intl.formatMessage({id: "PunishmentAssignmentRequest.refusalFile"})}}/>

              <ReadonlyField
                entityName={PunishmentAssignmentRequest.NAME}
                propertyName="punishmentType"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" }, label: this.props.intl.formatMessage({id: "PunishmentAssignmentRequest.punishmentType"}) }}
                optionsContainer={this.typesDc}
                disabled={(!this.isDraft() && !this.isRevise()) && this.approverHrRoleCode != 'ORG_MANGER' && this.approverHrRoleCode != 'IER_COMPANY'}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.type']}),
                  }]
                }}
              />

              <ReadonlyField
                entityName={this.dataInstance.entityName}
                propertyName="additionalFiles"
                form={this.props.form}
                disabled={!this.isDraft() && !this.isRevise()}
                formItemOpts={{style: {marginBottom: "12px"}}}/>

              {this.globalErrors.length > 0 && (
                <Alert
                  message={<MultilineText lines={toJS(this.globalErrors)} />}
                  type="error"
                  style={{ marginBottom: "24px" }}
                />
              )}

              {this.takCard()}

            </Form>
          </Card>
        </Section>
      </Page>

    );
  }


  afterSendOnApprove = () => {
    const statusId = this.dataInstance.item && this.dataInstance.item.status && this.dataInstance.item.status.id;
    if (this.statusesDc.items.find(value => value.id === statusId && value.code === 'DRAFT'))
      this.props.history!.push(
        this.props.rootStore!.assistantTeamInfo.active
          ? ExecutiveAssistantsManagement.PATH
          : MyTeamStructureManagement.PATH);
    else this.props.history!.goBack();
  };

  loadPersonProfile() {
    restServices.employeeService.personProfile(this.personGroupId)
      .then(value => {
        this.personProfile = value;
      })
      .catch(() => {
          Notification.error({
            message: this.props.intl.formatMessage({id: "management.editor.error"})
          });
        }
      )
  }
  isApproved() {
    const completeStatus = this.statusesDc.items.find(value => value.code === 'APPROVED')
    if (completeStatus) {
      return this.props.form.getFieldValue('status') === completeStatus.id
    }
    return false
  }

  isDraft() {
    const completeStatus = this.statusesDc.items.find(value => value.code === 'DRAFT')
    if (completeStatus) {
      return this.props.form.getFieldValue('status') === completeStatus.id
    }
    return false
  }

  isRevise() {
    const completeStatus = this.statusesDc.items.find(value => value.code === 'TO_BE_REVISED')
    if (completeStatus) {
      return this.props.form.getFieldValue('status') === completeStatus.id
    }
    return false
  }

}

const component = injectIntl(
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
  })(withRouter(PunishmentAssignmentRequestEditComponent))
);

export default (component);
