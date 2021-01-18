import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import DefaultAssignedGoalEdit from "./DefaultAssignedGoalEdit";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class AssignedGoalManagement extends React.Component<Props> {
  // static PATH = "/assignedGoalManagement";
  // static NEW_SUBPATH = "new";

  render() {
    const { appId } = this.props.match.params as any;
    return (
      <>
        {appId ? (
          <DefaultAssignedGoalEdit assignedPerformancePlanId={appId} entityId={"new"}/>
        ) : (
          {/*<AssignedGoalList />*/}
        )}
      </>
    );
  }
}
