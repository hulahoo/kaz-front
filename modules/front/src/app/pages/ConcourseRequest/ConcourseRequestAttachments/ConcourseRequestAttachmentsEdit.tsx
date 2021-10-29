import * as React from "react";
import { FormEvent } from "react";
import { Alert, Button, Card, Form, message, Modal, Spin } from "antd";
import {inject, observer} from "mobx-react";
import { ConcourseRequestAttachmentsManagement } from "./ConcourseRequestAttachmentsManagement";
import { FormComponentProps } from "antd/lib/form";
import { Link, Redirect } from "react-router-dom";
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
  MultilineText, injectMainStore, MainStoreInjected
} from "@cuba-platform/react";

import "../../../../app/App.css";

import { ConcourseRequestAttachments } from "../../../../cuba/entities/base/tsadv_ConcourseRequestAttachments";
import { FileDescriptor } from "../../../../cuba/entities/base/sys$FileDescriptor";
import { ConcourseRequest } from "../../../../cuba/entities/base/tsadv_ConcourseRequest";
import {ReadonlyField} from "../../../components/ReadonlyField";
import {RootStoreProp} from "../../../store";
import {RouteComponentProps} from "react-router";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId?: string;
  visible?: boolean;
  onChangeVisible: (value: boolean) => void;
  refreshDs: () => void;
  requestNum?: string;
};

@injectMainStore
@inject("rootStore")
@observer
class ConcourseRequestAttachmentsEditComponent extends React.Component<
  Props & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>> {
  dataInstance = instance<ConcourseRequestAttachments>(
    ConcourseRequestAttachments.NAME,
    { view: "concourseRequestAttachments-view", loadImmediately: false }
  );

  attachmentsDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal",

  });

  concourseRequestsDc = collection<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "_minimal",
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  modFields = [ "comments" , "concourseRequestNumber" , "attachment", "id"];

  @observable
  globalErrors: string[] = [];

  @observable visibleModal = this.props.visible;

  @observable concourseRequestNum : string;

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.setFieldsValue({
      concourseRequestNumber: this.concourseRequestNum ? this.concourseRequestNum.toString() : this.props.requestNum!.toString() ,
      id: this.props.requestNum!.toString()+this.props.requestNum!.toString()
    })
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }

      console.log(this.props.form.getFieldsValue(this.modFields))

      // this.dataInstance.setItem({
      //   concourseRequestNumber: this.props.form.getFieldValue("concourseRequestNumber")
      // })
      // this.dataInstance.setItem({
      //   id: this.props.form.getFieldValue("id")
      // })
      // this.dataInstance.setItem({
      //   attachment: this.props.form.getFieldValue("attachment")
      // })
      // this.dataInstance.setItem({
      //   comments: this.props.form.getFieldValue("comments")
      // })
      console.log(this.dataInstance.getFieldValues(this.modFields))
      console.log(this.props.form.getFieldsValue(this.modFields))
      if (this.props.entityId === ConcourseRequestAttachmentsManagement.NEW_SUBPATH){
        this.dataInstance.item!.concourseRequestNumber = this.props.form.getFieldValue("concourseRequestNumber")
        this.dataInstance.item!.comments = this.props.form.getFieldValue("comments")
        this.dataInstance.item!.attachment = this.props.form.getFieldValue("attachment")
        this.dataInstance.commit().then(data=> {
          this.props.refreshDs();
          this.props.onChangeVisible(false);
        })
      }
      else{
        this.dataInstance
          .update(this.props.form.getFieldsValue(this.modFields))
          .then((data) => {
            console.log("After update:", data)
            message.success(
              this.props.intl.formatMessage({ id: "management.editor.success" })
            );
            // this.updated = true;
            this.props.refreshDs();
            this.props.onChangeVisible(false);
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
            this.props.onChangeVisible(false);
          });

      }

    });
  };


  render() {
    if (this.updated) {
      this.visibleModal = false;
    }

    const { status } = this.dataInstance;

    return (
      <Modal
        visible={this.visibleModal}
        onOk={this.handleSubmit}
        onCancel={this.props.onChangeVisible.bind(null, false)}
      >
        <Spin spinning={status == "LOADING"}>

        <Form onSubmit={this.handleSubmit} layout="vertical">
          <ReadonlyField
            entityName={ConcourseRequestAttachments.NAME}
            propertyName="attachment"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            // optionsContainer={this.attachmentsDc}
            getFieldDecoratorOpts={{}}
          />

          <ReadonlyField
            entityName={ConcourseRequestAttachments.NAME}
            propertyName="comments"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{}}
          />
          {this.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(this.globalErrors)} />}
              type="error"
              style={{ marginBottom: "24px" }}
            />
          )}
          <ReadonlyField
            entityName={ConcourseRequestAttachments.NAME}
            propertyName="concourseRequestNumber"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px", display:"none" } }}

            getFieldDecoratorOpts={{}}
          />
          <ReadonlyField
            entityName={ConcourseRequestAttachments.NAME}
            propertyName="id"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px", display:"none" } }}

            getFieldDecoratorOpts={{}}
          />
        </Form>
        </Spin>
      </Modal>
    );
  }

  componentDidMount() {
    if (
      this.props.entityId !== ConcourseRequestAttachmentsManagement.NEW_SUBPATH
    ) {
      this.dataInstance.load(this.props.entityId!);
    } else {
      this.dataInstance.setItem(new ConcourseRequestAttachments());
    }
    this.concourseRequestNum = this.props.requestNum!
    console.log(this.dataInstance.getFieldValues(this.modFields))
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {
          if(this.props.visible){
            console.log("HERE IS ITEM: ",item)
            console.log("MY COMPONENT DID MOUNT: ", this.dataInstance.getFieldValues(this.modFields))
            this.props.form.setFieldsValue(this.dataInstance.getFieldValues(this.modFields));
          }
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
  })(ConcourseRequestAttachmentsEditComponent)
);
