import {action, observable} from "mobx";
import RootStore from "./RootStore";

export default class LoginStore {
  root: RootStore;
  @observable login: string | undefined;
  @observable password: string | undefined;

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  setLogin(value: string | undefined) {
    this.login = value;
  }

  @action
  setPassword(value: string | undefined) {
    this.password = value;
  }

  @action
  clearCredentials = () => {
    this.setLogin(undefined);
    this.setPassword(undefined);
  }
}