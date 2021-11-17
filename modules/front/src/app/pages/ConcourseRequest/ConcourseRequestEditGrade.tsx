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
import {ConcourseRequestAttachmentsManagement} from "./ConcourseRequestAttachments/ConcourseRequestAttachmentsManagement";
import {Concourse} from "../../../cuba/entities/base/tsadv_Concourse";
import {ConcourseFile} from "./ConcourseTemplateFile";
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
class ConcourseRequestEditGradeComponent extends AbstractBprocEdit<
  ConcourseRequest,
  Props
> {
  dataInstance = instance<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-edit",
    loadImmediately: false,
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

  concoursesDc = collection<Concourse>(Concourse.NAME,{
    view:"concourse-view",
    filter:{
      conditions:[
        {
          value: this.props.location.search.split("=")[1],
          operator: "=",
          property: "id"
        }
      ]
    }
  })


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
  //
  personGroupsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_base"
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
    this.visible = value
  };

  render() {
    if (this.updated) {
      return <Redirect to={ConcourseRequestManagement.PATH} />;
    }

    let isNotDraft = this.isNotDraft();

    if (this.concoursesDc.items[0]){
      let dateNow = moment(Date.now()) ;
      let requestDate = moment(this.concoursesDc.items[0]!.endVoting)

      if (dateNow.isAfter(requestDate)){
        isNotDraft = true

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
          <FormattedMessage id={this.props.intl.formatMessage({ id: "concourseRequestAttachmentsCreate" })} />
        </span>
      </Button>,
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        icon={"edit"}
        key="edit"
        disabled={isNotDraft ? true : this.selectedRowKey === undefined}
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
        disabled={isNotDraft ? true : this.selectedRowKey === undefined }
        onClick={this.deleteSelectedRow}
      >
        <FormattedMessage id="management.browser.remove" />
      </Button>
    ];

    const { status, entityName } = this.dataInstance;

    let saveButton = true;
    if (!this.dataInstance) {
      return <LoadingPage />;
    }
    return (
      [
            <Form style={{padding:"8px"}} onSubmit={this.validate} layout="vertical">

                <Card title={this.props.intl.formatMessage({ id: "concourseGeneralInfo" })} size="small" className="generalInfo">
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
                </Row>
                <Row
                  type="flex"
                  align={"middle"}
                  justify="space-between"
                  style={{  }}
                >
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="requestNameRu"
                    disabled={isNotDraft}
                    form={this.props.form}
                    formItemOpts={{
                      style: { minWidth: "30%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />

                  <ReadonlyField
                    entityName={entityName}
                    propertyName="requestNameEn"
                    form={this.props.form}
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: { minWidth: "30%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />
                  {

                    <ReadonlyField
                      entityName={entityName}
                      propertyName="category"
                      form={this.props.form}
                      disabled={true}
                      formItemOpts={{
                        style: {
                          minWidth: "30%",
                          marginBottom: "12px",
                        }
                      }}

                      getFieldDecoratorOpts={{
                        rules: [{ required: true }]
                      }}
                    />
                  }
                </Row>
                <Row type="flex" align="middle" justify={"space-between"}>
                  <ReadonlyField
                    entityName={entityName}
                    propertyName="startDate"
                    form={this.props.form}
                    format={DEFAULT_DATE_PATTERN}
                    disabled={isNotDraft}
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
                    disabled={isNotDraft}
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
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: { minWidth: "30%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }]
                    }}
                  />
                </Row>
                  </Spin>
              </Card>


              <Card title={this.props.intl.formatMessage({ id: "concourseRequestExpertTable" })} size="small" className="generalInfo">
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
                      style: { minWidth: "25%", marginBottom: "12px" }
                    }}
                    optionsContainer={this.personGroupsDc}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }],
                      getValueFromEvent: (personGroupId, val) => {
                        if (
                          this.props.entityId ===
                          ConcourseRequestManagement.NEW_SUBPATH
                        ) {
                          if (personGroupId) {

                            const manager = this.personGroupsDc.items.find(
                              person => person.id === personGroupId
                            ) as PersonExt;
                            this.getManagerUserRecordById(
                              personGroupId,
                              manager["list"][0]!.id
                            );

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
                    disabled={isNotDraft}
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
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: { minWidth: "25%", marginBottom: "12px" }
                    }}
                    optionsContainer={this.personGroupsDc}
                    getFieldDecoratorOpts={{
                      rules: [{ required: true }],
                      getValueFromEvent: (personGroupId, val) => {
                        if (personGroupId) {
                          const expert = this.personGroupsDc.items.find(
                            person => person.id === personGroupId
                          ) as PersonExt;
                          this.getExpertUserRecordById(
                            personGroupId,
                            expert["list"][0]!.id
                          );

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
                    disabled={isNotDraft}
                    formItemOpts={{
                      style: { minWidth: "33%", marginBottom: "12px" }
                    }}
                    getFieldDecoratorOpts={{ rules: [{ required: true }] }}
                  />
                </Row>
              </Card>

              <Card
                title={this.props.intl.formatMessage({ id: "concourseRequestDescriptionTable" })}
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
                      "shortProjectDescriptionEn"
                    )(<TextArea rows={6} disabled={isNotDraft} />)}
                  </Form.Item>
                </Row>
              </Card>

              <Card title={this.props.intl.formatMessage({ id: "concourseRequestRequestTemplate" })} className="generalInfo" size="small">
                <p className="text">{this.props.intl.formatMessage({ id: "concourseRequestDownloadMessage" })}</p>
              </Card>

              <Card
                title={this.props.intl.formatMessage({ id: "concourseRequestAttachmentsTable" })}
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

              {this.globalErrors.length > 0 && (
                <Alert
                  message={<MultilineText lines={toJS(this.globalErrors)} />}
                  type="error"
                  style={{ marginBottom: "24px" }}
                />
              )}
            </Form>,

            <ConcourseRequestAttachmentsEdit
              entityId={this.isCreateMember ? ConcourseRequestAttachmentsManagement.NEW_SUBPATH : this.selectedRowKey}
              visible={this.visible }
              onChangeVisible={this.onChangeVisible}
              requestNum = {this.reqNumber}
              refreshDs={this.refreshDs}
            />
          ]
    );
  }

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
        this.reqNumber = item ? item.requestNumber : this.props.form.getFieldValue("requestNumber");

        this.initDataCollection()
        let values:any;
        this.personGroupId = item!.personGroup ? item!.personGroup!.id : this.props.rootStore!.userInfo!.personGroupId!
        restServices.employeeService.personProfile(this.personGroupId).then(data=>{
          values = {
            personGroup: this.personGroupId,
            initiatorCompany: data.companyCode,
            initiatorPosition: data.positionName,
          }
          this.props.form.setFieldsValue(values);
        })

        if (item && this.isNotDraft()){
          const managerId = this.dataInstance.item!.projectManager!.id
          let values:any;
          restServices.employeeService.personProfile(managerId).then(data=>{
            values = {
              managerCompany: data.companyCode,
              managerPosition: data.positionName,
            }
            this.props.form.setFieldsValue(values);
          })
          const expertId = this.dataInstance.item!.projectExpert!.id
          restServices.employeeService.personProfile(expertId).then(data=>{
            values = {
              expertCompany: data.companyCode,
              expertPosition: data.positionName,
              ...values
            }
            this.props.form.setFieldsValue(values);
          })

        }

        //

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
        this.dataInstance.item!.concourse = this.dataInstance.item!.concourse ? this.dataInstance.item!.concourse:this.concoursesDc.items[0]
        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
        );
      }
    );

    this.loadData();
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
  })(withRouter(ConcourseRequestEditGradeComponent))
);
