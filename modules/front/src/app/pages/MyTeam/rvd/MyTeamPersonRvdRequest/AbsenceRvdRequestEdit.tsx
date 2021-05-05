import * as React from "react";
import {createElement, FormEvent} from "react";
import {Alert, Card, Form, message, TimePicker} from "antd";
import {inject, observer} from "mobx-react";
import {AbsenceRvdRequestManagement} from "./AbsenceRvdRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Redirect} from "react-router-dom";
import {IReactionDisposer, observable, toJS} from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

import {
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText, collection, injectMainStore, Msg
} from "@cuba-platform/react";

import "../../../../../app/App.css";

import {AbsenceRvdRequest} from "../../../../../cuba/entities/base/tsadv_AbsenceRvdRequest";
import Page from "../../../../hoc/PageContentHoc";
import Section from "../../../../hoc/Section";
import {DictionaryDataCollectionStore} from "../../../../util/DictionaryDataCollectionStore";
import {DicRequestStatus} from "../../../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicAbsenceType} from "../../../../../cuba/entities/base/tsadv$DicAbsenceType";
import AbstractBprocEdit from "../../../Bproc/abstract/AbstractBprocEdit";
import {ReadonlyField} from "../../../../components/ReadonlyField";
import {rootStore} from "../../../../store";
import {restServices} from "../../../../../cuba/services";
import {DicPurposeAbsence} from "../../../../../cuba/entities/base/tsadv_DicPurposeAbsence";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {withRouter} from "react-router";
import {DEFAULT_DATE_PATTERN, DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS} from "../../../../util/Date/Date";
import {AbsPurposeSetting} from "../../../../../cuba/entities/base/tsadv_AbsPurposeSetting";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import {queryCollection} from "../../../../util/QueryDataCollectionStore";
import {PersonProfile} from "../../MyTeamCard";
import DefaultDatePicker from "../../../../components/Datepicker";


