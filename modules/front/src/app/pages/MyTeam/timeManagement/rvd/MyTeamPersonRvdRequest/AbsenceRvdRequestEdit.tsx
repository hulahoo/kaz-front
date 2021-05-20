import * as React from "react";
import {createElement} from "react";
import {Card, Form, Input, TimePicker} from "antd";
import {inject, observer} from "mobx-react";
import {AbsenceRvdRequestManagement} from "./AbsenceRvdRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Redirect} from "react-router-dom";
import {observable, reaction} from "mobx";
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

import "../../../../../App.css";

import {AbsenceRvdRequest} from "../../../../../../cuba/entities/base/tsadv_AbsenceRvdRequest";
import Page from "../../../../../hoc/PageContentHoc";
import Section from "../../../../../hoc/Section";
import {DicRequestStatus} from "../../../../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicAbsenceType} from "../../../../../../cuba/entities/base/tsadv$DicAbsenceType";
import AbstractBprocEdit from "../../../../Bproc/abstract/AbstractBprocEdit";
import {ReadonlyField} from "../../../../../components/ReadonlyField";
import {rootStore} from "../../../../../store";
import {restServices} from "../../../../../../cuba/services";
import {DicPurposeAbsence} from "../../../../../../cuba/entities/base/tsadv_DicPurposeAbsence";
import Button, {ButtonType} from "../../../../../components/Button/Button";
import {withRouter} from "react-router";
import {JSON_DATE_TIME_FORMAT} from "../../../../../util/Date/Date";
import {AbsPurposeSetting} from "../../../../../../cuba/entities/base/tsadv_AbsPurposeSetting";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import moment from "moment/moment";
import {dictionaryCollection} from "../../../../../util/DictionaryDataCollectionStore";
import {SerializedEntity} from "@cuba-platform/rest";
import {PersonExt} from "../../../../../../cuba/entities/base/base$PersonExt";
import DefaultDatePicker from "../../../../../components/Datepicker";
import Notification from "../../../../../util/Notification/Notification";
import {
  parseToFieldValueFromDataInstanceValue,
  parseToJsonFromFieldValue
} from "../../../../../components/MultiFileUpload";


