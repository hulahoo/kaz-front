import * as React from "react";
import {inject, observer} from "mobx-react";
import {
  collection, DataCollectionStore,
  DataTable,
  getEnumCaption,
  getPropertyInfoNN,
  injectMainStore, MainStore,
  MainStoreInjected
} from "@cuba-platform/react";
import {Activity} from "../../../cuba/entities/base/uactivity$Activity";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {observable} from "mobx";
import {NavLink, RouteComponentProps} from "react-router-dom";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {withRouter} from "react-router";
import Button from "../../components/Button/Button";
import {link} from "../../util/util";
import {DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS, format} from "../../util/Date/Date";
import {SendingMessage} from "../../../cuba/entities/base/sys$SendingMessage";
import {SendingNotification} from "../../../cuba/entities/base/base$SendingNotification";
import {Icon, Spin} from "antd";
import {EntityMessages, MetaClassInfo, MetaPropertyInfo} from "@cuba-platform/rest";

type Prop = { type: "tasks" | "notifications" }

@injectMainStore
@inject("rootStore")
@observer
class ActivityCards extends React.Component<Prop & WrappedComponentProps & RootStoreProp & RouteComponentProps & MainStoreInjected> {

  @observable
  dataCollection: DataCollectionStore<Activity | SendingMessage>;

  language = this.props.rootStore!.userInfo.language as String;

  fields: string[];

  selectedRowKey: string | undefined;
  columnIndex = 0;

  render() {
    const type = this.props.type;
    const message = this.props.intl.formatMessage({id: type});

    return (
      <Page pageName={message}>
        <Section size="large" visible={true}>
          <div>
            {this.dataCollection
              ? <DataTable fields={this.fields}
                           mainStore={this.changedSendingNotificationMainStore!}
                           rowSelectionMode="none"
                           columnProps={{
                             render: ((text, record, index) => {
                               if (this.isTask()) {
                                 return this.renderTask(text, record, index);
                               } else {
                                 return this.renderNotification(text, record, index);
                               }
                             })
                           }}
                           dataCollection={this.dataCollection}/>
              : <Spin spinning={true}/>}
          </div>
        </Section>
      </Page>
    );
  }

  renderTask = (text: any, record: Activity, index: number) => {
    if (this.columnIndex === 1) {
      this.columnIndex = -1;
      return <NavLink
        to={`..${link((record as Activity)!.type!.windowProperty!.entityName!)}/${(record as Activity)!.referenceId}`}>{text}</NavLink>;
    } else if (this.columnIndex === 0) {
      this.columnIndex++;
      return format(new Date(text), DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS);
    }
    this.columnIndex++;
    return getEnumCaption(record.status, getPropertyInfoNN("status", Activity.NAME, this.props.mainStore!.metadata!), this.props.mainStore!.enums!);
  };

  renderNotification = (text: any, record: SendingNotification, index: number) => {
    if (this.columnIndex === 0) {
      this.columnIndex++;
      return format(new Date(text), DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS);
    } else if (this.columnIndex === 1) {
      this.columnIndex++;
      return <NavLink
        to={`${record!.id}`}>{record.sendingMessage!.caption}</NavLink>;
    }
    this.columnIndex = 0;
    return text ? <Icon type="check"/> : null;
  };

  isTask = () => {
    return this.props.type === "tasks";
  };

  componentDidMount(): void {
    if (this.isTask()) {
      this.initializeTask();
    } else {
      this.initializeNotification();
    }
  }

  initializeTask = () => {
    this.dataCollection = collection<Activity>(Activity.NAME, {
      view: "portal-activity",
      sort: "-updateTs",
      filter: {
        conditions: [{property: "assignedUser.id", operator: "=", value: this.props.rootStore!.userInfo.id!},
          {
            property: "type.code",
            operator: "<>",
            value: "NOTIFICATION"
          }]
      }
    });

    this.fields = [
      "createTs",
      "name" + this.language.charAt(0).toUpperCase() + this.language.slice(1),
      "status"
    ];
  };

  initializeNotification = () => {
    this.dataCollection = collection<SendingNotification>(SendingNotification.NAME, {
      view: "sendingNotification.view",
      sort: "-createTs",
      filter: {
        conditions: [{property: "user.id", operator: "=", value: this.props.rootStore!.userInfo.id!}]
      }
    });

    this.fields = [
      "createTs",
      "sendingMessage",
      "readed"
    ];
  };

  //Кастомные заголовки для таблицы
  changedSendingNotificationMainStore: MainStore = this.isTask() ? this.props.mainStore! : {
    ...this.props.mainStore,
    messages: {
      ...this.props.mainStore!.messages,
      'base$SendingNotification.readed': this.props.intl.formatMessage({id: 'readed'}),
      'base$SendingNotification.sendingMessage': this.props.intl.formatMessage({id: 'name'})
    } as EntityMessages
  } as MainStore;
}

export default withRouter(injectIntl(ActivityCards));