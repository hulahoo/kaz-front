import MenuStore from "./MenuStore";

export default class RootStore {
  menu: MenuStore;

  constructor() {
    this.menu = new MenuStore(this);
  }
}