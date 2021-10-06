import * as React from "react";
import { FormEvent } from "react";
import { Alert, Button, Card, Form, message } from "antd";
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

import { Row, Col } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';


import {
  Field,
  instance,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText
} from "@cuba-platform/react";

import "../../../app/App.css";

import { Concourse } from "../../../cuba/entities/kzm_Concourse";

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

  fields = ["description", "nameRu", "nameEn", "startVoting", "endVoting", "year", "banner", "requestTemplate", "judgeInstruction"];

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
        .catch((e: any)  => {
          console.log(e)
          e.response.json().then((res: any) => console.log(res))

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

    return (
      <Card className="narrow-layout">
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <Field
            entityName={Concourse.NAME}
            propertyName="description"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />

          <Field
            entityName={Concourse.NAME}
            propertyName="nameRu"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />


          <Field
            entityName={Concourse.NAME}
            propertyName="startVoting"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />

          <Field
            entityName={Concourse.NAME}
            propertyName="judgeInstruction"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />

          <Field
            entityName={Concourse.NAME}
            propertyName="endVoting"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />
          <Field
            entityName={Concourse.NAME}
            propertyName="banner"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />
          <Field
            entityName={Concourse.NAME}
            propertyName="requestTemplate"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />

          <Field
            entityName={Concourse.NAME}
            propertyName="year"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />
          <Field
            entityName={Concourse.NAME}
            propertyName="nameEn"
            form={this.props.form}
            formItemOpts={{ style: { marginBottom: "12px" } }}
            getFieldDecoratorOpts={{
              rules: [{ required: true }]
            }}
          />

           {
              this.globalErrors.length > 0 && (
                  <Alert
                      message={<MultilineText lines={toJS(this.globalErrors)} />}
                      type="error"
                      style={{marginBottom: "24px"}}
                  />
              )
          }

          <Form.Item style={{ textAlign: "center" }}>
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
              <FormattedMessage id="management.editor.submit" />
            </Button>
          </Form.Item>
        </Form>
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
