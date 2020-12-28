import MenuStore from "./MenuStore";
import LoginStore from "./LoginStore";
import UserSettingsStore from "./UserSettingsStore";
import UserInfoStore from "./UserInfoStore";
import {CubaApp} from "@cuba-platform/rest";
import BellNotificationStore from "./BellNotificationStore";
import {inject} from "mobx-react";
import {injectMainStore, MainStore} from "@cuba-platform/react";
import ChangePasswordStore from "./ChangePasswordStore";

export default class RootStore {
  cubaRest: CubaApp;
  menu: MenuStore;
  login: LoginStore;
  userSettings: UserSettingsStore;
  userInfo: UserInfoStore;
  bellNotification: BellNotificationStore;
  changePassword: ChangePasswordStore;

  constructor(cubaRest: CubaApp) {
    this.cubaRest = cubaRest;
    this.menu = new MenuStore(this);
    this.userSettings = new UserSettingsStore(this);
    this.login = new LoginStore(this);
    this.userInfo = new UserInfoStore(this);
    this.bellNotification = new BellNotificationStore(this);
  }

  createChangePasswordStore = () => {
    this.changePassword = new ChangePasswordStore(this);
  }
}