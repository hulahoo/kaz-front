import * as React from "react";
import {createElement, FormEvent} from "react";
import {Alert, Card, Form, message} from "antd";
import {inject, observer} from "mobx-react";
import {VacationScheduleRequestManagement} from "./VacationScheduleRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Redirect, RouteComponentProps} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  injectMainStore,
  MainStoreInjected,
  Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {VacationScheduleRequest} from "../../../cuba/entities/base/tsadv_VacationScheduleRequest";
import {RootStoreProp} from "../../store";
import {restServices} from "../../../cuba/services";
import {ReadonlyField} from "../../components/ReadonlyField";
import Button, {ButtonType} from "../../components/Button/Button";
import TextArea from "antd/es/input/TextArea";
import {withRouter} from "react-router";
import {DicAbsenceType} from "../../../cuba/entities/base/tsadv$DicAbsenceType";
import Section from "../../hoc/Section";
import Page from "../../hoc/PageContentHoc";
import moment from "moment/moment";
import {isNumber} from "../../util/util";
import {VacationGanttChart} from "../../components/VacationGanttChart";
import {PersonGroup} from "../../../cuba/entities/base/base$PersonGroup";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import {AssignmentSchedule} from "../../../cuba/entities/base/tsadv$AssignmentSchedule";
import {serviceCollection} from "../../util/ServiceDataCollectionStore";
import {JSON_DATE_TIME_FORMAT} from "../../util/Date/Date";
import {instanceStore} from "../../util/InstanceStore";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import {SerializedEntity} from "@cuba-platform/rest";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
  ganttChartVisible?: boolean;
};

@injectMainStore
@inject("rootStore")
@observer
class VacationScheduleRequestEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>> {
  dataInstance = instanceStore<VacationScheduleRequest>(
    VacationScheduleRequest.NAME,
    {view: "vacationScheduleRequest-edit"}
  );

  @observable
  personGroupDc: DataCollectionStore<PersonGroup>;

  @observable
  assignmentSchedule?: SerializedEntity<AssignmentSchedule>;

  @observable
  updated = false;

  @observable
  isNew = true;

  @observable
  isMy = true;

  reactionDisposer: IReactionDisposer;

  fields = [
    "requestNumber",

    "requestDate",

    "personGroup",

    "startDate",

    "endDate",

    "absenceDays",

    "balance",

    "comment",

    "approved",

    "sentToOracle",

    "attachment"
  ];

  @observable
  globalErrors: string[] = [];

  personGroupId: string;

