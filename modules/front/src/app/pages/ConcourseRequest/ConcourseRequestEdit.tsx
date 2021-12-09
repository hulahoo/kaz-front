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
  Spin,
  Select
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
import {RouteComponentProps, withRouter} from "react-router";
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
import { DataCollectionStore } from "@cuba-platform/react/dist/data/Collection";
import { DataCollectionStoreWithAfterLoad } from "../../util/DataCollectionStoreWithAfterLoad";
import {
  serviceCollection,
  ServiceDataCollectionStore
} from "../../util/ServiceDataCollectionStore";
import { SearchSelect } from "../../components/SearchSelect";
import { queryCollection } from "../../util/QueryDataCollectionStore";
import {TsadvUser} from "../../../cuba/entities/base/tsadv$UserExt";
// import ConcourseRequestDocumentList from "./ConcourseRequestDocument/ConcourseRequestDocumentList";
// import ConcourseRequestDocumentEdit from "./ConcourseRequestDocument/ConcourseRequestDocumentEdit";
// import {ConcourseRequestDocument} from "../../../cuba/entities/base/tsadv_ConcourseRequestDocument";

type EditorProps = {
  entityId: string;
};

type Props = FormComponentProps & EditorProps & RouteComponentProps;

@injectMainStore
@inject("rootStore")
@observer
class ConcourseRequestEditComponent extends AbstractBprocEdit<
  ConcourseRequest,
  Props
