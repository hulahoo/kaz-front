import {action, observable} from "mobx";
import RootStore from "./RootStore";

export default class LoginStore {
  root: RootStore;
  @observable login: string | null;
  @observable password: string | null;

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  setLogin(value: string | null) {
    this.login = value;
  }

  @action
  setPassword(value: string | null) {
    this.password = value;
  }

  @action
  clearCredentials = () => {
    this.setLogin(null);
    this.setPassword(null);
  }
}