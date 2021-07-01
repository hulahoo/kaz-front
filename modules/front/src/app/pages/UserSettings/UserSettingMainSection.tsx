import React from "react";
import {inject, observer} from "mobx-react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Button, {ButtonType} from "../../components/Button/Button";
import {RootStoreProp} from "../../store";
import CommonComponentHoc from "../../hoc/CommonComponent/CommonComponentHoc";
import UserSettingsStore from "../../store/UserSettingsStore";
import DefaultDropdown, {MenuRaw} from "../../components/Dropdown/DefaultDropdown";
import Notification from "../../util/Notification/Notification";
import {Modal} from "antd";
import ChangePassword from "./ChangePassword/ChangePassword";
import {action, observable} from "mobx";
import {ReactComponent as KeySvg} from '../../../resources/icons/key.svg';
import {MenuRouteItem, MenuSubMenu} from "../../store/MenuStore";
import {getCubaREST} from "@cuba-platform/react";
import {UserRole} from "../../../cuba/entities/base/sec$UserRole";

import en from "../../../i18n/en.json";
import ru from "../../../i18n/ru.json";
import {restServices} from "../../../cuba/services";

type ChangePasswordResponse = {
  status: string,
  message: string
}

export interface Menu {
  id: string,
  ru: string,
  en: string,
}

export interface SubMenu extends Menu {
  items: Array<SubMenu | Menu>
}

@inject("rootStore")
@observer
class UserSettingsMainSection extends React.Component<WrappedComponentProps & RootStoreProp> {

  @observable visibleModalChangePassword = false;

  @observable isAdmin = false;

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

  updateMenuList = () => {
    const map = this.props.rootStore!.menu.menuList.map(value => this.parseMenu(value));
    restServices.portalHelperService.initPortalMenu({menuList: map})
      .then(value => Notification.success({message: 'Меню успешно обновлен'}))
      .catch(value => Notification.error({message: this.props.intl.formatMessage({id: "management.editor.error"})}))
  }

  parseMenu = (menu: MenuRouteItem | MenuSubMenu): Menu | SubMenu => {
    if (menu['items']) {
      const items = menu['items'] as (MenuSubMenu | MenuRouteItem)[];
      const parsedItems = items.map(value => this.parseMenu(value));
      return {
        id: menu.id,
        ru: ru["menu." + menu.id],
        en: en["menu." + menu.id],
        type: 'P',
        items: parsedItems
      } as SubMenu
    } else
      return {
        id: menu.id,
        ru: ru["menu." + menu.id],
        en: en["menu." + menu.id],
        type: 'P',
      } as Menu
  }

  handleClickChanePassword = () => {
    this.props.rootStore!.changePassword.changePassword().then((r: string) => {
      const response: ChangePasswordResponse = JSON.parse(r);
      if (response.status === 'ERROR') {
        Notification.error({
          message: this.props.intl.formatMessage({id: "password.change.error"}),
          description: response.message
        })
      } else {
        Notification.success({
          message: this.props.intl.formatMessage({id: "password.change.success"}),
        })
      }
    })
  };

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

    const UpdateMenuListBtnComponent = CommonComponentHoc(
      <Button children={<><span><FormattedMessage id="update.menu.list"/></span></>}
              buttonType={ButtonType.PRIMARY} style={{"width": "244px", /*"height": 'auto'*/}}
              onClick={this.updateMenuList}/>, {});

    const ChangePasswordBtnComponent = CommonComponentHoc(
      <Button children={<><i className={"icon"}><KeySvg/></i><span><FormattedMessage id="password.change"/></span></>}
              buttonType={ButtonType.PRIMARY} style={{"width": "244px", /*"height": 'auto'*/}}
              onClick={this.changeVisibleModalChangePassword}/>, {});

    const SubmitBtnPasswordComponent = CommonComponentHoc(
      <Button children={<span><FormattedMessage id="save"/></span>} buttonType={ButtonType.PRIMARY}
              style={{"width": "244px"}}
              onClick={this.handleSubmitSaveButton}/>, {});

    return <form autoComplete={"off"}>
      <div className={"vertical-form-container"}>
        {this.isAdmin ? <UpdateMenuListBtnComponent/> : <></>}
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


  componentDidMount() {
    (async () => {
      await getCubaREST()!.searchEntities(UserRole.NAME, {
        conditions: [{
          property: 'user.id',
          operator: '=',
          value: this.props.rootStore!.userInfo!.id!
        }, {
          property: 'role.name',
          operator: 'in',
          value: ['Administrators', 'system-full-access']
        }]
      }).then(value => value.length > 0)
        .then(value => this.isAdmin = value);
    })()
  }
}

export default injectIntl(UserSettingsMainSection);