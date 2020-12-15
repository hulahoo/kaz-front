import React from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Button, Dropdown, Icon, Menu, Modal} from "antd";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";

@observer
@injectMainStore
class UserPanel extends React.Component<MainStoreInjected & WrappedComponentProps> {

  render() {
    const appState = this.props.mainStore!;

    const menu = (
      <Menu className={"header-user-dropdown"}>
        <Menu.Item key="0">
          <a><Icon type={"setting"}/>Настройки</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="2">
          <a onClick={this.showLogoutConfirm}><Icon type={"logout"}/>Выйти</a>
        </Menu.Item>
      </Menu>
    );

    return <div className="user-panel">
      <img src={require('../../resources/img/bell.svg')} className={"panel-element"}/>
      <img src={require('../../resources/img/default-avatar.svg')} className={"panel-element user-img"}/>
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