import RootStore from "./RootStore";

export type RootStoreProp = {
  rootStore?: RootStore,
}

const rootStore = new RootStore();
export default rootStore;