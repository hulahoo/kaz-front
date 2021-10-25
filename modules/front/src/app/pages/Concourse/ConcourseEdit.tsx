import * as React from "react";
import { createElement } from "react";
import { FormEvent } from "react";
import { Alert, Button, Card, Form, message, Table } from "antd";
import { observer } from "mobx-react";
import { ConcourseComponent } from "./ConcourseComponent";
import { FormComponentProps } from "antd/lib/form";
import { Link, Redirect } from "react-router-dom";
import { IReactionDisposer, observable, reaction, toJS } from "mobx";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

import { Row, Col } from "antd";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import {
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText,
  Msg
} from "@cuba-platform/react";

import "../../../app/App.css";

import "./style.less";

import { Concourse } from "../../../cuba/entities/kzm_Concourse";
import DefaultDatePicker from "../../components/Datepicker";
import TextArea from "antd/lib/input/TextArea";
import Column from "antd/lib/table/Column";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@observer
class ConcourseEditComponent extends React.Component<
  Props & WrappedComponentProps
> {
  dataInstance = instance<Concourse>(Concourse.NAME, {
    view: "_base",
    loadImmediately: false
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = [
    "Номер заявки",
    "Дата заявки",
    "Статус заявки",
    "Наименование проекта (рус)",
    "endVoting",
    "year",
    "banner",
    "requestTemplate",
    "judgeInstruction"
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
            this.props.intl.formatMessage({ id: "management.editor.success" })
          );
          this.updated = true;
        })
        .catch((e: any) => {
          console.log(e);
          e.response.json().then((res: any) => console.log(res));

          //           if (e.response) {
          //             e.response.json().then((response: any) => {
          //               clearFieldErrors(this.props.form);
          //               const {
          //                 globalErrors,
          //                 fieldErrors
          //               } = extractServerValidationErrors(response);
          //               this.globalErrors = globalErrors;
          //               if (fieldErrors.size > 0) {
          //                 this.props.form.setFields(
          //                   constructFieldsWithErrors(fieldErrors, this.props.form)
          //                 );
          //               }
          //
          //               if (fieldErrors.size > 0 || globalErrors.length > 0) {
          //                 message.error(
          //                   this.props.intl.formatMessage({
          //                     id: "management.editor.validationError"
          //                   })
          //                 );
          //               } else {
          //                 message.error(
          //                   this.props.intl.formatMessage({
          //                     id: "management.editor.error"
          //                   })
          //                 );
          //               }
          //             });
          //           } else {
          //             message.error(
          //               this.props.intl.formatMessage({ id: "management.editor.error" })
          //             );
          //           }
        });
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={ConcourseComponent.PATH} />;
    }

    const { status } = this.dataInstance;

    const buttons = [
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        key={"insurance"}
      >
        <FormattedMessage id="Добавить" />
      </Button>,
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        key={"members"}
      >
        <FormattedMessage id="Изменить" />
      </Button>,
      <Button
        htmlType="button"
        style={{ margin: "12px" }}
        type="primary"
        key={"members"}
      >
        <FormattedMessage id="Удалить" />
      </Button>
    ];

    return (
      <Card className={`narrow-light`}>
        <div className="cardWrapper">
          <h1>Создание заявки</h1>
          <Card title="Общие сведения" size="small" className="generalInfo">
            <Form onSubmit={this.handleSubmit} layout="vertical">
              <Row type={"flex"} align="middle">
                <Field
                  entityName={Concourse.NAME}
                  propertyName="Номер заявки"
                  form={this.props.form}
                  formItemOpts={{
                    style: {
                      marginBottom: "12px",
                      marginTop: "12px",
                      minWidth: "348px",
                      marginRight: "40px"
                    }
                  }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true, type: "number" }]
                  }}
                />

                <Form.Item
                  required
                  style={{ margin: "12px 40px 12px 0", minWidth: "348px" }}
                  label={createElement(Msg, {
                    entityName: Concourse.NAME,
                    propertyName: "Дата заявки"
                  })}
                >
                  <DefaultDatePicker />
                </Form.Item>

                <Field
                  entityName={Concourse.NAME}
                  propertyName="Cтатус заявки"
                  form={this.props.form}
                  formItemOpts={{
                    style: {
                      marginBottom: "12px",
                      marginTop: "12px",
                      minWidth: "348px"
                    }
                  }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />
              </Row>

              <Row type="flex">
                <Field
                  entityName={Concourse.NAME}
                  propertyName="Заявку заполнил (ла)"
                  form={this.props.form}
                  formItemOpts={{
                    style: { margin: "12px 40px 12px 0", minWidth: "348px" }
                  }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />

                <Field
                  entityName={Concourse.NAME}
                  propertyName="Компания"
                  form={this.props.form}
                  formItemOpts={{
                    style: { margin: "12px 40px 12px 0", minWidth: "348px" }
                  }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />

                <Field
                  entityName={Concourse.NAME}
                  propertyName="Должность"
                  form={this.props.form}
                  formItemOpts={{
                    style: { margin: "12px 0", minWidth: "348px" }
                  }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />
              </Row>

              <Row type="flex">
                <Field
                  entityName={Concourse.NAME}
                  propertyName="Наименование проекта (рус)"
                  form={this.props.form}
                  formItemOpts={{
                    style: {
                      marginBottom: "12px",
                      minWidth: "348px",
                      marginRight: "40px"
                    }
                  }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />

                <Field
                  entityName={Concourse.NAME}
                  propertyName="Наименование проекта (англ)"
                  form={this.props.form}
                  formItemOpts={{
                    style: { marginBottom: "12px", minWidth: "348px" }
                  }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />
              </Row>

              <Row type="flex">
                <Form.Item
                  required
                  style={{ margin: "12px 40px 12px 0", minWidth: "348px" }}
                  label={createElement(Msg, {
                    entityName: Concourse.NAME,
                    propertyName: "Дата начала"
                  })}
                >
                  <DefaultDatePicker />
                </Form.Item>

                <Form.Item
                  required
                  style={{ margin: "12px 40px 12px 0", minWidth: "348px" }}
                  label={createElement(Msg, {
                    entityName: Concourse.NAME,
                    propertyName: "Дата оканчания"
                  })}
                >
                  <DefaultDatePicker />
                </Form.Item>

                <Field
                  entityName={Concourse.NAME}
                  propertyName="Маштаб распространения"
                  form={this.props.form}
                  formItemOpts={{
                    style: { margin: "12px 0", minWidth: "348px" }
                  }}
                  getFieldDecoratorOpts={{
                    rules: [{ required: true }]
                  }}
                />
              </Row>
            </Form>
          </Card>
          <Card title="Эксперты" size="small" className="generalInfo">
            <Row type="flex">
              <Field
                entityName={Concourse.NAME}
                propertyName="Руководитель проекта"
                form={this.props.form}
                formItemOpts={{
                  style: { margin: "12px 40px 12px 0", minWidth: "300px" }
                }}
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />

              <Field
                entityName={Concourse.NAME}
                propertyName="Должность"
                form={this.props.form}
                formItemOpts={{
                  style: { margin: "12px 40px 12px 0", minWidth: "250px" }
                }}
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />

              <Field
                entityName={Concourse.NAME}
                propertyName="Компания"
                form={this.props.form}
                formItemOpts={{
                  style: { margin: "12px 40px 12px 0", width: "80px" }
                }}
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />

              <Field
                entityName={Concourse.NAME}
                propertyName="Маштаб распространения"
                form={this.props.form}
                formItemOpts={{
                  style: { margin: "12px 0", minWidth: "350px" }
                }}
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />
            </Row>
            <Row title="Описание проекта" type="flex">
              <Field
                entityName={Concourse.NAME}
                propertyName="ФИО Эксперта"
                form={this.props.form}
                formItemOpts={{
                  style: { margin: "12px 40px 12px 0", minWidth: "300px" }
                }}
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />

              <Field
                entityName={Concourse.NAME}
                propertyName="Должность"
                form={this.props.form}
                formItemOpts={{
                  style: { margin: "12px 40px 12px 0", minWidth: "250px" }
                }}
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />

              <Field
                entityName={Concourse.NAME}
                propertyName="Компания"
                form={this.props.form}
                formItemOpts={{
                  style: { margin: "12px 40px 12px 0", width: "80px" }
                }}
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />

              <Field
                entityName={Concourse.NAME}
                propertyName="Маштаб распространения"
                form={this.props.form}
                formItemOpts={{
                  style: { margin: "12px 0", minWidth: "350px" }
                }}
                getFieldDecoratorOpts={{
                  rules: [{ required: true }]
                }}
              />
            </Row>
          </Card>
          <Card title="Описание проекта" size="small" className="generalInfo">
            <Row type="flex" justify="space-between">
              <Form.Item
                required
                style={{ width: "49%", marginTop: "12px" }}
                label={createElement(Msg, {
                  entityName: Concourse.NAME,
                  propertyName: "Краткое описание проекта (рус)"
                })}
              >
                <TextArea rows={5} />
              </Form.Item>

              <Form.Item
                required
                style={{ width: "49%", marginTop: "12px" }}
                label={createElement(Msg, {
                  entityName: Concourse.NAME,
                  propertyName: "Краткое описание проекта (англ)"
                })}
              >
                <TextArea rows={5} />
              </Form.Item>
            </Row>
          </Card>
          <Card title="Шаблон заявки" className="generalInfo" size="small">
            <p className="text">Скачайте шаблон заявки для заполнения</p>
            <a href="#" className="link">
              Шаблон заявки
            </a>
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
          </Card>

          {this.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(this.globalErrors)} />}
              type="error"
              style={{ marginBottom: "24px" }}
            />
          )}

          <Form.Item style={{ textAlign: "right" }}>
            <Link to={ConcourseComponent.PATH}>
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
              <FormattedMessage id="Отправить на согласование" />
            </Button>
          </Form.Item>
        </div>
      </Card>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== ConcourseComponent.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new Concourse());
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
  })(ConcourseEditComponent)
);
