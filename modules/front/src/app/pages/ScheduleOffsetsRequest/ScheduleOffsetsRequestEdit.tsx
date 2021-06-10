import * as React from "react";
import {Card, Form, Input, Select, Spin} from "antd";
import {inject, observer} from "mobx-react";
import {action, IReactionDisposer, observable} from "mobx";
import {FormattedMessage, injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";

import {
  collection,
  DataCollectionStore,
  getCubaREST,
  injectMainStore,
  Msg,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {ScheduleOffsetsRequest} from "../../../cuba/entities/base/tsadv_ScheduleOffsetsRequest";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import {StandardSchedule} from "../../../cuba/entities/base/tsadv$StandardSchedule";
import {ReadonlyField} from "../../components/ReadonlyField";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import LoadingPage from "../LoadingPage";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import AbstractAgreedBprocEdit from "../Bproc/abstract/AbstractAgreedBprocEdit";
import Notification from "../../util/Notification/Notification";
import {instanceStore} from "../../util/InstanceStore";
import {restServices} from "../../../cuba/services";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";
import {queryCollection, QueryDataCollectionStore} from "../../util/QueryDataCollectionStore";
import {DicSchedulePurpose} from "../../../cuba/entities/base/tsadv_DicSchedulePurpose";
import TextArea from "antd/es/input/TextArea";
import MsgEntity from '../../components/MsgEntity';
import {dictionaryCollection, DictionaryDataCollectionStore} from "../../util/DictionaryDataCollectionStore";
import {DicEarningPolicy} from "../../../cuba/entities/base/tsadv_DicEarningPolicy";
import {Moment} from "moment";
import {ScheduleOffsetsRequestManagement} from "./ScheduleOffsetsRequestManagement";

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

  purposesDc: DictionaryDataCollectionStore<DicSchedulePurpose>;

  standardScheduleDc: QueryDataCollectionStore<StandardSchedule>;

  personGroupDc: DataCollectionStore<PersonGroupExt>;

  earningPolicyDc: DictionaryDataCollectionStore<DicEarningPolicy>;

  processDefinitionKey = "scheduleOffsetsRequest";

  @observable
  updated = false;

  @observable
  isVisiblePurposeText = false;

  @observable
  isDisabledFields = true;

  @observable
  daysBeforeAbsence: number;

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

    "status",

    "earningPolicy",

    "files"
  ];

  @observable
  globalErrors: string[] = [];

  beforeCompletePredicate = (outcome: string): Promise<boolean> => {
    if (outcome == 'APPROVE' && this.approverHrRoleCode === 'EMPLOYEE') {
      const isAgree = this.props.form.getFieldValue('agree');
      const isFamiliarization = this.props.form.getFieldValue('acquainted');

      if (!isAgree) {
        Notification.info({
            message: this.props.intl.formatMessage({id: "for.approving.must.to.check.field"},
              {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.agree']})
          }
        )
      }

      if (!isFamiliarization) {
        Notification.info({
            message: this.props.intl.formatMessage({id: "for.approving.must.to.check.field"},
              {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.familiarization']})
          }
        )
      }

      if (!isAgree || !isFamiliarization)
        return new Promise(resolve => resolve(false));
    }
    return new Promise(resolve => resolve(true));
  };

  actions = () => {
    const {status} = this.dataInstance;

    const actions = [];

    if (this.isNewEntity())
      actions.push(<Button buttonType={ButtonType.PRIMARY}
                           disabled={status !== "DONE" && status !== "ERROR"}
                           loading={status === "LOADING"}
                           onClick={this.saveRequest}>
        <FormattedMessage id="management.editor.submit"/>
      </Button>);

    actions.push(<Button buttonType={ButtonType.FOLLOW}
                         onClick={this.props.history!.goBack.bind(null)}>{this.props.intl.formatMessage({id: "close"})}</Button>);

    if (!this.isNewEntity()) {
      actions.push(<Button buttonType={ButtonType.FOLLOW}
                           onClick={this.report}>{this.props.intl.formatMessage({id: "report"})}</Button>);

      actions.push(this.getOutcomeBtns());
    }

    return actions;
  }

  saveRequest = (e: React.MouseEvent) => {
    e.preventDefault();

    this.props.form.validateFields(this.fields, {force: true}, (err, values) => {
      if (err) {
        Notification.error({
          message:
            this.props.intl.formatMessage({
              id: "management.editor.validationError"
            })
        });
        return;
      }

      this.update().then(value => this.props.history.push(ScheduleOffsetsRequestManagement.PATH + "/" + this.dataInstance.item!.id));

    });
  }

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
              <Card className="narrow-layout card-actions-container" actions={this.actions()}
                    bordered={false}>
                <Form onSubmit={this.validate} layout="vertical">

                  <ReadonlyField
                    entityName={this.dataInstance.entityName}
                    propertyName="requestNumber"
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    disabled
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
                    disabled
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
                    disabled
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    optionsContainer={this.statusesDc}
                    format={DEFAULT_DATE_PATTERN}
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
                    disabled
                  />


                  <ReadonlyField
                    entityName={ScheduleOffsetsRequest.NAME}
                    propertyName="currentSchedule"
                    optionsContainer={this.standardScheduleDc}
                    form={this.props.form}
                    disabled
                    formItemOpts={{style: {marginBottom: "12px"}}}
                  />

                  <ReadonlyField
                    entityName={ScheduleOffsetsRequest.NAME}
                    propertyName="newSchedule"
                    form={this.props.form}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    optionsContainer={this.newSchedulesDc}
                    disabled={this.isDisabledFields}
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
                      <Select onChange={this.changePurpose} disabled={this.isDisabledFields}>
                        {this.purposesDc && this.purposesDc.items
                          ? this.purposesDc.items.map(p => {
                            //@ts-ignore
                            return <Option value={p.id}
                                           key={p.id}
                                           code={p.code}>{p._instanceName}</Option>
                          })
                          : null
                        }
                      </Select>
                    )}
                  </Form.Item>

                  <Form.Item label={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName={"purposeText"}/>}
                             key='purposeText'
                             style={{marginBottom: '12px', display: this.isVisiblePurposeText ? 'block' : 'none'}}>
                    {this.props.form.getFieldDecorator('purposeText', {})(
                      <Input maxLength={50} disabled={this.isDisabledFields}/>
                    )}
                  </Form.Item>

                  <ReadonlyField
                    entityName={this.dataInstance.entityName}
                    propertyName="dateOfNewSchedule"
                    form={this.props.form}
                    disabled={this.isDisabledFields}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    optionsContainer={this.statusesDc}
                    format={DEFAULT_DATE_PATTERN}
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
                    format={DEFAULT_DATE_PATTERN}
                    disabled={this.isDisabledFields}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        validator: (rule, value, callback) => {
                          if (!value) return callback(this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[ScheduleOffsetsRequest.NAME + '.' + 'dateOfNewSchedule']}));

                          if (this.daysBeforeAbsence) {
                            const {
                              dateOfStartNewSchedule,
                              requestDate
                            } = this.props.form.getFieldsValue(["dateOfStartNewSchedule", "requestDate"]);
                            const numberOfDays = (dateOfStartNewSchedule as Moment).diff((requestDate as Moment).clone().add(1, 'days'), 'days');
                            if (numberOfDays < this.daysBeforeAbsence) {
                              return callback(this.props.intl.formatMessage({id: 'scheduleOffsetRequest.validate.daysBeforeAbsence'}, {numberOfDays: this.daysBeforeAbsence}))
                            }
                          }

                          return callback();
                        }
                      }]
                    }}
                  />

                  <Form.Item
                    label={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName={"detailsOfActualWork"}/>}
                    key='detailsOfActualWork'
                    style={{marginBottom: '12px'}}>
                    {this.props.form.getFieldDecorator('detailsOfActualWork', {})(
                      <TextArea
                        disabled={this.isDisabledFields}
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

                  <ReadonlyField
                    entityName={ScheduleOffsetsRequest.NAME}
                    propertyName="earningPolicy"
                    form={this.props.form}
                    disabled={this.isDisabledFields}
                    optionsContainer={this.earningPolicyDc}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[ScheduleOffsetsRequest.NAME + '.' + 'earningPolicy']})
                      }]
                    }}
                  />

                  <ReadonlyField
                    entityName={ScheduleOffsetsRequest.NAME}
                    propertyName="comment"
                    form={this.props.form}
                    disabled={this.isDisabledFields}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                  />

                  <ReadonlyField
                    entityName={ScheduleOffsetsRequest.NAME}
                    propertyName="files"
                    form={this.props.form}
                    disabled={this.isDisabledFields}
                    formItemOpts={{style: {marginBottom: "12px"}}}
                  />

                  {this.takCard()}

                </Form>
              </Card>
            </div>
          </Section>
        </Spin>
      </Page>
    );
  }

  report = () => {

    const data = {
      parameters: [{
        name: "req",
        value: this.props.entityId
      }]
    };

    const reportCode = "REP_SHEDULE_REQUEST";

    restServices.reports.loadReportByCode(reportCode)
      .then(report => {
        restServices.reports.run(report.id,
          data,
          reason => Notification.error({
            message: this.props.intl.formatMessage({id: "management.editor.error"})
          })
        )
      }).catch(reason => {
      Notification.error({
        message: this.props.intl.formatMessage({id: "report.not.found"}, {
          reportCode: reportCode
        })
      })
    })
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

  validate = (): Promise<boolean> => {
    let isValidatedSuccess = true;
    this.props.form.validateFields(this.fields, {force: true}, (err, values) => {
      isValidatedSuccess = !err;
      if (err) {
        Notification.error({
          message: this.props.intl.formatMessage({id: "management.editor.validationError"})
        });
      }
    });
    if (isValidatedSuccess) {
    }
    return new Promise(resolve => resolve(isValidatedSuccess));
  };

  loadData = async () => {
    if (!this.isNewEntity()) {
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

      const scheduleOffsetRequest = this.dataInstance.item!;
      const personGroupId: string = this.props.personGroupId ? this.props.personGroupId : scheduleOffsetRequest.personGroup!.id;

      this.standardScheduleDc = queryCollection<StandardSchedule>(StandardSchedule.NAME, "currentStandardSchedule", {
        personGroupId: personGroupId
      });

      if (this.isNewEntity()) {
        this.standardScheduleDc.afterLoad = () => {
          this.dataInstance.item!.currentSchedule = this.standardScheduleDc.items![0];
          this.updateFields();

          this.loaded = true;
        }
      } else {
        this.setIsVisiblePurposeText(scheduleOffsetRequest.purpose! ? scheduleOffsetRequest.purpose!.code : undefined)
      }
      this.setIsDisabledFields(scheduleOffsetRequest.status!.code!.toLowerCase() != 'draft');

      this.loadPersonGroupDc(personGroupId);

      await this.loadPerson(personGroupId);

      this.loadEarningPolicyDc(personGroupId);

      this.loadPurposesDc(personGroupId);

      this.setEmployee(personGroupId);

      this.updateFields();

      if (!this.isNewEntity()) {
        this.loaded = true;
      }

      restServices.absenceService.scheduleOffsetDaysBeforeAbsence().then(response => {
        if (response) {
          this.daysBeforeAbsence = Number(response);
        }
      });
    })()
  }

  loadEarningPolicyDc = (personGroupId: string) => {
    this.earningPolicyDc = dictionaryCollection<DicEarningPolicy>(DicEarningPolicy.NAME, personGroupId, {});
  };

  loadPurposesDc = (personGroupId: string) => {
    this.purposesDc = dictionaryCollection<DicSchedulePurpose>(DicSchedulePurpose.NAME, personGroupId, {});
  };

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
    if (this.isNotDraft()) this.props.history!.goBack();
    else this.props.history!.push(ScheduleOffsetsRequestManagement.PATH);
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

  @action
  setIsDisabledFields = (value: boolean): void => {
    this.isDisabledFields = value;
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

