import MenuStore from "./MenuStore";
import LoginStore from "./LoginStore";
import UserSettingsStore from "./UserSettingsStore";
import UserInfoStore from "./UserInfoStore";
import {CubaApp} from "@cuba-platform/rest";
import BellNotificationStore from "./BellNotificationStore";
import ChangePasswordStore from "./ChangePasswordStore";
import KpiStore from "./KpiStore";
import {observable} from "mobx";
import DefaultGoalStore from "./DefaultGoalStore";

export default class RootStore {
  cubaRest: CubaApp;
  menu: MenuStore;
  login: LoginStore;
  userSettings: UserSettingsStore;
  userInfo: UserInfoStore;
  bellNotification: BellNotificationStore;
  changePassword: ChangePasswordStore;
  @observable kpiEditStore: KpiStore;
  @observable goalStore: DefaultGoalStore;

  constructor(cubaRest: CubaApp) {
    this.cubaRest = cubaRest;
    this.menu = new MenuStore(this);
    this.userSettings = new UserSettingsStore(this);
    this.login = new LoginStore(this);
    this.userInfo = new UserInfoStore(this);
    this.bellNotification = new BellNotificationStore(this);
    this.createDefaultGoalStore();
  }

  createChangePasswordStore = () => {
    this.changePassword = new ChangePasswordStore(this);
  };

  createKpiStore = (appId: string) => {
    this.kpiEditStore = new KpiStore(this, appId);
  };

  createDefaultGoalStore = () => {
    this.goalStore = new DefaultGoalStore(this);
  }
}