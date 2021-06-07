import * as React from "react";
import {inject, observer} from "mobx-react";
import MyTeamComponent from "./MyTeamComponent";
import {RootStoreProp} from "../../store";

@inject("rootStore")
@observer
class MyTeamStructure extends React.Component<RootStoreProp> {

  render() {
    return (
      <MyTeamComponent
        selectedTab={() => this.props.rootStore!.myTeamInfo.selectedTab}
        selectedLeftMenu={() => this.props.rootStore!.myTeamInfo.selectedMenu}
        selectedData={this.props.rootStore!.myTeamInfo.selectedMyTeamData}
        onChangeSelectedInfo={this.props.rootStore!.myTeamInfo.setMyTeamInfo}
        positionGroupId={this.props.rootStore!.userInfo!.positionGroupId!}/>
    )
  }

  componentDidMount() {
    this.props.rootStore!.assistantTeamInfo.active = false;
  }
}

const myTeamStructure = MyTeamStructure;
export default myTeamStructure;
