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

import "../../../app/App.css";
import {RouteComponentProps, withRouter} from "react-router";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import LoadingPage from "../LoadingPage";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {ReadonlyField} from "../../components/ReadonlyField";
import Button, {ButtonType} from "../../components/Button/Button";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {Redirect} from "react-router-dom";
import {rootStore, RootStoreProp} from "../../store";
import TextArea from "antd/es/input/TextArea";
import {LeavingVacationRequestManagement} from "./LeavingVacationRequestManagement";
import {LeavingVacationRequest} from "../../../cuba/entities/base/tsadv$LeavingVacationRequest";
import {Absence} from "../../../cuba/entities/base/tsadv$Absence";
import {Moment} from "moment";
import {observable, reaction} from "mobx";
import moment from "moment/moment";

type EditorProps = {
  entityId: string;
  absenceId?: string;
};

@inject("rootStore")
@injectMainStore
@observer
class LeavingVacationRequestEditComponent extends AbstractBprocEdit<LeavingVacationRequest, EditorProps> {
  dataInstance = instance<LeavingVacationRequest>(LeavingVacationRequest.NAME, {
    view: "leavingVacationRequest-editView",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  fields = [
    "requestNumber",

    "requestDate",

    "status",

    "comment",

    "startDate",

    "endDate",

    "plannedStartDate",

    "attachment"
  ];

  assignmentGroupId: string;

  getUpdateEntityData = (): any => {
    return {
      personGroup: {
        id: this.props.rootStore!.userInfo.personGroupId
      },
      vacation: {...this.dataInstance.item!.vacation},
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  processDefinitionKey = "leavingVacationRequest";

  @observable isLessThan30Days: boolean = false;

  dateValidator = () => {
    const plannedStartDate = this.props.form.getFieldValue("plannedStartDate");
    const requestDate = this.props.form.getFieldValue("requestDate");

    if (plannedStartDate) (plannedStartDate as Moment).startOf('days');
    if (requestDate) (requestDate as Moment).startOf('days');

    const isValid = plannedStartDate && requestDate && plannedStartDate > (requestDate as Moment).clone().add(30, 'days');

    this.isLessThan30Days = !(isValid === true);
    return plannedStartDate !== null && plannedStartDate !== undefined;
  }

  render() {

    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    if (this.updated) {
      return <Redirect to={LeavingVacationRequestManagement.PATH}/>;
    }

    const needBpm = this.dataInstance.item && this.dataInstance.item.vacation;

    const {getFieldDecorator} = this.props.form;

    const messages = this.mainStore.messages!;

    const isNotDraft = this.isNotDraft();

    const warningDateMessage = this.isLessThan30Days ?
      <div style={{color: "red", marginBottom: "15px"}}>
        <label>{this.props.intl.formatMessage({id: isNotDraft ? "summited.less.than.30.days" : "leavingVacationRequest.plannedStartDate.validating"})}</label>
      </div>
      : null;

    return (
      <Page pageName={this.props.intl.formatMessage({id: "leavingVacationRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout card-actions-container" actions={[
              <Button buttonType={ButtonType.FOLLOW}
                      onClick={this.props.history!.goBack}>{this.props.intl.formatMessage({id: "close"})}</Button>,
              this.getOutcomeBtns(needBpm)]}
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
                  {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "vacation"})}
                  <Input disabled={true}
                         value={needBpm && this.dataInstance.item!.vacation!.typeAndDate
                           ? this.dataInstance.item!.vacation!.typeAndDate
                           : ""}/>
                </div>

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="startDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="endDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="plannedStartDate"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.plannedStartDate']}),
                      validator: this.dateValidator
                    }]
                  }}
                />
                {warningDateMessage}

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
                  entityName={this.dataInstance.entityName}
                  propertyName="attachment"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                />

                {this.takCard()}

              </Form>
            </Card>

          </div>
        </Section>
      </Page>
    );
  }

  setReactionDisposer = () => {
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
        const obj = {
          ...this.dataInstance.getFieldValues(this.fields)
        };
        if (this.isCalledProcessInstanceData && !this.processInstanceData) {
          const now = moment();
          now.locale(this.props.rootStore!.userInfo.locale!);
          obj["requestDate"] = now;
        }
        this.props.form.setFieldsValue(obj);
        this.dateValidator();
      }
    );
  };

  protected initItem(request: LeavingVacationRequest): void {
    if (this.props.absenceId) {
      getCubaREST()!.loadEntity(Absence.NAME, this.props.absenceId, {view: "absence.view"})
        .then(value => {
          const absence = value as Absence;
          request.vacation = absence;
          request.startDate = absence.dateFrom;
          request.endDate = absence.dateTo;
          super.initItem(request);
        });
    } else super.initItem(request);
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
  });
};
const component = injectIntl(withLocalizedForm<EditorProps & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>>({onValuesChange})(LeavingVacationRequestEditComponent));
export default withRouter(component);
