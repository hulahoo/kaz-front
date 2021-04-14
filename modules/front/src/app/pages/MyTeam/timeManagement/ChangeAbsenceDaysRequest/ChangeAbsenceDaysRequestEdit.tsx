import * as React from "react";
import {createElement} from "react";
import {Card, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";

import {
  collection,
  getCubaREST,
  injectMainStore,
  instance,
  MainStoreInjected,
  Msg,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../../../app/App.css";

import {RouteComponentProps, withRouter} from "react-router";
import AbstractBprocEdit from "../../../Bproc/abstract/AbstractBprocEdit";
import {DicRequestStatus} from "../../../../../cuba/entities/base/tsadv$DicRequestStatus";
import LoadingPage from "../../../LoadingPage";
import Page from "../../../../hoc/PageContentHoc";
import Section from "../../../../hoc/Section";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {ReadonlyField} from "../../../../components/ReadonlyField";
import {RootStoreProp} from "../../../../store";
import {PersonExt} from "../../../../../cuba/entities/base/base$PersonExt";
import {ChangeAbsenceDaysRequest} from "../../../../../cuba/entities/base/tsadv_ChangeAbsenceDaysRequest";
import moment from "moment/moment";
import {observable, reaction} from "mobx";
import {getFullName} from "../../../../util/util";
import {Absence} from "../../../../../cuba/entities/base/tsadv$Absence";
import {dictionaryCollection, DictionaryDataCollectionStore} from "../../../../util/DictionaryDataCollectionStore";
import {DicPurposeAbsence} from "../../../../../cuba/entities/base/tsadv_DicPurposeAbsence";
import {FileDescriptor} from "../../../../../cuba/entities/base/sys$FileDescriptor";
import {restServices} from "../../../../../cuba/services";

type EditorProps = {
  entityId: string;
  absenceId?: string;
};

@inject("rootStore")
@injectMainStore
@observer
class ChangeAbsenceDaysRequestEdit extends AbstractBprocEdit<ChangeAbsenceDaysRequest, EditorProps> {
  dataInstance = instance<ChangeAbsenceDaysRequest>(ChangeAbsenceDaysRequest.NAME, {
    view: "changeAbsenceDaysRequest.edit",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  dicPurposeAbsence: DictionaryDataCollectionStore<DicPurposeAbsence> = dictionaryCollection(DicPurposeAbsence.NAME,
    this.props.rootStore!.userInfo!.personGroupId!, {
      view: '_local'
    });

  filesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  fields = [
    "requestNumber",

    "requestDate",

    "status",

    "scheduleStartDate",

    "scheduleEndDate",

    "purpose",

    "newStartDate",

    "newEndDate",

    "periodStartDate",

    "periodEndDate",

    "agree",

    "familiarization",

    "file"
  ];

  @observable
  person: PersonExt;

  @observable
  absence: Absence;

  @observable
  approverHrRoleCode: string;

  initVariablesByBproc = () => {
    if (this.activeTask && this.activeTask.hrRole && this.activeTask.hrRole.code) {
      this.approverHrRoleCode = this.activeTask.hrRole.code;
    }
  }

  getUpdateEntityData = (): any => {
    if (this.isNotDraft())
      return {
        ...this.props.form.getFieldsValue(this.fields)
      }

    return {
      employee: this.absence!.personGroup!.id,
      vacation: this.absence,
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  processDefinitionKey = "changeAbsenceDaysRequest";

  render() {

    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const messages = this.mainStore.messages!;
    const isNotDraft = this.isNotDraft();

    return (
      <Page pageName={this.props.intl.formatMessage({id: "changeAbsenceDaysRequest"})}>
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
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="requestDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                  {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "employee"})}
                  <Input disabled={true}
                         value={this.person ? getFullName(this.person, this.props.rootStore!.userInfo!.locale!) || '' : ''}/>
                </div>

                <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                  {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "vacation"})}
                  <Input disabled={true}
                         value={this.absence
                           ? moment(this.absence!.dateFrom).format('DD.MM.YYYY') + ' - ' + moment(this.absence!.dateTo).format('DD.MM.YYYY')
                           : ""}/>
                </div>

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="scheduleStartDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="scheduleEndDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="purpose"
                  form={this.props.form}
                  optionsContainer={this.dicPurposeAbsence}
                  disabled={isNotDraft}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.purpose']}),
                    }]
                  }}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="newStartDate"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.newStartDate']}),
                    }, {
                      validator: (rule, value, callback) => {
                        const endDate = this.props.form.getFieldValue('newEndDate');
                        const scheduleStartDate = this.props.form.getFieldValue('scheduleStartDate');
                        const scheduleEndDate = this.props.form.getFieldValue('scheduleEndDate');
                        if (value && endDate) {
                          if (endDate.clone().startOf('day') - value.clone().startOf('day') > scheduleEndDate.clone().startOf('day') - scheduleStartDate.clone().startOf('day')) {
                            callback(this.props.intl.formatMessage({id: 'new.annual.days.not.correct'}));
                          }
                        }
                        callback();
                      }
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="newEndDate"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.newEndDate']}),
                    }, {
                      validator: (rule, value, callback) => {
                        const startDate = this.props.form.getFieldValue('newStartDate');
                        const scheduleStartDate = this.props.form.getFieldValue('scheduleStartDate');
                        const scheduleEndDate = this.props.form.getFieldValue('scheduleEndDate');
                        if (value && startDate) {
                          if (value.clone().startOf('day') - startDate.clone().startOf('day') > scheduleEndDate.clone().startOf('day') - scheduleStartDate.clone().startOf('day')) {
                            callback(this.props.intl.formatMessage({id: 'new.annual.days.not.correct'}));
                          }
                        }
                        callback();
                      }
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="periodStartDate"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.periodStartDate']}),
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="periodEndDate"
                  form={this.props.form}
                  disabled={isNotDraft}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.periodEndDate']}),
                    }]
                  }}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="agree"
                  form={this.props.form}
                  disabled={ this.approverHrRoleCode !== 'EMPLOYEE'}
                  getFieldDecoratorOpts={{valuePropName: 'checked'}}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="familiarization"
                  form={this.props.form}
                  disabled={ this.approverHrRoleCode !== 'EMPLOYEE'}
                  getFieldDecoratorOpts={{valuePropName: 'checked'}}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                {/*<ReadonlyField
                  entityName={'tsadv_AbsenceForRecall'}
                  propertyName="file"
                  form={this.props.form}
                  disabled={false}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.filesDc}/>*/}

                {this.takCard()}

              </Form>
            </Card>

          </div>
        </Section>
      </Page>
    );
  }

  loadData = () => {
    if (this.props.entityId !== "new") {
      this.dataInstance.load(this.props.entityId);
    } else {
      restServices.portalHelperService.newEntity({entityName: this.dataInstance.entityName}).then((response: ChangeAbsenceDaysRequest) => {
        this.initItem(response);
      });

      this.loadVacation(this.props.absenceId!)
        .then(absence => this.absence = absence)
        .then(absence => {
          this.props.form.setFieldsValue({
            scheduleStartDate: moment(absence.dateFrom),
            scheduleEndDate: moment(absence.dateTo)
          });
          this.loadPerson(absence.personGroup!.id!).then(value => this.person = value);
          this.setEmployee(absence.personGroup!.id!);
        });
    }
  }

  setReactionDisposer = () => {
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {

        this.loadVacation(item!.vacation!.id)
          .then(absence => this.absence = absence)
          .then(absence => {
            this.props.form.setFieldsValue({
              scheduleStartDate: moment(absence.dateFrom),
              scheduleEndDate: moment(absence.dateTo)
            });
            this.loadPerson(absence.personGroup!.id!).then(value => this.person = value);
            this.setEmployee(absence.personGroup!.id!);
          });

        const obj = {
          ...this.dataInstance.getFieldValues(this.fields)
        };
        if (this.isCalledProcessInstanceData && !this.processInstanceData) {
          const now = moment();
          now.locale(this.props.rootStore!.userInfo.locale!);
          obj["requestDate"] = now;
        }
        this.props.form.setFieldsValue(obj);
      }
    );
  };

  loadVacation = (absenceId: string): Promise<Absence> => {
    return getCubaREST()!.loadEntity<Absence>(Absence.NAME, absenceId, {view: 'absence-for-my-team'});
  }

  loadPerson = (personGroupId: string): Promise<PersonExt> => {
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
      view: '_local'
    }).then(value => value[0] as PersonExt);
  }
}

const onValuesChange = (props: any, changedValues: any) => {
  // Reset server-side errors when field is edited
  Object.keys(changedValues).forEach((fieldName: string) => {
    props.form.setFields({
      [fieldName]: {
        value: changedValues[fieldName]
      }
    });

    if (fieldName === 'newStartDate') props.form.validateFields(['newEndDate'], {force: true});
    if (fieldName === 'newEndDate') props.form.validateFields(['newStartDate'], {force: true});
  });
};

const component = injectIntl(withLocalizedForm<EditorProps & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>>(
  {onValuesChange})(ChangeAbsenceDaysRequestEdit));
export default withRouter(component);
