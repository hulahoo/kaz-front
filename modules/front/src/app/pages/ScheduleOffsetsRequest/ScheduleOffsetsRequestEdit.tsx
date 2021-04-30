import * as React from "react";
import {Alert, Card, Col, Form, Input, Select, Spin} from "antd";
import {inject, observer} from "mobx-react";
import {FormComponentProps} from "antd/lib/form";
import {action, IReactionDisposer, observable, toJS} from "mobx";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";

import {
  collection, DataCollectionStore,
  Field,
  getCubaREST,
  injectMainStore,
  instance, Msg,
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
import {instanceStore} from "../../util/InstanceStore";
import {restServices} from "../../../cuba/services";
import {OrgStructureRequest} from "../../../cuba/entities/base/tsadv_OrgStructureRequest";
import DefaultDatePicker, {DEFAULT_DATE_FORMAT} from "../../components/Datepicker";
import EntityField from "../../components/EntityField/EntityField";
import {queryCollection, QueryDataCollectionStore} from "../../util/QueryDataCollectionStore";
import {DicSchedulePurpose} from "../../../cuba/entities/base/tsadv_DicSchedulePurpose";
import {Goal} from "../../../cuba/entities/base/tsadv$Goal";
import TextArea from "antd/es/input/TextArea";
import MsgEntity from '../../components/MsgEntity';
import {AssignedGoal} from "../../../cuba/entities/base/tsadv$AssignedGoal";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
  personGroupId?: string;
};

@injectMainStore
@inject("rootStore")
@observer
class ScheduleOffsetsRequestEditComponent extends AbstractAgreedBprocEdit<ScheduleOffsetsRequest, EditorProps> {

  dataInstance = instanceStore<ScheduleOffsetsRequest>(ScheduleOffsetsRequest.NAME, {
    view: "scheduleOffsetsRequest-for-my-team",
    loadImmediately: false
  });

  @observable
  loaded: boolean = false;

