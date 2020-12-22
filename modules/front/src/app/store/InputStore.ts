import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {CommonInputProps} from "../components/Input/Input";

export type InputType = string | number | Date;

export default class InputStore {
  root: RootStore;
  @observable inputName?: string;
  @observable value?: InputType;
  @observable props?: CommonInputProps;

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  setValue(value: InputType) {
    this.value = value
  }

  @action
  setProps(value: CommonInputProps) {
    this.props = value
  }

  @action
  setInputName(value: string) {
    this.inputName = value
  }
}