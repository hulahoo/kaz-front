import {MyTeamData} from "../pages/MyTeam/MyTeamComponent";
import RootStore from "./RootStore";
import {action} from "mobx";
import {PersonProfile} from "../pages/MyTeam/MyTeamCard";

export default class {
  rootStore: RootStore;

  active: boolean = false;

  selectedManager?: PersonProfile;
  selectedAssistantTeamData?: MyTeamData;
  selectedTab?: string;
  selectedMenu?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  clearAssistantTeamInfo = () => {
    this.selectedAssistantTeamData = undefined;
    this.selectedTab = undefined;
    this.selectedMenu = undefined;
  };

  @action
  setAssistantTeamInfo = (myTeamData: MyTeamData, selectedTab: string, selectedMenu: string) => {
    this.selectedAssistantTeamData = myTeamData;
    if (selectedTab || !myTeamData)
      this.selectedTab = selectedTab;
    if (selectedMenu || !myTeamData)
      this.selectedMenu = selectedMenu;
  };
}