  newSchedulesDc = collection<StandardSchedule>(StandardSchedule.NAME, {
    view: "_minimal"
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  purposesDc = collection<DicSchedulePurpose>(DicSchedulePurpose.NAME, {
    view: "_minimal",
    filter: {
      conditions: [
        {
          group: "OR",
          conditions: [{
            property: 'company',
            operator: '=',
            value: this.props.rootStore!.userInfo.companyId!
          }, {
            property: 'company.code',
            operator: '=',
            value: 'empty'
          }]
        }]
    }
  });

  standardScheduleDc: QueryDataCollectionStore<StandardSchedule>;

  personGroupDc: DataCollectionStore<PersonGroupExt>;

  processDefinitionKey = "scheduleOffsetsRequest";

  @observable
  updated = false;

  @observable
  isVisiblePurposeText = false;

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
  globalErrors
    :
    string[] = [];

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

    const messages = this.props.mainStore!.messages!;

    const {Option} = Select;
    return (
      <Page pageName={<MsgEntity entityName={ScheduleOffsetsRequest.NAME}/>}>
        <Spin spinning={!this.loaded}>
          <Section size="large">
            <div>
              <Card className="narrow-layout card-actions-container" actions={[
                <Button buttonType={ButtonType.FOLLOW}
                        onClick={this.props.history!.goBack.bind(null)}>{this.props.intl.formatMessage({id: "close"})}</Button>,
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
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[ScheduleOffsetsRequest.NAME + '.' + 'requestNumber']})
                      }]
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
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[ScheduleOffsetsRequest.NAME + '.' + 'status']})
                      }]
                    }}
                  />

                  <ReadonlyField
                    entityName={this.dataInstance.entityName}
                    propertyName="requestDate"
                    disabled={true}
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    optionsContainer={this.statusesDc}
                    format={DEFAULT_DATE_FORMAT}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[ScheduleOffsetsRequest.NAME + '.' + 'requestDate']})
                      }]
                    }}
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
                    optionsContainer={this.standardScheduleDc}
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
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[ScheduleOffsetsRequest.NAME + '.' + 'newSchedule']})
                      }]
                    }}
                  />

                  <Form.Item label={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName={"purpose"}/>}
                             key='purpose'
                             style={{marginBottom: '12px'}}>
                    {this.props.form.getFieldDecorator('purpose', {
                      validateTrigger: ["onChange", "onBlur"],
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[ScheduleOffsetsRequest.NAME + '.' + 'purpose']})
                      }]
                    })(
                      <Select onChange={this.changePurpose}>
                        {this.purposesDc.items.map(p => {
                          //@ts-ignore
                          return <Option value={p.id}
                                         code={p.code}>{p._instanceName}</Option>
                        })}
                      </Select>
                    )}
                  </Form.Item>

                  <Form.Item label={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName={"purposeText"}/>}
                             key='purposeText'
                             style={{marginBottom: '12px', display: this.isVisiblePurposeText ? 'block' : 'none'}}>
                    {this.props.form.getFieldDecorator('purposeText', {})(
                      <Input maxLength={50}/>
                    )}
                  </Form.Item>

                  <ReadonlyField
                    entityName={this.dataInstance.entityName}
                    propertyName="dateOfNewSchedule"
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    optionsContainer={this.statusesDc}
                    format={DEFAULT_DATE_FORMAT}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[ScheduleOffsetsRequest.NAME + '.' + 'dateOfNewSchedule']})
                      }]
                    }}
                  />

                  <ReadonlyField
                    entityName={this.dataInstance.entityName}
                    propertyName="dateOfStartNewSchedule"
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    optionsContainer={this.statusesDc}
                    format={DEFAULT_DATE_FORMAT}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[ScheduleOffsetsRequest.NAME + '.' + 'dateOfNewSchedule']})
                      }]
                    }}
                  />

                  <Form.Item
                    label={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName={"detailsOfActualWork"}/>}
                    key='detailsOfActualWork'
                    style={{marginBottom: '12px'}}>
                    {this.props.form.getFieldDecorator('detailsOfActualWork', {})(
                      <TextArea
                        rows={4} maxLength={2000}/>
                    )}
                  </Form.Item>

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
        </Spin>
      </Page>
    );
  }

  changePurpose = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    const purposeCode = option!.props["code"];
    this.setIsVisiblePurposeText(purposeCode);

    this.props.form.setFieldsValue({
      purposeText: undefined
    });
  };

  @action
  setIsVisiblePurposeText = (purposeCode?: string | null) => {
    this.isVisiblePurposeText = purposeCode == undefined ? false : purposeCode.toLowerCase() === 'other';
  };

  getUpdateEntityData = (): any => {
    if (this.isNotDraft())
      return {
        ...this.props.form.getFieldsValue(this.fields)
      };

    return {
      ...this.props.form.getFieldsValue(this.fields)
    }
  };

  loadData = async () => {
    if (!this.isNew()) {
      await this.dataInstance.load(this.props.entityId);
    } else {
      const entityName = this.dataInstance.entityName;
      this.initItem(await restServices.portalHelperService.newEntity({entityName: entityName}));
    }
  };

  componentDidMount() {
    (async () => {
      this.setReactionDisposer();
      await this.loadData();
      await this.loadBpmProcessData();

      const personGroupId: string = this.props.personGroupId ? this.props.personGroupId : this.dataInstance.item!.personGroup!.id;

      this.standardScheduleDc = queryCollection<StandardSchedule>(StandardSchedule.NAME, "currentStandardSchedule", {
        personGroupId: personGroupId
      });

      if (this.isNew()) {
        this.standardScheduleDc.afterLoad = () => {
          this.dataInstance.item!.currentSchedule = this.standardScheduleDc.items![0];
          this.updateFields();

          this.loaded = true;
        }
      } else {
        this.setIsVisiblePurposeText(this.dataInstance.item!.purpose! ? this.dataInstance.item!.purpose!.code : undefined)
      }

      this.loadPersonGroupDc(personGroupId);

      await this.loadPerson(personGroupId);

      this.setEmployee(personGroupId);

      this.updateFields();

      if (!this.isNew()) {
        this.loaded = true;
      }
    })()
  }

  updateFields = () => {
    const fieldValues = this.dataInstance.getFieldValues(this.fields);
    this.props.form.setFieldsValue(fieldValues);
  };

  loadPersonGroupDc = (personGroupId: string) => {
    this.personGroupDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
      view: "_minimal",
      filter: {
        conditions: [{
          property: "id",
          operator: "=",
          value: personGroupId
        }]
      },
      limit: 10
    });
    this.personGroupDc.load();
  };

  componentWillUnmount() {
    this.reactionDisposer();
  }

  afterSendOnApprove = () => {
    this.props.history!.goBack();
  };

  loadPerson = async (personGroupId: string): Promise<void> => {
    const response = await getCubaREST()!.searchEntities<PersonGroupExt>(PersonGroupExt.NAME, {
      conditions: [{
        property: 'id',
        operator: '=',
        value: personGroupId,
      }]
    }, {
      view: 'personGroupExt-absenceEdit'
    });
    this.dataInstance.item!.personGroup = response[0];
  };

  isNew = () => {
    return this.props.entityId === "new";
  }

  // loadCurrentScheduleOffset(personGroupId: string) {
  //   return restQueries.currentStandardSchedule(personGroupId)
  //     .then(value => {
  //       if (value.length > 0) {
  //         this.currentStandardSchedule = value[0];
  //         this.dataInstance.item!.currentSchedule = this.currentStandardSchedule;
  //         const fieldValues = this.dataInstance.getFieldValues(this.fields);
  //         this.props.form.setFieldsValue(fieldValues);
  //       }
  //     });
  // }
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

