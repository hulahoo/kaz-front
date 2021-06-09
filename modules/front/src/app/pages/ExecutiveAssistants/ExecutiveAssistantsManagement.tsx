import * as React from "react";
import {observer} from "mobx-react";
import {AssistantTeam} from "./ExecutiveAssistantTeam";

@observer
export class ExecutiveAssistantsManagement extends React.Component {
  static PATH = "/assistant-team";

  render() {
    return (
      <>
        <AssistantTeam/>
      </>
    );
  }
}
