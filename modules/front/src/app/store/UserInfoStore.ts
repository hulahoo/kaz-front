import {getCubaREST} from "@cuba-platform/react";
import {UserInfo} from "@cuba-platform/rest/dist-node/model";
import RootStore from "./RootStore";
import {restQueries} from "../../cuba/queries";
import {action, observable} from "mobx";

export default class  {
  rootStore: RootStore;
  _instanceName?: string;
  email?: string;
  firstName?: string;
  id?: string;
  language?: string;
  lastName?: string;
  locale?: string;
  login?: string;
  middleName?: string;
  name?: string;
  position?: string;
  timeZone?: string;
  @observable personGroupId?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadUserInfo();
  }

  loadPersonGroup = async () => {
    return await restQueries.personGroupInfo(this.id!).then(personGroup => {
      if (personGroup) {
        this.personGroupId = personGroup.id;
      }
    })
  };

  @action
  clearUserInfo = () => {
    this._instanceName = undefined;
    this.email = undefined;
    this.firstName = undefined;
    this.id = undefined;
    this.language = undefined;
    this.lastName = undefined;
    this.locale = undefined;
    this.login = undefined;
    this.middleName = undefined;
    this.name = undefined;
    this.position = undefined;
    this.timeZone = undefined;
    this.personGroupId = undefined;
  };

  loadUserInfo = async () => {
    return await this.rootStore.cubaRest.getUserInfo().then((response: UserInfo) => {
      this.timeZone = response.timeZone;
      this._instanceName = response._instanceName;
      this.email = response.email;
      this.firstName = response.firstName;
      this.id = response.id;
      this.language = response.language;
      this.lastName = response.lastName;
      this.locale = response.locale;
      this.login = response.login;
      this.middleName = response.middleName;
      this.name = response.name;
      this.position = response.position;

      this.loadPersonGroup();
    });
  }
}