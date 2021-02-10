import React, {MouseEvent} from 'react';
import {inject, observer} from "mobx-react";
import {ReactComponent as NotificationIcon} from "../../../../resources/img/bell.svg";
import {Dropdown} from "antd";
import {RootStoreProp} from "../../../store";
import NotificationDropdownMenu from "./NotificationDropdown/NotificationDropdown";

@inject("rootStore")
@observer
class Notification extends React.Component<RootStoreProp> {

  state = {
    visible: false,
  };

  target: any;

  handleBellIconClick = (e: MouseEvent<HTMLDivElement>) => {
    // console.log("okok");
    // if (!this.target)
    //   this.target = e.currentTarget;
    // this.target.classList.toggle("active");
    this.setState({
      visible: !this.state.visible
    })
  }

  setVisibleFalse = () => {
    this.setState({visible: false})
  }

  render() {
    const dropdownMenu = (< NotificationDropdownMenu setVisibleFalse={this.setVisibleFalse}/>);

    return (
      <Dropdown overlay={dropdownMenu}
                visible={this.state.visible}
                trigger={['click']}>
        <div className={"notifications-icon-container"}
             onClick={this.handleBellIconClick}>
          <NotificationIcon className={"panel-element notifications"}/>
        </div>
      </Dropdown>
    );
  }

}

export default Notification;