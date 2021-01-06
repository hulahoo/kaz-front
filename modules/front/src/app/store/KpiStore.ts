import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {CardStatusEnum} from "../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {restServices} from "../../cuba/services";

type KpiState = {
  personFullName: string,
  positionName: string,
  orgName: string,
  compName: string,
  gradeName: string,
  managerName: string,
  startDate: Date,
  endDate: Date,
  status: CardStatusEnum,
}

export default class KpiStore {
  rootStore: RootStore

  @observable appId: string;
  @observable state: KpiState;

  constructor(rootStore: RootStore, appId: string) {
    this.rootStore = rootStore;
    this.appId = appId;
  }

  @action
  setAppId = (value: string) => {
    this.appId = value;
  }

  @action
  setState = (value: KpiState) => {
    this.state = value;
  }

  loadKpi = () => {
    restServices.kpiService.edit().then((r: string) => {
      const response: KpiState = JSON.parse(r);
      this.setState(response);
    });
  }
}