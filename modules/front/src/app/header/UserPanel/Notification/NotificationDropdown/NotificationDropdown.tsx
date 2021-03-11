import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {Tabs} from "antd";
import {RootStoreProp} from "../../../../store";
import {DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS, format} from "../../../../util/Date/Date";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {action, observable} from "mobx";
import {BellNotification} from "../../../../store/BellNotificationStore";
import {restServices} from "../../../../../cuba/services";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {ActivityManagement} from "../../../../pages/Activity/ActivityManagement";
import {ActivityLinkMap} from "../../../../util/ActivityLinkMap";

const scheduleNotificationTime: number = 10000;

type Props = {
  setVisibleFalse(): void;
}

@inject("rootStore")
@observer
class NotificationDropdownMenu extends Component<Props & WrappedComponentProps & RootStoreProp & RouteComponentProps> {

  @observable bellNotifications: BellNotification[];
  @observable bellTasks: BellNotification[];

  @action
  setBellNotifications = (value: BellNotification[]) => {
    this.bellNotifications = value;
  };

  @action
  setBellTasks = (value: BellNotification[]) => {
    this.bellTasks = value;
  };

  render() {
    const {TabPane} = Tabs;

    return (
      <div className={"notifications-menu"}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={this.props.intl.formatMessage({id: "tasks"})} key="1">
            <div>
              <ul className={"notifications-tab-content"}>
                {this.bellTasks ? this.bellTasks.map(task => {
                  return <li key={task.id}>
                    <Link
                      onClick={() => this.props.setVisibleFalse()}
                      to={"/" + (ActivityLinkMap[task.link] ? ActivityLinkMap[task.link] : task.link) + "/" + task.entityId}>
                      <div className={"bell-notification-name"}>{task.name}</div>
                      <div
                        className={"bell-notification-date"}>{format(task.createTs, DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS)}</div>
                    </Link>
                  </li>
                }) : <></>}
              </ul>
              <div className={"notifications-button-container"}>
                <Link to={ActivityManagement.PATH_TASKS} onClick={() => this.props.setVisibleFalse()}>
                  <Button children={<span>Посмотреть все</span>} buttonType={ButtonType.FOLLOW}/>
                </Link>
              </div>
            </div>

          </TabPane>
          <TabPane tab={this.props.intl.formatMessage({id: "notifications"})} key="2">
            <div>
              <ul className={"notifications-tab-content"}>
                {this.bellNotifications ? this.bellNotifications.map(notification => {
                  return <li key={notification.id}>
                    <Link to={"/activity/" + notification.id}
                          onClick={() => this.props.setVisibleFalse()}>
                      <div className={"bell-notification-name"}>{notification.name}</div>
                      <div
                        className={"bell-notification-date"}>{format(notification.createTs, DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS)}</div>
                    </Link>
                  </li>
                }) : <></>}
              </ul>
              <div className={"notifications-button-container"}>
                <Link to={ActivityManagement.PATH_NOTIFICATIONS} onClick={() => this.props.setVisibleFalse()}>
                  <Button children={<span>Посмотреть все</span>} buttonType={ButtonType.FOLLOW}/>
                </Link>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }

  componentDidMount(): void {
    const loadNotifications = () => {
      restServices.notificationsService.notifications().then((r: string) => {
        const notifications: BellNotification[] = [];

        (JSON.parse(r) as BellNotification[]).forEach(e => {
          e.createTs = new Date(e.createTs);
          notifications.push(e);
        });

        this.setBellNotifications(notifications);
      });

      restServices.notificationsService.tasks().then((r: string) => {
        const tasks: BellNotification[] = [];

        (JSON.parse(r) as BellNotification[]).forEach(e => {
          e.createTs = new Date(e.createTs);
          tasks.push(e);
        });

        this.setBellTasks(tasks);
      });
    };
    loadNotifications();
    setInterval(loadNotifications, scheduleNotificationTime);
  }
}

export default withRouter(injectIntl(NotificationDropdownMenu));