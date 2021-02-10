import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import AssignedGoalEdit from "./AssignedGoalEdit";
import AssignedGoalList from "./AssignedGoalList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class LibraryAssignedGoalManagement extends React.Component<Props> {
  static PATH = "/goal/library/";
  static NEW_SUBPATH = "new";

  render() {
    const { appId, entityId } = this.props.match.params as any;
    return (
      <>
        {appId ? (
          <AssignedGoalEdit appId={appId} entityId={entityId} />
        ) : (
          <AssignedGoalList />
        )}
      </>
    );
  }
}
