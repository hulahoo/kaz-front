import * as React from "react";
import { createElement, FormEvent } from "react";
import {
  Alert,
  Card,
  Form,
  Input,
  message,
  Modal,
  Row,
  Table,
  Spin
} from "antd";
import Button, { ButtonType } from "../../components/Button/Button";

import { inject, observer } from "mobx-react";
import { ConcourseRequestManagement } from "./ConcourseRequestManagement";
import { FormComponentProps } from "antd/lib/form";
import { Redirect } from "react-router-dom";
import { IReactionDisposer, observable, reaction, toJS, action } from "mobx";
import { FormattedMessage, injectIntl } from "react-intl";
import { DEFAULT_DATE_PATTERN } from "../../util/Date/Date";
import TextArea from "antd/es/input/TextArea";
import Column from "antd/lib/table/Column";

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  DataTable,
  extractServerValidationErrors,
  Field,
  getCubaREST,
  injectMainStore,
  instance,
  Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";
import { restServices } from "../../../cuba/services";
import { ConcourseRequest } from "../../../cuba/entities/base/tsadv_ConcourseRequest";
import { PersonGroupExt } from "../../../cuba/entities/base/base$PersonGroupExt";
import { FileDescriptor } from "../../../cuba/entities/base/sys$FileDescriptor";
import { DicRequestStatus } from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import { withRouter } from "react-router";
import { ReadonlyField } from "../../components/ReadonlyField";
import "antd/dist/antd.css";
import { PersonExt } from "../../../cuba/entities/base/base$PersonExt";
import { goBackOrHomePage } from "../../util/util";
import LoadingPage from "../LoadingPage";
import { SerializedEntity } from "@cuba-platform/rest";
import { ConcourseRequestAttachments } from "../../../cuba/entities/base/tsadv_ConcourseRequestAttachments";
import ConcourseRequestAttachmentsList from "./ConcourseRequestAttachments/ConcourseRequestAttachmentsList";
import DataTableFormat from "../../components/DataTable/intex";
import ConcourseRequestAttachmentsEdit from "./ConcourseRequestAttachments/ConcourseRequestAttachmentsEdit";
import { ConcourseRequestAttachmentsManagement } from "./ConcourseRequestAttachments/ConcourseRequestAttachmentsManagement";
import { Concourse } from "../../../cuba/entities/base/tsadv_Concourse";
import { ConcourseFile } from "./ConcourseTemplateFile";
import moment from "moment";
// import ConcourseRequestDocumentList from "./ConcourseRequestDocument/ConcourseRequestDocumentList";
// import ConcourseRequestDocumentEdit from "./ConcourseRequestDocument/ConcourseRequestDocumentEdit";
// import {ConcourseRequestDocument} from "../../../cuba/entities/base/tsadv_ConcourseRequestDocument";

type EditorProps = {
  entityId: string;
};

type Props = FormComponentProps & EditorProps;

@injectMainStore
@inject("rootStore")
@observer
class ConcourseRequestEditComponent extends AbstractBprocEdit<
  ConcourseRequest,
  Props
