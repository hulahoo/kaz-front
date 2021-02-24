import React from "react";
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Button, {ButtonType} from "../../components/Button/Button";
import {RootStoreProp} from "../../store";
import CommonComponentHoc from "../../hoc/CommonComponent/CommonComponentHoc";
import UserSettingsStore from "../../store/UserSettingsStore";
import DefaultDropdown, {MenuRaw} from "../../components/Dropdown/DefaultDropdown";
import Notification from "../../util/notification/Notification";
import {Icon, Modal} from "antd";
import ChangePassword from "./ChangePassword/ChangePassword";
import {action, observable} from "mobx";
import {ReactComponent as KeySvg} from '../../../resources/icons/key.svg';

type ChangePasswordResponse = {
  status: string,
  message: string
}

@inject("rootStore")
@observer
class UserSettingsMainSection extends React.Component<WrappedComponentProps & RootStoreProp> {

  @observable visibleModalChangePassword = false;

  @action
  changeVisibleModalChangePassword = () => {
    this.visibleModalChangePassword = !this.visibleModalChangePassword;
  }

  constructor(props: WrappedComponentProps & RootStoreProp, context: any) {
    super(props, context);
    this.props.rootStore!.userSettings.loadTimeZones();
    this.props.rootStore!.createChangePasswordStore();
  }

  handleSubmitSaveButton = () => {
    this.props.rootStore!.userSettings.saveUserTimeZone().then(() => {
      Notification.success({
        message: "Настройки пользователя успешно сохранены"
      });
    }).catch(() => {
      Notification.error({
        message: "Не удалось сохранить настройки пользователя"
      });
    });
  }

  handleClickChanePassword = () => {
    this.props.rootStore!.changePassword.changePassword().then((r: string) => {
      const response: ChangePasswordResponse = JSON.parse(r);
      if (response.status === 'ERROR') {
        Notification.error({
          message: 'Не удалось изменить пароль',
          description: response.message
        })
      } else {
        Notification.success({
          message: 'Пароль успешно изменен!',
        })
      }
    })
  }

  render() {
    const userSettingsStore: UserSettingsStore = this.props.rootStore!.userSettings;

    const timeZoneMenu: MenuRaw[] = [];
    if (userSettingsStore.timeZones && userSettingsStore.timeZones.size > 0) {
      for (let entry of userSettingsStore.timeZones.entries()) {
        timeZoneMenu.push({id: entry[0], value: entry[1]});
      }
    }

    const TimeZoneComponent = CommonComponentHoc(
      <DefaultDropdown menu={timeZoneMenu}
                       selected={userSettingsStore.timeZoneText ? userSettingsStore.timeZoneText : this.props.intl.formatMessage({id: 'placeholder.time-zone'})}
                       handleMenuClick={userSettingsStore.setTimeZone}/>,
      {name: this.props.intl.formatMessage({id: 'time-zone'})});

    const ChangePasswordBtnComponent = CommonComponentHoc(
      <Button children={<><i className={"icon"}><KeySvg /></i><span>Изменить пароль</span></>} buttonType={ButtonType.PRIMARY} style={{"width": "244px"}}
              onClick={this.changeVisibleModalChangePassword}/>, {});

    const SubmitBtnPasswordComponent = CommonComponentHoc(
      <Button children={<span>Сохранить</span>} buttonType={ButtonType.PRIMARY} style={{"width": "244px"}}
              onClick={this.handleSubmitSaveButton}/>, {});

    return <form autoComplete={"off"}>
      <div className={"vertical-form-container"}>
        <ChangePasswordBtnComponent/>
        <TimeZoneComponent/>
        <SubmitBtnPasswordComponent/>
        <Modal onOk={this.handleClickChanePassword} visible={this.visibleModalChangePassword}
               title={"Смена пароля"}
               width={350}
               okText={"Изменить"} cancelText={"Закрыть"}
               onCancel={this.changeVisibleModalChangePassword}>
          <ChangePassword/>
        </Modal>
      </div>
    </form>;
  }
}

export default injectIntl(UserSettingsMainSection);