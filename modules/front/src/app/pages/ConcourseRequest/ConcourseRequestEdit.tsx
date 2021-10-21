import * as React from "react";
import {createElement, FormEvent} from "react";
import {Alert, Button, Card, Form, message, Table} from "antd";
import {inject, observer} from "mobx-react";
import { ConcourseRequestManagement } from "./ConcourseRequestManagement";
import { FormComponentProps } from "antd/lib/form";
import { Link, Redirect } from "react-router-dom";
import { IReactionDisposer, observable, reaction, toJS } from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import { Row, Col } from "antd";
import {
  collection,
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText, Msg, injectMainStore
} from "@cuba-platform/react";

import "../../../app/App.css";

import { ConcourseRequest } from "../../../cuba/entities/base/tsadv_ConcourseRequest";
import { PersonGroupExt } from "../../../cuba/entities/base/base$PersonGroupExt";
import { FileDescriptor } from "../../../cuba/entities/base/sys$FileDescriptor";
import { DicRequestStatus } from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import Column from "antd/lib/table/Column";
import {Concourse} from "../../../cuba/entities/kzm_Concourse";
import {ReadonlyField} from "../../components/ReadonlyField";
import TextArea from "antd/es/input/TextArea";
import {withRouter} from "react-router";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import LoadingPage from "../LoadingPage";
import {PersonDocument} from "../../../cuba/entities/base/tsadv$PersonDocument";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";
import moment from "moment";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";


