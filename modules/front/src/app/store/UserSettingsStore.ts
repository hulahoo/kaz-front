import {action, observable} from "mobx";
import RootStore from "./RootStore";
import {restServices} from "../../cuba/services";
import EntityCrudRestService from "../util/EntityCrudRestService";
import {User} from "../../cuba/entities/base/sec$User";
import {notification} from "antd";

export default class UserSettingsStore {
  root: RootStore

  @observable timeZone: string;
  @observable timeZoneText?: string;
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
      const map = new Map<string, string>();
      for (const v in jsonObject.timeZones) {
        if (jsonObject.timeZones.hasOwnProperty(v)) {
          map.set(v, jsonObject.timeZones[v]);
        }
      }
      this.setTimeZones(map);
      this.setTimeZone(jsonObject.timeZone);
    });
  }

  @action
  setTimeZone = (value: string) => {
    this.timeZone = value;
    this.setTimeZoneText(value);
  }

  @action
  setTimeZoneText = (value: string) => {
    if (this.timeZones) {
      this.timeZoneText = this.timeZones.get(value);
    }
  };

  @action
  setTimeZones = (value: Map<string, string>) => {
    this.timeZones = value;
  }

  @action
  saveUserTimeZone = () => {
    return EntityCrudRestService.updateEntity(User.NAME, this.root.userInfo.id!, {timeZone: this.timeZone})
  }
}