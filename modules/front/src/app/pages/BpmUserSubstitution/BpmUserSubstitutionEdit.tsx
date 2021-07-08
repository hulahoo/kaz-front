import * as React from "react";
import {FormEvent} from "react";
import {Alert, Card, Form, message} from "antd";
import {inject, observer} from "mobx-react";
import {BpmUserSubstitutionManagement} from "./BpmUserSubstitutionManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {collection, Field, instance, MultilineText, withLocalizedForm} from "@cuba-platform/react";

import "../../../app/App.css";

import {BpmUserSubstitution} from "../../../cuba/entities/base/tsadv$BpmUserSubstitution";
import {TsadvUser} from "../../../cuba/entities/base/tsadv$UserExt";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import {restServices} from "../../../cuba/services";
import {RootStoreProp} from "../../store";
import {catchException} from "../../util/util";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@observer
class BpmUserSubstitutionEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp> {
  dataInstance = instance<BpmUserSubstitution>(BpmUserSubstitution.NAME, {
    view: "bpmUserSubstitution-view",
    loadImmediately: false
  });

  substitutedUsersDc = collection<TsadvUser>(TsadvUser.NAME, {
    view: "_minimal"
  });

  usersDc = collection<TsadvUser>(TsadvUser.NAME, {view: "_minimal"});

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = ["startDate", "endDate", "substitutedUser", "user"];

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
      catchException(restServices.bpmUserSubstitutionService.save({
        ...this.props.form.getFieldsValue(this.fields),
        user: {id: this.props.rootStore!.userInfo!.id!},
        substitutedUser: {id: this.props.form.getFieldValue("substitutedUser")},
        id: this.dataInstance.item ? this.dataInstance.item.id : undefined,
      } as BpmUserSubstitution).then(() => {
        message.success(
          this.props.intl.formatMessage({id: "management.editor.success"})
        );
        this.updated = true;
      }))
        .catch((e: any) => {
          message.error(e.message);
        });
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={BpmUserSubstitutionManagement.PATH}/>;
    }

    const {status} = this.dataInstance;

    return (

      <Page pageName={this.props.intl.formatMessage({id: "bpmUserSubstitution"})}>
        <Section size="large">
          <Card className="narrow-layout card-actions-container"
                actions={[
                  <Button buttonType={ButtonType.PRIMARY} onClick={this.handleSubmit}>
                    <FormattedMessage id="management.editor.submit"/>
                  </Button>,
                  <Link to={BpmUserSubstitutionManagement.PATH}>
                    <Button buttonType={ButtonType.FOLLOW} htmlType="button">
                      <FormattedMessage id="close"/>
                    </Button>
                  </Link>
                ]}
                bordered={false}>
            <Form onSubmit={this.handleSubmit} layout="vertical">

              <Field
                entityName={BpmUserSubstitution.NAME}
                propertyName="substitutedUser"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                optionsContainer={this.substitutedUsersDc}
                getFieldDecoratorOpts={{
                  rules: [{required: true}]
                }}
              />

              <Field
                entityName={BpmUserSubstitution.NAME}
                propertyName="startDate"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{required: true}]
                }}
              />

              <Field
                entityName={BpmUserSubstitution.NAME}
                propertyName="endDate"
                form={this.props.form}
                formItemOpts={{style: {marginBottom: "12px"}}}
                getFieldDecoratorOpts={{
                  rules: [{required: true}]
                }}
              />

              {this.globalErrors.length > 0 && (
                <Alert
                  message={<MultilineText lines={toJS(this.globalErrors)}/>}
                  type="error"
                  style={{marginBottom: "24px"}}
                />
              )}
            </Form>
          </Card>
        </Section>
      </Page>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== BpmUserSubstitutionManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new BpmUserSubstitution());
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
  })(BpmUserSubstitutionEditComponent)
);
