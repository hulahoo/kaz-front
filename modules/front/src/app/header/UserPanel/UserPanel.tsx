import React from "react";
import {inject, observer} from "mobx-react";
import {Button, Dropdown, Icon, Menu, Modal} from "antd";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {Link, NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import Notification from "./Notification/Notification";
import {rootStore, RootStoreProp} from "../../store";
import {PortalFeedbackQuestionManagement} from "../../pages/PortalFeedbackQuestions/PortalFeedbackQuestionManagement";

@injectMainStore
@inject("rootStore")
@observer
class UserPanel extends React.Component<MainStoreInjected & WrappedComponentProps & RouteComponentProps & RootStoreProp> {

  render() {
    const userInfo = this.props.rootStore!.userInfo;

    const menu = (
      <Menu className={"header-user-dropdown"}>
        <Menu.Item key="0">
          <NavLink to={"/user/settings"}><Icon type={"setting"}/>{this.props.intl.formatMessage({id: "settings"})}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="1">
          <NavLink to={"/bpmUserSubstitution"}>{this.props.intl.formatMessage({id: "bpmUserSubstitution"})}
          </NavLink>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="2">
          <a onClick={this.showLogoutConfirm}><Icon type={"logout"}/>{this.props.intl.formatMessage({id: "logout"})}</a>
        </Menu.Item>
      </Menu>
    );

    return <div className="user-panel">
      <div>
        <Link to={PortalFeedbackQuestionManagement.PATH}>
          <Button>
            {this.props.intl.formatMessage({id: "send.message"})}
          </Button>
        </Link>
      </div>
      <Notification/>
      <img src={require('../../../resources/img/default-avatar.svg')} className="panel-element user-img"/>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <span className="panelelement">{userInfo.firstLastName}</span>
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
        this.props.history.push("/");
        this.props.mainStore!.logout()
          .then(() => {
            rootStore.userInfo.clearUserInfo();
            rootStore.login.clearCredentials();
            rootStore.clearStores();
          });
      }
    });
  };
}

export default injectIntl(withRouter(UserPanel));