import {UserInfo} from "@cuba-platform/rest/dist-node/model";
import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {restServices} from "../../cuba/services";
import {MyTeamData} from "../pages/MyTeam/MyTeamComponent";

export type MyTeamInfo = {
  selectedMyTeamData?: MyTeamData,
  selectedTab?: string,
  selectedMenu?: string,
}

export default class {
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
  personGroupId?: string;
  positionId?: string;
  positionGroupId?: string;
  @observable initialized: boolean = false;

  myTeamInfo: MyTeamInfo = {}

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadUserInfo();
  }

  loadAdditionalPersonInfo = async () => {
    return await restServices.employeeService.personGroupInfo(this.id!).then(personProfile => {
      if (personProfile) {
        this.personGroupId = personProfile.groupId;
        this.positionId = personProfile.positionId;
        this.positionGroupId = personProfile.positionGroupId;
      }
      this.initialized = true;
    }).catch(() => {
      this.initialized = true;
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
    this.positionGroupId = undefined;
  };

  loadUserInfo = async () => {
    this.initialized = false;
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

      this.loadAdditionalPersonInfo();
    }).catch(() => {
      this.initialized = true;
    });
  }
}
