import RootStore from "./RootStore";

export class TempDataStore {
  rootStore: RootStore;
  childPersonGroupId?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
}
