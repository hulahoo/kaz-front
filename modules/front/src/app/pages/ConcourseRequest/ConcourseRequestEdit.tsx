import * as React from "react";
import {createElement, FormEvent} from "react";
import {Alert, Button, Card, Form, Input, message, Row, Table} from "antd";
import {inject, observer} from "mobx-react";
import { ConcourseRequestManagement } from "./ConcourseRequestManagement";
import { FormComponentProps } from "antd/lib/form";
import { Link, Redirect } from "react-router-dom";
import {action, IReactionDisposer, observable, reaction, toJS} from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";
import TextArea from "antd/es/input/TextArea";
import Column from "antd/lib/table/Column";

import {
  collection,
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText, injectMainStore, Msg, getCubaREST
} from "@cuba-platform/react";

import "../../../app/App.css";
import {restServices} from "../../../cuba/services";
import { ConcourseRequest } from "../../../cuba/entities/base/tsadv_ConcourseRequest";
import { PersonGroupExt } from "../../../cuba/entities/base/base$PersonGroupExt";
import { FileDescriptor } from "../../../cuba/entities/base/sys$FileDescriptor";
import { DicRequestStatus } from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {withRouter} from "react-router";
import {ReadonlyField} from "../../components/ReadonlyField";
import "antd/dist/antd.css";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";
import {SerializedEntity} from "@cuba-platform/rest/dist-node/model";

type EditorProps = {
  entityId: string;
};

type Props = FormComponentProps & EditorProps;

