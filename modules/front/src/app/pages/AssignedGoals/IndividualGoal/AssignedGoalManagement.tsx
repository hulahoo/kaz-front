import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import IndividualAssignedGoalEdit from "./IndividualAssignedGoalEdit";

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
          <IndividualAssignedGoalEdit assignedPerformancePlanId={appId} entityId={"new"}/>
        ) : (
          {/*<AssignedGoalList />*/}
        )}
      </>
    );
  }
}
