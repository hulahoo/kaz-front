import React, {MouseEvent} from 'react';
import {inject, observer} from "mobx-react";
import {ReactComponent as NotificationIcon} from "../../../../resources/img/bell.svg";
import {Dropdown} from "antd";
import {RootStoreProp} from "../../../store";
import NotificationDropdownMenu from "./NotificationDropdown/NotificationDropdown";
import {observable, runInAction} from "mobx";
import SockJS from "sockjs-client";

@inject("rootStore")
@observer
class Notification extends React.Component<RootStoreProp> {

  @observable
  newNotifications: number;

  ws = new SockJS('http://localhost:8085/tsadv-core/ws/handler');

  state = {
    visible: false,
  };

  target: any;

  handleBellIconClick = (e: MouseEvent<HTMLDivElement>) => {
    this.setState({
      visible: !this.state.visible
    })
  };

  setVisibleFalse = () => {
    this.setState({visible: false})
  };

  render() {
    const dropdownMenu = (<NotificationDropdownMenu setVisibleFalse={this.setVisibleFalse}/>);

    return (
      <Dropdown overlay={dropdownMenu}
                visible={this.state.visible}
                trigger={['click']}>
        <div className={"notifications-icon-container"}
             onClick={this.handleBellIconClick}>
          <NotificationIcon className={"panel-element notifications"}/>
          {this.newNotifications
            ? <div className="notification-icon-count">{this.newNotifications}</div>
            : <></>}
        </div>
      </Dropdown>
    );
  }


  componentDidMount(): void {
    this.ws.onopen = (ws) => {
      this.ws.send(JSON.stringify({
        action: "create",
        userId: this.props.rootStore!.userInfo.id!
      }));
    };

    this.ws.onmessage = (ws) => {
      runInAction(() => {
        this.newNotifications = ws.data;
      });
    };

    this.ws.onclose = (ws) => {
      this.ws.send(JSON.stringify({
        action: "delete",
        userId: this.props.rootStore!.userInfo.id!
      }));
    }
  }
}

export default Notification;