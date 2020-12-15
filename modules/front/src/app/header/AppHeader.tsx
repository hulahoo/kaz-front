import {Button, Dropdown, Icon, Modal} from "antd";
import * as React from "react";
import {observer} from "mobx-react";
import "./AppHeader.css";
import logo from "./logo.png";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {LanguageSwitcher} from "../../i18n/LanguageSwitcher";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Input from "../components/Input/Input";
import UserPanel from "../UserPanel/UserPanel";

@injectMainStore
@observer
class AppHeader extends React.Component<MainStoreInjected & WrappedComponentProps> {
  render() {
    return (
      <div className="app-header">
        <div className={"logo"}>
          <img
            src={logo}
            alt={this.props.intl.formatMessage({id: "common.alt.logo"})}
          />
        </div>
        <div className={"additional-panel"}>
          <div className={"search-container"}>
            <Input placeholder={"Найти ..."} style={{'height': '32px'}} prefix={<Icon type="search"/>}/>
          </div>
          <UserPanel />
        </div>
      </div>
    );
  }
}

export default injectIntl(AppHeader);
