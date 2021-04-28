import * as React from "react";
import {Alert, Card, Form} from "antd";
import {inject, observer} from "mobx-react";
import {FormComponentProps} from "antd/lib/form";
import {IReactionDisposer, observable, toJS} from "mobx";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";

import {
  collection,
  Field,
  getCubaREST,
  injectMainStore,
  instance,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {ScheduleOffsetsRequest} from "../../../cuba/entities/base/tsadv_ScheduleOffsetsRequest";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import {StandardSchedule} from "../../../cuba/entities/base/tsadv$StandardSchedule";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {rootStore} from "../../store";
import {ReadonlyField} from "../../components/ReadonlyField";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import LoadingPage from "../LoadingPage";
import {restQueries} from "../../../cuba/queries";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import AbstractAgreedBprocEdit from "../Bproc/abstract/AbstractAgreedBprocEdit";
import Notification from "../../util/Notification/Notification";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
  personGroupId: string;
};

@injectMainStore
@inject("rootStore")
@observer
class ScheduleOffsetsRequestEditComponent extends AbstractAgreedBprocEdit<ScheduleOffsetsRequest, EditorProps> {
  dataInstance = instance<ScheduleOffsetsRequest>(ScheduleOffsetsRequest.NAME, {
    view: "scheduleOffsetsRequest-for-my-team",
    loadImmediately: false
  });

  @observable
  personGroup: PersonGroupExt;

  newSchedulesDc = collection<StandardSchedule>(StandardSchedule.NAME, {
    view: "_minimal"
  });

  statussDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  personGroupDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal",
    filter: {
      conditions: [
        {
          property: "id",
          operator: "=",
          value: this.props.personGroupId
        }
      ]
    },
    limit: 10
  });

  processDefinitionKey = "scheduleOffsetsRequest";

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = [
    "purposeText",

    "dateOfNewSchedule",

    "dateOfStartNewSchedule",

    "detailsOfActualWork",

    "agree",

    "acquainted",

    "legacyId",

    "organizationBin",

    "integrationUserLogin",

    "requestNumber",

    "requestDate",

    "comment",

    "personGroup",

    "purpose",

    "currentSchedule",

    "newSchedule",

    "status"
  ];

  @observable
  globalErrors: string[] = [];

  currentStandardSchedule: StandardSchedule;

  beforeCompletePredicate = (outcome: string): Promise<boolean> => {
    if (outcome == 'APPROVE' && this.approverHrRoleCode === 'EMPLOYEE') {
      const isAgree = this.props.form.getFieldValue('agree');
      const isFamiliarization = this.props.form.getFieldValue('acquainted');

      if (!isAgree) {
        Notification.info({
            message: this.props.intl.formatMessage({id: "for.approving.must.to.check.field"},
              {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.isAgree']})
          }
        )
      }

      if (!isFamiliarization) {
        Notification.info({
            message: this.props.intl.formatMessage({id: "for.approving.must.to.check.field"},
              {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.isFamiliarization']})
          }
        )
      }

      if (!isAgree || !isFamiliarization)
        return new Promise(resolve => resolve(false));
    }
    return new Promise(resolve => resolve(true));
  };

  render() {

    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    return (
      <Page pageName={this.props.intl.formatMessage({id: "scheduleOffsetsRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout card-actions-container" actions={[
              <Button buttonType={ButtonType.FOLLOW}
                      onClick={() => this.props.history!.goBack}>{this.props.intl.formatMessage({id: "close"})}</Button>,
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
                  optionsContainer={this.statussDc}
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

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="personGroup"
                  optionsContainer={this.personGroupDc}
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                  getFieldDecoratorOpts={{}}
                />


                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="currentSchedule"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{}}
                />

                <Field
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="newSchedule"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.newSchedulesDc}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <Field
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="purposeText"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{}}
                />

                <Field
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="dateOfNewSchedule"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <Field
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="dateOfStartNewSchedule"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <Field
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="detailsOfActualWork"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{}}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="agree"
                  form={this.props.form}
                  disabled={this.approverHrRoleCode !== 'EMPLOYEE'}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    valuePropName: "checked"
                  }}
                />

                <ReadonlyField
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="acquainted"
                  form={this.props.form}
                  disabled={this.approverHrRoleCode !== 'EMPLOYEE'}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    valuePropName: "checked"
                  }}
                />


                <Field
                  entityName={ScheduleOffsetsRequest.NAME}
                  propertyName="comment"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{}}
                />

                {this.globalErrors.length > 0 && (
                  <Alert
                    message={<MultilineText lines={toJS(this.globalErrors)}/>}
                    type="error"
                    style={{marginBottom: "24px"}}
                  />
                )}

                {this.takCard()}

              </Form>
            </Card>

          </div>
        </Section>
      </Page>
    );
  }


  getUpdateEntityData = (): any => {
    if (this.isNotDraft())
      return {
        ...this.props.form.getFieldsValue(this.fields)
      }

    return {
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  componentDidMount() {
    super.componentDidMount();

    this.loadPerson().then(value => {
      this.personGroup = value;
      this.dataInstance.item!.personGroup = value;
      const fieldValues = this.dataInstance.getFieldValues(this.fields);
      this.props.form.setFieldsValue(fieldValues);
    });

    this.loadCurrentScheduleOffset()

    this.setEmployee(this.props.personGroupId);
  }


  componentWillUnmount() {
    this.reactionDisposer();
  }

  afterSendOnApprove = () => {
    console.log(this.props.history);
    this.props.history!.goBack();
  };

  loadPerson = (): Promise<PersonGroupExt> => {
    return getCubaREST()!.searchEntities(PersonGroupExt.NAME, {
      conditions: [{
        property: 'id',
        operator: '=',
        value: this.props.personGroupId,
      }]
    }, {
      view: 'personGroupExt-absenceEdit'
    }).then(value => value[0] as PersonGroupExt);
  }


  loadCurrentScheduleOffset() {
    return restQueries.currentStandardSchedule(this.props.personGroupId)
      .then(value => {
        if (value.length > 0) {
          this.currentStandardSchedule = value[0];
          this.dataInstance.item!.currentSchedule = this.currentStandardSchedule;
          const fieldValues = this.dataInstance.getFieldValues(this.fields);
          this.props.form.setFieldsValue(fieldValues);
        }
      });
  }
}

export default injectIntl(
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
  })(withRouter(ScheduleOffsetsRequestEditComponent))
);

