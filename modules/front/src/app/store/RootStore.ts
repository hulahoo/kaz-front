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
import CourseCatalogStore from "./CourseCatalogStore";
import MyTeamStore from "./MyTeamStore";
import AssistantTeamStore from "./AssistantTeamStore";
import VacationRequestStore from "./VacationRequestStore";

export default class RootStore {
  cubaRest: CubaApp;
  menu: MenuStore;
  login: LoginStore;
  userSettings: UserSettingsStore;
  userInfo: UserInfoStore;
  bellNotification: BellNotificationStore;
  myTeamInfo: MyTeamStore;
  assistantTeamInfo: AssistantTeamStore;
  changePassword: ChangePasswordStore;
  courseCatalogStore?: CourseCatalogStore;
  @observable kpiEditStore: KpiStore;
  @observable goalStore: DefaultGoalStore;

  vacationRequestStore: VacationRequestStore;

  constructor(cubaRest: CubaApp) {
    this.cubaRest = cubaRest;
    this.menu = new MenuStore(this);
    this.userSettings = new UserSettingsStore(this);
    this.login = new LoginStore(this);
    this.userInfo = new UserInfoStore(this);
    this.bellNotification = new BellNotificationStore(this);
    this.myTeamInfo = new MyTeamStore(this);
    this.assistantTeamInfo = new AssistantTeamStore(this);
    this.vacationRequestStore = new VacationRequestStore();
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
  };

  createCourseCatalogStore = () => {
    this.courseCatalogStore = new CourseCatalogStore(this);
  };

  clearStores = () => {
    this.courseCatalogStore = undefined;
    this.userInfo.clearUserInfo();
    this.login.clearCredentials();
    this.myTeamInfo.clearMyTeamInfo();
    this.assistantTeamInfo.clearAssistantTeamInfo();
    this.vacationRequestStore.clear();
  }
}