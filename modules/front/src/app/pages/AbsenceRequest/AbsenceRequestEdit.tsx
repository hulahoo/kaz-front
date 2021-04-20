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
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import TextArea from "antd/es/input/TextArea";
import {observable, reaction} from "mobx";
import moment from "moment/moment";
import {Absence} from "../../../cuba/entities/base/tsadv$Absence";
import {dictionaryCollection, DictionaryDataCollectionStore} from "../../util/DictionaryDataCollectionStore";

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

  filesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  personGroupId: string;

  @observable
  isJustRequired = false;

  @observable
  isOriginalSheet = false;

  @observable
  isVacationDate = false;

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

    "attachment"
  ];

  assignmentGroupId: string;

  getUpdateEntityData = (): any => {
    if (this.isNotDraft()) return {...this.props.form.getFieldsValue(this.fields)};
    return {
      personGroup: {
        id: this.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields)
    }
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
    if (!this.dateValidator('dateFrom') || !value) {
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
                      onClick={this.props.history!.goBack}>{this.props.intl.formatMessage({id: "close"})}</Button>,
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
                    rules: [{required: true,}],
                  }}
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
                      this.isJustRequired = !!absenceType.isJustRequired;
                      this.isOriginalSheet = !!absenceType.isOriginalSheet;
                      this.isVacationDate = !!absenceType.isVacationDate;
                      this.calcAbsenceDays(typeId, null, null);

                      this.setDaysBeforeAbsenceWaring(absenceType);

                      return typeId;
                    },
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="dateFrom"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      validator: this.dateFromValidator
                    }],
                    getValueFromEvent: args => {
                      this.calcAbsenceDays(null, args, null);
                      return args
                    }
                  }}
                />

                {warningMessage}

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="dateTo"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "validation.absenceRequest.dateTo"}),
                      validator: this.dateValidator
                    }],
                    getValueFromEvent: args => {
                      this.calcAbsenceDays(null, null, args);
                      return args
                    }
                  }}
                />

                <ReadonlyField
                  entityName={this.dataInstance.entityName}
                  propertyName="absenceDays"
                  form={this.props.form}
                  getFieldDecoratorOpts={{
                    rules: [
                      {
                        validator: (rule, value, callback) => {
                          const type = this.getSelectedAbsenceType();
                          if (!type || !value) return callback();
                          if (type.maxDay && type.maxDay < value) {
                            callback(this.props.intl.formatMessage({id: 'validation.absenceRequest.absenceDays.maxDay'}, {
                              maxDay: type.maxDay
                            }));
                          } else if (type.minDay && type.minDay > value) {
                            callback(this.props.intl.formatMessage({id: 'validation.absenceRequest.absenceDays.minDay'}, {
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
                  optionsContainer={this.filesDc}
                  getFieldDecoratorOpts={{}}/>

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
        this.props.form.validateFields(['absenceDays'], {force: true})
      })
    }
  }

  initVariablesByBproc = () => {
    if (this.activeTask && this.activeTask.hrRole && this.activeTask.hrRole.code) {
      this.approverHrRoleCode = this.activeTask.hrRole.code;
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

        const obj = {
          originalSheet: (item && item.originalSheet) === true,
          ...this.dataInstance.getFieldValues(this.fields)
        };
        if (this.isCalledProcessInstanceData && !this.processInstanceData) {
          const now = moment();
          now.locale(this.props.rootStore!.userInfo.locale!);
          obj["requestDate"] = now;
        }
        this.props.form.setFieldsValue(obj);

        this.setDaysBeforeAbsenceWaring(item!.type);
      }
    );
  };
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
