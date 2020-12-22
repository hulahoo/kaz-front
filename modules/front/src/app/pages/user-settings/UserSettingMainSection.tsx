import React, {ChangeEvent} from "react";
import Input from "../../components/Input/Input";
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Button from "../../components/Button/Button";
import {RootStoreProp} from "../../store";
import {Icon, Menu} from "antd";
import CommonComponentHoc from "../../hoc/CommonComponent/CommonComponentHoc";
import UserSettingsStore from "../../store/UserSettingsStore";
import DefaultDropdown, {MenuRaw} from "../../components/Dropdown/DefaultDropdown";
import {action} from "mobx";
import {getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {UserInfo} from "@cuba-platform/rest/dist-node/model";

@inject("rootStore")
@observer
class UserSettingsMainSection extends React.Component<WrappedComponentProps & RootStoreProp> {

  constructor(props: WrappedComponentProps & RootStoreProp, context: any) {
    super(props, context);
    this.props.rootStore!.userSettings.loadTimeZones();
  }

  handleMenuClick(k: string) {

  }

  render() {
    const userSettingsStore: UserSettingsStore = this.props.rootStore!.userSettings;

    const timeZoneMenu: MenuRaw[] = [];
    if (userSettingsStore.timeZones && userSettingsStore.timeZones.size > 0) {
      for (let entry of userSettingsStore.timeZones.entries()) {
        timeZoneMenu.push({id: entry[0], value: entry[1]});
      }
    }

    const OldPasswordComponent = CommonComponentHoc(
      <Input type={"password"}
             onChange={(e: ChangeEvent<HTMLInputElement>) => userSettingsStore.setOldPassword(e.target.value)}
             autoComplete={"off"} placeholder={this.props.intl.formatMessage({id: 'placeholder.old-password'})}
      />, {name: this.props.intl.formatMessage({id: 'old-password'})});

    const NewPasswordComponent = CommonComponentHoc(
      <Input type={"password"}
             onChange={(e: ChangeEvent<HTMLInputElement>) => userSettingsStore.setNewPassword(e.target.value)}
             autoComplete={"off"} placeholder={this.props.intl.formatMessage({id: 'placeholder.new-password'})}
      />, {name: this.props.intl.formatMessage({id: 'new-password'})});

    const RetryPasswordComponent = CommonComponentHoc(
      <Input type={"password"}
             onChange={(e: ChangeEvent<HTMLInputElement>) => userSettingsStore.setRetryPassword(e.target.value)}
             autoComplete={"off"} placeholder={this.props.intl.formatMessage({id: 'placeholder.retry-password'})}
      />, {});

    const SubmitBtnPasswordComponent = CommonComponentHoc(
      <Button children={<span>Сохранить</span>} type={"primary"} style={{"width": "244px"}}
              onClick={() => console.log()}/>, {});

    const TimeZoneComponent = CommonComponentHoc(
      <DefaultDropdown menu={timeZoneMenu} buttonName={userSettingsStore.timeZone ? userSettingsStore.timeZone : this.props.intl.formatMessage({id: 'placeholder.time-zone'})} handleMenuClick={this.handleMenuClick}/>,
      {name: this.props.intl.formatMessage({id: 'time-zone'})});

    return <form autoComplete={"off"}>
      <div>
        {<OldPasswordComponent/>}
        {<NewPasswordComponent/>}
        {<RetryPasswordComponent/>}
        {<TimeZoneComponent/>}
        {<SubmitBtnPasswordComponent/>}
      </div>
    </form>;
  }
}

export default injectIntl(UserSettingsMainSection);