type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string | undefined;
  personGroupId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class AbsenceRvdRequestEditComponent extends AbstractBprocEdit<AbsenceRvdRequest, EditorProps & Props & WrappedComponentProps & MainStoreInjected> {
  dataInstance = instance<AbsenceRvdRequest>(AbsenceRvdRequest.NAME, {
    view: "absenceRvdRequest.edit"
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  purposeDc = collection<AbsPurposeSetting>(AbsPurposeSetting.NAME, {
    view: "_base"
  });

  @observable
  updated = false;

  @observable
  approverHrRoleCode: string;

  fields = [
    "requestNumber",

    "requestDate",

    "status",

    "type",

    "purpose",

    "timeOfStarting",

    "timeOfFinishing",

    "totalHours",

    "compensation",

    "vacationDay",

    "acquainted",

    "agree",

    "files",
  ];

  @observable
  workOnWeekend = true;

  @observable
  temporaryTransfer = true;

  @observable
  overtimeWork = true;

  timeStarting?: moment.Moment; //only time
  timeFinishing?: moment.Moment; //only time

  purposeTempDc = collection<DicPurposeAbsence>(DicPurposeAbsence.NAME, {
    filter: {
      conditions: [{
        property: 'id',
        operator: '=',
        value: null
      }]
    }
  });

  @observable
  isPurposeText = false;

  personGroupId: string;

  @observable
  typesAbsenceDC: DataCollectionStore<DicAbsenceType>;

  processDefinitionKey = "absenceRvdRequest";

  isUpdateBeforeOutcome = true;

  @observable
  person: PersonExt;

  initVariablesByBproc = () => {
    if (this.activeTask && this.activeTask.hrRole && this.activeTask.hrRole.code) {
      this.approverHrRoleCode = this.activeTask.hrRole.code;
    }
  }

  initCollections = () => {
    getCubaREST()!.loadEntities<AbsPurposeSetting>(AbsPurposeSetting.NAME, {
      view: '_minimal'
    }).then(value => {
      const absenceTypes = value.map(purposeSetting => purposeSetting.absenceType)
        .filter(absenceType => !!absenceType)
        .map(absenceTypes => absenceTypes!.id!);

      this.typesAbsenceDC = dictionaryCollection<DicAbsenceType>(DicAbsenceType.NAME, this.personGroupId, {
        view: '_local',
        filter: {
          conditions: [{
            property: 'id',
            operator: 'in',
            value: absenceTypes,
          }]
        }
      });
    })
  }

  setReactionDisposer = () => {
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {

        this.personGroupId = (item && item.personGroup ? (item.personGroup.id || this.props.personGroupId) : this.props.personGroupId) as string;

        if (item && item.type) this.initPurposeTempDcItems(item.type.id!);

        this.loadPerson(this.personGroupId)
          .then(value => this.person = value);
        this.setEmployee(this.personGroupId);

        this.initCollections();

        this.onReactionDisposerEffect(item);
        const obj = {
          ...this.dataInstance.getFieldValues(this.fields),
          files:this.dataInstance.item ? parseToFieldValueFromDataInstanceValue(this.dataInstance.item.files) : undefined,
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

  initPurposeTempDcItems = (typeId?: string) => {
    if (typeId)
      getCubaREST()!.searchEntities<AbsPurposeSetting>(AbsPurposeSetting.NAME, {
        conditions: [{
          property: 'absenceType.id',
          operator: '=',
          value: typeId
        }]
      }, {
        view: 'absPurposeSetting-absence'
      })
        .then(items => this.purposeTempDc.items = items.map(item => item.absencePurpose) as Array<SerializedEntity<DicPurposeAbsence>>);
  }

  getUpdateEntityData = (): any => {
    if (this.isNotDraft()) return {
      ...this.props.form.getFieldsValue(this.fields),
      timeOfStarting: (this.props.form.getFieldValue('timeOfStarting') as moment.Moment).format(JSON_DATE_TIME_FORMAT),
      timeOfFinishing: (this.props.form.getFieldValue('timeOfFinishing') as moment.Moment).format(JSON_DATE_TIME_FORMAT),
      files: parseToJsonFromFieldValue(this.props.form.getFieldValue('files')),
    };
    return {
      personGroup: {
        id: this.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields),
      timeOfStarting: (this.props.form.getFieldValue('timeOfStarting') as moment.Moment).format(JSON_DATE_TIME_FORMAT),
      timeOfFinishing: (this.props.form.getFieldValue('timeOfFinishing') as moment.Moment).format(JSON_DATE_TIME_FORMAT),
      files: parseToJsonFromFieldValue(this.props.form.getFieldValue('files')),
    }
  };

  beforeCompletePredicate = (outcome: string): Promise<boolean> => {
    if (outcome == 'APPROVE' && this.approverHrRoleCode === 'EMPLOYEE') {
      const agree = this.props.form.getFieldValue('agree');
      const acquainted = this.props.form.getFieldValue('acquainted');

      if (!agree) {
        Notification.info({
            message: this.props.intl.formatMessage({id: "for.approving.must.to.check.field"},
              {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.agree']})
          }
        )
      }

      if (!acquainted) {
        Notification.info({
            message: this.props.intl.formatMessage({id: "for.approving.must.to.check.field"},
              {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.acquainted']})
          }
        )
      }

      if (!agree || !acquainted)
        return new Promise(resolve => resolve(false));
    }
    return new Promise(resolve => resolve(true));
  };

  setTime = (time?: moment.Moment, dateTime?: moment.Moment) => {
    if (time && dateTime)
      dateTime.set({
        hour: time.get("hour"),
        minute: time.get("minute"),
        second: time.get("second"),
        millisecond: 0
      });
  }

  render() {
    if (this.updated) {
      return <Redirect to={AbsenceRvdRequestManagement.PATH}/>;
    }
    const {getFieldDecorator} = this.props.form;
    const messages = this.mainStore.messages!;

    const isNotDraft = this.isNotDraft();

    return (
      <Page pageName={this.props.intl.formatMessage({id: "workOnWeekendRequest"})}>
        <Section size="large">
          <Card className="narrow-layout card-actions-container"
                actions={[
                  <Button buttonType={ButtonType.FOLLOW}
                          onClick={this.props.history!.goBack}
                  >{this.props.intl.formatMessage({id: "close"})}</Button>,
                  this.getOutcomeBtns()]}
                bordered={false}>

            <Form layout="vertical">

              <ReadonlyField
                entityName={this.dataInstance.entityName}
                propertyName="requestNumber"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                disabled={true}
              />

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="requestDate"
                form={this.props.form}
                disabled={true}
                formItemOpts={{style: {marginBottom: "12px"}}}
              />

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="status"
                optionsContainer={this.statusesDc}
                form={this.props.form}
                disabled={true}
                formItemOpts={{style: {marginBottom: "12px"}}}
              />

              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "personGroup"})}
                <Input disabled={true}
                       value={this.person
                         ? (this.person as SerializedEntity<PersonExt>)._instanceName
                         : ""}/>
              </div>

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="type"
                form={this.props.form}
                optionsContainer={this.typesAbsenceDC}
                formItemOpts={{style: {marginBottom: "12px"}}}
                disabled={isNotDraft}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.type']}),
                  }],
                  getValueFromEvent: args => {
                    this.initPurposeTempDcItems(args);

                    this.props.form.setFieldsValue({purpose: null});

                    this.calcHours(args, null, null);
                    return args;
                  }
                }}
              />

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="purpose"
                form={this.props.form}
                optionsContainer={this.purposeTempDc}
                formItemOpts={{style: {marginBottom: "12px"}}}
                disabled={isNotDraft}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.purpose']}),
                  }],
                  getValueFromEvent: args => {
                    if (!args) return args;
                    const find = this.purposeTempDc.items.find(value => value.id === args);
                    this.isPurposeText = !!(find && find.code === 'OTHER');
                    return args;
                  }
                }}
              />

              {this.purposeText(this.isPurposeText)}

              <div>
                <div style={{display: 'flex'}}>
                  <Form.Item label={createElement(Msg, {
                    entityName: this.dataInstance.entityName,
                    propertyName: "timeOfStarting"
                  })}>
                    {getFieldDecorator("timeOfStarting", {
                      rules: [{
                        required: true,
                        validator: (rule, value, callback) => {
                          if (!value) return callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.timeOfStarting']}));
                          this.props.form.validateFields(['timeOfFinishing', 'timeStarting'], {force: true});
                          return callback();
                        }
                      }],
                      getValueFromEvent: args => {
                        this.setTime(this.timeStarting, args);
                        this.calcHours(null, args, null);
                        return args
                      }
                    })(
                      <DefaultDatePicker
                        disabled={isNotDraft}/>
                    )}
                  </Form.Item>

                  <div style={{position: 'absolute', paddingLeft: 170}}>
                    <Form.Item label={''} style={{paddingTop: 17}}>
                      {getFieldDecorator("timeStarting", {
                        rules: [{
                          required: true,
                          message: <div
                            style={{marginLeft: -170}}>{this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.timeOfStarting']})}</div>
                        }],
                        initialValue: this.dataInstance.item && this.dataInstance.item.timeOfStarting ? moment(this.dataInstance.item.timeOfStarting) : undefined,
                        getValueFromEvent: time => {
                          if (time) {
                            const timeOfStarting = this.props.form.getFieldValue('timeOfStarting') as moment.Moment;
                            this.timeStarting = time;

                            this.setTime(time, timeOfStarting);

                            this.calcHours(null, null, null);

                            this.props.form.validateFields(['timeOfStarting'], {force: true});
                          }
                          return time;
                        }
                      })(
                        <TimePicker
                          disabled={isNotDraft}/>
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div>
                <div style={{display: 'flex'}}>
                  <Form.Item label={createElement(Msg, {
                    entityName: this.dataInstance.entityName,
                    propertyName: "timeOfFinishing"
                  })}>
                    {getFieldDecorator("timeOfFinishing", {
                      rules: [{
                        required: true,
                        validator: (rule, value, callback) => {
                          if (!value) return callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.timeOfFinishing']}));

                          this.props.form.validateFields(['timeFinishing'], {force: true});
                          const timeFinishing = this.props.form.getFieldValue('timeFinishing');
                          const timeOfStarting = this.props.form.getFieldValue('timeOfStarting');

                          if (!timeOfStarting || !timeFinishing) return callback();
                          if (timeOfStarting > value)
                            return callback(this.props.intl.formatMessage({id: 'validation.compare.date'},
                              {
                                startDate: messages[this.dataInstance.entityName + '.timeOfStarting'],
                                endDate: messages[this.dataInstance.entityName + '.timeOfFinishing']
                              }));
                          return callback();
                        }
                      }],
                      getValueFromEvent: args => {
                        this.setTime(this.timeFinishing, args);
                        this.calcHours(null, null, args);
                        return args
                      }
                    })(
                      <DefaultDatePicker
                        disabled={isNotDraft}/>
                    )}
                  </Form.Item>

                  <div style={{position: 'absolute', paddingLeft: 170}}>
                    <Form.Item label={''} style={{paddingTop: 17}}>
                      {getFieldDecorator("timeFinishing", {
                        rules: [{
                          required: true,
                          message: <div
                            style={{marginLeft: -170}}>{this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.timeOfFinishing']})}</div>
                        }],
                        initialValue: this.dataInstance.item && this.dataInstance.item.timeOfFinishing ? moment(this.dataInstance.item.timeOfFinishing) : undefined,
                        getValueFromEvent: time => {
                          if (time) {
                            const timeOfStarting = this.props.form.getFieldValue('timeOfFinishing') as moment.Moment;
                            this.timeFinishing = time;

                            this.setTime(time, timeOfStarting);

                            this.calcHours(null, null, null);

                            this.props.form.validateFields(['timeOfFinishing'], {force: true});
                          }
                          return time;
                        }
                      })(
                        <TimePicker
                          disabled={isNotDraft}/>
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="totalHours"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                disabled={true}
              />

              <ReadonlyField
                disabled={this.approverHrRoleCode !== 'EMPLOYEE'}
                entityName={AbsenceRvdRequest.NAME}
                propertyName="compensation"
                form={this.props.form}
                formItemOpts={{style: isNotDraft ? {marginBottom: "12px"} : {display: 'none'}}}
                getFieldDecoratorOpts={{
                  valuePropName: "checked",
                  getValueFromEvent: args => {
                    const compensation = args.target.checked === true;
                    const vacationDay = this.props.form.getFieldValue('vacationDay') === true;
                    if (vacationDay === compensation) {
                      this.props.form.setFieldsValue({vacationDay: !vacationDay})
                    }
                    return compensation;
                  }
                }}
              />

              <ReadonlyField
                disabled={this.approverHrRoleCode !== 'EMPLOYEE'}
                entityName={AbsenceRvdRequest.NAME}
                propertyName="vacationDay"
                form={this.props.form}
                formItemOpts={{style: isNotDraft ? {marginBottom: "12px"} : {display: 'none'}}}
                getFieldDecoratorOpts={{
                  valuePropName: "checked",
                  getValueFromEvent: args => {
                    const vacationDay = args.target.checked === true;
                    const compensation = this.props.form.getFieldValue('compensation') === true;
                    if (vacationDay === compensation) {
                      this.props.form.setFieldsValue({compensation: !compensation})
                    }
                    return vacationDay;
                  }
                }}
              />

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="acquainted"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                disabled={this.approverHrRoleCode !== 'EMPLOYEE'}
                getFieldDecoratorOpts={{
                  valuePropName: "checked"
                }}
              />

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="agree"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                disabled={this.approverHrRoleCode !== 'EMPLOYEE'}
                getFieldDecoratorOpts={{
                  valuePropName: "checked"
                }}
              />

              <ReadonlyField
                entityName={this.dataInstance.entityName}
                propertyName="files"
                form={this.props.form}
                disabled={isNotDraft}
                formItemOpts={{style: {marginBottom: "12px"}}}/>

              {this.takCard()}

            </Form>
          </Card>
        </Section>
      </Page>
    );
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
      view: '_minimal'
    }).then(value => value[0] as PersonExt);
  }

  purposeText = (isPurposeText: boolean) => {
    return <div style={isPurposeText ? {} : {display: 'none'}}>
      <ReadonlyField
        entityName={AbsenceRvdRequest.NAME}
        propertyName="purposeText"
        form={this.props.form}
        getFieldDecoratorOpts={{}}
        formItemOpts={{style: {marginBottom: "12px"}}}
      />
    </div>
  }

  calcHours = (type?: string | null, dateFrom?: any, dateTo?: any) => {
    type = type || this.props.form.getFieldValue(`type`);
    dateFrom = dateFrom || this.props.form.getFieldValue(`timeOfStarting`);
    dateTo = dateTo || this.props.form.getFieldValue(`timeOfFinishing`);
    const personGroupId = this.personGroupId;
    console.log(type, dateTo, dateFrom, personGroupId);

    if (type && dateTo && dateFrom && personGroupId) {
      restServices.absenceRvdService.countTotalHours({
        dateFrom: dateFrom.format(JSON_DATE_TIME_FORMAT),
        dateTo: dateTo.format(JSON_DATE_TIME_FORMAT),
        absenceTypeId: type,
        personGroupId: personGroupId
      }).then(value => {
        this.props.form.setFields({"totalHours": {value: value}});
      })
    }
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
  })(withRouter(AbsenceRvdRequestEditComponent))
);

export default (component);




