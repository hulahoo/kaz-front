import * as React from "react";
import { FormEvent } from "react";
import {Alert, Button, Card, Form, message, Modal} from "antd";
import { observer } from "mobx-react";
import { ConcourseRequestDocumentManagement } from "./ConcourseRequestDocumentManagement";
import { FormComponentProps } from "antd/lib/form";
import {Link, Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import { IReactionDisposer, observable, reaction, toJS } from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

import {
  collection,
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText, getCubaREST
} from "@cuba-platform/react";

import "../../../../app/App.css";

import { ConcourseRequestDocument } from "../../../../cuba/entities/base/tsadv_ConcourseRequestDocument";
import { FileDescriptor } from "../../../../cuba/entities/base/sys$FileDescriptor";
import {ReadonlyField} from "../../../components/ReadonlyField";
import AbstractBprocEdit from "../../Bproc/abstract/AbstractBprocEdit";
import {PersonExt} from "../../../../cuba/entities/base/base$PersonExt";


type EditorProps = {
  entityId: string,
  isModalVisible?: boolean,
  handleSubmit?: any
};

type Props = FormComponentProps & EditorProps;


@observer
class ConcourseRequestDocumentEditComponent extends AbstractBprocEdit<ConcourseRequestDocument,
  Props & WrappedComponentProps & RouteComponentProps
> {
  dataInstance = instance<ConcourseRequestDocument>(
    ConcourseRequestDocument.NAME,
    { view: "concourseRequestDocument-edit", loadImmediately: false }
  );

  attachmentsDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  @observable
  person: PersonExt | null;

  @observable
  personGroupId: string;

  modalFields = ["comment", "attachment", "requestDate", "personGroup"];

  @observable
  globalErrors: string[] = [];

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields(this.modalFields, (err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }
      this.dataInstance
        .update(this.props.form.getFieldsValue(this.modalFields))
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

  @observable
  visibleModal = this.props.isModalVisible!

  render() {
    // if (this.updated) {
    //   this.visibleModal = false
    // }

    const { status } = this.dataInstance;

    return (
      <Modal footer={null} visible={this.visibleModal} style={{padding:"10px 20px"}}>
          <Form onSubmit={this.handleSubmit} layout="vertical" >
            <ReadonlyField
              entityName={ConcourseRequestDocument.NAME}
              propertyName="attachment"
              form={this.props.form}
              formItemOpts={{ style: { marginBottom: "12px" } }}
              optionsContainer={this.attachmentsDc}
              getFieldDecoratorOpts={{}}
            />

            <ReadonlyField
              entityName={ConcourseRequestDocument.NAME}
              propertyName="comment"
              form={this.props.form}
              formItemOpts={{ style: { marginBottom: "12px" } }}
              getFieldDecoratorOpts={{}}
            />

            <ReadonlyField
              entityName={ConcourseRequestDocument.NAME}
              propertyName="requestDate"
              form={this.props.form}
              formItemOpts={{ style: { marginBottom: "12px" } }}
              getFieldDecoratorOpts={{}}
              style={{display:"none"}}
            />

            <ReadonlyField
              entityName={ConcourseRequestDocument.NAME}
              propertyName="personGroup"
              form={this.props.form}
              formItemOpts={{ style: { marginBottom: "12px" } }}
              getFieldDecoratorOpts={{}}
              style={{display:"none"}}
            />



            {this.globalErrors.length > 0 && (
              <Alert
                message={<MultilineText lines={toJS(this.globalErrors)} />}
                type="error"
                style={{ marginBottom: "24px" }}
              />
            )}

            <Form.Item style={{ textAlign: "center" }}>

                <Button htmlType="button" onClick={()=>this.props.history!.goBack()}>
                  <FormattedMessage id="management.editor.cancel" />
                </Button>

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

      </Modal>
    );
  }

  componentDidMount() {
    if (
      this.props.entityId !== ConcourseRequestDocumentManagement.NEW_SUBPATH
    ) {
      this.dataInstance.load(ConcourseRequestDocument.NAME);
    } else {
      this.dataInstance.setItem(new ConcourseRequestDocument());
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
        this.personGroupId = this.props.rootStore?this.props.rootStore!.userInfo!.personGroupId!:""
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

        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.modalFields)
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
  })(withRouter(ConcourseRequestDocumentEditComponent))
);