> {
  dataInstance = instance<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-edit",
  });
  dicLangValue = "langValue" + this.props.rootStore!.userInfo!.localeIndex;

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

  // personGroupsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
  //   view: "personGroup-relevantPerson-fullNameCyrillic",
  // });

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

  concourseId:string

  @observable
  oldConcourseId:string

  @observable
  requestTemplateId: string | null

  @observable
  readonly: boolean = true;

  @observable
  updated = false;

  reactionDisposer: IReactionDisposer;

  @observable
  person: PersonExt | null;

  personGroupId: string;

  @observable
  currentUser: string

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
  onCategoryUpdate = (id:string): void => {
    this.props.form.setFieldsValue({
      category: id
    });
    // this.update().then(data => {
    //   this.currentUser = this.props.rootStore!.userInfo!.id!
    //   this.categoryChecker()
    // });

  };

  isUpdateBeforeOutcome = true;

  @observable
  projectManagerId:string

  @observable
  projectExpertId:string

  getUpdateEntityData(): any {
    if (this.isNotDraft()) return super.getUpdateEntityData();
    this.currentUser = this.props.rootStore!.userInfo!.id!
    return {
      personGroup: this.personGroupId,
      projectManager: this.getStatusCode()==="TO_BE_REVISED" ? this.managerId:this.projectManagerId,
      projectExpert: this.getStatusCode()==="TO_BE_REVISED" ? this.expertId :this.projectExpertId,
      concourse: this.getStatusCode()==="TO_BE_REVISED" ? this.oldConcourseId : this.concourseId,
      ...super.getUpdateEntityData()
    };
  }

  showCategory:boolean = false

  categoryView:boolean = false

  categoryChecker=()=>{
    if (this.takCard().props!.tasks && this.props.rootStore!.userInfo!.id && this.takCard().props!.tasks![this.takCard().props!.tasks.length - 1].name === "administrator_task"){
      this.showCategory = this.takCard().props!.tasks![this.takCard().props!.tasks.length - 1].assigneeOrCandidates!.find((el:TsadvUser)=>el.id===this.props.rootStore!.userInfo!.id)!==undefined && this.getStatusCode() === "APPROVING"
    }
  }

  dateValidator = (fieldName: string) => {
    let dateFrom = this.props.form.getFieldValue("startDate");
    let dateTo = this.props.form.getFieldValue("endDate");
    console.log(dateFrom, dateTo)

    return (dateFrom && dateTo && (dateFrom <= dateTo || dateFrom.clone().startOf('day') <= dateTo.clone().startOf('day'))) === true;
  }

  dateFromValidator = (rule: any, value: any, callback: any) => {
    let requestDate = this.props.form.getFieldValue('requestDate');
    if (requestDate && requestDate > value) {
      return callback(this.props.intl.formatMessage({id: 'validation.concourseRequest.startDate.start'}));
    } else if (!this.dateValidator('startDate') || !value) {
      return callback(this.props.intl.formatMessage({id: "validation.concourseRequest.startDate"}));
    } else return callback();
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


    console.log(this.takCard())

    this.categoryChecker()

    this.categoryView = this.takCard().props!.tasks && (this.takCard().props!.tasks![this.takCard().props!.tasks.length - 1].name === "administrator_task")

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
          <Spin spinning={status == "LOADING"}>
            <Form onSubmit={this.validate} layout="vertical">
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

                  {/*<ReadonlyField*/}
                  {/*  entityName={entityName}*/}
                  {/*  propertyName="personGroup"*/}
                  {/*  form={this.props.form}*/}
                  {/*  disabled={true}*/}
                  {/*  formItemOpts={{*/}
                  {/*    style: { minWidth: "30%", maxWidth: "30%", marginBottom: "12px" }, required:true*/}
                  {/*  }}*/}
                  {/*  optionsContainer={this.personGroupsDc}*/}
                  {/*  getFieldDecoratorOpts={{*/}
                  {/*    // rules: [{ required: true }]*/}
                  {/*  }}*/}
                  {/*/>*/}
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
                    disabled={
                      !this.showCategory
                    }
                    formItemOpts={{
                      style: {
                        minWidth: "30%",
                        maxWidth: "30%",
                        marginBottom: "12px",
                        visibility: this.categoryView ? "visible" : "hidden"
                      },
                      required: true
                    }}
                    getFieldDecoratorOpts={{
                      rules: [
                        {
                          required: this.showCategory,
                          message: this.props.intl.formatMessage(
                            { id: "form.validation.required" },
                            { fieldName: messages[entityName + ".category"] }
                          )
                        }
                      ],
                      getValueFromEvent: (id, val) => {
                        if (id) {
                          this.onCategoryUpdate(id);

                          return id;
                        }
                      }
                    }}
                  />

                  <span
                    style={{
                      visibility: this.categoryView ? "hidden" : "visible",
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
                          // message: this.props.intl.formatMessage(
                          //   { id: "form.validation.required" },
                          //   { fieldName: messages[entityName + ".startDate"] }
                          // ),
                          validator: this.dateFromValidator
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
                          message: this.props.intl.formatMessage({id: "validation.concourseRequest.endDate"}),
                          validator: this.dateValidator,
                        }
                      ],
                      getValueFromEvent: args => {
                        return args
                      }
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
                    (this.managerFullName || this.getStatusCode()==="TO_BE_REVISED")  ? <Form.Item
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
                          this.dataInstance.item!.projectManager ? this.dataInstance.item!.projectManager["_instanceName"] || "" : ""
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
                        label={
                          <Msg
                            entityName={entityName}
                            propertyName={"projectManager"}
                          />
                        }
                      >
                        {this.props.form.getFieldDecorator("projectManager", {
                          rules: [
                            {
                              required: true,
                              message: this.props.intl.formatMessage(
                                { id: "form.validation.required" },
                                {
                                  fieldName:
                                    messages[entityName + ".projectManager"]
                                }
                              )
                            }
                          ],
                          getValueFromEvent: (personGroupId, val) => {
                            if (
                              this.props.entityId ===
                              ConcourseRequestManagement.NEW_SUBPATH || this.getStatusCode()==="TO_BE_REVISED"
                            ) {
                              if (personGroupId) {
                                this.projectManagerId = personGroupId
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

                            return personGroupId

                          }
                        })(
                          <SearchSelect
                            onSearch={this.onSearchManager}
                            disabled={isNotDraft}
                            loading={this.personManagerDc.status === "LOADING"}
                            options={
                              this.personManagerDc &&
                              this.personManagerDc.items.map(d => {
                                return (
                                  <Select.Option key={d.id}>
                                    {d._instanceName}
                                  </Select.Option>
                                );
                              })
                            }
                          />
                        )}
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
                    (this.expertFullName || this.getStatusCode()==="TO_BE_REVISED") ? <Form.Item
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
                          this.dataInstance.item!.projectExpert && this.dataInstance.item!.projectExpert ? this.dataInstance.item!.projectExpert["_instanceName"] || "" : ""
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
                        label={
                          <Msg
                            entityName={entityName}
                            propertyName={"projectExpert"}
                          />
                        }
                      >
                        {this.props.form.getFieldDecorator("projectExpert", {
                          rules: [
                            {
                              required: true,
                              message: this.props.intl.formatMessage(
                                { id: "form.validation.required" },
                                {
                                  fieldName: messages[entityName + ".projectExpert"]
                                }
                              )
                            }
                          ],
                          getValueFromEvent: (personGroupId, val) => {

                            if (personGroupId) {
                              this.projectExpertId = personGroupId
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
                        })(
                          <SearchSelect
                            onSearch={this.onSearchExpert}
                            disabled={isNotDraft}
                            loading={this.personExpertDc.status === "LOADING"}
                            options={
                              this.personExpertDc &&
                              this.personExpertDc.items.map(d => {
                                return (
                                  <Select.Option key={d.id}>
                                    {this.isLocaleEn? d.relevantPerson!.lastNameLatin +
                                      " " +
                                      d.relevantPerson!.firstNameLatin :d.relevantPerson!.lastName +
                                    " " +
                                    d.relevantPerson!.firstName}
                                  </Select.Option>
                                );
                              })
                            }
                          />
                        )}
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
                {
                  this.requestTemplateId ? <ConcourseFile
                    FileId={this.requestTemplateId}
                  />  : (this.concoursesDc && this.concoursesDc.items.length) ? <ConcourseFile
                    FileId={this.concoursesDc.items[0].requestTemplate!.id}
                  />:""
                }
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
            </Form>
          </Spin>

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

  onSearchManager = (value: string) => {
    this.personManagerDc.items = [];
    this.personManagerDc.sort = this.isLocaleEn?"relevantPerson.lastNameLatin":"relevantPerson.lastName"
    let val = value.split(" ");
    if (value && (val.length === 1 || val.length === 0)) {
      if (value.length > 2) {
        this.personManagerDc.filter = {
          conditions: [
            {
              group: "OR",
              conditions:[
                {
                  property: this.isLocaleEn?"relevantPerson.lastNameLatin":"relevantPerson.lastName",
                  operator: "startsWith",
                  value: value.toString()
                },{
                  property: this.isLocaleEn?"relevantPerson.firstNameLatin":"relevantPerson.firstName",
                  operator: "startsWith",
                  value: value.toString()
                },

              ]
            }
          ]
        };
        this.personManagerDc.load();
      }
    } else if (value && val.length > 1) {
      if (value.length >= 2 && val[1].length > 0) {
        this.personManagerDc.filter = {
          conditions: [
            {
              property: this.isLocaleEn?"relevantPerson.lastNameLatin":"relevantPerson.lastName",
              operator: "startsWith",
              value: val[0].toString()
            },
            {
              property: this.isLocaleEn?"relevantPerson.firstNameLatin":"relevantPerson.firstName",
              operator: "startsWith",
              value: val[1].toString()
            }
          ]
        };
        this.personManagerDc.load();
      }
      if (value.length >= 2 && val[1].length === 0) {
        this.personManagerDc.filter = {
          conditions: [
            {
              property: this.isLocaleEn?"relevantPerson.lastNameLatin":"relevantPerson.lastName",
              operator: "startsWith",
              value: val[0].toString()
            }
          ]
        };

        this.personManagerDc.load();
      }
    }
  };

  onSearchExpert = (value: string) => {
    this.personExpertDc.items = [];
    let val = value.split(" ");
    this.personExpertDc.sort = this.isLocaleEn?"relevantPerson.lastNameLatin":"relevantPerson.lastName";
    if (value && (val.length === 1 || val.length === 0)) {
      if (value.length > 2) {
        this.personExpertDc.filter = {
          conditions: [
            {
              group: "OR",
              conditions:[
                {
                  property: this.isLocaleEn?"relevantPerson.lastNameLatin":"relevantPerson.lastName",
                  operator: "startsWith",
                  value: value.toString()
                },{
                  property: this.isLocaleEn?"relevantPerson.firstNameLatin":"relevantPerson.firstName",
                  operator: "startsWith",
                  value: value.toString()
                },

              ]
            }
          ]
        };
        this.personExpertDc.load();
      }
    } else if (value && val.length > 1) {
      if (value.length >= 2 && val[1].length > 0) {
        this.personExpertDc.filter = {
          conditions: [
            {
              property: this.isLocaleEn?"relevantPerson.lastNameLatin":"relevantPerson.lastName",
              operator: "startsWith",
              value: val[0].toString()
            },
            {
              property: this.isLocaleEn?"relevantPerson.firstNameLatin":"relevantPerson.firstName",
              operator: "startsWith",
              value: val[1].toString()
            }
          ]
        };

        this.personExpertDc.load();
      }
      if (value.length >= 2 && val[1].length === 0) {
        this.personExpertDc.filter = {
          conditions: [
            {
              property: this.isLocaleEn?"relevantPerson.lastNameLatin":"relevantPerson.lastName",
              operator: "startsWith",
              value: val[0].toString()
            }
          ]
        };
        this.personExpertDc.load();
      }
    }
  };

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

        if (this.props.location.search){
          const concourseId = this.props.location.search.split("=")[1]
          if (concourseId){
            this.concourseId = concourseId
            this.concoursesDc.filter= {
              conditions: [{
                value: concourseId,
                operator: "=",
                property: "id"
              }]
            }
            this.concoursesDc.load()
          }
          console.log(this.concoursesDc)
        }

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



        this.currentUser = this.props.rootStore!.userInfo!.id!




        let values: any;
        if (this.props.entityId === ConcourseRequestManagement.NEW_SUBPATH) {
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

          this.managerId = this.dataInstance.item!.projectManager!.id;
          this.expertId = this.dataInstance.item!.projectExpert!.id;



          restServices.employeeService.personProfile(this.managerId).then(data => {
            this.managerFullName = data.firstLastName
            values = {
              projectManager: this.managerId,
              managerCompany: data.companyCode,
              managerPosition: data.positionName
            };
            this.props.form.setFieldsValue(values);
          });

          restServices.employeeService.personProfile(this.expertId).then(data => {
            this.expertFullName = data.firstLastName
            values = {
              projectExpert: this.expertId,
              expertCompany: data.companyCode,
              expertPosition: data.positionName
            };
            this.props.form.setFieldsValue(values);
          });








        }

        if (this.getStatusCode()==="TO_BE_REVISED" && this.dataInstance.item){
          this.initDataCollection();

          this.oldConcourseId = this.dataInstance.item!.concourse!.id;

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
            this.expertFullName = data.firstLastName
            values = {
              projectExpert: this.expertId,
              expertCompany: data.companyCode,
              expertPosition: data.positionName
            };
            this.props.form.setFieldsValue(values);
          });

          console.log("concourse Id", this.concourseId)

          getCubaREST()!.searchEntities<Concourse>(Concourse.NAME, {
            conditions:[
              {
                property: "id",
                operator: "=",
                value: this.oldConcourseId
              },
            ],
          },{
            view: "concourse-view"
          }).then(value => value[0])
            .then(val=>{
              this.concoursesDc.items.push(val)
              this.requestTemplateId = val.requestTemplate!.id
            })

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
    this.loadBpmProcessData();

    this.currentUser = this.props.rootStore!.userInfo!.id!

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
      if (changedValues["endDate"] != null) props.form.validateFields(['startDate'], {force: true});
      if (changedValues["startDate"] != null) props.form.validateFields(['endDate'], {force: true});
    }
  })(withRouter(ConcourseRequestEditComponent))
);
