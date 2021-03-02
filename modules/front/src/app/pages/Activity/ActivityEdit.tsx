import {default as React} from "react";
import {injectMainStore, instance, MainStoreInjected} from "@cuba-platform/react";
import Page from "../../hoc/PageContentHoc";
import {RootStoreProp} from "../../store";
import {inject, observer} from "mobx-react";
import {Card} from "antd";
import LoadingPage from "../LoadingPage";
import {Redirect, RouteComponentProps} from "react-router-dom";
import {Activity} from "../../../cuba/entities/base/uactivity$Activity";
import Button, {ButtonType} from "../../components/Button/Button";
import {observable} from "mobx";
import {ActivityManagement} from "./ActivityManagement";
import {SerializedEntity} from "@cuba-platform/rest/dist-node/model";
import {FormattedMessage} from "react-intl";
import {withRouter} from "react-router";
import {link} from "../../util/util";

type EditorProps = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class ActivityEdit extends React.Component<EditorProps & MainStoreInjected & RootStoreProp & RouteComponentProps> {

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
      return <Redirect to={link(item.type.windowProperty!.entityName!) + "/" + item.referenceId}/>

    const notificationHeader = this.props.rootStore!.userInfo.language === "ru" ? item.notificationHeaderRu : item.notificationHeaderEn;
    const notificationBody = this.props.rootStore!.userInfo.language === "ru" ? item.notificationBodyRu : item.notificationBodyEn;

    const buttons = [
      <Button
        onClick={() => this.update().then(() => this.updated = true)}
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
    ]

    return (
      <Page>
        <Card className="narrow-layout card-actions-container">
          <div className="notification-header">
            <div dangerouslySetInnerHTML={{__html: notificationHeader as string}}/>
          </div>
          <div className="notification-body">
            <div dangerouslySetInnerHTML={{__html: notificationBody as string}}/>
          </div>
          {buttons}
        </Card>
      </Page>
    );
  }

  componentDidMount() {
    this.dataInstance.load(this.props.entityId);
  }
}

export default withRouter(ActivityEdit);