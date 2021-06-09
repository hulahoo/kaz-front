import {MyTeamData} from "../pages/MyTeam/MyTeamComponent";
import RootStore from "./RootStore";
import {action} from "mobx";

export default class {
  rootStore: RootStore;

  selectedMyTeamData?: MyTeamData;
  selectedTab?: string;
  selectedMenu?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  clearMyTeamInfo = () => {
    this.selectedMyTeamData = undefined;
    this.selectedTab = undefined;
    this.selectedMenu = undefined;
  };

  @action
  setMyTeamInfo = (myTeamData: MyTeamData, selectedTab: string, selectedMenu: string) => {
    this.selectedMyTeamData = myTeamData;
    if (selectedTab || !myTeamData)
      this.selectedTab = selectedTab;
    if (selectedMenu || !myTeamData)
      this.selectedMenu = selectedMenu;
  };
}