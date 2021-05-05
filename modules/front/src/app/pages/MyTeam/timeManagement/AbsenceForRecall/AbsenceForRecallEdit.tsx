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
import {FileDescriptor} from "../../../../../cuba/entities/base/sys$FileDescriptor";
import {restServices} from "../../../../../cuba/services";
import {AbsenceForRecall} from "../../../../../cuba/entities/base/tsadv_AbsenceForRecall";
import TextArea from "antd/es/input/TextArea";
import Notification from "../../../../util/Notification/Notification";
import AbstractAgreedBprocEdit from "../../../Bproc/abstract/AbstractAgreedBprocEdit";

type EditorProps = {
  entityId: string;
  absenceId?: string;
};

@inject("rootStore")
@injectMainStore
@observer
class AbsenceForRecallEdit extends AbstractAgreedBprocEdit<AbsenceForRecall, EditorProps> {

  processDefinitionKey = "absenceForRecallRequest";

  dataInstance = instance<AbsenceForRecall>(AbsenceForRecall.NAME, {
    view: "absenceForRecall.edit",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  filesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  fields = [
    "requestNumber",

    "requestDate",

    "status",

    "recallDateFrom",

    "recallDateTo",

    "leaveOtherTime",

    "compensationPayment",

    "dateFrom",

    "dateTo",

    "purposeText",

    "isAgree",

    "isFamiliarization",

    "file"
  ];

  @observable
  person: PersonExt;

  @observable
  absence: Absence;

  @observable
  isDatesDisabled: boolean = false;

  getUpdateEntityData = (): any => {
    const json = {
      ...this.props.form.getFieldsValue(this.fields)
    };

    if (this.isNotDraft())
      return json

    json['employee'] = this.absence!.personGroup!.id;
    json['vacation'] = this.absence;
    json['absenceType'] = this.absence!.type;
    json['employee'] = this.absence!.personGroup!.id;
    return json;
  };

  render() {

    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const messages = this.mainStore.messages!;
    const isNotDraft = this.isNotDraft();

    return (
      <Page pageName={this.props.intl.formatMessage({id: "absenceForRecall"})}>
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
                  propertyName="recallDateFrom"
                  form={this.props.form}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      validator: (rule, value, callback) => {
                        if (!value) {
                          return callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.recallDateFrom']}));
                        } else {
                          const startOf = value.clone().startOf('day');
                          console.log(moment(this.absence.dateFrom));
                          console.log(startOf);
                          console.log(moment(this.absence.dateFrom) <= startOf);
                          if (moment(this.absence.dateFrom) <= startOf && startOf <= moment(this.absence.dateTo)) {
                            return callback();
                          } else return callback(this.props.intl.formatMessage({id: "absenceForRecall.recallDateNotCorrect"}));
                        }
                      }
                    }]
                  }}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="recallDateTo"
                  form={this.props.form}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      validator: (rule, value, callback) => {
                        if (!value) {
                          callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.recallDateTo']}));
                        } else {
                          const startOf = value.clone().startOf('day');
                          if (moment(this.absence.dateFrom) <= startOf && startOf <= moment(this.absence.dateTo)) {
                            callback();
                          } else callback(this.props.intl.formatMessage({id: "absenceForRecall.recallDateNotCorrect"}));
                        }
                      }
                    }
                    ]
                  }}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="leaveOtherTime"
                  form={this.props.form}
                  disabled={isNotDraft}
                  getFieldDecoratorOpts={{
                    valuePropName: 'checked',
                    getValueFromEvent: args => {
                      const leaveOtherTime = args.target.checked === true;
                      const compensationPayment = this.props.form.getFieldValue('compensationPayment') === true;
                      if (compensationPayment === leaveOtherTime) {
                        this.props.form.setFieldsValue({compensationPayment: !leaveOtherTime});
                      }

                      this.isDatesDisabled = !leaveOtherTime;
                      if (this.isDatesDisabled) {
                        this.props.form.setFieldsValue({dateFrom: null, dateTo: null});
                      }
                      this.props.form.validateFields(['dateFrom', 'dateTo'], {force: true});

                      return leaveOtherTime;
                    }
                  }}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="compensationPayment"
                  form={this.props.form}
                  disabled={isNotDraft}
                  getFieldDecoratorOpts={{
                    valuePropName: 'checked',
                    getValueFromEvent: args => {
                      const compensationPayment = args.target.checked === true;
                      const leaveOtherTime = this.props.form.getFieldValue('leaveOtherTime') === true;
                      if (compensationPayment === leaveOtherTime) {
                        this.props.form.setFieldsValue({leaveOtherTime: !leaveOtherTime});
                      }

                      this.isDatesDisabled = compensationPayment;
                      if (this.isDatesDisabled) {
                        this.props.form.setFieldsValue({dateFrom: null, dateTo: null});
                      }
                      this.props.form.validateFields(['dateFrom', 'dateTo'], {force: true});

                      return compensationPayment;
                    }
                  }}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="dateFrom"
                  form={this.props.form}
                  disabled={isNotDraft || this.isDatesDisabled}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      validator: (rule, value, callback) => {
                        if (!value && !(isNotDraft || this.isDatesDisabled))
                          return callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.dateFrom']}));
                        const dateTo = this.props.form.getFieldValue('dateTo');
                        const recallDateFrom = this.props.form.getFieldValue('recallDateFrom');
                        const recallDateTo = this.props.form.getFieldValue('recallDateTo');
                        if (value && dateTo && recallDateFrom && recallDateTo && dateTo.clone().startOf('day') - value.clone().startOf('day') > recallDateTo.clone().startOf('day') - recallDateFrom.clone().startOf('day')) {
                          callback(this.props.intl.formatMessage({id: 'absenceForRecall.daysNotCorrect'}));
                        } else callback();
                      }
                    }
                    ]
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="dateTo"
                  form={this.props.form}
                  disabled={isNotDraft || this.isDatesDisabled}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      validator: (rule, value, callback) => {
                        if (!value && !(isNotDraft || this.isDatesDisabled))
                          return callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.dateFrom']}));
                        const dateFrom = this.props.form.getFieldValue('dateFrom');
                        const recallDateFrom = this.props.form.getFieldValue('recallDateFrom');
                        const recallDateTo = this.props.form.getFieldValue('recallDateTo');
                        if (value && dateFrom && recallDateFrom && recallDateTo && value.clone().startOf('day') - dateFrom.clone().startOf('day') > recallDateTo.clone().startOf('day') - recallDateFrom.clone().startOf('day')) {
                          callback(this.props.intl.formatMessage({id: 'absenceForRecall.daysNotCorrect'}));
                        } else callback();
                      }
                    }]
                  }}
                />

                <Form.Item style={{marginBottom: "12px"}}>
                  {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "purposeText"})}
                  {this.props.form.getFieldDecorator("purposeText")(
                    <TextArea
                      disabled={isNotDraft}
                      rows={4}/>
                  )}
                </Form.Item>

                {this.agreedFields()}

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
    )
      ;
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

        // this.isDatesDisabled = item!.compensationPayment === true;

        if (item!.vacation)
          this.loadVacation(item!.vacation!.id)
            .then(absence => this.absence = absence)
            .then(absence => {
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

    if (fieldName === 'recallDateFrom' || fieldName === 'recallDateTo') props.form.validateFields(['dateFrom', 'dateTo'], {force: true});
    if (fieldName === 'dateFrom') props.form.validateFields(['dateTo'], {force: true});
    if (fieldName === 'dateTo') props.form.validateFields(['dateFrom'], {force: true});

  });
};

const component = injectIntl(withLocalizedForm<EditorProps & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>>(
  {onValuesChange})(AbsenceForRecallEdit));
export default withRouter(component);
