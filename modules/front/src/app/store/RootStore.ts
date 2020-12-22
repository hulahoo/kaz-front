import MenuStore from "./MenuStore";
import LoginStore from "./LoginStore";
import UserSettingsStore from "./UserSettingsStore";

export default class RootStore {
  menu: MenuStore;
  login: LoginStore;
  userSettings: UserSettingsStore;

  constructor() {
    this.menu = new MenuStore(this);
    this.userSettings = new UserSettingsStore(this);
    this.login = new LoginStore(this)
  }
}