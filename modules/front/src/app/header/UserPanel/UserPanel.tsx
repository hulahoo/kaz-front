import React from "react";
import {inject, observer} from "mobx-react";
import {Dropdown, Icon, Menu, Modal} from "antd";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {NavLink} from "react-router-dom";
import Notification from "./Notification/Notification";
import {RootStoreProp} from "../../store";

@injectMainStore
@inject("rootStore")
@observer
class UserPanel extends React.Component<MainStoreInjected & WrappedComponentProps> {

  constructor(props: MainStoreInjected & WrappedComponentProps & RootStoreProp, context: any) {
    super(props, context);

    // this.props.rootStore!.bellNotification.loadBellNotificationsAndTasks();
  }

  render() {
    const appState = this.props.mainStore!;

    const menu = (
      <Menu className={"header-user-dropdown"}>
        <Menu.Item key="0">
          <NavLink to={"/user/settings"}><Icon type={"setting"}/>{this.props.intl.formatMessage({id: "settings"})}
          </NavLink>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="2">
          <a onClick={this.showLogoutConfirm}><Icon type={"logout"}/>{this.props.intl.formatMessage({id: "logout"})}</a>
        </Menu.Item>
      </Menu>
    );

    return <div className="user-panel">
      <Notification/>
      <img src={require('../../../resources/img/default-avatar.svg')} className={"panel-element user-img"}/>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <span className="panelelement">{appState.userName}</span>
          <Icon type="down"/>
        </a>
      </Dropdown>
    </div>;
  }

  showLogoutConfirm = () => {
    Modal.confirm({
      title: this.props.intl.formatMessage({id: "header.logout.areYouSure"}),
      okText: this.props.intl.formatMessage({id: "header.logout.ok"}),
      cancelText: this.props.intl.formatMessage({id: "header.logout.cancel"}),
      onOk: () => {
        this.props.mainStore!.logout();
      }
    });
  };
}

export default injectIntl(UserPanel);