import {action, observable} from "mobx";
import RootStore from "./RootStore";
import {restServices} from "../../cuba/services";

export default class ChangePasswordStore {

  rootStore: RootStore;

  @observable oldPassword: string;
  @observable newPassword: string;
  @observable retryPassword: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  setOldPassword = (value: string) => {
    this.oldPassword = value;
  }

  @action
  setNewPassword = (value: string) => {
    this.newPassword = value;
  }

  @action
  setRetryPassword = (value: string) => {
    this.retryPassword = value;
  }

  changePassword = async () => {
    return await restServices.userMenuService.changePassword({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    })
  }
}