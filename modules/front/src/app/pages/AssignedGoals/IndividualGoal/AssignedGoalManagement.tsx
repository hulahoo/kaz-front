import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import IndividualAssignedGoalEdit from "./IndividualAssignedGoalEdit";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class AssignedGoalManagement extends React.Component<Props> {
  static PATH = "/goal/individual/";
  static NEW_SUBPATH = "new";

  render() {
    const { appId, entityId } = this.props.match.params as any;
    return (
      <>
        {appId ? (
          <IndividualAssignedGoalEdit appId={appId} entityId={entityId}/>
        ) : (
          {/*<AssignedGoalList />*/}
        )}
      </>
    );
  }
}