type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string | undefined;
  personGroupId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class AbsenceRvdRequestEditComponent extends AbstractBprocEdit<AbsenceRvdRequest, EditorProps & Props & WrappedComponentProps> {
  dataInstance = instance<AbsenceRvdRequest>(AbsenceRvdRequest.NAME, {
    view: "absenceRvdRequest.edit",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });


  purposeDc = collection<AbsPurposeSetting>(AbsPurposeSetting.NAME, {
    view: "_base"
  });

  typesAbsenceDC = collection<AbsPurposeSetting>(AbsPurposeSetting.NAME, {
    view: "_base"
  })

  @observable person?: PersonProfile;

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

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

    "compencation",

    "vacationDay",

    "agree",
  ];

  @observable
  workOnWeekend = true;

  @observable
  temporaryTransfer = true;

  @observable
  overtimeWork = true;

  /*  typeDc = collection<DicAbsenceType>(DicAbsenceType.NAME, {
      view: "_local",
      filter: {
        conditions: [{
          group: "OR",
          conditions: [
            {
              property: 'workOnWeekend',
              operator: '=',
              value: 'TRUE'
            },
            {
              property: 'temporaryTransfer',
              operator: '=',
              value: 'TRUE'
            },
            {
              property: 'overtimeWork',
              operator: '=',
              value: 'TRUE',
            },
          ]
        }]
      }
    });*/



  purposeTempDc: DataCollectionStore<DicPurposeAbsence>;

  @observable
  globalErrors: string[] = [];

  @observable
  absenceTypesDc: DictionaryDataCollectionStore<DicRequestStatus>;

  @observable
  isPurposeText = false;


  getUpdateEntityData = (): any => {
    console.log(this.props.rootStore!.userInfo.personGroupId);

    console.log(this.props.personGroupId)
    if (this.isNotDraft()) return {...this.props.form.getFieldsValue(this.fields)};
    return {
      personGroup: {
        id: this.props.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  afterSendOnApprove = () => {
    this.props.history!.push("/my-team");
  };

  processDefinitionKey = "absenceRvdRequest";

  isUpdateBeforeOutcome = true;

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
        .update(this.props.form.getFieldsValue(this.fields))
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
      return <Redirect to={AbsenceRvdRequestManagement.PATH}/>;
    }
    const {getFieldDecorator} = this.props.form;
    const {status} = this.dataInstance;
    console.log(this.props.history!.goBack);
    // @ts-ignore

    this.typesAbsenceDC = queryCollection<DicAbsenceType>(DicAbsenceType.NAME, "myTeamRvdAbsenceType", {})
    return (
      <Page pageName={this.props.intl.formatMessage({id: "workOnWeekendRequest"})}>
        <Section size="large">
          <Card bordered={false}>

            <Form onSubmit={this.validate} layout="vertical">

              <ReadonlyField
                entityName={this.dataInstance.entityName}
                propertyName="requestNumber"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                disabled={true}
                getFieldDecoratorOpts={{
                  rules: [{required: true,}],
                }}
              />

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="requestDate"
                form={this.props.form}
                disabled={true}
                format={DEFAULT_DATE_PATTERN}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{}}
              />

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="status"
                optionsContainer={this.statusesDc}
                form={this.props.form}
                disabled={true}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{required: true,}],
                }}
              />
              {/*
            <ReadonlyField
              entityName={AbsenceRvdRequest.NAME}
              propertyName="personGroup"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              disabled={true}
              getFieldDecoratorOpts={{}}
            />*/}


              <Field
                entityName={AbsenceRvdRequest.NAME}
                propertyName="type"
                form={this.props.form}
                optionsContainer={this.typesAbsenceDC}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{required: true,}],
                  getValueFromEvent: args => {
                    this.purposeTempDc = queryCollection<DicPurposeAbsence>(DicPurposeAbsence.NAME, "myTeamRvd", {
                      typeId: args
                    })
                    // if(args === "ba902579-d681-6555-0a5a-b5ecfae610ef"){
                    //   this.purposeTempDc = this.purpose1;
                    // }else if(args === "a5a941c9-1202-31d4-3037-d47b45ed6a21"){
                    //   this.purposeTempDc = this.purpose2;
                    // }else if(args === "3be39648-a752-f7dc-3724-77cdae92fdd8"){
                    //   this.purposeTempDc = this.purpose3;
                    // }
                    console.log(this.purposeTempDc);
                    this.calcHours(args, null, null);
                    return args;
                  }
                }}
              />

              <Field
                entityName={AbsenceRvdRequest.NAME}
                propertyName="purpose"
                form={this.props.form}
                optionsContainer={this.purposeTempDc}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{required: true,}],
                  getValueFromEvent: args => {
                    if (args === 'Другое') {
                      this.isPurposeText = true;
                    } else {
                      this.isPurposeText = false;
                    }
                    return args;
                  }
                }}
              />
              {/*
            {isOther ? (
              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                form={this.props.form}
                propertyName="purposeText"
                formItemOpts={{style: {marginBottom: "12px"}}}
              />) : (<></>)
            }*/}

              {this.purposeText(this.isPurposeText)}


              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "timeOfStarting"})}
                <div style={{display: 'flex'}}>
                  <Form.Item>
                    {getFieldDecorator("timeOfStarting", {
                      rules: [{
                        required: true,
                      }],
                      getValueFromEvent: args => {
                        this.calcHours(null, args, null);
                        return args
                      }
                    })(
                      <DefaultDatePicker />
                    )}
                  </Form.Item>

                  <Form.Item
                    style={{position: 'absolute', paddingLeft: 170}}>
                    {getFieldDecorator("timeOfStarting")(
                      <TimePicker/>
                    )}
                  </Form.Item>
                </div>
              </div>



              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "timeOfFinishing"})}
                <div style={{display: 'flex'}}>
                  <Form.Item>
                    {getFieldDecorator("timeOfFinishing", {
                      rules: [{
                        required: true,
                      }],
                      getValueFromEvent: args => {
                        this.calcHours(null, null, args);
                        return args
                      }
                    })(
                      <DefaultDatePicker />
                    )}
                  </Form.Item>

                  <Form.Item
                    style={{position: 'absolute', paddingLeft: 170}}>
                    {getFieldDecorator("timeOfFinishing")(
                      <TimePicker/>
                    )}
                  </Form.Item>
                </div>
              </div>

              {/*        <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="timeOfStarting"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                format={DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS}
                getFieldDecoratorOpts={{
                  rules: [{required: true,}],
                  getValueFromEvent: args => {
                    this.calcHours(null, args, null);
                    return args
                  }
                }}
              />*/}

              {/*           <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="timeOfFinishing"
                form={this.props.form}
                format={DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{required: true,}],
                  getValueFromEvent: args => {
                    this.calcHours(null, null, args);
                    return args
                  }
                }}
              />*/}

              <ReadonlyField
                entityName={AbsenceRvdRequest.NAME}
                propertyName="totalHours"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                disabled={true}
                getFieldDecoratorOpts={{}}
              />

              <Field
                entityName={AbsenceRvdRequest.NAME}
                propertyName="compencation"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  valuePropName: "checked",
                  getValueFromEvent: args => {
                    const compencation = args.target.checked === true;
                    const vacationDay = this.props.form.getFieldValue('vacationDay') === true;
                    if (vacationDay === compencation) {
                      this.props.form.setFieldsValue({vacationDay: !vacationDay})
                    }
                    return compencation;
                  }
                }}
              />

              <Field
                entityName={AbsenceRvdRequest.NAME}
                propertyName="vacationDay"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  valuePropName: "checked",
                  getValueFromEvent: args => {
                    const vacationDay = args.target.checked === true;
                    const compencation = this.props.form.getFieldValue('compencation') === true;
                    if (vacationDay === compencation) {
                      this.props.form.setFieldsValue({compencation: !compencation})
                    }
                    return vacationDay;
                  }
                }}
              />
              {/*
            <ReadonlyField
              entityName={AbsenceRvdRequest.NAME}
              propertyName="personGroup"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              disabled={this.approverHrRoleCode !== 'EMPLOYEE'}
              getFieldDecoratorOpts={{
                valuePropName: "checked"
              }}
            />*/}

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


              {/*
              <Field
                entityName={AbsenceRvdRequest.NAME}
                propertyName="type"
                form={this.props.form}
                optionsContainer={this.absenceTypesDc}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: false,
                  }],
                }}
              />*/}


              {this.globalErrors.length > 0 && (
                <Alert
                  message={<MultilineText lines={toJS(this.globalErrors)}/>}
                  type="error"
                  style={{marginBottom: "24px"}}
                />
              )}
              {/*
            <Form.Item style={{textAlign: "center"}}>
              <Link to={MyTeamStructureManagement.PATH}>
                <Button htmlType="button">
                  <FormattedMessage id="management.editor.cancel"/>
                </Button>
              </Link>
              <Link to={MyTeamStructureManagement.PATH}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={status !== "DONE" && status !== "ERROR"}
                  loading={status === "LOADING"}
                  style={{marginLeft: "8px"}}
                >
                  <FormattedMessage id="management.editor.submit"/>
                </Button>
              </Link>
            </Form.Item>*/}

              {this.takCard()}

              <Form.Item style={{textAlign: "center"}}>

                {this.getOutcomeBtns()}

                <Button buttonType={ButtonType.FOLLOW} htmlType="button" onClick={() => this.props.history!.goBack()}>
                  <FormattedMessage id="management.editor.cancel"/>
                </Button>
              </Form.Item>

            </Form>
          </Card>
        </Section>
      </Page>
    );
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
    const personGroupId = rootStore.userInfo.personGroupId;

    if (type && dateTo && dateFrom && personGroupId) {
      restServices.absenceRvdService.countTotalHours({
        dateFrom: dateFrom,
        dateTo: dateTo,
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




