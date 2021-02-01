import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import AssignedGoalEdit from "./AssignedGoalEdit";
import AssignedGoalList from "./AssignedGoalList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class LibraryAssignedGoalManagement extends React.Component<Props> {
  static PATH = "/assignedGoalManagement";
  static NEW_SUBPATH = "new";

  render() {
    const { appId } = this.props.match.params as any;
    return (
      <>
        {appId ? (
          <AssignedGoalEdit entityId={appId} />
        ) : (
          <AssignedGoalList />
        )}
      </>
    );
  }
}
