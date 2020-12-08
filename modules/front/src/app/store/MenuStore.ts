import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {restServices} from "../../cuba/services";

export type Menu = {
  id: any,
  caption: string
  parent?: Menu
}

export default class MenuStore {
  root: RootStore;

  @observable menuList: Menu[];

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  loadUserMenuList = () => {
    restServices.userMenuService.userMenuList().then((response: string) => {
      const menuIdList: string[] = JSON.parse(response);
      console.log(menuIdList);
    });
  }
}