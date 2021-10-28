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
    view: "concourseRequest-view",
    loadImmediately: false
  });

  dataCollection = collection<ConcourseRequestAttachments>(
    ConcourseRequestAttachments.NAME,
    {
      view: "_local",
      sort: "-updateTs"
    }
  );

  projectManagersDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_base"
  });

  projectExpertsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_base"
  });

  requestTemplatesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  requestAttachmentssDc = collection<ConcourseRequestAttachments>(
    ConcourseRequestAttachments.NAME,
    {
      view: "concourseRequestAttachments-view",
      sort: "-updateTs"
    }
  );
  //
  personGroupsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  statussDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
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

  isUpdateBeforeOutcome = true;
  @observable
  initiatorCompanyName: string | undefined;
  @observable
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

    "requestTemplate",

    "requestAttachments",

    "personGroup",

    "initiatorCompany",

    "initiatorPosition",

    "assignmentGroup"
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

  getUpdateEntityData(): any {
    if (this.isNotDraft()) return super.getUpdateEntityData();
    return {
      personGroup: {
        id: this.personGroupId
      },
      ...super.getUpdateEntityData()
    };
  }

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
    if (value)
      this.update().then(
        updatedSuccess => (this.visible = updatedSuccess && value)
      );
    else this.visible = value;
  };

  render() {
    if (this.updated) {
      return <Redirect to={ConcourseRequestManagement.PATH} />;
    }

    const buttons = [
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        icon={"plus"}
        key="create"
        onClick={() => {
          this.isCreateMember = true;
          this.showModal();
        }}
      >
        <span>
          <FormattedMessage id="management.browser.create" />
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
        disabled={this.selectedRowKey === undefined}
        onClick={this.deleteSelectedRow}
      >
        <FormattedMessage id="management.browser.remove" />
      </Button>
    ];

    const entityName = this.dataInstance.entityName;
    const { status } = this.dataInstance;
    const isNotDraft = this.isNotDraft();
    const fieldValue = this.props.form.getFieldValue("projectManager");
    const val = this.projectManagersDc.items.find(
      value => value.id === fieldValue
    )!;
    const isNeedBpm = true;

    let saveButton = true;
    if (!this.dataInstance) {
      return <LoadingPage />;
    }

    return (
      <Spin spinning={status == "LOADING"}>
        <div className="cardWrapper" id="concourseRequest">
          <h1>
            {this.props.entityId !== ConcourseRequestManagement.NEW_SUBPATH
              ? "Редактирование заявки"
              : "Создание заявки"}
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
              <Card title="Общие сведения" size="small" className="generalInfo">
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
                        minWidth: "30%"
                      }
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
                    formItemOpts={{ style: { minWidth: "30%" } }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="status"
                    disabled={true}
                    form={this.props.form}
                    formItemOpts={{ style: { minWidth: "30%" } }}
                    optionsContainer={this.statussDc}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
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
                      style: { minWidth: "30%", marginBottom: "12px" }
                    }}
                    optionsContainer={this.personGroupsDc}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="initiatorCompany"
                    form={this.props.form}
                    disabled={true}
                    formItemOpts={{
                      style: { minWidth: "30%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="initiatorPosition"
                    form={this.props.form}
                    disabled={true}
                    formItemOpts={{
                      style: { minWidth: "30%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
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
                  style={{ width: "65%" }}
                >
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="requestNameRu"
                    disabled={this.isNotDraft()}
                    form={this.props.form}
                    formItemOpts={{
                      style: { minWidth: "46%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="requestNameEn"
                    form={this.props.form}
                    disabled={this.isNotDraft()}
                    formItemOpts={{
                      style: { minWidth: "46%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />
                </Row>
                <Row type="flex" align="middle" justify={"space-between"}>
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="startDate"
                    form={this.props.form}
                    format={DEFAULT_DATE_PATTERN}
                    disabled={this.isNotDraft()}
                    formItemOpts={{
                      style: { minWidth: "30%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="endDate"
                    form={this.props.form}
                    format={DEFAULT_DATE_PATTERN}
                    disabled={this.isNotDraft()}
                    formItemOpts={{
                      style: { minWidth: "30%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="scaleOfDistrubution"
                    form={this.props.form}
                    disabled={this.isNotDraft()}
                    formItemOpts={{
                      style: { minWidth: "30%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />
                </Row>
              </Card>

              <Card title="Эксперты" size="small" className="generalInfo">
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
                    disabled={this.isNotDraft()}
                    // disabled={isNotDraft}
                    formItemOpts={{
                      style: { minWidth: "25%", marginBottom: "12px" }
                    }}
                    optionsContainer={this.projectManagersDc}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }],
                      getValueFromEvent: (personGroupId, val) => {
                        if (
                          this.props.entityId ===
                          ConcourseRequestManagement.NEW_SUBPATH
                        ) {
                          if (personGroupId) {
                            const manager = this.projectManagersDc.items.find(
                              person => person.id === personGroupId
                            ) as PersonExt;
                            this.getManagerUserRecordById(
                              personGroupId,
                              manager["list"][0]!.id
                            );
                            console.log(manager["list"][0], val);
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
                    formItemOpts={{
                      style: { minWidth: "25%", marginBottom: "12px" }
                    }}
                    disabled={true}
                    getFieldDecoratorOpts={{ rules: [{ required: true }] }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="managerCompany"
                    form={this.props.form}
                    formItemOpts={{
                      style: { minWidth: "10%", marginBottom: "12px" }
                    }}
                    disabled={true}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="managerContactInfo"
                    form={this.props.form}
                    disabled={this.isNotDraft()}
                    formItemOpts={{
                      style: { minWidth: "33%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{ rules: [{ required: true }] }}
                  />
                </Row>
                <Row type="flex" align="middle" justify={"space-between"}>
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="projectExpert"
                    form={this.props.form}
                    // disabled={isNotDraft}
                    disabled={this.isNotDraft()}
                    formItemOpts={{
                      style: { minWidth: "25%", marginBottom: "12px" }
                    }}
                    optionsContainer={this.projectExpertsDc}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }],
                      getValueFromEvent: (personGroupId, val) => {
                        if (personGroupId) {
                          const expert = this.projectExpertsDc.items.find(
                            person => person.id === personGroupId
                          ) as PersonExt;
                          this.getExpertUserRecordById(
                            personGroupId,
                            expert["list"][0]!.id
                          );
                          console.log(expert["list"][0], val);
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
                      style: { minWidth: "25%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{ rules: [{ required: true }] }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="expertCompany"
                    disabled={true}
                    form={this.props.form}
                    formItemOpts={{
                      style: { minWidth: "11%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{ rules: [{ required: true }] }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="expertContanctInfo"
                    form={this.props.form}
                    disabled={this.isNotDraft()}
                    formItemOpts={{
                      style: { minWidth: "33%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{ rules: [{ required: true }] }}
                  />
                </Row>
              </Card>

              <Card
                title="Описание проекта"
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
                      "shortProjectDescriptionRu"
                    )(<TextArea rows={6} disabled={this.isNotDraft()} />)}
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
                      "shortProjectDescriptionEn"
                    )(<TextArea rows={6} disabled={this.isNotDraft()} />)}
                  </Form.Item>
                </Row>
              </Card>
              <Card title="Шаблон заявки" className="generalInfo" size="small">
                <p className="text">Скачайте шаблон заявки для заполнения</p>
                <Field
                  entityName={entityName}
                  propertyName="requestTemplate"
                  form={this.props.form}
                  formItemOpts={{ style: { marginBottom: "12px" } }}
                  optionsContainer={this.requestTemplatesDc}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />
              </Card>

              <Card
                title="Приложения"
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

              {this.globalErrors.length > 0 && (
                <Alert
                  message={<MultilineText lines={toJS(this.globalErrors)} />}
                  type="error"
                  style={{ marginBottom: "24px" }}
                />
              )}
            </Form>

            {this.takCard()}

            {this.visible && <ConcourseRequestAttachmentsEdit
              entityId={this.isCreateMember ? undefined : this.selectedRowKey}
              visible={this.visible}
              onChangeVisible={this.onChangeVisible}
              requestNum = {this.reqNumber}
              refreshDs={this.refreshDs}
            />}
          </Card>
        </div>
      </Spin>
    );
  }

  initDataCollection() {
    let requestAttachmentsNew = collection<ConcourseRequestAttachments>(
      ConcourseRequestAttachments.NAME,
      {
        view: "concourseRequestAttachments-view",
        sort: "-updateTs"
      }
    );
    this.requestAttachmentssDc.clear();
    this.requestAttachmentssDc = requestAttachmentsNew;
  }

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

  getExpertUserRecordById(id: string, groupId: string) {
    // @ts-ignore
    if (id || groupId) {
      const pos = restServices.employeeService.personProfile(id).then(pos => {
        this.props.form.setFieldsValue({
          expertCompany: pos.organizationName,
          expertPosition: pos.positionName
        });
      });
      console.log(pos, groupId);
    } else {
      console.log("No data");
    }
  }

  getManagerUserRecordById(id: string, groupId: string) {
    // @ts-ignore
    if (id || groupId) {
      const pos = restServices.employeeService.personProfile(id).then(pos => {
        this.props.form.setFieldsValue({
          managerCompany: pos.organizationName,
          managerPosition: pos.positionName
        });
      });
      console.log(pos, groupId);
    } else {
      console.log("No data:", id, groupId);
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
      item => {
        this.reqNumber = this.props.form.getFieldValue("requestNumber");
        console.log(this.reqNumber)
        if (item && !this.isNotDraft()) {
          this.personGroupId = item.personGroup
            ? item.personGroup!.id
            : this.props.rootStore!.userInfo.personGroupId;

          restServices.employeeService
            .personProfile(
              item.personGroup
                ? item.personGroup!.id
                : this.props.rootStore!.userInfo.personGroupId
            )
            .then(data => {
              console.log(this.props.form.getFieldValue("personGroup"));
              console.log(data);
              this.initiatorCompanyName = data.organizationName;
              this.initiatorPositionValue = data.positionName;
              this.reqNumber = this.props.form.getFieldValue("requestNumber");
              console.log(this.reqNumber)
              this.props.form.setFieldsValue({
                personGroup: this.personGroupId,
                initiatorCompany: this.initiatorCompanyName,
                initiatorPosition: this.initiatorPositionValue
              });
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
        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
        );
      }
    );
    this.loadData();
    this.loadBpmProcessData();
    // this.loadBpmProcessData()
  }

  protected initItem(request: ConcourseRequest):void {
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
