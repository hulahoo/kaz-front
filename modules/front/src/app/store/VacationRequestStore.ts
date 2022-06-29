import {action} from "mobx";

export type VacationRequestCreateType = 'my' | 'manager' | 'assistant'

export default class VacationRequestStore {
  type: VacationRequestCreateType | undefined;

  @action
  clear = () => {
    this.type = undefined;
  }

  @action
  setType = (type: VacationRequestCreateType) => {
    this.type = type;
  }
}