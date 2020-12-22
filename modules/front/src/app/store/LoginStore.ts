import {action, observable} from "mobx";
import RootStore from "./RootStore";

export default class LoginStore {
  root: RootStore;
  @observable login: string;
  @observable password: string;

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  setLogin(value: string) {
    this.login = value;
  }

  @action
  setPassword(value: string) {
    this.password = value;
  }
}