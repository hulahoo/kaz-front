import * as React from "react";
import {Alert, Card, Form, message} from "antd";
import {inject, observer} from "mobx-react";
import {CertificateRequestManagement} from "./CertificateRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect, RouteComponentProps} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {restServices} from "../../../cuba/services";

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  injectMainStore,
  instance,
  MainStoreInjected,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../App.css";

import {CertificateRequest} from "../../../cuba/entities/base/tsadv_CertificateRequest";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {DicReceivingType} from "../../../cuba/entities/base/tsadv_DicReceivingType";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import {DicLanguage} from "../../../cuba/entities/base/tsadv$DicLanguage";
import {DicCertificateType} from "../../../cuba/entities/base/tsadv_DicCertificateType";
import {RootStoreProp} from "../../store";
import {ReadonlyField} from "../../components/ReadonlyField";
import {ExtTaskDataCards} from "../bproc/TaskData/ExtTaskDataCards";
import {ProcessInstanceData} from "../../../cuba/entities/base/bproc_ProcessInstanceData";
import LoadingPage from "../LoadingPage";
import {BprocButtons} from "../bproc/buttons/BprocButtons";
import {ExtTaskData} from "../../../cuba/entities/base/tsadv_ExtTaskData";
import {BprocFormData} from "../../../cuba/entities/bproc/bproc_FormData";
import Button, {ButtonType} from "../../components/Button/Button";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class CertificateRequestEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>> {

  dataInstance = instance<CertificateRequest>(CertificateRequest.NAME, {
    view: "portal.certificateRequest-edit",
    loadImmediately: false
  });

  statusesDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  receivingTypesDc = collection<DicReceivingType>(DicReceivingType.NAME, {
    view: "_minimal"
  });

  filesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  languagesDc = collection<DicLanguage>(DicLanguage.NAME, {view: "_minimal"});

  certificateTypesDc = collection<DicCertificateType>(DicCertificateType.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;

  reactionDisposer: IReactionDisposer;

  @observable
  mainStore = this.props.mainStore!;

  processInstanceData: ProcessInstanceData | null;

  @observable
  tasks: ExtTaskData[] | null;

  @observable
  activeTask: ExtTaskData | null;

  @observable
  formData: BprocFormData | null;

  @observable
  isStartForm: boolean | true;

  fields = [
    "requestNumber",

    "requestDate",

    "showSalary",

    "numberOfCopy",

    "status",

    "receivingType",

    "file",

    "language",

    "certificateType"
  ];

  @observable
  globalErrors: string[] = [];

  createElement = React.createElement;

  @observable
  isValidatedSuccess = false;

  validate = () => {

    console.log("validate")

    this.props.form.validateFields((err, values) => {

      this.isValidatedSuccess = !err;

      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }
    });
  };

  update = () => {
    if (!this.isValidatedSuccess) return;
    const updateEntityData = {
      personGroup: {
        id: this.props.rootStore!.userInfo.personGroupId
      },
      ...this.props.form.getFieldsValue(this.fields)
    };
    this.dataInstance
      .update(updateEntityData)
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
  }

  takCard() {
    if (!this.tasks) return <div/>;
    const tasks = Array.from(this.tasks);
    return <ExtTaskDataCards tasks={tasks}/>
  }

  render() {
    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    if (this.updated) {
      return <Redirect to={CertificateRequestManagement.PATH}/>;
    }

    const {status} = this.dataInstance;

    const isDraft = this.dataInstance.item && this.dataInstance.item.status ? this.dataInstance.item.status.code !== "DRAFT" : true;

    const messages = this.mainStore.messages!;

    if (!messages) return <LoadingPage/>

    const outcomeBtns = this.formData ? <BprocButtons dataInstance={this.dataInstance}
                                                      formData={this.formData}
                                                      validate={this.validate}
                                                      update={this.update}
                                                      isValidatedSuccess={() => this.isValidatedSuccess}
                                                      processInstanceData={this.processInstanceData}
                                                      isStartForm={this.isStartForm}
                                                      redirectPath={CertificateRequestManagement.PATH}
                                                      processDefinitionKey={'certificateRequest'}
                                                      task={this.activeTask}/> : null;
    return (
      <Page pageName={this.props.intl.formatMessage({id: "certificateRequest"})}>
        <Section size="large">
          <div>
            <Card className="narrow-layout" bordered={false}>
              <Form onSubmit={this.validate} layout="vertical">
                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="requestNumber"
                  form={this.props.form}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  disabled={true}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
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
                  entityName={CertificateRequest.NAME}
                  propertyName="requestDate"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{required: true,}]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="receivingType"
                  form={this.props.form}
                  disabled={isDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.receivingTypesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.receivingType']})
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="certificateType"
                  form={this.props.form}
                  disabled={isDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.certificateTypesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.certificateType']})
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="language"
                  form={this.props.form}
                  disabled={isDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  optionsContainer={this.languagesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.language']})
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="showSalary"
                  form={this.props.form}
                  disabled={isDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.showSalary']})
                    }],
                    valuePropName: "checked"
                  }}
                />

                <ReadonlyField
                  entityName={CertificateRequest.NAME}
                  propertyName="numberOfCopy"
                  form={this.props.form}
                  disabled={isDraft}
                  formItemOpts={{style: {marginBottom: "12px"}}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[CertificateRequest.NAME + '.numberOfCopy']})
                    }]
                  }}

                />

                {this.takCard()}

                {this.globalErrors.length > 0 && (
                  <Alert
                    message={<MultilineText lines={toJS(this.globalErrors)}/>}
                    type="error"
                    style={{marginBottom: "24px"}}
                  />
                )}

                <Form.Item style={{textAlign: "center"}}>

                  {outcomeBtns}

                  <Link to={CertificateRequestManagement.PATH}>
                    <Button buttonType={ButtonType.FOLLOW} htmlType="button">
                      <FormattedMessage id="management.editor.cancel"/>
                    </Button>
                  </Link>
                </Form.Item>
              </Form>
            </Card>

          </div>
        </Section>
      </Page>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== CertificateRequestManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
      restServices.bprocService.processInstanceData({
        processInstanceBusinessKey: this.props.entityId,
        processDefinitionKey: 'certificateRequest'
      }).then(value => {
        this.processInstanceData = value;
        if (value) {
          restServices.bprocService.tasks({processInstanceData: value})
            .then(tasks => {
              this.tasks = tasks;
              this.activeTask = tasks.find(task => !task.endTime) as ExtTaskData;

              if (this.activeTask)
                restServices.bprocFormService.getTaskFormData({taskId: this.activeTask.id!})
                  .then(formData => {
                    this.formData = formData;
                    this.isStartForm = false;
                  });
            })
        } else {
          restServices.bprocService.getStartFormData({processDefinitionKey: 'certificateRequest'})
            .then(formData => {
              this.formData = formData;
              this.isStartForm = true;
            });
          // this.dataInstance.item!.requestDate = Date.now(); //todo
        }
      })
    } else {
      restServices.portalHelperService.newEntity({entityName: this.dataInstance.entityName}).then((response: string) => {

        restServices.bprocService.getStartFormData({processDefinitionKey: 'certificateRequest'})
          .then(formData => {
            this.formData = formData;
            this.isStartForm = true;
          });

        this.dataInstance.setItem(JSON.parse(response));

        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
        );

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

export default injectIntl(
  withLocalizedForm<EditorProps>({
    onValuesChange: (props: any, changedValues: any, allValues: any) => {
      // Reset server-side errors when field is edited
      Object.keys(changedValues).forEach((fieldName: string) => {
        props.form.setFields({
          [fieldName]: {
            value: changedValues[fieldName]
          }
        });
      });
    }
  })(CertificateRequestEditComponent)
);
