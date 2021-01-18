import {Button, Dropdown, Icon, Modal} from "antd";
import * as React from "react";
import {observer} from "mobx-react";
import "./AppHeader.css";
import logo from "./logo.png";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {LanguageSwitcher} from "../../i18n/LanguageSwitcher";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Input from "../components/Input/Input";
import UserPanel from "./UserPanel/UserPanel";
import CommonComponentHoc from "../hoc/CommonComponent/CommonComponentHoc";
import {ChangeEvent} from "react";

@injectMainStore
@observer
class AppHeader extends React.Component<MainStoreInjected & WrappedComponentProps> {
  render() {
    const SearchComponent = CommonComponentHoc(
      <Input
        placeholder={this.props.intl.formatMessage({id: "search"}) + " ..."}
        prefix={<Icon type="search"/>}
        autoComplete={'off'}/>, {wrapperStyles: {style: {"margin": "16px 0"}}});

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
            <SearchComponent/>
          </div>
          <UserPanel/>
        </div>
      </div>
    );
  }
}

export default injectIntl(AppHeader);
