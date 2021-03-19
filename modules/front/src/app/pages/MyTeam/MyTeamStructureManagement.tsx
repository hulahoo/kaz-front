import * as React from "react";
import {observer} from "mobx-react";
import MyTeamStructure from "./MyTeamStructure";

@observer
export class MyTeamStructureManagement extends React.Component {
  static PATH = "/my-team";

  render() {
    return (
      <MyTeamStructure/>
    );
  }
}
