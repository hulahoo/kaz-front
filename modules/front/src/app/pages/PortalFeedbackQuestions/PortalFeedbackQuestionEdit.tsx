import * as React from "react";
import {createElement, FormEvent} from "react";
import {Card, Form, Modal, Select} from "antd";
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors,
  extractServerValidationErrors,
  getCubaREST,
  injectMainStore,
  instance,
  MainStoreInjected,
  Msg,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";
import {RouteComponentProps, withRouter} from "react-router";
import LoadingPage from "../LoadingPage";
import {ReadonlyField} from "../../components/ReadonlyField";
import {rootStore, RootStoreProp} from "../../store";
import {FormComponentProps} from "antd/lib/form";
import {IReactionDisposer, observable, reaction} from "mobx";
import {PortalFeedbackQuestions} from "../../../cuba/entities/base/tsadv_PortalFeedbackQuestions";
import {PortalFeedback} from "../../../cuba/entities/base/tsadv_PortalFeedback";
import {dicValue} from "../../util/util";
import Notification from "../../util/Notification/Notification";
import TextArea from "antd/es/input/TextArea";
import {restServices} from "../../../cuba/services";

const {Option} = Select;

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  // entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class PortalFeedbackQuestionEdit extends React.Component<EditorProps & Props & WrappedComponentProps & RouteComponentProps<any> & RootStoreProp & MainStoreInjected> {
  dataInstance = instance<PortalFeedbackQuestions>(PortalFeedbackQuestions.NAME, {
    view: "absenceRequest.edit",
    loadImmediately: false
  });

  @observable portalFeedbacks: PortalFeedback[] = [];

  fields = [
    "topic",

    "text"
  ];

  @observable
  mainStore = this.props.mainStore!;

  selectedFeedbackId: string;

  reactionDisposer: IReactionDisposer;

  onChange = (value: any) => {
    this.selectedFeedbackId = value;
  }

  handleSubmit = (e: FormEvent) => {
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
        user: {
          id: this.props.rootStore!.userInfo.id
        },
        portalFeedback: {
          id: this.selectedFeedbackId
        },
        ...this.props.form.getFieldsValue(this.fields)
      };
      this.dataInstance
        .update(updateEntityData)
        .then(() => {
          Notification.success({message: this.props.intl.formatMessage({id: "your.question.accepted"})});
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

    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const messages = this.mainStore.messages!;

    const {getFieldDecorator} = this.props.form;

    return (
      <Modal visible={true} onOk={this.handleSubmit} onCancel={this.props.history!.goBack}>
        <div>
          <Card className="narrow-layout card-actions-container"
                bordered={false}>
            <Form layout="vertical">

              <div className={"ant-row"} style={{marginBottom: "12px"}}>
                <div className={"ant-form-item-required"}>
                  {createElement(Msg, {
                    entityName: PortalFeedback.NAME,
                    propertyName: "category"
                  })}
                </div>
                <Form.Item>
                  {getFieldDecorator("portalFeedback", {
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[PortalFeedback.NAME + '.category']})
                    }]
                  })(
                    <Select
                      showSearch
                      optionFilterProp="children"
                      onChange={this.onChange}
                      filterOption={(input, option) =>
                        option.props!.children!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {
                        this.portalFeedbacks.map(value => {
                          return <Option
                            value={value.id!}>{dicValue(value.category!, this.props.rootStore!.userInfo!.locale!)}</Option>;
                        })
                      }
                    </Select>
                  )}
                </Form.Item>

              </div>

              <ReadonlyField
                entityName={this.dataInstance.entityName}
                propertyName="topic"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{
                    required: true,
                    message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.type']})
                  }]
                }}
              />

              <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                <div className={"ant-form-item-required"}>
                  {createElement(Msg, {entityName: this.dataInstance.entityName, propertyName: "text"})}
                </div>
                <Form.Item>
                  {getFieldDecorator("text", {
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.text']})
                    }]
                  })(
                    <TextArea
                      rows={4}/>
                  )}
                </Form.Item>
              </div>

            </Form>
          </Card>

        </div>
      </Modal>
    );
  }

  componentDidMount() {
    this.dataInstance.setItem(new PortalFeedbackQuestions());

    restServices.portalHelperService.companiesForLoadDictionary({personGroupId: this.props.rootStore!.userInfo!.personGroupId!})
      .then(companies => {
        getCubaREST()!.searchEntities(PortalFeedback.NAME, {
            conditions: [
              {
                property: "company.id",
                operator: "in",
                value: companies
              }
            ]
          }, {
            view: "portalFeedback-portal"
          }
        ).then(value => this.portalFeedbacks = value as PortalFeedback[])
      });

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

const onValuesChange = (props: any, changedValues: any) => {
  // Reset server-side errors when field is edited
  Object.keys(changedValues).forEach((fieldName: string) => {
    props.form.setFields({
      [fieldName]: {
        value: changedValues[fieldName]
      }
    });
  });
};
export default withRouter(injectIntl(withLocalizedForm<EditorProps & WrappedComponentProps & RouteComponentProps<any>>({onValuesChange})(PortalFeedbackQuestionEdit)));
