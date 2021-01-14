import * as React from "react";
import {FormEvent} from "react";
import {Alert, Button, Card, Form, message} from "antd";
import {inject, observer} from "mobx-react";
import {PersonalDataRequestManagement} from "./PersonalDataRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, runInAction, toJS} from "mobx";
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
  MultilineText, getMainStore, injectMainStore, MainStoreInjected
} from "@cuba-platform/react";

import "../../../app/App.css";

import {PersonalDataRequest} from "../../../cuba/entities/base/tsadv$PersonalDataRequest";
import {RootStoreProp} from "../../store";
import {restQueries} from "../../../cuba/queries";
import Notification from "../../util/notification/Notification";
import PersonContactEditComponent from "../PersonContact/PersonContactEdit";
import {PersonContactManagement} from "../PersonContact/PersonContactManagement";
import PersonContactList from "../PersonContact/PersonContactList";
import PersonDocumentList from "../PersonDocument/PersonDocumentList";

type Props = FormComponentProps;

@inject("rootStore")
@injectMainStore
@observer
class PersonalDataRequestEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp & MainStoreInjected> {

  dataInstance = instance<PersonalDataRequest>(PersonalDataRequest.NAME, {
    view: "_local",
    loadImmediately: false
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = [
    "lastName",

    "requestNumber",

    "firstName",

    "middleName",

    "lastNameLatin",

    "firstNameLatin",

    "middleNameLatin",

    "dateOfBirth"
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
          // this.updated = true;
          Notification.success({message: this.props.intl.formatMessage({id: "management.editor.success"})});
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
    const {status} = this.dataInstance;
    console.log(this.props.mainStore!.metadata);
    return (
      <div>
        <Card className="narrow-layout large-section section-container">
          <div className={"section-header-container"}>Основные данные</div>
          <Form onSubmit={this.handleSubmit}>
            <Field
              entityName={PersonalDataRequest.NAME}
              propertyName="lastName"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={PersonalDataRequest.NAME}
              propertyName="requestNumber"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={PersonalDataRequest.NAME}
              propertyName="firstName"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={PersonalDataRequest.NAME}
              propertyName="middleName"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={PersonalDataRequest.NAME}
              propertyName="lastNameLatin"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={PersonalDataRequest.NAME}
              propertyName="firstNameLatin"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={PersonalDataRequest.NAME}
              propertyName="middleNameLatin"
              form={this.props.form}
              formItemOpts={{style: {marginBottom: "12px"}}}
              getFieldDecoratorOpts={{}}
            />

            <Field
              entityName={PersonalDataRequest.NAME}
              propertyName="dateOfBirth"
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
              <Link to={PersonalDataRequestManagement.PATH}>
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
        <div className={"section-container large-section"}>
          <div className={"section-header-container"}>Документы</div>
          <PersonDocumentList/>
        </div>
        <div className={"section-container large-section"}>
          <div className={"section-header-container"}>Контактная информация</div>
          <PersonContactList/>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const userId = this.props.rootStore!.userInfo.id;
    if (userId !== PersonalDataRequestManagement.NEW_SUBPATH) {
      restQueries.myProfile(userId).then(response => {
        runInAction(() => {
          this.dataInstance.item = response;
          this.dataInstance.status = "DONE";
        });
      }).catch(reason => {
        console.log(reason);
      });
      // this.dataInstance.load(id);
    } else {
      this.dataInstance.setItem(new PersonalDataRequest());
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
  withLocalizedForm({
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
  })(PersonalDataRequestEditComponent)
);
