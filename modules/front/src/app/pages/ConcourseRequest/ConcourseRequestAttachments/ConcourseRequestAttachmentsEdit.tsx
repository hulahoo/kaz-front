import * as React from "react";
import { FormEvent } from "react";
import { Alert, Button, Card, Form, message, Modal } from "antd";
import { observer } from "mobx-react";
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
  MultilineText
} from "@cuba-platform/react";

import "../../../../app/App.css";

import { ConcourseRequestAttachments } from "../../../../cuba/entities/base/tsadv_ConcourseRequestAttachments";
import { FileDescriptor } from "../../../../cuba/entities/base/sys$FileDescriptor";
import { ConcourseRequest } from "../../../../cuba/entities/base/tsadv_ConcourseRequest";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId?: string;
  visible?: boolean;
  onChangeVisible: (value: boolean) => void;
  refreshDs: () => void;
  requestNum?: string;
};

@observer
class ConcourseRequestAttachmentsEditComponent extends React.Component<
  Props & WrappedComponentProps
> {
  dataInstance = instance<ConcourseRequestAttachments>(
    ConcourseRequestAttachments.NAME,
    { view: "concourseRequestAttachments-view", loadImmediately: false }
  );

  attachmentsDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  concourseRequestsDc = collection<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = ["comments", "attachment", "concourseRequestNumber"];

  @observable
  globalErrors: string[] = [];

  @observable visibleModal = this.props.visible;

  @observable concourseRequestNumber = this.props.requestNum

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.setFieldsValue({
      concourseRequestNumber: this.concourseRequestNumber
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
      this.dataInstance
        .update(this.props.form.getFieldsValue(this.fields))
        .then(() => {
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
        });
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
        destroyOnClose={true}
        onOk={this.handleSubmit}
        onCancel={this.props.onChangeVisible.bind(null, false)}
      >
        <Form onSubmit={this.handleSubmit} layout="vertical">


          <Field
            entityName={ConcourseRequestAttachments.NAME}
            propertyName="attachment"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            optionsContainer={this.attachmentsDc}
            getFieldDecoratorOpts={{}}
          />

          <Field
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


        </Form>
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
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {
        if(item){

            this.props.form.setFieldsValue(
              this.dataInstance.getFieldValues(this.fields)
            );

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
