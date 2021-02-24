import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Form, message} from "antd";
import {inject, observer} from "mobx-react";
import {PersonContactManagement} from "./PersonContactManagement";
import {FormComponentProps} from "antd/lib/form";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors, collection,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  Field, injectMainStore,
  instance, MainStoreInjected,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {PersonContact} from "../../../cuba/entities/base/tsadv$PersonContact";
import Notification from "../../util/Notification/Notification";
import Button, {ButtonType} from "../../components/Button/Button";
import {DicPhoneType} from "../../../cuba/entities/base/tsadv$DicPhoneType";
import {PersonDocument} from "../../../cuba/entities/base/tsadv$PersonDocument";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import LoadingPage from "../LoadingPage";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class PersonContactEditComponent extends React.Component<Props & WrappedComponentProps & RouteComponentProps<any> & RootStoreProp & MainStoreInjected> {
  dataInstance = instance<PersonContact>(PersonContact.NAME, {
    view: "portal.my-profile",
    loadImmediately: false
  });

  typesDc = collection<DicPhoneType>(DicPhoneType.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;

  @observable
  mainStore = this.props.mainStore;

  reactionDisposer: IReactionDisposer;

  fields = [
    "contactValue",

    "endDate",

    "startDate",

    "type"
  ];

  @observable
  globalErrors: string[] = [];

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        Notification.error({
          message: this.props.intl.formatMessage({
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
                  message: this.props.intl.formatMessage({
                    id: "management.editor.validationError"
                  })
                });
              } else {
                Notification.error({
                  message: this.props.intl.formatMessage({
                    id: "management.editor.error"
                  })
                });
              }
            });
          } else {
            Notification.error({
              message: this.props.intl.formatMessage({id: "management.editor.error"})
            });
          }
        });
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={PersonContactManagement.PATH}/>;
    }

    if (!this.mainStore) {
      return <LoadingPage/>
    }

    const messages = this.mainStore.messages!;
    if (!messages) {
      return <LoadingPage/>
    }

    const {status} = this.dataInstance;


    const PageContent = <Card className="narrow-layout large-section section-container">
      <Form onSubmit={this.handleSubmit} layout="vertical">
        <Field
          entityName={PersonContact.NAME}
          propertyName="type"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          optionsContainer={this.typesDc}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.documentType']})
            }]
          }}/>

        <Field
          entityName={PersonContact.NAME}
          propertyName="contactValue"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.documentType']})
            }]
          }}
        />

        <Field
          entityName={PersonContact.NAME}
          propertyName="startDate"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.documentType']})
            }]
          }}
        />

        <Field
          entityName={PersonContact.NAME}
          propertyName="endDate"
          form={this.props.form}
          formItemOpts={{style: {marginBottom: "12px"}}}
          getFieldDecoratorOpts={{
            rules: [{
              required: true,
              message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PersonDocument.NAME + '.documentType']})
            }]
          }}
        />

        {this.globalErrors.length > 0 && (
          <Alert
            message={<MultilineText lines={toJS(this.globalErrors)}/>}
            type="error"
            style={{marginBottom: "24px"}}
          />
        )}

        <Form.Item style={{textAlign: "center"}}>
          <Button htmlType="button" buttonType={ButtonType.FOLLOW} onClick={() => this.props.history!.goBack()}>
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
    return (<Page pageName={this.props.intl.formatMessage({id: "myProfile.information"})}>
      {PageContent}
    </Page>);
  }

  componentDidMount() {
    if (this.props.entityId !== PersonContactManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new PersonContact());
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
  })(withRouter(PersonContactEditComponent))
);