  laborLeave: DicAbsenceType;

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }
      this.dataInstance
        .update({
          assignmentSchedule: this.assignmentSchedule,
          ...this.props.form.getFieldsValue(this.fields)
        })
        .then(() => {
          message.success(
            this.props.intl.formatMessage({id: "management.editor.success"})
          );
          this.updated = true;
        })
        .catch((e: any) => {
          if (e.response && typeof e.response.json === "function") {
            e.response.json().then((response: any) => {
              clearFieldErrors(this.props.form);
              const {
                globalErrors,
                fieldErrors
              } = extractServerValidationErrors(response);
              this.globalErrors = globalErrors;
              if (fieldErrors.size > 0) {
                this.props.form.setFields(
                  constructFieldsWithErrors(fieldErrors, this.props.form)
                );
              }

              if (fieldErrors.size > 0 || globalErrors.length > 0) {
                message.error(
                  this.props.intl.formatMessage({
                    id: "management.editor.validationError"
                  })
                );
              } else {
                message.error(
                  this.props.intl.formatMessage({
                    id: "management.editor.error"
                  })
                );
              }
            });
          } else {
            message.error(
              this.props.intl.formatMessage({id: "management.editor.error"})
            );
          }
        });
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={"/vacationSchedule/" + this.props.rootStore!.vacationRequestStore.type}/>;
    }

    const {getFieldDecorator} = this.props.form;
    const messages = this.props.mainStore!.messages!;

    const {status, item} = this.dataInstance;

    const readonly = !!(item && item.approved && !item.sentToOracle);

    return (
      <Page pageName={this.props.intl.formatMessage({id: "vacationScheduleRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout card-actions-container" actions={[
              <Button
                buttonType={ButtonType.PRIMARY}
                disabled={status !== "DONE" && status !== "ERROR" || readonly}
                loading={status === "LOADING"}
                onClick={this.handleSubmit}
                style={{marginLeft: "8px"}}>
                <FormattedMessage id="management.editor.submit"/>
              </Button>,
              <Button buttonType={ButtonType.FOLLOW} htmlType="button" onClick={() => this.props.history!.goBack()}>
                <FormattedMessage id="management.editor.cancel"/>
              </Button>]}
                  bordered={false}>
              <Form layout="vertical">

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="requestNumber"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                />

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="requestDate"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                />

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="personGroup"
                  form={this.props.form}
                  optionsContainer={this.personGroupDc}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    getValueFromEvent: args => {
                      this.onChangePersonGroupOrDate(args);
                      return args;
                    }
                  }}
                  disabled={!this.isNew || this.isMy}
                />

                <Form.Item label={createElement(Msg, {
                  entityName: this.dataInstance.entityName,
                  propertyName: "assignmentSchedule"
                })}>
                  <input
                    style={{width:'100%'}}
                    disabled={true}
                    value={this.assignmentSchedule && this.assignmentSchedule._instanceName}/>
                </Form.Item>

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="startDate"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    getValueFromEvent: args => {
                      this.getAssignmentSchedule(args);
                      this.getAbsenceBalance(args);
                      this.getAbsenceDays(args);
                      return args
                    },
                    rules: [{
                      required: true,
                      validator: (rule, value, callback) => {
                        if (!value) return callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.startDate']}));

                        const requestDate = this.props.form.getFieldValue('requestDate');

                        if (requestDate && requestDate > value) {
                          callback(this.props.intl.formatMessage({id: 'validation.vacationScheduleRequest.startDate.start'}));
                        }

                        return callback();
                      }
                    }]
                  }}
                  disabled={readonly}
                />

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="endDate"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={readonly}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.endDate']})
                    }],
                    getValueFromEvent: args => {
                      this.getAbsenceDays(undefined, args);
                      return args;
                    }
                  }}
                />

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="absenceDays"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [
                      {
                        validator: (rule, value, callback) => {
                          const balance = this.props.form.getFieldValue('balance');
                          if (!isNumber(value) || !isNumber(balance)) return callback();
                          if (balance < parseInt(value)) {
                            return callback(this.props.intl.formatMessage({id: 'validation.balance'}));
                          } else if (this.laborLeave && this.laborLeave.minDay && this.laborLeave.minDay < parseInt(value)) {
                            return callback(
                              this.props.intl.formatMessage({id: 'vacationRequest.validation.minDay'},
                                {days: this.laborLeave.minDay})
                            );
                          }
                          return callback();
                        }
                      }
                    ]
                  }}
                  disabled={true}
                />

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="balance"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                />

                <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                  {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "comment"})}
                  <Form.Item>
                    {getFieldDecorator("comment")(
                      <TextArea
                        disabled={readonly}
                        rows={4}/>
                    )}
                  </Form.Item>
                </div>

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="attachment"
                  disabled={readonly}
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="approved"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                />

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="sentToOracle"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                />

                {this.globalErrors.length > 0 && (
                  <Alert
                    message={<MultilineText lines={toJS(this.globalErrors)}/>}
                    type="error"
                    style={{marginBottom: "24px"}}
                  />
                )}
              </Form>
            </Card>
          </div>
        </Section>

        {
          this.props.ganttChartVisible && status === 'DONE' && this.props.entityId !== VacationScheduleRequestManagement.NEW_SUBPATH
            ? <Card className="narrow-layout card-actions-container large-section section-container ">
              <VacationGanttChart starDate={this.dataInstance.item!.startDate}
                                  endDate={this.dataInstance.item!.endDate}/>
            </Card>
            : <></>
        }
      </Page>
    );
  }

  getAbsenceDays = (startDate?: any, endDate?: any) => {
    if (this.personGroupId) {

      startDate = startDate || this.props.form.getFieldValue(`startDate`);
      endDate = endDate || this.props.form.getFieldValue(`endDate`);

      const personGroupId = this.personGroupId;

      if (endDate && startDate && personGroupId) {
        restServices.absenceService.countDays({
          dateFrom: startDate,
          dateTo: endDate,
          absenceTypeId: this.laborLeave.id,
          personGroupId: personGroupId
        }).then(value => {
          this.props.form.setFields({"absenceDays": {value: value}});
        })
      }
    }
  }

  getAbsenceBalance = (dateFrom?: moment.Moment) => {
    dateFrom = dateFrom || this.props.form.getFieldValue("dateFrom");

    if (dateFrom && this.personGroupId) {
      restServices.absenceBalanceService.getAbsenceBalance({
        personGroupId: this.personGroupId,
        absenceDate: dateFrom
      })
        .then(value => {
          this.props.form.setFieldsValue({"balance": value});
          this.callForceAbsenceDayValidator();
        })
    }
  }

  callForceAbsenceDayValidator = () => this.props.form.validateFields(['absenceDays'], {force: true});

  onChangePersonGroupOrDate = (personGroupId: string | undefined = this.props.form.getFieldValue('personGroup'),
                               date: string = this.getDate()) => {
    this.personGroupId = personGroupId;

    this.getAssignmentSchedule();
    this.getAbsenceBalance(undefined);
    this.getAbsenceDays(undefined, undefined);
  }

  getAssignmentSchedule = (date: string = this.getDate()) => {
    restServices.assignmentScheduleService.getAssignmentSchedule({
      personGroupId: this.personGroupId,
      date: date,
      view: '_minimal'
    }).then(value => this.assignmentSchedule = value);
  };

  componentDidMount() {
    (async () => {
      restServices.absenceService.getLaborLeave().then(value => this.laborLeave = value);
      this.isNew = this.props.entityId === VacationScheduleRequestManagement.NEW_SUBPATH;
      this.isMy = !this.props.rootStore!.vacationRequestStore.type
        || this.props.rootStore!.vacationRequestStore.type === 'my';

      if (!this.isNew) {
        await this.dataInstance.load(this.props.entityId);
      } else {
        await restServices.portalHelperService.newEntity({entityName: this.dataInstance.entityName})
          .then((response: VacationScheduleRequest) => this.dataInstance.setItem(response));
      }

      this.initPersonGroupDc();

    })()

    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {

        this.props.form.setFieldsValue(
          {
            ...this.dataInstance.getFieldValues(this.fields),
          }
        );
      }
    );
  }

  initPersonGroupDc = async () => {
    if (!this.isNew || this.isMy) {
      const item = this.dataInstance.item!;

      this.personGroupId = item.personGroup ? item.personGroup.id : this.props.rootStore!.userInfo.personGroupId!;

      this.personGroupDc = collection(PersonGroup.NAME, {
        view: '_minimal',
        filter: {
          conditions: [{
            property: 'id',
            operator: '=',
            value: this.personGroupId
          }]
        },
      })

      if (this.isNew) this.props.form.setFieldsValue({personGroup: this.personGroupId});

      this.onChangePersonGroupOrDate(this.personGroupId, moment().format(JSON_DATE_TIME_FORMAT));

    } else {
      let isHr = false;
      await restServices.hrService.isHr().then(value => isHr = value);

      if (isHr) {
        this.personGroupDc = serviceCollection<SerializedEntity<PersonGroupExt>>(
          Pagination => restServices.hrService.getEmployers(),
          PersonGroupExt.NAME);
      } else {
        const isManager = this.props.rootStore!.vacationRequestStore.type === 'manager';
        const positionGroupId = isManager
          ? this.props.rootStore!.userInfo.positionGroupId!
          : this.props.rootStore!.assistantTeamInfo!.selectedManager!.positionGroupId!;
        this.personGroupDc = serviceCollection<SerializedEntity<PersonGroupExt>>(
          Pagination => restServices.employeeHierarchyService.getChildEmployees({
            positionGroupId: positionGroupId,
            date: moment().format(JSON_DATE_TIME_FORMAT),
            view: '_minimal'
          }),
          PersonGroupExt.NAME);
      }
    }

    this.personGroupDc.load();
  }

  getDate = () => {
    const startDate = this.props.form.getFieldValue('startDate');
    return (startDate ? moment(startDate) : moment()).format(JSON_DATE_TIME_FORMAT);
  }

  componentWillUnmount() {
    this.reactionDisposer();
  }
}

const component = injectIntl(
  withLocalizedForm<EditorProps & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>>({
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
  })(VacationScheduleRequestEditComponent)
);
export default withRouter(component);
