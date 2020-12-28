import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {Tabs} from "antd";
import {RootStoreProp} from "../../../../store";
import {DEFAULT_PATTERN_WITHOUT_SECONDS, format} from "../../../../util/Date/Date";
import Button, {ButtonType} from "../../../../components/Button/Button";

@inject("rootStore")
@observer
class NotificationDropdownMenu extends Component<WrappedComponentProps & RootStoreProp> {
  render() {
    const {TabPane} = Tabs;

    return (
      <div className={"notifications-menu"}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Задачи" key="1">
            <div>
              <ul className={"notifications-tab-content"}>
                {this.props.rootStore!.bellNotification.bellTasks ? this.props.rootStore!.bellNotification.bellTasks.map(task => {
                  return <li key={task.id}>
                    <div className={"bell-notification-name"}>{task.name}</div>
                    <div
                      className={"bell-notification-date"}>{format(task.createTs, DEFAULT_PATTERN_WITHOUT_SECONDS)}</div>
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
                {this.props.rootStore!.bellNotification.bellNotifications ? this.props.rootStore!.bellNotification.bellNotifications.map(notification => {
                  return <li key={notification.id}>
                    <div className={"bell-notification-name"}>{notification.name}</div>
                    <div
                      className={"bell-notification-date"}>{format(notification.createTs, DEFAULT_PATTERN_WITHOUT_SECONDS)}</div>
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
}

export default injectIntl(NotificationDropdownMenu);