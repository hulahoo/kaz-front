import {createElement, default as React} from "react";
import {injectMainStore, instance, MainStoreInjected, Msg, withLocalizedForm} from "@cuba-platform/react";
import Page from "../../hoc/PageContentHoc";
import {RootStoreProp} from "../../store";
import {inject, observer} from "mobx-react";
import {Card} from "antd";
import LoadingPage from "../LoadingPage";
import {Redirect, RouteComponentProps} from "react-router-dom";
import {Activity} from "../../../cuba/entities/base/uactivity$Activity";
import Button, {ButtonType} from "../../components/Button/Button";
import {SerializedEntity} from "@cuba-platform/rest/dist-node/model";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {withRouter} from "react-router";
import {link} from "../../util/util";
import Section from "../../hoc/Section";
import {FormComponentProps} from "antd/lib/form";
import Notification from "../../util/Notification/Notification";

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class ActivityEdit extends React.Component<EditorProps & WrappedComponentProps & FormComponentProps & MainStoreInjected & RootStoreProp & RouteComponentProps> {

  dataInstance = instance<SerializedEntity<Activity>>(Activity.NAME, {
    view: "portal-activity",
    loadImmediately: false
  });

  update = () => {
    return this.dataInstance.update({status: "done", name: "name"}); //todo delete from entity @Notnull fot column name
  }

  close = () => {
    this.props.history!.goBack();
  }

  updateAndClose = () => {
    this.update()
      .then(value => this.close())
      .catch((a: any) =>
        Notification.error({
          message: this.props.intl.formatMessage({
            id: "management.editor.error"
          })
        })
      )
  }

  render() {
    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const status = this.dataInstance.status;

    if (status === "LOADING" || status === "CLEAN") return <LoadingPage/>

    const item = this.dataInstance.item! as Activity;

    if (item && item.type && item.type.code !== "NOTIFICATION" && item.type.windowProperty)
      return <Redirect to={link(item.type.windowProperty!.entityName!) + "/" + item.referenceId}/>

    const buttons = [
      <Button
        onClick={this.updateAndClose}
        buttonType={ButtonType.PRIMARY}
        disabled={status !== "DONE" && status !== "ERROR"}
        style={{marginLeft: "8px"}}>
        <FormattedMessage id="management.editor.submit"/>
      </Button>,
      <Button htmlType="button"
              buttonType={ButtonType.FOLLOW}
              onClick={() => this.props.history!.goBack()}>
        <FormattedMessage id="management.editor.cancel"/>
      </Button>
    ];
    return (
      <Page pageName={this.props.intl.formatMessage({id: "notification"})}>
        <div>
          <Card className="narrow-layout card-actions-container" bordered={false} actions={buttons}>
            <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
              <Section size="large"
                       sectionName={<Msg entityName={this.dataInstance.entityName} propertyName="notificationHeader"/>}>
                <div dangerouslySetInnerHTML={{__html: (item.notificationHeader) as string}}/>
              </Section>
            </div>

            <Section size="large"
                     sectionName={this.props.intl.formatMessage({id: "notification.body.section"})}>
              <div dangerouslySetInnerHTML={{__html: (item.notificationBody) as string}}/>
            </Section>
          </Card>
        </div>
      </Page>
    );
  }

  componentDidMount() {
    this.dataInstance.load(this.props.entityId);
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
  })(withRouter(ActivityEdit)));