@injectMainStore
@inject("rootStore")
@observer
class ConcourseRequestEditComponent extends AbstractBprocEdit<ConcourseRequest,Props> {
  dataInstance = instance<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-view",
    loadImmediately: false
  });

  projectManagersDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_base"
  });

  projectExpertsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_base"
  });

  requestTemplatesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  requestAttachmentssDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  personGroupsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal",
  });

  statussDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  @observable
  readonly: boolean = true;

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  @observable
  person: PersonExt;

  personGroupId: string;

  initiatorCompanyName: string;
  initiatorPositionValue: string;
  fields = [
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

    "legacyId",

    "organizationBin",

    "integrationUserLogin",

    "requestNumber",

    "requestDate",

    "comment",

    "requestTemplate",

    "requestAttachments",

    "personGroup",

    "initiatorCompany",

    "initiatorPosition",

    "status"
  ];

  @observable
  globalErrors: string[] = [];

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }
      this.dataInstance
        .update(this.props.form.getFieldsValue(this.fields))
        .then(() => {
          message.success(
            this.props.intl.formatMessage({ id: "management.editor.success" })
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
              this.props.intl.formatMessage({ id: "management.editor.error" })
            );
          }
        });
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={ConcourseRequestManagement.PATH} />;
    }
    const entityName = this.dataInstance.entityName;
    const { status } = this.dataInstance;
    const isNotDraft = this.isNotDraft();
    const buttons = [
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        key={"insurance"}
      >
        <FormattedMessage id="Добавить" />
      </Button>,
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        key={"members"}
      >
        <FormattedMessage id="Изменить" />
      </Button>,
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        key={"members"}
      >
        <FormattedMessage id="Удалить" />
      </Button>
    ];

    return (
      <Card className={`narrow-light`}>
        <div className="cardWrapper">
          <h1>{this.props.entityId !== ConcourseRequestManagement.NEW_SUBPATH?"Редактирование заявки":"Создание заявки"}</h1>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Card title="Общие сведения" size="small" className="generalInfo">
              <Row type={"flex"} align="middle" style={{
                marginTop: "8px",}}
                   justify={"space-between"}>
                <ReadonlyField
                  // value={this.person ? this.person["_instanceName"]:""}
                  entityName={entityName}
                  propertyName="requestNumber"
                  disabled
                  form={this.props.form}
                  formItemOpts={{ style: {
                      minWidth: "30%",
                    } }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }],

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

              <Row type="flex" align="middle" style={{
                marginBottom: "12px",
                marginTop: "8px",}}
                   justify={"space-between"}>
                {/*<ReadonlyField*/}
                {/*  entityName={entityName}*/}
                {/*  propertyName="personGroup"*/}
                {/*  form={this.props.form}*/}
                {/*  disabled={true}*/}
                {/*  formItemOpts={{ style: {minWidth: "30%", marginBottom: "12px" } }}*/}
                {/*  optionsContainer={this.personGroupsDc}*/}
                {/*  getFieldDecoratorOpts={{}}*/}

                {/*/>*/}
                <Form.Item
                  label={createElement(Msg, {
                    entityName: entityName,
                    propertyName: "personGroup"
                  })}
                  required={true}
                  style={{minWidth: "30%", marginBottom: "12px"}}
                >
                  <Input
                    value={this.person ? this.person["_instanceName"] || "" : ""}
                    disabled
                  />
                </Form.Item>

                <Form.Item
                  label={createElement(Msg, {
                    entityName: entityName,
                    propertyName: "initiatorCompany"
                  })}
                  required={true}
                  style={{minWidth: "30%", marginBottom: "12px"}}
                >
                  <Input
                    value={this.initiatorCompanyName ? this.initiatorCompanyName || "" : ""}
                    disabled
                  />
                </Form.Item>

                <Form.Item
                  label={createElement(Msg, {
                    entityName: entityName,
                    propertyName: "initiatorPosition"
                  })}
                  required={true}
                  style={{minWidth: "30%", marginBottom: "12px"}}
                >
                  <Input
                    value={this.initiatorPositionValue ? this.initiatorPositionValue || "" : ""}
                    disabled
                  />
                </Form.Item>
              </Row>
              <Row type="flex" align={"middle"} justify="space-between" style={{ width:"65%" }}>
                <Field
                  entityName={entityName}
                  propertyName="requestNameRu"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth: "46%", marginBottom: "12px" } }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />

                <Field
                  entityName={entityName}
                  propertyName="requestNameEn"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth: "46%", marginBottom: "12px" } }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />
              </Row>
              <Row type="flex" align="middle" justify={"space-between"}>
                <Field
                  entityName={entityName}
                  propertyName="startDate"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"30%", marginBottom: "12px" } }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />
                <Field
                  entityName={entityName}
                  propertyName="endDate"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"30%", marginBottom: "12px" } }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />

                <Field
                  entityName={entityName}
                  propertyName="scaleOfDistrubution"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"30%", marginBottom: "12px" } }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />
              </Row>
            </Card>

            <Card title="Эксперты" size="small" className="generalInfo">
              <Row type="flex" align="middle" justify={"space-between"} style={{
                marginBottom: "12px",
                marginTop: "8px",}}>
                <ReadonlyField
                  entityName={entityName}
                  propertyName="projectManager"
                  form={this.props.form}
                  // disabled={isNotDraft}
                  formItemOpts={{ style: { minWidth:"25%", marginBottom: "12px" } }}
                  optionsContainer={this.projectManagersDc}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }],
                    getValueFromEvent: (personGroupId, val) =>{
                      if (personGroupId){
                        const manager = this.projectManagersDc.items.find(person=>person.id===personGroupId) as PersonExt;
                        this.getManagerUserRecordById(personGroupId, manager["list"][0]!.id)
                        console.log(manager["list"][0], val)
                        return personGroupId;
                      }
                      else{
                        this.props.form.setFieldsValue({
                          managerCompany: "",
                          managerPosition: ""
                        })
                        return undefined;
                      }
                    }
                  }}
                />

                <ReadonlyField
                  entityName={entityName}
                  propertyName="managerPosition"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"25%", marginBottom: "12px" } }}
                  disabled={true}
                  getFieldDecoratorOpts={{rules: [{ required: true }]}}
                />

                <ReadonlyField
                  entityName={entityName}
                  propertyName="managerCompany"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"10%", marginBottom: "12px" } }}
                  disabled={true}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />
                <Field
                  entityName={entityName}
                  propertyName="managerContactInfo"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"33%", marginBottom: "12px" } }}

                  getFieldDecoratorOpts={{rules: [{ required: true }]}}
                />
              </Row>
              <Row type="flex" align="middle" justify={"space-between"}>

                <ReadonlyField
                  entityName={entityName}
                  propertyName="projectExpert"
                  form={this.props.form}
                  // disabled={isNotDraft}
                  formItemOpts={{ style: { minWidth:"25%", marginBottom: "12px" } }}
                  optionsContainer={this.projectExpertsDc}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }],
                    getValueFromEvent: (personGroupId, val) =>{
                      if (personGroupId){
                        const expert = this.projectExpertsDc.items.find(person=>person.id===personGroupId) as PersonExt;
                        this.getExpertUserRecordById(personGroupId, expert["list"][0]!.id)
                        console.log(expert["list"][0], val)
                        return personGroupId;
                      }
                      else{
                        this.props.form.setFieldsValue({
                          expertCompany: "",
                          expertPosition: ""
                        })
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
                  formItemOpts={{ style: {minWidth:"25%", marginBottom: "12px" } }}
                  getFieldDecoratorOpts={{rules: [{ required: true }]}}
                />

                <ReadonlyField
                  entityName={entityName}
                  propertyName="expertCompany"
                  disabled={true}
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"11%", marginBottom: "12px" } }}
                  getFieldDecoratorOpts={{rules: [{ required: true }]}}
                />

                <Field
                  entityName={entityName}
                  propertyName="expertContanctInfo"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"33%", marginBottom: "12px" } }}
                  getFieldDecoratorOpts={{rules: [{ required: true }]}}
                />
              </Row>
            </Card>

            <Card title="Описание проекта" size="small" className="generalInfo">
              <Row type="flex" align="middle" justify={"space-between"} style={{
                marginBottom: "12px",
                marginTop: "8px",}}>
                <Form.Item
                  style={{ width: "49%" }}
                  label={this.createElement(Msg, {
                    entityName: entityName,
                    propertyName: "shortProjectDescriptionRu"
                  })}
                  required={true}
                >
                  {this.props.form.getFieldDecorator("shortProjectDescriptionRu")(
                    <TextArea rows={6}  />
                  )}
                </Form.Item>
                <Form.Item
                  style={{ width: "49%" }}
                  label={this.createElement(Msg, {
                    entityName: entityName,
                    propertyName: "shortProjectDescriptionEn"
                  })}
                  required={true}
                >
                  {this.props.form.getFieldDecorator("shortProjectDescriptionEn")(
                    <TextArea rows={6}  />
                  )}
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

            <Card title="Приложения" className="generalInfo" size="small">
              {buttons}
              <Table>
                <Column
                  title={<Msg entityName={ConcourseRequest.NAME} propertyName="Файл" />}
                  dataIndex="insuranceContract.contract"
                />

                <Column
                  title={<Msg entityName={ConcourseRequest.NAME} propertyName="Дата" />}
                  dataIndex="insuranceContract.startDate"
                />

                <Column
                  title={
                    <Msg entityName={ConcourseRequest.NAME} propertyName="Комментарий" />
                  }
                  dataIndex="insuranceContract.expirationDate"
                />

              </Table>
              <Field
                entityName={entityName}
                propertyName="requestAttachments"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                optionsContainer={this.requestAttachmentssDc}
                getFieldDecoratorOpts={{}}
              />

            </Card>
            {/*<Field*/}
            {/*  entityName={entityName}*/}
            {/*  propertyName="legacyId"*/}
            {/*  form={this.props.form}*/}
            {/*  formItemOpts={{ style: { marginBottom: "12px" } }}*/}
            {/*  getFieldDecoratorOpts={{}}*/}
            {/*/>*/}
            {/*  <Field*/}
            {/*    entityName={entityName}*/}
            {/*    propertyName="organizationBin"*/}
            {/*    form={this.props.form}*/}
            {/*    formItemOpts={{ style: { marginBottom: "12px" } }}*/}
            {/*    getFieldDecoratorOpts={{}}*/}
            {/*  />*/}


            {/*<Field*/}
            {/*  entityName={entityName}*/}
            {/*  propertyName="integrationUserLogin"*/}
            {/*  form={this.props.form}*/}
            {/*  formItemOpts={{ style: { marginBottom: "12px" } }}*/}
            {/*  getFieldDecoratorOpts={{}}*/}
            {/*/>*/}

            {/*<Field*/}
            {/*  entityName={entityName}*/}
            {/*  propertyName="comment"*/}
            {/*  form={this.props.form}*/}
            {/*  formItemOpts={{ style: { marginBottom: "12px" } }}*/}
            {/*  getFieldDecoratorOpts={{}}*/}
            {/*/>*/}


            {this.globalErrors.length > 0 && (
              <Alert
                message={<MultilineText lines={toJS(this.globalErrors)} />}
                type="error"
                style={{ marginBottom: "24px" }}
              />
            )}

            <Form.Item style={{ textAlign: "right" }}>
              <Link to={ConcourseRequestManagement.PATH}>
                <Button htmlType="button">
                  <FormattedMessage id="management.editor.cancel" />
                </Button>
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                disabled={status !== "DONE" && status !== "ERROR"}
                loading={status === "LOADING"}
                style={{ marginLeft: "8px" }}
              >
                <FormattedMessage id="management.editor.submit" />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    );
  }

  // @action
  // setReadOnly = (): void => {
  //   this.readonly = !(this.dataInstance.item
  //     && !this.isNotDraft()
  //     && (this.props.form.getFieldValue("status") === 'DRAFT' || this.props.form.getFieldValue("status") === 'COMPLETED')
  //     && this.dataInstance.item.personGroup!.id! === this.props.rootStore!.userInfo.personGroupId!);
  // };

  getUpdateEntityData = (): any => {
    return this.props.form.getFieldsValue(this.fields)
  };

  update = () => {
    const updateEntityData = this.getUpdateEntityData();
    // if (this.approverHrRoleCode === 'MANAGER' && ((this.dataInstance.item && this.dataInstance.item.stage && this.dataInstance.item.stage.code) === 'ASSESSMENT')) {
    //   updateEntityData['lineManager'] = this.props.rootStore!.userInfo!.personGroupId;
    // }

    return this.dataInstance.update({
      personGroup: this.personGroupId,
      ...updateEntityData});
  };

  getExpertUserRecordById(id: string, groupId: string){
    // @ts-ignore
    if (id || groupId){
      const pos = restServices.employeeService.personProfile(id).then(pos=>{
        this.props.form.setFieldsValue({
          expertCompany: pos.organizationName,
          expertPosition: pos.positionName
        })
      })
      console.log(pos, groupId)
    }
    else{
      console.log("No data")
    }
  }

  getManagerUserRecordById(id: string, groupId: string){
    // @ts-ignore
    if (id || groupId){
      const pos = restServices.employeeService.personProfile(id).then(pos=>{
        this.props.form.setFieldsValue({
          managerCompany: pos.organizationName,
          managerPosition: pos.positionName
        })
      })
      console.log(pos, groupId)
    }
    else{
      console.log("No data:", id, groupId)
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
      (item) => {
        this.personGroupId = this.props.rootStore?this.props.rootStore!.userInfo!.personGroupId!:""
        this.initiatorCompanyName = this.props.rootStore?this.props.rootStore!.userInfo!.companyCode!:""
        this.initiatorPositionValue = this.props.rootStore!.userInfo!.position!
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
              ]
            },
            {
              view: "person-edit"
            }
          )
          .then(value => value[0])
          .then(value => (this.person = value));
        this.props.form.setFieldsValue(this.dataInstance.getFieldValues(this.fields));
      }
    );
    this.loadData()
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
