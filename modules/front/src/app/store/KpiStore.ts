import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {CardStatusEnum} from "../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {kpiService} from "../../cuba/kpi-service/kpiService";
import moment from "moment";
import DefaultGoalStore from "./DefaultGoalStore";

type KpiState = {
  personFullName: string,
  positionName: string,
  orgName: string,
  compName: string,
  gradeName: string,
  managerName: string,
  startDate: moment.Moment,
  endDate: moment.Moment,
  status: CardStatusEnum,
}

export type Goal = {
  rowNumber: string,
  name: string,
  weight: number,
  comment: string,
  id: string
}

export type GoalData = {
  categoryName: string,
  goals: Goal[]
}

export default class KpiStore {
  rootStore: RootStore

  @observable appId: string;
  @observable state: KpiState;
  @observable rating: GoalData[];

  constructor(rootStore: RootStore, appId: string) {
    this.rootStore = rootStore;
    this.appId = appId;
    this.loadKpi();
    this.loadRating();
  }

  @action
  setAppId = (value: string) => {
    this.appId = value;
  }

  @action
  setState = (value: KpiState) => {
    this.state = value;
  }

  @action
  setRating = (value: GoalData[]) => {
    this.rating = value;
  }

  loadKpi = () => {
    kpiService.edit().then((r: KpiState) => this.setState(r));
  }

  loadRating = () => {
    kpiService.goals().then(data => this.setRating(data));
  }
}