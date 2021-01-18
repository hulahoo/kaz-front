import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Col, Form, message, Row} from "antd";
import {inject, observer} from "mobx-react";
import {PersonalDataRequestManagement} from "./PersonalDataRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link} from "react-router-dom";
import {IReactionDisposer, observable, reaction, runInAction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  Field,
  injectMainStore,
  instance,
  MainStoreInjected,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {PersonalDataRequest} from "../../../cuba/entities/base/tsadv$PersonalDataRequest";
import {RootStoreProp} from "../../store";
import {restQueries} from "../../../cuba/queries";
import Notification from "../../util/notification/Notification";
import PersonContactList from "../PersonContact/PersonContactList";
import PersonDocumentList from "../PersonDocument/PersonDocumentList";
import Button, {ButtonType} from "../../components/Button/Button";

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
    return (
      <div>
        <Card className="narrow-layout large-section section-container">
          <div className={"section-header-container"}>Основные данные</div>
          <Row type={"flex"}>
            <Col md={24} lg={8}>
              <Row type={"flex"} align={"middle"} style={{'width': '100%', 'height': '100%'}} justify={"center"}>
                <img src={require('../../../resources/img/default-avatar.svg')}
                     style={{'height': '50%'}}/>
              </Row>
            </Col>
            <Col md={24} lg={16}>
              <Form onSubmit={this.handleSubmit}>
                <Row type={"flex"} className={"data-form"}>
                  <Col md={24} sm={24} lg={8}>
                    <Field
                      entityName={PersonalDataRequest.NAME}
                      propertyName="lastName"
                      form={this.props.form}
                      getFieldDecoratorOpts={{}}
                    />
                    <Field
                      entityName={PersonalDataRequest.NAME}
                      propertyName="lastNameLatin"
                      form={this.props.form}
                      getFieldDecoratorOpts={{}}
                    />
                    <Field
                      entityName={PersonalDataRequest.NAME}
                      propertyName="requestNumber"
                      form={this.props.form}
                      getFieldDecoratorOpts={{}}
                    />
                  </Col>
                  <Col md={24} sm={24} lg={8}>
                    <Field
                      entityName={PersonalDataRequest.NAME}
                      propertyName="firstName"
                      form={this.props.form}
                      getFieldDecoratorOpts={{}}
                    />
                    <Field
                      entityName={PersonalDataRequest.NAME}
                      propertyName="firstNameLatin"
                      form={this.props.form}
                      getFieldDecoratorOpts={{}}
                    />
                  </Col>
                  <Col md={24} sm={24} lg={8}>
                    <Field
                      entityName={PersonalDataRequest.NAME}
                      propertyName="middleName"
                      form={this.props.form}
                      getFieldDecoratorOpts={{}}
                    />
                    <Field
                      entityName={PersonalDataRequest.NAME}
                      propertyName="middleNameLatin"
                      form={this.props.form}
                      getFieldDecoratorOpts={{}}
                    />

                    <Field
                      entityName={PersonalDataRequest.NAME}
                      propertyName="dateOfBirth"
                      form={this.props.form}
                      getFieldDecoratorOpts={{}}
                    />
                    <Form.Item style={{textAlign: "center"}}>
                      <Button
                        htmlType="submit"
                        buttonType={ButtonType.PRIMARY}
                        disabled={status !== "DONE" && status !== "ERROR"}
                        loading={status === "LOADING"}
                        style={{marginLeft: "8px", 'width': '100%'}}
                      >
                        <FormattedMessage id="management.editor.submit"/>
                      </Button>
                    </Form.Item>
                  </Col>
                  {this.globalErrors.length > 0 && (
                    <Alert
                      message={<MultilineText lines={toJS(this.globalErrors)}/>}
                      type="error"
                      style={{marginBottom: "24px"}}
                    />
                  )}
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card className="narrow-layout large-section section-container">
          <div className={"section-header-container"}>Документы</div>
          <PersonDocumentList/>
        </Card>
        <Card className="narrow-layout large-section section-container">
          <div className={"section-header-container"}>Контактная информация</div>
          <PersonContactList/>
        </Card>
      </div>
    );
  }

  componentDidMount() {
    const userId = this.props.rootStore!.userInfo.id!;
    if (userId !== PersonalDataRequestManagement.NEW_SUBPATH) {
      restQueries.myProfile(userId).then(response => {
        runInAction(() => {
          this.dataInstance.item = response;
          this.dataInstance.status = "DONE";
        });
      }).catch(reason => {
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
