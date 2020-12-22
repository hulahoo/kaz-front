import {action, observable} from "mobx";
import RootStore from "./RootStore";
import {restServices} from "../../cuba/services";

export default class UserSettingsStore {
  root: RootStore

  @observable oldPassword: string;
  @observable newPassword: string;
  @observable retryPassword: string;
  @observable timeZone: string;
  @observable timeZones: Map<string, string>;

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  loadTimeZones() {
    type ResponseType = {
      timeZone: string,
      timeZones: Map<string, string>
    }

    restServices.userMenuService.getTimeZones().then((r: string) => {
      const jsonObject: ResponseType = JSON.parse(r);
      const map = new Map<string, string>()
      for (const v in jsonObject.timeZones) {
        if (jsonObject.timeZones.hasOwnProperty(v)) {
          map.set(v, jsonObject.timeZones[v]);
        }
      }
      this.setTimeZone(jsonObject.timeZone);
      this.setTimeZones(map);
    });
  }

  @action
  setOldPassword(value: string) {
    this.oldPassword = value;
  }

  @action
  setNewPassword(value: string) {
    this.newPassword = value;
  }

  @action
  setRetryPassword(value: string) {
    this.retryPassword = value;
  }

  @action
  setTimeZone(value: string) {
    this.timeZone = value;
  }

  @action
  setTimeZones(value: Map<string, string>) {
    this.timeZones = value;
  }
}