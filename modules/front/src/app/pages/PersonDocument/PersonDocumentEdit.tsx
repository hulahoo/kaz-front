import * as React from "react";
import {FormEvent} from "react";
import {Alert, Button, Card, Form, message} from "antd";
import {observer} from "mobx-react";
import {PersonDocumentManagement} from "./PersonDocumentManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

import {
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText, EntityProperty
} from "@cuba-platform/react";

import "../../../app/App.css";

import {PersonDocument} from "../../../cuba/entities/base/tsadv$PersonDocument";
import {EntitySelectField} from "@cuba-platform/react/dist/ui/EntitySelectField";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@observer
class PersonDocumentEditComponent extends React.Component<Props & WrappedComponentProps> {
  dataInstance = instance<PersonDocument>(PersonDocument.NAME, {
    view: "_local",
    loadImmediately: false
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = [
    "issueDate",

    "expiredDate",

    "issuedBy",

    "description",

    "documentNumber",

    "series",

    "legacyId",

    "organizationBin",

    "integrationUserLogin"
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
            this.props.intl.formatMessage({id: "management.editor.success"})
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
              this.props.intl.formatMessage({id: "management.editor.error"})
            );
          }
        });
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={PersonDocumentManagement.PATH}/>;
    }

    const {status} = this.dataInstance;

    return (
      <Card className="narrow-layout">
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <Field
            entityName={PersonDocument.NAME}
            propertyName="issueDate"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{
              rules: [{required: true}]
            }}
          />

          <Field
            entityName={PersonDocument.NAME}
            propertyName="expiredDate"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{
              rules: [{required: true}]
            }}
          />

          <Field
            entityName={PersonDocument.NAME}
            propertyName="issuedBy"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{}}
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
              rules: [{required: true}]
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
            propertyName="legacyId"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{}}
          />

          <Field
            entityName={PersonDocument.NAME}
            propertyName="organizationBin"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{}}
          />

          <Field
            entityName={PersonDocument.NAME}
            propertyName="integrationUserLogin"
            form={this.props.form}
            formItemOpts={{style: {marginBottom: "12px"}}}
            getFieldDecoratorOpts={{}}
          />

          {this.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(this.globalErrors)}/>}
              type="error"
              style={{marginBottom: "24px"}}
            />
          )}

          <Form.Item style={{textAlign: "center"}}>
            <Link to={PersonDocumentManagement.PATH}>
              <Button htmlType="button">
                <FormattedMessage id="management.editor.cancel"/>
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              disabled={status !== "DONE" && status !== "ERROR"}
              loading={status === "LOADING"}
              style={{marginLeft: "8px"}}
            >
              <FormattedMessage id="management.editor.submit"/>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
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
  })(PersonDocumentEditComponent)
);
