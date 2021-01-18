import RootStore from "./RootStore";
import {action, observable} from "mobx";
import moment from "moment";
import {kpiService} from "../../cuba/kpi-service/kpiService";

export type Category = {
  id: string,
  name: string
}

export default class DefaultGoalStore {
  rootStore: RootStore;

  @observable categories: Category[];
  @observable selectedCategory: string;
  @observable goalName: string;
  @observable description: string;
  @observable weight: number;
  @observable expiredDate: moment.Moment;
  @observable comment: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadCategories();
  }

  loadCategories = () => {
    kpiService.goalCategories().then(data => this.setCategories(data));
  }

  @action
  setCategories = (value: Category[]) => {
    this.categories = value;
  }

  @action
  setSelectedCategory = (value: string) => {
    this.selectedCategory = value;
  }

  @action
  setGoalName = (value: string) => {
    this.goalName = value;
  }

  @action
  setDescription = (value: string) => {
    this.description = value;
  }

  @action
  setWeight = (value: number) => {
    this.weight = value;
  }

  @action
  setExpiredDate = (value: moment.Moment) => {
    this.expiredDate = value;
  }

  @action
  setComment = (value: string) => {
    this.comment = value;
  }
}