import React, {MouseEvent} from 'react';
import {inject, observer} from "mobx-react";
import {ReactComponent as NotificationIcon} from "../../../../resources/img/bell.svg";
import {Dropdown} from "antd";
import NotificationDropdown from "./NotificationDropdown/NotificationDropdown";
import {RootStoreProp} from "../../../store";

@inject("rootStore")
@observer
class Notification extends React.Component<RootStoreProp> {

  handleBellIconClick = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle("active");
  }

  render() {
    return (
      <Dropdown overlay={NotificationDropdown} trigger={['click']}>
        <div className={"notifications-icon-container"} onClick={this.handleBellIconClick}>
          <NotificationIcon className={"panel-element notifications"}/>
        </div>
      </Dropdown>
    );
  }
}

export default Notification;