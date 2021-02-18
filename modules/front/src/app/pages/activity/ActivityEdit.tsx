import {default as React} from "react";
import {injectMainStore, instance, MainStoreInjected} from "@cuba-platform/react";
import Page from "../../hoc/PageContentHoc";
import {RootStoreProp} from "../../store";
import {inject, observer} from "mobx-react";
import {Card} from "antd";
import LoadingPage from "../LoadingPage";
import {Redirect} from "react-router-dom";
import {Activity} from "../../../cuba/entities/base/uactivity$Activity";
import {WindowProperty} from "../../../cuba/entities/base/uactivity$WindowProperty";
import Button, {ButtonType} from "../../components/Button/Button";
import {observable} from "mobx";
import {ActivityManagement} from "./ActivityManagement";
import {SerializedEntity} from "@cuba-platform/rest/dist-node/model";
import {FormattedMessage} from "react-intl";

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
export class ActivityEdit extends React.Component<EditorProps & RootStoreProp & MainStoreInjected> {

  dataInstance = instance<SerializedEntity<Activity>>(Activity.NAME, {
    view: "portal-activity",
    loadImmediately: false
  });

  @observable updated = false;

  update = () => {
    return this.dataInstance.update({status: "done"});
  }

  render() {
    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const status = this.dataInstance.status;

    if (status === "LOADING" || status === "CLEAN") return <LoadingPage/>

    const item = this.dataInstance.item! as Activity;

    if (this.updated)
      return <Redirect to={ActivityManagement.PATH_NOTIFICATIONS}/>

    if (item && item.type && item.type.code !== "NOTIFICATION" && item.type.windowProperty)
      return <Redirect to={WindowProperty.link(item.type.windowProperty) + "/" + item.referenceId}/>

    const notificationHeader = this.props.rootStore!.userInfo.language === "ru" ? item.notificationHeaderRu : item.notificationHeaderEn;
    const notificationBody = this.props.rootStore!.userInfo.language === "ru" ? item.notificationBodyRu : item.notificationBodyEn;

    const buttons = [
      <Button

        onClick={event => this.update().then(() => this.updated = true)}
        buttonType={ButtonType.PRIMARY}
        disabled={status !== "DONE" && status !== "ERROR"}
        style={{marginLeft: "8px"}}>
        <FormattedMessage id="management.editor.submit"/>
      </Button>,
      <Button onClick={event => this.updated = true}
              style={{marginLeft: "8px"}}/> //closeon
    ]

    return (
      <Page>
        <Card className="narrow-layout card-actions-container">
          <div className="notification-header">
            <div dangerouslySetInnerHTML={{__html: notificationHeader as string}}/>
            {/*{Parser(notificationHeader)}*/}
            {/*{notificationHeader}*/}
          </div>
          <div className="notification-body">
            <div dangerouslySetInnerHTML={{__html: notificationBody as string}}/>
            {/*<Markup content={notificationBody}/>*/}
            {/*{notificationBody}*/}
          </div>
          {buttons}
        </Card>
      </Page>
    );
  }

  componentDidMount() {
    console.log(this.props.entityId);
    this.dataInstance.load(this.props.entityId);
  }
}