> {
  dataInstance = instance<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-edit",
    loadImmediately: false
  });

  dataCollection = collection<ConcourseRequestAttachments>(
    ConcourseRequestAttachments.NAME,
    {
      view: "concourseRequestAttachments-view",
      sort: "-updateTs",
      filter: {
        conditions: [
          {
            value: this.props.form.getFieldValue("requestNumber"),
            operator: "=",
            property: "concourseRequestNumber"
          }
        ]
      }
    }
  );

  concoursesDc = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    filter: {
      conditions: [
        {
          value: this.props.location.search.split("=")[1],
          operator: "=",
          property: "id"
        }
      ]
    }
  });

  requestAttachmentssDc = collection<ConcourseRequestAttachments>(
    ConcourseRequestAttachments.NAME,
    {
      view: "concourseRequestAttachments-view",
      sort: "-updateTs",
      filter: {
        conditions: [
          {
            value: this.props.form.getFieldValue("requestNumber"),
            operator: "=",
            property: "concourseRequestNumber"
          }
        ]
      }
    }
  );

  personGroupsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_base",
  });

  statussDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_base"
  });

  processDefinitionKey = "concourseRequest";

  @observable
  readonly: boolean = true;

  @observable
  updated = false;

  reactionDisposer: IReactionDisposer;

  @observable
  person: PersonExt | null;

  @observable
  personGroupId: string;

  initiatorCompanyName: string | undefined;

  initiatorPositionValue: string | undefined;

  fields = [
    "status",

    "endDate",

    "scaleOfDistrubution",

    "managerContactInfo",

    "managerPosition",

    "managerCompany",

    "expertPosition",

    "personGroup",

    "projectManager",

    "projectExpert",

    "expertCompany",

    "expertContanctInfo",

    "shortProjectDescriptionRu",

    "shortProjectDescriptionEn",

    "requestNameRu",

    "requestNameEn",

    "startDate",

    "requestNumber",

    "requestDate",

    "requestAttachments",

    "personGroup",

    "initiatorCompany",

    "initiatorPosition",

    "category"
  ];

  attachmentFields = ["attachment", "comments"];

  @observable
  globalErrors: string[] = [];

  @observable selectedRowKey: string | undefined;

  @observable reqNumber: string;

  modalFields = ["comment", "attachment", "requestDate", "personGroup"];

  showDeletionDialog = (e: SerializedEntity<FileDescriptor>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        { id: "management.browser.delete.areYouSure" },
        { instanceName: e._instanceName }
      ),
      okText: this.props.intl.formatMessage({
        id: "management.browser.delete.ok"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "management.browser.delete.cancel"
      }),
      onOk: () => {
        this.selectedRowKey = undefined;

        return this.requestAttachmentssDc.delete(e);
      }
    });
  };

  // getUpdateEntityData(): any {
  //   if (this.isNotDraft())
  //     return super.getUpdateEntityData();
  //   return {
  //     personGroup: {
  //       id: this.personGroupId
  //     },
  //     ...super.getUpdateEntityData()
  //   };
  // }

  // update = () => {
  //   const updateEntityData = this.getUpdateEntityData();
  //   // if (this.approverHrRoleCode === 'MANAGER' && ((this.dataInstance.item && this.dataInstance.item.stage && this.dataInstance.item.stage.code) === 'ASSESSMENT')) {
  //   //   updateEntityData['lineManager'] = this.props.rootStore!.userInfo!.personGroupId;
  //   // }
  //
  //   return this.dataInstance.update({
  //     personGroup: this.personGroupId,
  //     ...updateEntityData});
  // };
  @observable
  visible: boolean = false;

  @observable
  isCreateMember: boolean = false;


  update = (): Promise<boolean> => {
    let promise: Promise<any> = new Promise<boolean>(resolve => resolve(false));
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }

      promise = this.dataInstance
        .update(this.props.form.getFieldsValue(this.fields))
        .then(() => {
          message.success(
            this.props.intl.formatMessage({ id: "management.editor.success" })
          );
          return true;
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
              this.props.intl.formatMessage({ id: "management.editor.error" })
            );
          }
        });
    });
    return promise;
  };

  showModal = () => {
    this.onChangeVisible(true);
  };

  @action
  onChangeVisible = (value: boolean): void => {
    this.visible = value;
  };

  @action
  onCategoryUpdate = ():void =>{
    this.update().then((data)=>{
      console.log("Category updated!")
    })
  }

  render() {
    if (this.updated) {
      return <Redirect to={ConcourseRequestManagement.PATH} />;
    }

    let isNotDraft = this.isNotDraft();

    if (this.concoursesDc.items[0]) {
      let dateNow = moment(Date.now());
      let requestDate = moment(this.concoursesDc.items[0]!.endVoting);

      if (dateNow.isAfter(requestDate)) {
        isNotDraft = true;
      }
    }

    const buttons = [
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        icon={"plus"}
        key="create"
        disabled={isNotDraft}
        onClick={() => {
          this.isCreateMember = true;
          this.showModal();
        }}
      >
        <span>
          <FormattedMessage
            id={this.props.intl.formatMessage({
              id: "concourseRequestAttachmentsCreate"
            })}
          />
        </span>
      </Button>,
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        icon={"edit"}
        key="edit"
        disabled={this.selectedRowKey === undefined}
        onClick={() => {
          this.isCreateMember = false;
          this.showModal();
        }}
      >
        <FormattedMessage id="management.browser.edit" />
      </Button>,
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        icon={"delete"}
        key="delete"
        disabled={isNotDraft ? true : this.selectedRowKey === undefined}
        onClick={this.deleteSelectedRow}
      >
        <FormattedMessage id="management.browser.remove" />
      </Button>
    ];

    const { status, entityName } = this.dataInstance;
    const messages = this.mainStore.messages!;
    let saveButton = true;
    if (!this.dataInstance) {
      return <LoadingPage />;
    }
    // console.log(this.personGroupsDc)

    let is_admin = this.takCard().props!.tasks &&
      this.takCard().props!.tasks![
      this.takCard().props!.tasks.length - 1
        ].name === "administrator_task"

    console.log(this.takCard(), is_admin)


    // console.log("Concourse:",this.concoursesDc)
    return (
      <div className="cardWrapper" id="concourseRequest">
        <h1>
          {this.props.entityId !== ConcourseRequestManagement.NEW_SUBPATH
            ? this.props.intl.formatMessage({ id: "concourseRequestEdit" })
            : this.props.intl.formatMessage({ id: "concourseRequestCreate" })}
        </h1>
        <Card
          className={`narrow-layout card-actions-container`}
          actions={[
            <Button
              buttonType={ButtonType.FOLLOW}
              htmlType={"button"}
              onClick={() => goBackOrHomePage(this.props.history!)}
            >
              {this.props.intl.formatMessage({ id: "close" })}
            </Button>,
            saveButton ? this.getOutcomeBtns() : null
          ]}
          bordered={false}
        >
          <Form onSubmit={this.validate} layout="vertical">
            <Card
              title={this.props.intl.formatMessage({
                id: "concourseGeneralInfo"
              })}
              size="small"
              className="generalInfo"
            >
              <Spin spinning={status == "LOADING"}>
                <Row
                  type={"flex"}
                  align="middle"
                  style={{
                    marginTop: "8px"
                  }}
                  justify={"space-between"}
                >
                  <ReadonlyField
                    // value={this.person ? this.person["_instanceName"]:""}
                    entityName={entityName}
                    propertyName="requestNumber"
                    disabled
                    form={this.props.form}
                    formItemOpts={{
                      style: {
                        maxWidth: "30%",
                        minWidth: "30%"
                      },
                      required:true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="requestDate"
                    disabled
                    form={this.props.form}
                    format={DEFAULT_DATE_PATTERN}
                    formItemOpts={{ style: { maxWidth: "30%",minWidth: "30%" }, required:true }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="status"
                    disabled={true}
                    form={this.props.form}
                    formItemOpts={{ style: { minWidth: "30%", maxWidth: "30%", }, required:true }}
                    optionsContainer={this.statussDc}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }],
                    }}
                  />
                </Row>

                <Row
                  type="flex"
                  align="middle"
                  style={{
                    marginBottom: "12px",
                    marginTop: "8px"
                  }}
                  justify={"space-between"}
                >
                  {/*<ReadonlyField*/}
                  {/*  entityName={entityName}*/}
                  {/*  propertyName="personGroup"*/}
                  {/*  form={this.props.form}*/}
                  {/*  disabled={true}*/}
                  {/*  formItemOpts={{ style: {minWidth: "30%", marginBottom: "12px" } }}*/}
                  {/*  optionsContainer={this.personGroupsDc}*/}
                  {/*  getFieldDecoratorOpts={{}}*/}

                  {/*/>*/}
                  {/*<Form.Item*/}
                  {/*  label={createElement(Msg, {*/}
                  {/*    entityName: entityName,*/}
                  {/*    propertyName: "personGroup"*/}
                  {/*  })}*/}
                  {/*  required={true}*/}
                  {/*  style={{minWidth: "30%", marginBottom: "12px"}}*/}
                  {/*>*/}
                  {/*  <Input*/}
                  {/*    value={this.person ? this.person["_instanceName"] || "" : ""}*/}
                  {/*    disabled*/}
                  {/*  />*/}
                  {/*</Form.Item>*/}

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="personGroup"
                    form={this.props.form}
                    disabled={true}
                    formItemOpts={{
                      style: { minWidth: "30%", maxWidth: "30%", marginBottom: "12px" }, required:true
                    }}
                    optionsContainer={this.personGroupsDc}
                    getFieldDecoratorOpts={{
                      // rules: [{ required: true }]
                    }}
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="initiatorCompany"
                    form={this.props.form}
                    disabled={true}
                    formItemOpts={{
                      style: { minWidth: "30%", maxWidth: "30%", marginBottom: "12px" }, required:true
                    }}
                    getFieldDecoratorOpts={{
                      // rules: [{ required: true }]
                    }}
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="initiatorPosition"
                    form={this.props.form}
                    disabled={true}
                    formItemOpts={{
                      style: { minWidth: "30%", maxWidth: "30%", marginBottom: "12px" }, required:true
                    }}
                    getFieldDecoratorOpts={{
                      // rules: [{ required: true }]
                    }}
                  />
                  {/*<Form.Item*/}
                  {/*  label={createElement(Msg, {*/}
                  {/*    entityName: entityName,*/}
                  {/*    propertyName: "initiatorCompany"*/}
                  {/*  })}*/}
                  {/*  required={true}*/}
                  {/*  style={{minWidth: "30%", marginBottom: "12px"}}*/}
                  {/*>*/}
                  {/*  <Input*/}
                  {/*    // value={this.initiatorCompanyName ? this.initiatorCompanyName || "" : ""}*/}
                  {/*    disabled*/}
                  {/*  />*/}
                  {/*</Form.Item>*/}

                  {/*<Form.Item*/}
                  {/*  label={createElement(Msg, {*/}
                  {/*    entityName: entityName,*/}
                  {/*    propertyName: "initiatorPosition"*/}
                  {/*  })}*/}
                  {/*  required={true}*/}
                  {/*  style={{minWidth: "30%", marginBottom: "12px"}}*/}
                  {/*>*/}
                  {/*  <Input*/}
                  {/*    // value={this.initiatorPositionValue ? this.initiatorPositionValue || "" : ""}*/}
                  {/*    disabled*/}
                  {/*  />*/}
                  {/*</Form.Item>*/}
                </Row>
                <Row
                  type="flex"
                  align={"middle"}
                  justify="space-between"
                  style={{}}
                >
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="requestNameRu"
                    disabled={isNotDraft}
                    form={this.props.form}
                    formItemOpts={{
                      style: { minWidth: "30%", maxWidth: "30%", marginBottom: "12px" }, required:true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            { fieldName: messages[entityName + ".requestNameRu"] }
                          )
                      }],

                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="requestNameEn"
                    form={this.props.form}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: { minWidth: "30%", maxWidth: "30%", marginBottom: "12px" }, required:true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: true,
                        message: this.props.intl.formatMessage(
                          { id: "form.validation.required" },
                          { fieldName: messages[entityName + ".requestNameEn"] }
                        )

                      }],

                    }}
                  />

                    <ReadonlyField
                      entityName={entityName}
                      propertyName="category"
                      form={this.props.form}
                      disabled={
                        this.props.rootStore!.userInfo!.personGroupId === this.personGroupId
                      }
                      formItemOpts={{
                        style: {
                          minWidth: "30%",
                          maxWidth: "30%",
                          marginBottom: "12px",
                          visibility: is_admin?"visible":"hidden"
                        }, required:true
                      }}
                      getFieldDecoratorOpts={{
                        rules: [{
                          required: is_admin,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            { fieldName: messages[entityName + ".category"] }
                          ) }],
                        getValueFromEvent: (id, val) => {
                          if (id) {
                            console.log(id, val)
                            this.props.form.setFieldsValue({
                              category: id,
                            })
                            this.onCategoryUpdate()
                            return id;
                          }
                        }
                      }}
                    />

                    <span style={{ visibility: is_admin?"hidden":"visible", minWidth: "30%" }}> </span>

                </Row>
                <Row type="flex" align="middle" justify={"space-between"}>
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="startDate"
                    form={this.props.form}
                    format={DEFAULT_DATE_PATTERN}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: { minWidth: "30%", maxWidth: "30%", marginBottom: "12px" }, required:true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true, message: this.props.intl.formatMessage(
                          { id: "form.validation.required" },
                          { fieldName: messages[entityName + ".startDate"] }
                        ) }]
                    }}
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="endDate"
                    form={this.props.form}
                    format={DEFAULT_DATE_PATTERN}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: { minWidth: "30%", maxWidth: "30%", marginBottom: "12px" }, required:true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true, message: this.props.intl.formatMessage(
                          { id: "form.validation.required" },
                          { fieldName: messages[entityName + ".endDate"] }
                        ) }]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="scaleOfDistrubution"
                    form={this.props.form}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: { minWidth: "30%" , maxWidth: "30%", marginBottom: "12px" }, required:true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true, message: this.props.intl.formatMessage(
                          { id: "form.validation.required" },
                          { fieldName: messages[entityName + ".scaleOfDistrubution"] }
                        ) }]
                    }}
                  />
                </Row>
              </Spin>
            </Card>

            <Card
              title={this.props.intl.formatMessage({
                id: "concourseRequestExpertTable"
              })}
              size="small"
              className="generalInfo"
            >
              <Row
                type="flex"
                align="middle"
                justify={"space-between"}
                style={{
                  marginBottom: "12px",
                  marginTop: "8px"
                }}
              >
                <ReadonlyField
                  entityName={entityName}
                  propertyName="projectManager"
                  form={this.props.form}
                  disabled={isNotDraft}
                  // disabled={isNotDraft}
                  formItemOpts={{
                    style: { minWidth: "25%", maxWidth: "25%", marginBottom: "12px" },
                    required:true
                  }}
                  optionsContainer={this.personGroupsDc}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true, message: this.props.intl.formatMessage(
                        { id: "form.validation.required" },
                        { fieldName: messages[entityName + ".projectManager"] }
                      ) }],
                    getValueFromEvent: (personGroupId, val) => {
                      if (
                        this.props.entityId ===
                        ConcourseRequestManagement.NEW_SUBPATH
                      ) {
                        if (personGroupId) {
                          this.getManagerUserRecordById(personGroupId);
                          return personGroupId;
                        } else {
                          this.props.form.setFieldsValue({
                            managerCompany: "",
                            managerPosition: ""
                          });
                          return undefined;
                        }
                      }
                    }
                  }}
                />

                <ReadonlyField
                  entityName={entityName}
                  propertyName="managerPosition"
                  form={this.props.form}
                  formItemOpts={
                    {style: { minWidth: "23%", maxWidth: "23%", marginBottom: "12px" }, required:true}

                  }
                  disabled={true}
                  getFieldDecoratorOpts={{ rules: [{ required: true, message: this.props.intl.formatMessage(
                        { id: "form.validation.required" },
                        { fieldName: messages[entityName + ".managerPosition"] }
                      ) }] }}
                />

                <ReadonlyField
                  entityName={entityName}
                  propertyName="managerCompany"
                  form={this.props.form}
                  formItemOpts={{
                    style: { minWidth: "12%", maxWidth: "12%", marginBottom: "12px" },
                    required:true
                  }}
                  disabled={true}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true, message: this.props.intl.formatMessage(
                        { id: "form.validation.required" },
                        { fieldName: messages[entityName + ".managerCompany"] }
                      ) }]
                  }}
                />
                <ReadonlyField
                  entityName={entityName}
                  propertyName="managerContactInfo"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{
                    style: { minWidth: "33%", maxWidth: "33%", marginBottom: "12px" },
                    required:true
                  }}
                  getFieldDecoratorOpts={{ rules: [{ required: true, message: this.props.intl.formatMessage(
                        { id: "form.validation.required" },
                        { fieldName: messages[entityName + ".managerContactInfo"] }
                      ) }] }}
                />
              </Row>
              <Row type="flex" align="middle" justify={"space-between"}>
                <ReadonlyField
                  entityName={entityName}
                  propertyName="projectExpert"
                  form={this.props.form}
                  // disabled={isNotDraft}
                  disabled={isNotDraft}
                  formItemOpts={{
                    style: { minWidth: "25%", maxWidth: "25%", marginBottom: "12px" }, required:true
                  }}
                  optionsContainer={this.personGroupsDc}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true, message: this.props.intl.formatMessage(
                        { id: "form.validation.required" },
                        { fieldName: messages[entityName + ".projectExpert"] }
                      ) }],
                    getValueFromEvent: (personGroupId, val) => {
                      if (personGroupId) {
                        // const expert = this.personGroupsDc.items.find(
                        //   person => person.id === personGroupId
                        // ) as PersonExt;
                        this.getExpertUserRecordById(personGroupId);

                        return personGroupId;
                      } else {
                        this.props.form.setFieldsValue({
                          expertCompany: "",
                          expertPosition: ""
                        });
                        return undefined;
                      }
                    }
                  }}
                />

                <ReadonlyField
                  entityName={entityName}
                  propertyName="expertPosition"
                  disabled={true}
                  form={this.props.form}
                  formItemOpts={{
                    style: { minWidth: "23%",maxWidth: "23%", marginBottom: "12px" }, required:true
                  }}
                  getFieldDecoratorOpts={{ rules: [{ required: true, message: this.props.intl.formatMessage(
                        { id: "form.validation.required" },
                        { fieldName: messages[entityName + ".expertPosition"] }
                      ) }] }}
                />

                <ReadonlyField
                  entityName={entityName}
                  propertyName="expertCompany"
                  disabled={true}
                  form={this.props.form}
                  formItemOpts={{
                    style: { minWidth: "12%", maxWidth: "12%", marginBottom: "12px" }, required:true
                  }}
                  getFieldDecoratorOpts={{ rules: [{ required: true, message: this.props.intl.formatMessage(
                        { id: "form.validation.required" },
                        { fieldName: messages[entityName + ".expertCompany"] }
                      ) }] }}
                />

                <ReadonlyField
                  entityName={entityName}
                  propertyName="expertContanctInfo"
                  form={this.props.form}
                  disabled={isNotDraft}
                  formItemOpts={{
                    style: { minWidth: "33%", maxWidth: "33%", marginBottom: "12px" }, required:true
                  }}
                  getFieldDecoratorOpts={{ rules: [{ required: true, message: this.props.intl.formatMessage(
                        { id: "form.validation.required" },
                        { fieldName: messages[entityName + ".expertContanctInfo"] }
                      ) }] }}
                />
              </Row>
            </Card>

            <Card
              title={this.props.intl.formatMessage({
                id: "concourseRequestDescriptionTable"
              })}
              size="small"
              className="generalInfo"
            >
              <Row
                type="flex"
                align="middle"
                justify={"space-between"}
                style={{
                  marginBottom: "12px",
                  marginTop: "8px"
                }}
              >
                <Form.Item
                  style={{ width: "49%" }}
                  label={this.createElement(Msg, {
                    entityName: entityName,
                    propertyName: "shortProjectDescriptionRu"
                  })}
                  required={true}
                >
                  {this.props.form.getFieldDecorator(
                    "shortProjectDescriptionRu",
                    {
                      rules: [{ required: true, message: this.props.intl.formatMessage(
                  { id: "form.validation.required" },
                  { fieldName: messages[entityName + ".shortProjectDescriptionRu"] }
                    ) }]
                    }
                  )(<TextArea rows={6} disabled={isNotDraft} />)}
                </Form.Item>
                <Form.Item
                  style={{ width: "49%" }}
                  label={this.createElement(Msg, {
                    entityName: entityName,
                    propertyName: "shortProjectDescriptionEn"
                  })}
                  required={true}
                >
                  {this.props.form.getFieldDecorator(
                    "shortProjectDescriptionEn",
                    {
                      rules: [{ required: true, message: this.props.intl.formatMessage(
                          { id: "form.validation.required" },
                          { fieldName: messages[entityName + ".shortProjectDescriptionEn"] }
                        ) }]
                    }
                  )(<TextArea rows={6} disabled={isNotDraft} />)}
                </Form.Item>
              </Row>
            </Card>

            <Card
              title={this.props.intl.formatMessage({
                id: "concourseRequestRequestTemplate"
              })}
              className="generalInfo"
              size="small"
            >
              <p className="text">
                {this.props.intl.formatMessage({
                  id: "concourseRequestDownloadMessage"
                })}
              </p>
              {this.concoursesDc!.items[0] && (
                <ConcourseFile
                  FileId={this.concoursesDc!.items[0]!.requestTemplate!.id}
                />
              )}
            </Card>

            <Card
              title={this.props.intl.formatMessage({
                id: "concourseRequestAttachmentsTable"
              })}
              className="generalInfo"
              size="small"
              style={{ marginTop: "12px", marginBottom: "16px" }}
            >
              <DataTableFormat
                enableFiltersOnColumns={[]}
                hideSelectionColumn={true}
                fields={this.attachmentFields}
                dataCollection={this.requestAttachmentssDc}
                onRowSelectionChange={this.handleRowSelectionChange}
                buttons={buttons}
              />
            </Card>

            {/*<Form.Item style={{ textAlign: "center" }}>*/}
            {/*  <Button*/}
            {/*    htmlType="button"*/}
            {/*  >*/}
            {/*    <FormattedMessage id="management.editor.cancel" />*/}
            {/*  </Button>*/}

            {/*  <Button*/}
            {/*    type="primary"*/}
            {/*    htmlType="submit"*/}
            {/*    disabled={status !== "DONE" && status !== "ERROR"}*/}
            {/*    loading={status === "LOADING"}*/}
            {/*    style={{ marginLeft: "8px" }}*/}
            {/*  >*/}
            {/*    <FormattedMessage id="management.editor.submit" />*/}
            {/*  </Button>*/}
            {/*</Form.Item>*/}

            {/*{this.globalErrors.length > 0 && (*/}
            {/*  <Alert*/}
            {/*    message={<MultilineText lines={toJS(this.globalErrors)} />}*/}
            {/*    type="error"*/}
            {/*    style={{ marginBottom: "24px" }}*/}
            {/*  />*/}
            {/*)}*/}
          </Form>

          {this.takCard()}

          <ConcourseRequestAttachmentsEdit
            entityId={
              this.isCreateMember
                ? ConcourseRequestAttachmentsManagement.NEW_SUBPATH
                : this.selectedRowKey
            }
            visible={this.visible}
            onChangeVisible={this.onChangeVisible}
            requestNum={this.reqNumber}
            refreshDs={this.refreshDs}
          />
        </Card>
      </div>
    );
  }

  @action
  initDataCollection() {
    let requestAttachmentsNew = collection<ConcourseRequestAttachments>(
      ConcourseRequestAttachments.NAME,
      {
        view: "concourseRequestAttachments-view",
        sort: "-updateTs",
        filter: {
          conditions: [
            {
              value: this.props.form.getFieldValue("requestNumber"),
              operator: "=",
              property: "concourseRequestNumber"
            }
          ]
        }
      }
    );
    this.requestAttachmentssDc.clear();
    this.requestAttachmentssDc = requestAttachmentsNew;
  }

  @action
  refreshDs = () => {
    // this.calcTotalAmount();
    this.initDataCollection();
  };

  getRecordById(id: string): SerializedEntity<FileDescriptor> {
    const record:
      | SerializedEntity<FileDescriptor>
      | undefined = this.requestAttachmentssDc.items.find(
      record => record.id === id
    );

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowKey!));
  };

  getExpertUserRecordById(id: string) {
    if (id) {
      const pos = restServices.employeeService.personProfile(id).then(pos => {
        this.props.form.setFieldsValue({
          expertCompany: pos.companyCode,
          expertPosition: pos.positionName
        });
      });
    }
  }

  getManagerUserRecordById(id: string) {
    if (id) {
      const pos = restServices.employeeService.personProfile(id).then(pos => {
        this.props.form.setFieldsValue({
          managerCompany: pos.companyCode,
          managerPosition: pos.positionName
        });
      });
    }
  }

  componentDidMount() {
    if (this.props.entityId !== ConcourseRequestManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new ConcourseRequest());
    }

    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item: ConcourseRequest | undefined) => {
        this.reqNumber = item
          ? item.requestNumber
          : this.props.form.getFieldValue("requestNumber");
        let values: any;
        if (this.props.entityId === ConcourseRequestManagement.NEW_SUBPATH) {
          this.personGroupId = this.props.rootStore!.userInfo!.personGroupId!;
          restServices.employeeService
            .personProfile(this.personGroupId)
            .then(data => {
              values = {
                personGroup: this.personGroupId,
                initiatorCompany: data.companyCode,
                initiatorPosition: data.positionName
              };
              this.props.form.setFieldsValue(values);
            });
        }

        if (item && this.isNotDraft()) {
          this.initDataCollection();
          this.personGroupId =
            item && item.personGroup
              ? item.personGroup.id
              : this.props.form.getFieldValue("personGroup").id;
          restServices.employeeService
            .personProfile(this.personGroupId)
            .then(data => {
              values = {
                personGroup: this.personGroupId,
                initiatorCompany: data.companyCode,
                initiatorPosition: data.positionName
              };
              this.props.form.setFieldsValue(values);
            });

          const managerId = this.dataInstance.item!.projectManager!.id;
          let values: any;
          restServices.employeeService.personProfile(managerId).then(data => {
            values = {
              managerCompany: data.companyCode,
              managerPosition: data.positionName
            };
            this.props.form.setFieldsValue(values);
          });
          const expertId = this.dataInstance.item!.projectExpert!.id;
          restServices.employeeService.personProfile(expertId).then(data => {
            values = {
              expertCompany: data.companyCode,
              expertPosition: data.positionName
            };
            this.props.form.setFieldsValue(values);
          });
        }

        getCubaREST()!
          .searchEntities<PersonExt>(
            PersonExt.NAME,
            {
              conditions: [
                {
                  property: "group.id",
                  operator: "=",
                  value: this.personGroupId
                }
              ]
            },
            {
              view: "person-edit"
            }
          )
          .then(value => value[0])
          .then(value => (this.person = value));
        this.dataInstance.item!.concourse = this.dataInstance.item!.concourse
          ? this.dataInstance.item!.concourse
          : this.concoursesDc.items[0];
        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
        );
      }
    );

    this.loadData();
    this.loadBpmProcessData();
  }

  protected initItem(request: ConcourseRequest): void {
    super.initItem(request);
  }

  componentWillUnmount() {
    this.reactionDisposer();
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
  })(withRouter(ConcourseRequestEditComponent))
);
