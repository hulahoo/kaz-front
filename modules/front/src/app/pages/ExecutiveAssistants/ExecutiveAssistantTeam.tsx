import * as React from "react";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../store";
import {AssistantSelector} from "./AssistantSelector";
import MyTeamComponent from "../MyTeam/MyTeamComponent";

@inject("rootStore")
@observer
export class AssistantTeam extends React.Component<RootStoreProp> {

  render() {
    return (
      <AssistantSelector render={selectedPerson =>
        <MyTeamComponent
          key={selectedPerson.positionGroupId}
          selectedTab={() => this.props.rootStore!.assistantTeamInfo.selectedTab}
          selectedLeftMenu={() => this.props.rootStore!.assistantTeamInfo.selectedMenu}
          selectedData={this.props.rootStore!.assistantTeamInfo.selectedAssistantTeamData}
          onChangeSelectedInfo={this.props.rootStore!.assistantTeamInfo.setAssistantTeamInfo}
          positionGroupId={selectedPerson.positionGroupId}
        />
      }
      />
    )
  }
}