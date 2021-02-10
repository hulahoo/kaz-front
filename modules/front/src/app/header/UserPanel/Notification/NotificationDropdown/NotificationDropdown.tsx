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

const taskCode = "KPI_APPROVE";
const notificationCode = "NOTIFICATION";

const scheduleNotificationTime: number = 10000;

@inject("rootStore")
@observer
class NotificationDropdownMenu extends Component<WrappedComponentProps & RootStoreProp> {

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
          <TabPane tab="Задачи" key="1">
            <div>
              <ul className={"notifications-tab-content"}>
                {this.bellTasks ? this.bellTasks.map(task => {
                  return <li key={task.id}>
                    <div className={"bell-notification-name"}>{task.name}</div>
                    <div
                      className={"bell-notification-date"}>{format(task.createTs, DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS)}</div>
                  </li>
                }) : <></>}
              </ul>
              <div className={"notifications-button-container"}>
                <Button children={<span>Посмотреть все</span>} buttonType={ButtonType.FOLLOW}/>
              </div>
            </div>

          </TabPane>
          <TabPane tab="Уведомления" key="2">
            <div>
              <ul className={"notifications-tab-content"}>
                {this.bellNotifications ? this.bellNotifications.map(notification => {
                  return <li key={notification.id}>
                    <div className={"bell-notification-name"}>{notification.name}</div>
                    <div
                      className={"bell-notification-date"}>{format(notification.createTs, DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS)}</div>
                  </li>
                }) : <></>}
              </ul>
              <div className={"notifications-button-container"}>
                <Button children={<span>Посмотреть все</span>} buttonType={ButtonType.FOLLOW}/>
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
        const tasks: BellNotification[] = [];

        (JSON.parse(r) as BellNotification[]).forEach(e => {
          e.createTs = new Date(e.createTs);
          if (e.code === notificationCode) {
            notifications.push(e);
          } else {
            tasks.push(e);
          }
        });

        this.setBellNotifications(notifications);
        this.setBellTasks(tasks);
      });
    };
    loadNotifications();
    setInterval(loadNotifications, scheduleNotificationTime);
  }
}

export default injectIntl(NotificationDropdownMenu);