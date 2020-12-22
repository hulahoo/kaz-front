import RootStore from "./RootStore";
import {action, observable} from "mobx";
import InputStore from "./InputStore";
import ElementFactory from "./factory/ElementFactory";
import ParseFactory from "./factory/ParseFactory";

export type ElementStore = ParseFactory;

export default class SectionStore {
  root: RootStore;
  @observable name?: string
  @observable elements?: Array<ElementStore>

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  setName(value: string) {
    this.name = value;
  }

  @action
  setElements(value: Array<ElementStore>) {
    this.elements = value;
  }
}