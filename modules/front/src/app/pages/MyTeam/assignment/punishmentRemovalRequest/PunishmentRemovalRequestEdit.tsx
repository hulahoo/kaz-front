import * as React from "react";
import {createElement} from "react";
import {Alert, Card, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import { PunishmentRemovalRequestManagement } from "./punishmentRemovalRequestManagement";
import { FormComponentProps } from "antd/lib/form";
import { Redirect } from "react-router-dom";
import { observable, toJS } from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

import {
  collection,
  Field,
  instance,
  withLocalizedForm,
  MultilineText, injectMainStore, getCubaREST, MainStoreInjected, Msg
} from "@cuba-platform/react";

import "../../../../App.css";

import { DicRequestStatus } from "../../../../../cuba/entities/base/tsadv$DicRequestStatus";
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
import {PunishmentRemovalRequest} from "../../../../../cuba/entities/base/tsadv$PunishmentRemovalRequest";

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
class PunishmentRemovalRequestEditComponent extends AbstractBprocEdit<PunishmentRemovalRequest, EditorProps & Props & WrappedComponentProps & MainStoreInjected> {
  dataInstance = instance<PunishmentRemovalRequest>(PunishmentRemovalRequest.NAME, {
    view: "punishmentRemovalRequest-view",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_local"
  });

  @observable
  updated = false;

  fields = [
    "requestNumber",
    "requestDate",
    "status",
    "earlyTerminationReason",
    "removingOrderNum",
    "removingOrderDate",
    "removingFile",
  ];

  @observable
  approverHrRoleCode: string;

  personGroupId: string;

  processDefinitionKey = "punishmentRemovalRequest";

  path = PunishmentRemovalRequestManagement.PATH;

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


  onReactionDisposerEffect = (item: PunishmentRemovalRequest | undefined) => {
    this.personGroupId = (item && item.personGroup ? (item.personGroup.id || this.props.personGroupId) : this.props.personGroupId) as string;

    this.loadPerson(this.personGroupId)
      .then(value => this.person = value);
    this.setEmployee(this.personGroupId);
    this.loadPersonProfile();

  }

  getUpdateEntityData = (): any => {
    if (this.isNotDraft()) return {
      ...this.props.form.getFieldsValue(this.fields),
      // additionalFiles: parseToJsonFromFieldValue(this.props.form.getFieldValue('additionalFiles')),
    };
    return {
      personGroup: {
        id: this.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields),
      // additionalFiles: parseToJsonFromFieldValue(this.props.form.getFieldValue('additionalFiles')),
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

    // if (this.isNewEntity())
    actions.push(<Button buttonType={ButtonType.FOLLOW}
                         disabled={status !== "DONE" && status !== "ERROR"}
                         loading={status === "LOADING"}
                         onClick={this.saveRequest}>
      <FormattedMessage id="management.editor.submit"/>
    </Button>);

    actions.push(<Button buttonType={ButtonType.FOLLOW}
                         onClick={event => goBackOrHomePage(this.props.history)}>{this.props.intl.formatMessage({id: "close"})}</Button>);

    if (!this.isNewEntity()) {
      if (this.reportCode)
        actions.push(<Button buttonType={ButtonType.FOLLOW}
                             onClick={this.report}>{this.props.intl.formatMessage({id: "report"})}</Button>);

      actions.push(this.getOutcomeBtns());
    }
    return actions;
  }

  loadPerson = (personGroupId: string): Promise<PersonExt> => {
    this.dataInstance.update({requestType: PunishmentRequestType.REMOVAL});
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
      return <Redirect to={PunishmentRemovalRequestManagement.PATH} />;
    }
    const messages = this.mainStore.messages!;
    const isNotDraft = this.isNotDraft();
    const now = moment();
    const {getFieldDecorator} = this.props.form;
    return (
      <Page pageName={this.props.intl.formatMessage({id: "PunishmentRequest"})}>
        <Section size="large">
          <Card className="narrow-layout card-actions-container"
                actions={this.actions()}
                bordered={false}>
            <Form layout="vertical">

              {getFieldDecorator('requestType', )(<Input type="hidden"/>)}

              <ReadonlyField
                entityName={PunishmentRemovalRequest.NAME}
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
                entityName={PunishmentRemovalRequest.NAME}
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
                entityName={PunishmentRemovalRequest.NAME}
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
                <FormattedMessage id ="employee.name"/>
                <Input disabled={true}
                       value={this.personProfile ? this.personProfile.fullName || '' : ''}
                />
              </div>

              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                <FormattedMessage id="employee.positionName"/>
                <Input disabled={true}
                       value={this.personProfile ? this.personProfile.positionName || '' : ''}
                />
              </div>

              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                <FormattedMessage id="employee.organizationName"/>
                <Input disabled={true}
                       value={this.personProfile ? this.personProfile.organizationName || '' : ''}
                />
              </div>

              <FormattedMessage id="employee.hireDate"/>
              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                <DefaultDatePicker disabled={true}
                                   value={this.personProfile ? moment(this.personProfile.hireDate) || '' : null}
                />
              </div>

              <ReadonlyField
                entityName={PunishmentRemovalRequest.NAME}
                propertyName="removingOrderDate"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.removingOrderDate']}),
                  }]
                }}
              />

              <ReadonlyField
                entityName={PunishmentRemovalRequest.NAME}
                propertyName="removingOrderNum"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.removingOrderNum']}),
                  }]
                }}
              />

              <ReadonlyField
                entityName={PunishmentRemovalRequest.NAME}
                propertyName="earlyTerminationReason"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.earlyTerminationReason']}),
                  }]
                }}
              />

              <ReadonlyField
                entityName={PunishmentRemovalRequest.NAME}
                propertyName="removingFile"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.removingFile']}),
                  }]
                }}
              />

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
  })(withRouter(PunishmentRemovalRequestEditComponent))
);

export default (component);
