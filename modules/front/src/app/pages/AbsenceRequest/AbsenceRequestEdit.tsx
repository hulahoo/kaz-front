import * as React from "react";
import {createElement} from "react";
import {Card, Form} from "antd";
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
import TextArea from "antd/es/input/TextArea";
import {observable, reaction} from "mobx";
import moment from "moment/moment";
import {Absence} from "../../../cuba/entities/base/tsadv$Absence";
import {dictionaryCollection, DictionaryDataCollectionStore} from "../../util/DictionaryDataCollectionStore";
import {EntitiesWithCount} from "@cuba-platform/rest";
import DefaultDatePicker from "../../components/Datepicker";
import {goBackOrHomePage, isNumber} from "../../util/util";
import {VacationScheduleRequest} from "../../../cuba/entities/base/tsadv_VacationScheduleRequest";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import TimePicker from "../../components/TimePicker/TimePicker";

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

  @observable
  absenceTypesDc: DictionaryDataCollectionStore<DicRequestStatus>;

  @observable
  vacationScheduleCollection: DataCollectionStore<VacationScheduleRequest>;

  personGroupId: string;

  @observable
  isJustRequired = false;

  @observable
  isOriginalSheet = false;

  @observable
  isVacationDate = false;

  isLaborLeave = false;

  hasMinDayAbsence = false;

  numDaysCalendarYear: number = 0;

  remainingDaysWeekendWork: number = 0;

  absenceBalance: number = 0;

  isCheckWork = false;

  @observable
  isAbsenceIntersected = false;

  @observable
  approverHrRoleCode: string;

  @observable
  daysBeforeAbsenceWaring?: string;

  fields = [
    "dateFrom",

    "type",

    "dateTo",

    "startTime",

    "endTime",

    "requestNumber",

    "requestDate",

    "status",

    "absenceDays",

    "comment",

    "originalSheet",

    "reason",

    "addNextYear",

    "newStartDate",

    "newEndDate",

    "periodDateFrom",

    "periodDateTo",

    "files"
  ];

  assignmentGroupId: string;

  update = () => {
    if (this.isNotDraft())
      return this.dataInstance.update(this.getUpdateEntityData());
    return this.dataInstance.update({
      personGroup: {
        id: this.personGroupId
      },
      ...this.getUpdateEntityData()
    });
  };

  processDefinitionKey = "absenceRequest";

  isUpdateBeforeOutcome = true;

  afterSendOnApprove = () => {
    this.props.history!.push("/absence/3");
  };

  dateValidator = (fieldName: string) => {
    const dateFrom = this.props.form.getFieldValue("dateFrom");
    const dateTo = this.props.form.getFieldValue("dateTo");

    this.setIsAbsenceIntersected();

    return (dateFrom && dateTo && (dateFrom <= dateTo || dateFrom.clone().startOf('day') <= dateTo.clone().startOf('day'))) === true;
  }

  setIsAbsenceIntersected = () => {
    const dateFrom = this.props.form.getFieldValue('dateFrom');
    const dateTo = this.props.form.getFieldValue('dateTo');

    if (dateFrom && dateTo) {

      getCubaREST()!.searchEntitiesWithCount(Absence.NAME, {
        conditions: [{
          property: 'personGroup.id',
          operator: '=',
          value: this.personGroupId!
        }, {
          property: 'type.availableForRecallAbsence',
          operator: '=',
          value: 'TRUE',
        }, {
          property: 'type.availableForChangeDate',
          operator: '=',
          value: 'TRUE',
        }, {
          property: 'type.useInSelfService',
          operator: '=',
          value: 'TRUE',
        }, {
          property: 'dateTo',
          operator: '>=',
          value: dateFrom,
        }, {
          property: 'dateFrom',
          operator: '<=',
          value: dateTo,
        }
        ]
      }).then(value => this.isAbsenceIntersected = value['count'] > 0);

    } else {
      this.isAbsenceIntersected = false;
    }

  }

  setDaysBeforeAbsenceWaring = (absenceType?: DicAbsenceType | null) => {
    const dateFrom = this.props.form.getFieldValue('dateFrom');
    if (absenceType && absenceType.daysBeforeAbsence
      && dateFrom && dateFrom < this.props.form.getFieldValue('requestDate').clone().add(absenceType.daysBeforeAbsence, 'day')) {
      this.daysBeforeAbsenceWaring = this.props.intl.formatMessage(
        {id: "warning.absenceRequest.daysBeforeAbsence." + (this.isNotDraft ? 'draft' : 'onApproval')}, {
          daysBeforeAbsence: absenceType.daysBeforeAbsence
        });
    } else this.daysBeforeAbsenceWaring = undefined;
  }

  dateFromValidator = (rule: any, value: any, callback: any) => {
    this.setDaysBeforeAbsenceWaring(this.getSelectedAbsenceType());
    const requestDate = this.props.form.getFieldValue('requestDate');
    if (requestDate && requestDate > value) {
      callback(this.props.intl.formatMessage({id: 'validation.absenceRequest.dateFrom.start'}));
    } else if (!this.dateValidator('dateFrom') || !value) {
      callback(this.props.intl.formatMessage({id: "validation.absenceRequest.dateFrom"}));
    } else callback();
  }

  getSelectedAbsenceType = (): DicAbsenceType => {
    const selectedTypeId = this.props.form.getFieldValue('type');
    return this.absenceTypesDc.items.find(type => type.id === selectedTypeId) as DicAbsenceType;
  }

  render() {

    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const {getFieldDecorator} = this.props.form;
    const messages = this.mainStore.messages!;

    const isNotDraft = this.isNotDraft();

    const warningMessage = this.daysBeforeAbsenceWaring !== undefined ?
      <div style={{color: "#ffce00", marginBottom: "15px"}}>
        <label>{this.daysBeforeAbsenceWaring}</label>
      </div>
      : null;

    return (
      <Page pageName={this.props.intl.formatMessage({id: "absenceRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout card-actions-container" actions={[
              <Button buttonType={ButtonType.FOLLOW}
                      onClick={event => goBackOrHomePage(this.props.history!)}>{this.props.intl.formatMessage({id: "close"})}</Button>,
              this.getOutcomeBtns()]}
                  bordered={false}>
              <Form onSubmit={this.validate} layout="vertical">

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="requestDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

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
                  disabled={true}
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.statusesDc}
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
                      if (!absenceType) return typeId;
                      this.isJustRequired = !!absenceType.isJustRequired;
                      this.isOriginalSheet = !!absenceType.isOriginalSheet;
                      this.isVacationDate = !!absenceType.isVacationDate;
                      this.isLaborLeave = !!(absenceType
                        && absenceType.isVacationDate
                        && absenceType.availableForChangeDate
                        && absenceType.availableForRecallAbsence
                        && absenceType.useInSelfService);

                      this.isCheckWork = !!absenceType.isCheckWork;

                      this.checkMinDayAbsence(absenceType);

                      this.checkDaysCalendarYear(absenceType);

                      this.getAbsenceBalance(absenceType);

                      this.getRemainingDaysWeekendWork();

                      this.calcAbsenceDays(typeId, null, null);

                      this.setDaysBeforeAbsenceWaring(absenceType);

                      return typeId;
                    },
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="vacationScheduleRequest"
                  disabled={isNotDraft}
                  form={this.props.form}
                  formItemOpts={{style: this.isLaborLeave ? {marginBottom: "12px"} : {display: 'none'}}}
                  optionsContainer={this.vacationScheduleCollection}
                  getFieldDecoratorOpts={{
                    getValueFromEvent: args => {
                      const vacationSchedule = this.vacationScheduleCollection.items.find(value => value.id === args);
                      if (vacationSchedule) {
                        const dateFrom = moment(vacationSchedule.startDate);
                        const dateTo = moment(vacationSchedule.endDate);
                        this.props.form.setFieldsValue({
                          dateFrom: dateFrom,
                          dateTo: dateTo
                        });

                        this.calcAbsenceDays(null, dateFrom, dateTo);
                        this.checkMinDayAbsence(null, dateFrom);
                        this.checkDaysCalendarYear(null, dateFrom);
                        this.getAbsenceBalance(null, dateFrom);

                      }
                      return args;
                    }
                  }}
                />

                <div style={{display: 'flex'}}>
                  <Form.Item
                    label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "dateFrom"})}>
                    {getFieldDecorator("dateFrom", {
                      rules: [{
                        required: true,
                        validator: this.dateFromValidator
                      }],
                      getValueFromEvent: args => {
                        this.calcAbsenceDays(null, args, null);
                        this.checkMinDayAbsence(null, args);
                        this.checkDaysCalendarYear(null, args);
                        this.getAbsenceBalance(null, args);
                        return args
                      }
                    })(
                      <DefaultDatePicker
                        disabled={isNotDraft}/>
                    )}
                  </Form.Item>

                  <Form.Item
                    style={{position: 'absolute', paddingLeft: 170,paddingTop: 17}}>
                      {getFieldDecorator("startTime")(
                        <TimePicker
                          format={'HH'}
                          disabled={isNotDraft}/>
                      )}
                    </Form.Item>
                </div>

                {warningMessage}

                  <div style={{display: 'flex'}}>
                    <Form.Item
                      label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "dateTo"})}>
                      {getFieldDecorator("dateTo", {
                        rules: [{
                          required: true,
                          message: this.props.intl.formatMessage({id: "validation.absenceRequest.dateTo"}),
                          validator: this.dateValidator
                        }],
                        getValueFromEvent: args => {
                          this.calcAbsenceDays(null, null, args);
                          return args
                        }
                      })(
                        <DefaultDatePicker
                          disabled={isNotDraft}/>
                      )}
                    </Form.Item>

                    <Form.Item style={{position: 'absolute', paddingLeft: 170, paddingTop: 17}}>
                      {getFieldDecorator("endTime")(
                        <TimePicker
                          format={'HH'}
                          disabled={isNotDraft}/>
                      )}
                    </Form.Item>
                </div>

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="absenceDays"
                  form={this.props.form}
                  getFieldDecoratorOpts={{
                    rules: [
                      {
                        validator: (rule, value, callback) => {
                          const type = this.getSelectedAbsenceType();
                          if (!type || !isNumber(value)) return callback();
                          if (type.isEcologicalAbsence && (this.absenceBalance + (type.daysAdvance || 0) < parseInt(value))) {
                            callback(this.props.intl.formatMessage({id: 'validation.balance'}));
                          }
                          if (this.isLaborLeave && (this.absenceBalance + (type.daysAdvance || 0) < parseInt(value))) {
                            callback(this.props.intl.formatMessage({id: 'validation.balance'}));
                          } else if (this.isCheckWork && this.remainingDaysWeekendWork <= 0) {
                            callback(this.props.intl.formatMessage({id: 'validation.no.weekendWork'}));
                          } else if (this.isCheckWork && this.remainingDaysWeekendWork < parseInt(value)) {
                            callback(this.props.intl.formatMessage({id: 'validation.weekendWork'}, {
                              weekendWork: this.remainingDaysWeekendWork
                            }));
                          } else if (isNumber(type.numDaysCalendarYear) && (this.numDaysCalendarYear + parseInt(value)) >= type.numDaysCalendarYear!) {
                            callback(this.props.intl.formatMessage({id: 'validation.absenceRequest.absenceDays.numDaysCalendarYear'}));
                          } else if (isNumber(type.maxDay) && type.maxDay! < parseInt(value)) {
                            callback(this.props.intl.formatMessage({id: 'validation.absenceRequest.absenceDays.maxDay'}, {
                              maxDay: type.maxDay
                            }));
                          } else if (isNumber(type.minDay)) {
                            if (type.minDay! > parseInt(value) && !this.hasMinDayAbsence && this.isLaborLeave)
                              callback(this.props.intl.formatMessage({id: 'validation.absenceRequest.absenceDays.minDay'}, {
                                minDay: type.minDay
                              }));
                            else if (type.minDay! < parseInt(value) && (!this.isLaborLeave || this.hasMinDayAbsence))
                              callback(this.props.intl.formatMessage({id: 'validation.absenceRequest.absenceDays.has.minDay'}, {
                                minDay: type.minDay
                              }));
                          } else callback();
                        }
                      }
                    ]
                  }}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                {this.originalSheetField(isNotDraft)}

                {this.reasonField(isNotDraft)}

                {this.rescheduleFields(isNotDraft)}

                <Form.Item
                  label={createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "comment"})}>
                  {getFieldDecorator("comment")(
                    <TextArea
                      disabled={isNotDraft}
                      rows={4}/>
                  )}
                </Form.Item>

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="files"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      validator: (rule, value, callback) => {
                        const absenceType = this.getSelectedAbsenceType();
                        if (!absenceType) return;
                        if (absenceType.isFileRequired && !value) {
                          callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.files']}));
                        } else callback();
                      }
                    }]
                  }}/>

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

  rescheduleFields = (isNotDraft: boolean) => {
    const isVisible = this.isAbsenceIntersected && this.isVacationDate && this.isOriginalSheet;
    return <div style={isVisible ? {} : {display: 'none'}}>
      <ReadonlyField
        entityName={this.dataInstance.entityName}
        propertyName="addNextYear"
        form={this.props.form}
        disabled={isNotDraft}
        getFieldDecoratorOpts={{valuePropName: 'checked'}}
        formItemOpts={{style: {marginBottom: "12px"}}}
      />
      <ReadonlyField
        entityName={this.dataInstance.entityName}
        propertyName="newStartDate"
        form={this.props.form}
        disabled={isNotDraft}
        formItemOpts={{style: {marginBottom: "12px"}}}
      />
      <ReadonlyField
        entityName={this.dataInstance.entityName}
        propertyName="newEndDate"
        form={this.props.form}
        disabled={isNotDraft}
        formItemOpts={{style: {marginBottom: "12px"}}}
      />
      <ReadonlyField
        entityName={this.dataInstance.entityName}
        propertyName="periodDateFrom"
        form={this.props.form}
        disabled={this.approverHrRoleCode !== 'HR'}
        formItemOpts={{style: {marginBottom: "12px"}}}
      />
      <ReadonlyField
        entityName={this.dataInstance.entityName}
        propertyName="periodDateTo"
        form={this.props.form}
        disabled={this.approverHrRoleCode !== 'HR'}
        formItemOpts={{style: {marginBottom: "12px"}}}
      />
    </div>
  }

  getRemainingDaysWeekendWork = () => {
    if (this.isCheckWork) {
      restServices.absenceService
        .getRemainingDaysWeekendWork(this.personGroupId)
        .then(value => {
          this.remainingDaysWeekendWork = value;
          this.callForceAbsenceDayValidator();
        })
    }
  }

  checkDaysCalendarYear = (absenceType?: DicAbsenceType | null, dateFrom?: any) => {
    dateFrom = dateFrom || this.props.form.getFieldValue("dateFrom");
    absenceType = absenceType || this.getSelectedAbsenceType();

    if (absenceType && absenceType.numDaysCalendarYear && dateFrom) {
      restServices.absenceService.getReceivedVacationDaysOfYear({
        date: dateFrom,
        personGroupId: this.personGroupId,
        absenceTypeId: absenceType.id
      }).then(value => {
        this.numDaysCalendarYear = value || 0;

        this.callForceAbsenceDayValidator();
      })
    }
  }

  getAbsenceBalance = (absenceType?: DicAbsenceType | null, dateFrom?: moment.Moment) => {
    dateFrom = dateFrom || this.props.form.getFieldValue("dateFrom");
    absenceType = absenceType || this.getSelectedAbsenceType();

    if (absenceType && dateFrom && (this.isLaborLeave || absenceType.isEcologicalAbsence)) {
      restServices.absenceBalanceService.getAbsenceBalance({
        absenceTypeId: absenceType.id,
        personGroupId: this.personGroupId,
        absenceDate: dateFrom
      })
        .then(value => {
          this.absenceBalance = value;
          this.callForceAbsenceDayValidator();
        })
    }
  }

  checkMinDayAbsence = (absenceType?: DicAbsenceType | null, dateFrom?: moment.Moment) => {
    dateFrom = dateFrom || this.props.form.getFieldValue("dateFrom");
    absenceType = absenceType || this.getSelectedAbsenceType();

    if (absenceType && absenceType.minDay && dateFrom) {

      const changeHasMinDayAbsence = (result: EntitiesWithCount<any>) => {
        this.hasMinDayAbsence = (result.count > 0);
        this.callForceAbsenceDayValidator();
      }

      const year = parseInt(dateFrom.format('YYYY'));
      getCubaREST()!.searchEntitiesWithCount(Absence.NAME, {
        conditions: [{
          property: 'personGroup.id',
          operator: '=',
          value: this.personGroupId!
        }, {
          property: 'type.id',
          operator: '=',
          value: absenceType!.id
        }, {
          property: 'absenceDays',
          operator: '>=',
          value: absenceType.minDay
        }, {
          property: 'dateFrom',
          operator: '>',
          value: (year - 1) + '-12-31'
        }, {
          property: 'dateFrom',
          operator: '<',
          value: (year + 1) + '-01-01'
        }]
      })
        .then(value => {
          changeHasMinDayAbsence(value);
          if (!this.hasMinDayAbsence) {
            getCubaREST()!.searchEntitiesWithCount(AbsenceRequest.NAME, {
              conditions: [{
                property: 'status.code',
                operator: '=',
                value: 'APPROVING'
              }, {
                property: 'personGroup.id',
                operator: '=',
                value: this.personGroupId!
              }, {
                property: 'type.id',
                operator: '=',
                value: absenceType!.id
              }, {
                property: 'dateFrom',
                operator: '>',
                value: (year - 1) + '-12-31'
              }, {
                property: 'dateFrom',
                operator: '<',
                value: (year + 1) + '-01-01'
              }, {
                property: 'absenceDays',
                operator: '>=',
                value: absenceType!.minDay!
              }]
            })
              .then(changeHasMinDayAbsence);
          }
        })
    }
  }

  calcAbsenceDays = (type?: string | null, dateFrom?: any, dateTo?: any) => {
    type = type || this.props.form.getFieldValue(`type`);
    dateFrom = dateFrom || this.props.form.getFieldValue(`dateFrom`);
    dateTo = dateTo || this.props.form.getFieldValue(`dateTo`);

    const personGroupId = rootStore.userInfo.personGroupId;

    if (type && dateTo && dateFrom && personGroupId) {
      restServices.absenceService.countDays({
        dateFrom: dateFrom,
        dateTo: dateTo,
        absenceTypeId: type,
        personGroupId: personGroupId
      }).then(value => {
        this.props.form.setFields({"absenceDays": {value: value}});
        this.callForceAbsenceDayValidator();
      })
    }
  }

  initVariablesByBproc = () => {
    if (this.activeUserTask && this.activeUserTask.hrRole && this.activeUserTask.hrRole.code) {
      this.approverHrRoleCode = this.activeUserTask.hrRole.code;
    }
  }

  setReactionDisposer = () => {
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {

        this.personGroupId = item && item.personGroup ? item.personGroup.id : this.props.rootStore!.userInfo.personGroupId!;

        this.absenceTypesDc = dictionaryCollection<DicRequestStatus>(DicAbsenceType.NAME, this.personGroupId, {
          view: '_local',
          filter: {
            conditions: [{
              property: "useInSelfService",
              operator: '=',
              value: 'TRUE'
            }]
          }
        });

        this.isJustRequired = !!(item && item.type && item.type.isJustRequired);
        this.isOriginalSheet = !!(item && item.type && item.type.isOriginalSheet);
        this.isVacationDate = !!(item && item.type && item.type.isVacationDate);

        const obj = this.onReactionFieldsValue(item);
        if (item && item.startTime) obj['startTime'] = moment(item.dateFrom + " " + item.startTime);
        if (item && item.endTime) obj['endTime'] = moment(item.dateTo + " " + item.endTime);

        this.vacationScheduleCollection = collection<VacationScheduleRequest>(VacationScheduleRequest.NAME, {
          view: "_local",
          sort: "-startDate",
          loadImmediately: true,
          filter: {
            conditions: [{
              property: "personGroup.id",
              operator: "=",
              value: this.personGroupId
              },
                {property: "startDate", operator: ">=", value: obj["requestDate"]},
                {property: "sentToOracle", operator: "=", value: 'SENT_TO_ORACLE'}]
            }
          }
        );

        this.props.form.setFieldsValue(obj);

        this.setDaysBeforeAbsenceWaring(item!.type);
      }
    );
  };

  callForceAbsenceDayValidator = () => this.props.form.validateFields(['absenceDays'], {force: true});
}

const onValuesChange = (props: any, changedValues: any) => {
  // Reset server-side errors when field is edited
  Object.keys(changedValues).forEach((fieldName: string) => {
    props.form.setFields({
      [fieldName]: {
        value: changedValues[fieldName]
      }
    });
  });
  if (changedValues["dateTo"] != null) props.form.validateFields(['dateFrom'], {force: true});
  if (changedValues["dateFrom"] != null) props.form.validateFields(['dateTo'], {force: true});
};
const component = injectIntl(withLocalizedForm<EditorProps & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>>({onValuesChange})(AbsenceRequestEditComponent));
export default withRouter(component);