type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class ConcourseRequestEditComponent extends AbstractBprocEdit<ConcourseRequest, EditorProps> {
  dataInstance = instance<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-view",
    loadImmediately: false
  });

  @observable
  editConcourse: ConcourseRequest;

  instanceEdit = instance<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-view",
    loadImmediately: false
  });

  @observable
  changedMap = new Map<string, boolean>();

  @observable
  person: PersonExt;

  personGroupId: string;

  projectManagersDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal",
  });

  contactInfosDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  managerPositionsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  managerCompanysDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  projectExpertsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal",
  });

  expertPositionsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  expertCompanysDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  expertContanctInfosDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  reqeustTemplatesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  requestAttachmentssDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  initiatorsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  initiatorCompanysDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  initiatorPositionsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  statussDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  @observable
  mainStore = this.props.mainStore!;

  isUpdateBeforeOutcome = true;

  fields = [
    "endDate",

    "scaleOfDistrubution",

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

    "projectManager",

    "contactInfo",

    "managerPosition",

    "managerCompany",

    "projectExpert",

    "expertPosition",

    "expertCompany",

    "expertContanctInfo",

    "reqeustTemplate",

    "requestAttachments",

    "initiator",

    "initiatorCompany",

    "initiatorPosition",

    "status"
  ];

  @observable
  globalErrors: string[] = [];

  getUpdateEntityData = (): any =>{
    return {
      initiator:{
        id: this.props.rootStore!.userInfo.personGroupId
      },
      requestDate: moment().toISOString(),
      initiatorPosition: this.props.rootStore!.userInfo.position,
      ...this.props.form.getFieldsValue(this.fields),
    }
  }

  processDefinitionKey = "concourseRequest"

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
    const entityName = this.dataInstance.entityName;
    console.log(entityName)
    if (!this.mainStore) return <LoadingPage />;
    if (this.updated) {
      return <Redirect to={ConcourseRequestManagement.PATH} />;
    }

    const { status } = this.dataInstance;
    const buttons = [
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        key={"add-attachment"}
      >
        <FormattedMessage id="Добавить" />
      </Button>,
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        key={"edit-attachment"}
      >
        <FormattedMessage id="Изменить" />
      </Button>,
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        key={"delete-attachment"}
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
                <Field
                  // value={this.person ? this.person["_instanceName"]:""}
                  entityName={entityName}
                  propertyName="requestNumber"
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
                  }}
                />

                <Field

                  entityName={entityName}
                  propertyName="status"
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
                <ReadonlyField
                  entityName={entityName}
                  propertyName="initiator"
                  form={this.props.form}
                  disabled={true}
                  formItemOpts={{ style: {minWidth: "30%", marginBottom: "12px" } }}
                  optionsContainer={this.initiatorsDc}
                  getFieldDecoratorOpts={{}}
                />

                <Field
                  entityName={entityName}
                  propertyName="initiatorCompany"
                  form={this.props.form}
                  formItemOpts={{
                    style: {minWidth: "30%", marginBottom: "12px" }
                  }}
                  optionsContainer={this.initiatorCompanysDc}
                  getFieldDecoratorOpts={{}}
                />

                <Field
                  entityName={entityName}
                  propertyName="initiatorPosition"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth: "30%", marginBottom: "12px" } }}
                  optionsContainer={this.initiatorPositionsDc}
                  getFieldDecoratorOpts={{}}
                />
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
                <Field
                  entityName={entityName}
                  propertyName="projectManager"
                  form={this.props.form}
                  formItemOpts={{ style: { minWidth:"25%", marginBottom: "12px" } }}
                  optionsContainer={this.projectManagersDc}
                  getFieldDecoratorOpts={{}}
                />

                <Field
                  entityName={entityName}
                  propertyName="managerPosition"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"25%", marginBottom: "12px" } }}
                  optionsContainer={this.managerPositionsDc}
                  getFieldDecoratorOpts={{}}
                />

                <Field
                  entityName={entityName}
                  propertyName="managerCompany"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"10%", marginBottom: "12px" } }}
                  optionsContainer={this.managerCompanysDc}
                  getFieldDecoratorOpts={{

                  }}
                />
                <Field
                  entityName={entityName}
                  propertyName="contactInfo"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"33%", marginBottom: "12px" } }}
                  optionsContainer={this.contactInfosDc}
                  getFieldDecoratorOpts={{}}
                />
              </Row>
              <Row type="flex" align="middle" justify={"space-between"}>

                <Field
                  entityName={entityName}
                  propertyName="projectExpert"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"25%", marginBottom: "12px" } }}
                  optionsContainer={this.projectExpertsDc}
                  getFieldDecoratorOpts={{}}
                />

                <Field
                  entityName={entityName}
                  propertyName="expertPosition"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"25%", marginBottom: "12px" } }}
                  optionsContainer={this.expertPositionsDc}
                  getFieldDecoratorOpts={{}}
                />

                <Field
                  entityName={entityName}
                  propertyName="expertCompany"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"11%", marginBottom: "12px" } }}
                  optionsContainer={this.expertCompanysDc}
                  getFieldDecoratorOpts={{}}
                />

                <Field
                  entityName={entityName}
                  propertyName="expertContanctInfo"
                  form={this.props.form}
                  formItemOpts={{ style: {minWidth:"33%", marginBottom: "12px" } }}
                  optionsContainer={this.expertContanctInfosDc}
                  getFieldDecoratorOpts={{}}
                />
              </Row>
            </Card>

            <Card title="Описание проекта" size="small" className="generalInfo">
              <Row type="flex" align="middle" justify={"space-between"} style={{
                marginBottom: "12px",
                marginTop: "8px",}}>
                <Form.Item
                  style={{ width: "49%" }}
                  label={createElement(Msg, {
                    entityName: entityName,
                    propertyName: "shortProjectDescriptionRu"
                  })}
                >
                  {this.props.form.getFieldDecorator("shortProjectDescriptionRu")(
                    <TextArea rows={6}  />
                  )}
                </Form.Item>
                <Form.Item
                  style={{ width: "49%" }}
                  label={createElement(Msg, {
                    entityName: entityName,
                    propertyName: "shortProjectDescriptionEn"
                  })}
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
                propertyName="reqeustTemplate"
                form={this.props.form}
                formItemOpts={{ style: { marginBottom: "12px" } }}
                optionsContainer={this.reqeustTemplatesDc}
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />
            </Card>

            <Card title="Приложения" className="generalInfo" size="small">
              {buttons}
              <Table>
                <Column
                  title={<Msg entityName={Concourse.NAME} propertyName="Файл" />}
                  dataIndex="insuranceContract.contract"
                />

                <Column
                  title={<Msg entityName={Concourse.NAME} propertyName="Дата" />}
                  dataIndex="insuranceContract.startDate"
                />

                <Column
                  title={
                    <Msg entityName={Concourse.NAME} propertyName="Комментарий" />
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
        const values = {
          ...this.props.form.getFieldsValue(this.fields),
            // requestDate: item && item.requestDate ? item.requestDate : moment().toISOString(),
            // initiator: item && item.initiator ? item.initiator : this.props.rootStore!.userInfo!
        }
        console.log("There are going to be values: ",values)
        this.props.form.setFieldsValue(values);
      }
    );
  }

  // componentWillUnmount() {
  //   this.reactionDisposer();
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
  })(withRouter(ConcourseRequestEditComponent))
);
