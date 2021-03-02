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
    {view: "vacationScheduleRequest-edit", loadImmediately: false}
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

    "status",

    "startDate",

    "endDate",

    "absenceDays",

    "balance",

    "comment"
  ];

  @observable
  globalErrors: string[] = [];

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
      return <Redirect to={"/absence/3"}/>;
    }

    const {getFieldDecorator} = this.props.form;

    const {status} = this.dataInstance;

    const isNotDraft = this.dataInstance.item && this.dataInstance.item.status ? this.dataInstance.item.status.code !== 'DRAFT' : true;

    const saveBtn = isNotDraft ? null
      : <Button
        buttonType={ButtonType.PRIMARY}
        htmlType="submit"
        disabled={status !== "DONE" && status !== "ERROR"}
        loading={status === "LOADING"}
        style={{marginLeft: "8px"}}
      >
        <FormattedMessage id="management.editor.submit"/>
      </Button>;

    return (
      <Card className="narrow-layout">
        <Form onSubmit={this.handleSubmit} layout="vertical">

          <ReadonlyField
            entityName={VacationScheduleRequest.NAME}
            propertyName="requestNumber"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{
              rules: [{required: true}]
            }}
            disabled={true}
          />

          <ReadonlyField
            entityName={VacationScheduleRequest.NAME}
            propertyName="requestDate"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{
              rules: [{required: true}]
            }}
            disabled={true}
          />

          <ReadonlyField
            entityName={VacationScheduleRequest.NAME}
            propertyName="status"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            optionsContainer={this.statussDc}
            getFieldDecoratorOpts={{
              rules: [{required: true}]
            }}
            disabled={true}
          />

          <ReadonlyField
            entityName={VacationScheduleRequest.NAME}
            propertyName="startDate"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{}}
            disabled={isNotDraft}
          />

          <ReadonlyField
            entityName={VacationScheduleRequest.NAME}
            propertyName="endDate"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{}}
            disabled={isNotDraft}
          />

          <ReadonlyField
            entityName={VacationScheduleRequest.NAME}
            propertyName="absenceDays"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{}}
            disabled={true}
          />

          {/*<ReadonlyField*/}
          {/*  entityName={VacationScheduleRequest.NAME}*/}
          {/*  propertyName="balance"*/}
          {/*  form={this.props.form}*/}
          {/*  formItemOpts={{style: {marginBottom: "12px"}}}*/}
          {/*  getFieldDecoratorOpts={{}}*/}
          {/*  disabled={true}*/}
          {/*/>*/}

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

          {this.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(this.globalErrors)}/>}
              type="error"
              style={{marginBottom: "24px"}}
            />
          )}

          <Form.Item style={{textAlign: "center"}}>
            <Button buttonType={ButtonType.FOLLOW} htmlType="button" onClick={() => this.props.history!.goBack()}>
              <FormattedMessage id="management.editor.cancel"/>
            </Button>
            {saveBtn}
          </Form.Item>

        </Form>
      </Card>
    );
  }

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
      () => {
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

        if (fieldName === "startDate" || fieldName === "endDate") {
          props.form.validateFields();
        }

        console.log(fieldName);
        if (rootStore && rootStore.userInfo && rootStore.userInfo.personGroupId) {

          console.log(rootStore && rootStore.userInfo && rootStore.userInfo.personGroupId);
          const startDate = props.form.getFieldValue(`startDate`);
          const endDate = props.form.getFieldValue(`endDate`);

          const personGroupId = rootStore.userInfo.personGroupId;

          if ((fieldName === "startDate" || fieldName === "endDate")
            && endDate && startDate && personGroupId) {
            getCubaREST()!.searchEntities(DicAbsenceType.NAME, {
              conditions: [{property: "code", operator: "=", value: 'ANNUAL'}]
            }, {
              view: "_minimal"
            }).then((value) => {
              if (value.length === 1)
                restServices.absenceService.countDays({
                  dateFrom: startDate,
                  dateTo: endDate,
                  absenceTypeId: (value[0] as DicAbsenceType).id,
                  personGroupId: personGroupId
                }).then(value => {
                  props.form.setFields({"absenceDays": {value: value}});
                })
            })
          }
        }

      });
    }
  })(VacationScheduleRequestEditComponent)
);
export default withRouter(component);
