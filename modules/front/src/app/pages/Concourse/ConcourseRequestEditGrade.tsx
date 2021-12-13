import * as React from "react";
import { createElement } from "react";
import {
  Card,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Select
} from "antd";
import Button, { ButtonType } from "../../components/Button/Button";

import { inject, observer } from "mobx-react";
import { ConcourseRequestManagement } from "../ConcourseRequest/ConcourseRequestManagement";
import { FormComponentProps } from "antd/lib/form";
import { Redirect } from "react-router-dom";
import { IReactionDisposer, observable, reaction, toJS, action } from "mobx";
import { FormattedMessage, injectIntl } from "react-intl";
import { DEFAULT_DATE_PATTERN } from "../../util/Date/Date";
import TextArea from "antd/es/input/TextArea";

import {
  collection,
  getCubaREST,
  injectMainStore,
  instance,
  Msg,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../App.css";
import { restServices } from "../../../cuba/services";
import { ConcourseRequest } from "../../../cuba/entities/base/tsadv_ConcourseRequest";
import { PersonGroupExt } from "../../../cuba/entities/base/base$PersonGroupExt";
import { FileDescriptor } from "../../../cuba/entities/base/sys$FileDescriptor";
import { DicRequestStatus } from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import { withRouter } from "react-router";
import { ReadonlyField } from "../../components/ReadonlyField";
import { PersonExt } from "../../../cuba/entities/base/base$PersonExt";
import { goBackOrHomePage } from "../../util/util";
import LoadingPage from "../LoadingPage";
import { SerializedEntity } from "@cuba-platform/rest";
import { ConcourseRequestAttachments } from "../../../cuba/entities/base/tsadv_ConcourseRequestAttachments";
import DataTableFormat from "../../components/DataTable/intex";
import ConcourseRequestAttachmentsEdit from "../ConcourseRequest/ConcourseRequestAttachments/ConcourseRequestAttachmentsEdit";
import { ConcourseRequestAttachmentsManagement } from "../ConcourseRequest/ConcourseRequestAttachments/ConcourseRequestAttachmentsManagement";
import { Concourse } from "../../../cuba/entities/base/tsadv_Concourse";

import moment from "moment";

import { SearchSelect } from "../../components/SearchSelect";


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

  dicLangValue = "langValue" + this.props.rootStore!.userInfo!.localeIndex;

  concoursesDc = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    loadImmediately: false
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

  @observable
  isLocaleEn = this.props.rootStore!.userInfo.locale === "en";


  personManagerDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "personGroup-relevantPerson-fullNameCyrillic",
    loadImmediately: false,
  });

  personExpertDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "personGroup-relevantPerson-fullNameCyrillic",
    loadImmediately: false,
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

  personGroupId: string;

  expertId:string

  managerId:string

  expertFullName:string

  managerFullName:string

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

  @observable
  visible: boolean = false;

  @observable
  isCreateMember: boolean = false;



  showModal = () => {
    this.onChangeVisible(true);
  };

  @action
  onChangeVisible = (value: boolean): void => {
    this.visible = value;
  };



  isUpdateBeforeOutcome = true;

  @observable
  projectManagerId:string

  @observable
  projectExpertId:string


  render() {
    if (this.updated) {
      return <Redirect to={ConcourseRequestManagement.PATH} />;
    }

    let isNotDraft = this.isNotDraft();


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

    let is_admin =
      this.takCard().props!.tasks &&
      this.takCard().props!.tasks![this.takCard().props!.tasks.length - 1]
        .name === "administrator_task";

    return (


        <Form onSubmit={this.validate} layout="vertical">
          <Spin spinning={status == "LOADING"}>
            <>
              <Card
                title={this.props.intl.formatMessage({
                  id: "concourseGeneralInfo"
                })}
                size="small"
                className="generalInfo"
              >
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
                      required: true
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
                    formItemOpts={{
                      style: { maxWidth: "30%", minWidth: "30%" },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="status"
                    disabled={true}
                    form={this.props.form}
                    formItemOpts={{
                      style: { minWidth: "30%", maxWidth: "30%" },
                      required: true
                    }}
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
                  <Form.Item
                    style={{
                      minWidth: "30%",
                      maxWidth: "30%",
                      marginBottom: "12px"
                    }}
                    label={createElement(Msg, {
                      entityName: entityName,
                      propertyName: "personGroup"
                    })}
                  >
                    <Input
                      value={
                        this.person ? this.person["_instanceName"] || "" : ""
                      }
                      disabled
                    />
                  </Form.Item>

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="initiatorCompany"
                    form={this.props.form}
                    disabled={true}
                    formItemOpts={{
                      style: {
                        minWidth: "30%",
                        maxWidth: "30%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={
                      {
                        // rules: [{ required: true }]
                      }
                    }
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="initiatorPosition"
                    form={this.props.form}
                    disabled={true}
                    formItemOpts={{
                      style: {
                        minWidth: "30%",
                        maxWidth: "30%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={
                      {
                        // rules: [{ required: true }]
                      }
                    }
                  />
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
                      style: {
                        minWidth: "30%",
                        maxWidth: "30%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            {
                              fieldName: messages[entityName + ".requestNameRu"]
                            }
                          )
                        }
                      ]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="requestNameEn"
                    form={this.props.form}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: {
                        minWidth: "30%",
                        maxWidth: "30%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            {
                              fieldName: messages[entityName + ".requestNameEn"]
                            }
                          )
                        }
                      ]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="category"
                    form={this.props.form}
                    disabled={true}
                    formItemOpts={{
                      style: {
                        minWidth: "30%",
                        maxWidth: "30%",
                        marginBottom: "12px",
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            { fieldName: messages[entityName + ".category"] }
                          )
                        }
                      ],
                    }}
                  />

                  <span
                    style={{
                      visibility: is_admin ? "hidden" : "visible",
                      minWidth: "30%"
                    }}
                  >
                    {" "}
                  </span>
                </Row>
                <Row type="flex" align="middle" justify={"space-between"}>
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="startDate"
                    form={this.props.form}
                    format={DEFAULT_DATE_PATTERN}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: {
                        minWidth: "30%",
                        maxWidth: "30%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            { fieldName: messages[entityName + ".startDate"] }
                          )
                        }
                      ]
                    }}
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="endDate"
                    form={this.props.form}
                    format={DEFAULT_DATE_PATTERN}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: {
                        minWidth: "30%",
                        maxWidth: "30%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            { fieldName: messages[entityName + ".endDate"] }
                          )
                        }
                      ]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="scaleOfDistrubution"
                    form={this.props.form}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: {
                        minWidth: "30%",
                        maxWidth: "30%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            {
                              fieldName:
                                messages[entityName + ".scaleOfDistrubution"]
                            }
                          )
                        }
                      ]
                    }}
                  />
                </Row>
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
                  {
                    this.managerFullName ? <Form.Item
                        style={{
                          minWidth: "25%",
                          maxWidth: "25%",
                          marginBottom: "12px"
                        }}
                        label={createElement(Msg, {
                          entityName: entityName,
                          propertyName: "projectManager"
                        })}
                      >
                        <Input
                          value={
                            this.managerFullName && this.managerFullName
                          }
                          disabled
                        />
                      </Form.Item>
                    :
                    <Form.Item
                    style={{
                    minWidth: "25%",
                    maxWidth: "25%",
                    marginBottom: "12px"
                  }}
                    label={createElement(Msg, {
                    entityName: entityName,
                    propertyName: "projectManager"
                  })}
                    >
                    <Input
                    value={
                    "..."
                  }
                    disabled
                    />
                    </Form.Item>
                  }
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="managerPosition"
                    form={this.props.form}
                    formItemOpts={{
                      style: {
                        minWidth: "23%",
                        maxWidth: "23%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    disabled={true}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            {
                              fieldName:
                                messages[entityName + ".managerPosition"]
                            }
                          )
                        }
                      ]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="managerCompany"
                    form={this.props.form}
                    formItemOpts={{
                      style: {
                        minWidth: "12%",
                        maxWidth: "12%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    disabled={true}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            {
                              fieldName:
                                messages[entityName + ".managerCompany"]
                            }
                          )
                        }
                      ]
                    }}
                  />
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="managerContactInfo"
                    form={this.props.form}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: {
                        minWidth: "33%",
                        maxWidth: "33%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            {
                              fieldName:
                                messages[entityName + ".managerContactInfo"]
                            }
                          )
                        }
                      ]
                    }}
                  />
                </Row>
                <Row type="flex" align="middle" justify={"space-between"}>
                  {
                    this.expertFullName ? <Form.Item
                        style={{
                          minWidth: "25%",
                          maxWidth: "25%",
                          marginBottom: "12px"
                        }}
                        label={createElement(Msg, {
                          entityName: entityName,
                          propertyName: "projectExpert"
                        })}
                      >
                        <Input
                          value={
                            this.expertFullName && this.expertFullName
                          }
                          disabled
                        />
                      </Form.Item>
                      :
                      <Form.Item
                        style={{
                          minWidth: "25%",
                          maxWidth: "25%",
                          marginBottom: "12px"
                        }}
                        label={createElement(Msg, {
                          entityName: entityName,
                          propertyName: "projectExpert"
                        })}
                        >
                        <Input
                          value={
                            "..."
                          }
                          disabled
                        />
                      </Form.Item>

                  }


                  <ReadonlyField
                    entityName={entityName}
                    propertyName="expertPosition"
                    disabled={true}
                    form={this.props.form}
                    formItemOpts={{
                      style: {
                        minWidth: "23%",
                        maxWidth: "23%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            {
                              fieldName:
                                messages[entityName + ".expertPosition"]
                            }
                          )
                        }
                      ]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="expertCompany"
                    disabled={true}
                    form={this.props.form}
                    formItemOpts={{
                      style: {
                        minWidth: "12%",
                        maxWidth: "12%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            {
                              fieldName: messages[entityName + ".expertCompany"]
                            }
                          )
                        }
                      ]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="expertContanctInfo"
                    form={this.props.form}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: {
                        minWidth: "33%",
                        maxWidth: "33%",
                        marginBottom: "12px"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: true,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            {
                              fieldName:
                                messages[entityName + ".expertContanctInfo"]
                            }
                          )
                        }
                      ]
                    }}
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
                        rules: [
                          {
                            required: true,
                            message: this.props.intl.formatMessage(
                              { id: "form.validation.required" },
                              {
                                fieldName:
                                  messages[
                                  entityName + ".shortProjectDescriptionRu"
                                    ]
                              }
                            )
                          }
                        ]
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
                        rules: [
                          {
                            required: true,
                            message: this.props.intl.formatMessage(
                              { id: "form.validation.required" },
                              {
                                fieldName:
                                  messages[
                                  entityName + ".shortProjectDescriptionEn"
                                    ]
                              }
                            )
                          }
                        ]
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
            </>
            <Button
              buttonType={ButtonType.FOLLOW}
              htmlType={"button"}
              onClick={() => goBackOrHomePage(this.props.history!)}
            >
              {this.props.intl.formatMessage({ id: "close" })}
            </Button>
          </Spin>

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
        </Form>

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
        this.personGroupId =
          item && item.personGroup
            ? item.personGroup.id!
            : this.props.rootStore!.userInfo!.personGroupId!;
        const requestDate =
          item && item.requestDate ? item.requestDate : moment().toISOString();
        // this.loadPersonGroupDc()
        this.reqNumber = item
          ? item.requestNumber
          : this.props.form.getFieldValue("requestNumber");

        getCubaREST()!
          .searchEntities<PersonExt>(
            PersonExt.NAME,
            {
              conditions: [
                {
                  property: "group.id",
                  operator: "=",
                  value: this.personGroupId
                },
                {
                  property: "startDate",
                  operator: "<=",
                  value: requestDate
                },
                {
                  property: "endDate",
                  operator: ">=",
                  value: requestDate
                }
              ]
            },
            {
              view: "person-edit"
            }
          )
          .then(value => value[0])
          .then(value => (this.person = value));

        let values: any;

        if (item && this.isNotDraft()) {


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
          console.log("ITEM", item)
          this.managerId = this.dataInstance.item!.projectManager!.id;
          let values: any;
          restServices.employeeService.personProfile(this.managerId).then(data => {
            this.managerFullName = data.firstLastName
            values = {
              projectManager: this.managerId,
              managerCompany: data.companyCode,
              managerPosition: data.positionName
            };
            this.props.form.setFieldsValue(values);
          });
          this.expertId = this.dataInstance.item!.projectExpert!.id;
          restServices.employeeService.personProfile(this.expertId).then(data => {
            console.log("EXPERT ID", data);
            this.expertFullName = data.firstLastName
            values = {
              projectExpert: this.expertId,
              expertCompany: data.companyCode,
              expertPosition: data.positionName
            };
            this.props.form.setFieldsValue(values);
          });
          this.initDataCollection();
        }

        this.dataInstance.item!.concourse = this.dataInstance.item!.concourse
          ? this.dataInstance.item!.concourse
          : this.concoursesDc.items[0];
        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
        );
      }
    );
    this.loadData();
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
