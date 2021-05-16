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
  getCubaREST,
  injectMainStore,
  instance,
  MainStoreInjected,
  Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {VacationScheduleRequest} from "../../../cuba/entities/base/tsadv_VacationScheduleRequest";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {rootStore, RootStoreProp} from "../../store";
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

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@injectMainStore
@inject("rootStore")
@observer
class VacationScheduleRequestEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>> {
  dataInstance = instance<VacationScheduleRequest>(
    VacationScheduleRequest.NAME,
    {view: "vacationScheduleRequest-edit"}
  );

  statussDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;

  reactionDisposer: IReactionDisposer;

  fields = [
    "requestNumber",

    "requestDate",

    "startDate",

    "endDate",

    "absenceDays",

    "balance",

    "comment",

    "sentToOracle",

    "attachment"
  ];

  @observable
  globalErrors: string[] = [];

  personGroupId: string;

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
          personGroup: {
            id: this.props.rootStore!.userInfo.personGroupId
          },
          status: {
            id: this.dataInstance.item!.status!.id
          },
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
      return <Redirect to={"/absence/2"}/>;
    }

    const {getFieldDecorator} = this.props.form;
    const messages = this.props.mainStore!.messages!;

    const {status} = this.dataInstance;

    const isNotDraft = false;

    return (
      <Page pageName={this.props.intl.formatMessage({id: "vacationScheduleRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout card-actions-container" actions={[
              <Button
                buttonType={ButtonType.PRIMARY}
                disabled={status !== "DONE" && status !== "ERROR"}
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
                  propertyName="startDate"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    getValueFromEvent: args => {
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
                  disabled={isNotDraft}
                />

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="endDate"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={isNotDraft}
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
                            callback(this.props.intl.formatMessage({id: 'validation.balance'}));
                          }
                          callback();
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
                        disabled={isNotDraft}
                        rows={4}/>
                    )}
                  </Form.Item>
                </div>

                <ReadonlyField
                  entityName={VacationScheduleRequest.NAME}
                  propertyName="attachment"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
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
      </Page>
    );
  }

  getAbsenceDays = (startDate?: any, endDate?: any) => {
    if (rootStore && rootStore.userInfo && rootStore.userInfo.personGroupId) {

      startDate = startDate || this.props.form.getFieldValue(`startDate`);
      endDate = endDate || this.props.form.getFieldValue(`endDate`);

      const personGroupId = rootStore.userInfo.personGroupId;

      if (endDate && startDate && personGroupId) {
        getCubaREST()!.searchEntities(DicAbsenceType.NAME, {
          conditions: [{property: "isVacationDate", operator: "=", value: 'TRUE'},
            {property: "availableForChangeDate", operator: "=", value: 'TRUE'},
            {property: "availableForRecallAbsence", operator: "=", value: 'TRUE'},
            {property: "useInSelfService", operator: "=", value: 'TRUE'}]
        }, {
          view: "_minimal",
          limit: 1,
        }).then((value) => {
          if (value.length === 1)
            restServices.absenceService.countDays({
              dateFrom: startDate,
              dateTo: endDate,
              absenceTypeId: (value[0] as DicAbsenceType).id,
              personGroupId: personGroupId
            }).then(value => {
              this.props.form.setFields({"absenceDays": {value: value}});
            })
        })
      }
    }
  }

  getAbsenceBalance = (dateFrom?: moment.Moment) => {
    dateFrom = dateFrom || this.props.form.getFieldValue("dateFrom");

    if (dateFrom) {
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

  componentDidMount() {
    if (this.props.entityId !== VacationScheduleRequestManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      restServices.portalHelperService.newEntity({entityName: this.dataInstance.entityName}).then((response: VacationScheduleRequest) => {
        this.dataInstance.setItem(response)
      });
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {

        this.personGroupId = item && item.personGroup ? item.personGroup.id : this.props.rootStore!.userInfo.personGroupId!;

        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
        );
      }
    );
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
