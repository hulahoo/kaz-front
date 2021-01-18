import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Form, message} from "antd";
import {inject, observer} from "mobx-react";
import {PersonDocumentManagement} from "./PersonDocumentManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {autorun, IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  Field, injectMainStore,
  instance, MainStore, MainStoreInjected,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {PersonDocument} from "../../../cuba/entities/base/tsadv$PersonDocument";
import {DicDocumentType} from "../../../cuba/entities/base/tsadv$DicDocumentType";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import {DicApprovalStatus} from "../../../cuba/entities/base/tsadv$DicApprovalStatus";
import {DicIssuingAuthority} from "../../../cuba/entities/base/tsadv_DicIssuingAuthority";
import {RootStoreProp} from "../../store";
import Notification from "../../util/notification/Notification";
import Button, {ButtonType} from "../../components/Button/Button";
import PageContentHoc from "../../hoc/PageContentHoc";
import Page from "../../hoc/PageContentHoc";
import LoadingPage from "../LoadingPage";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class PersonDocumentEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp & RouteComponentProps<any> & MainStoreInjected> {
  dataInstance = instance<PersonDocument>(PersonDocument.NAME, {
    view: "portal.my-profile",
    loadImmediately: false
  });

  documentTypesDc = collection<DicDocumentType>(DicDocumentType.NAME, {
    view: "_minimal"
  });

  issuingAuthoritiesDc = collection<DicIssuingAuthority>(DicIssuingAuthority.NAME, {
    view: "_minimal"
  });

  statusDc = collection<DicApprovalStatus>(DicApprovalStatus.NAME, {
    view: "_minimal"
  });

  filesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = [
    "documentType",

    "status",

    "issueDate",

    "expiredDate",

    "description",

    "documentNumber",

    "series",

    "issuingAuthority",

    "file"
  ];

  @observable
  mainStore = this.props.mainStore!;

  @observable
  metadata = this.props.mainStore!.metadata;

  @observable
  globalErrors: string[] = [];

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        Notification.error({
          message:
            this.props.intl.formatMessage({
              id: "management.editor.validationError"
            })
        });
        return;
      }

      const updateEntityData = {
        personGroup: {
          id: this.props.rootStore!.userInfo.personGroupId
        },
        ...this.props.form.getFieldsValue(this.fields)
      };
      this.dataInstance
        .update(updateEntityData)
        .then(() => {
          Notification.success({message: this.props.intl.formatMessage({id: "management.editor.success"})});
          this.updated = true;
          this.props.history!.goBack();
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
                Notification.error({
                    message:
                      this.props.intl.formatMessage({
                        id: "management.editor.validationError"
                      })
                  }
                );
              } else {
                Notification.error({
                  message:
                    this.props.intl.formatMessage({
                      id: "management.editor.error"
                    })
                });
              }
            });
          } else {
            message.error(
              this.props.intl.formatMessage({id: "antd.form.validation.required"})
            );
          }
        });
    });
  };

  render() {
    const {status} = this.dataInstance;

    if (!this.mainStore) {
      return <LoadingPage/>
    }

    const messages = this.mainStore.messages!;
    if (!messages) {
      return <LoadingPage/>
    }
    const PageContent = <Card className="narrow-layout large-section section-container">
      <Form onSubmit={this.handleSubmit} layout="vertical">
        <Field
          entityName={PersonDocument.NAME}
          propertyName="documentType"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          optionsContainer={this.documentTypesDc}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.documentType']})
            }]
          }}/>

        <Field
          entityName={PersonDocument.NAME}
          propertyName="status"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          optionsContainer={this.statusDc}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.status']})
            }]
          }}/>

        <Field
          entityName={PersonDocument.NAME}
          propertyName="expiredDate"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.expiredDate']})
            }]
          }}
        />

        <Field
          entityName={PersonDocument.NAME}
          propertyName="issuingAuthority"
          form={this.props.form}
          mainStore={this.mainStore}
          formItemOpts={{style: {marginBottom: "12px"}}}
          optionsContainer={this.issuingAuthoritiesDc}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.issuingAuthority']})
            }]
          }}/>

        <Field
          entityName={PersonDocument.NAME}
          propertyName="issueDate"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.issueDate']})
            }]
          }}
        />

        <Field
          entityName={PersonDocument.NAME}
          propertyName="description"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          getFieldDecoratorOpts={{}}
        />

        <Field
          entityName={PersonDocument.NAME}
          propertyName="documentNumber"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.documentNumber']})
            }]
          }}
        />

        <Field
          entityName={PersonDocument.NAME}
          propertyName="series"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          getFieldDecoratorOpts={{}}
        />

        <Field
          entityName={PersonDocument.NAME}
          propertyName="file"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          optionsContainer={this.filesDc}
          getFieldDecoratorOpts={{}}/>

        {this.globalErrors.length > 0 && (
          <Alert
            message={<MultilineText lines={toJS(this.globalErrors)}/>}
            type="error"
            style={{marginBottom: "24px"}}
          />
        )}

        <Form.Item style={{textAlign: "center"}}>
          <Button buttonType={ButtonType.FOLLOW} htmlType="button" onClick={() => this.props.history!.goBack()}>
            <FormattedMessage id="management.editor.cancel"/>
          </Button>
          <Button
            buttonType={ButtonType.PRIMARY}
            htmlType="submit"
            disabled={status !== "DONE" && status !== "ERROR"}
            loading={status === "LOADING"}
            style={{marginLeft: "8px"}}
          >
            <FormattedMessage id="management.editor.submit"/>
          </Button>
        </Form.Item>
      </Form>
    </Card>;

    return <Page pageName={"Документ"}>
      {PageContent}
    </Page>;
  }

  componentDidMount() {
    if (this.props.entityId !== PersonDocumentManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new PersonDocument());
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
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
  })(withRouter(PersonDocumentEditComponent))
);
