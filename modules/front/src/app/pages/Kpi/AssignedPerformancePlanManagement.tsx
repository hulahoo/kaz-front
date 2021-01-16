import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import AssignedPerformancePlanEdit from "./AssignedPerformancePlanEdit";
import AssignedPerformancePlanList from "./AssignedPerformancePlanList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class AssignedPerformancePlanManagement extends React.Component<Props> {
  static PATH = "/kpi";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <AssignedPerformancePlanEdit entityId={entityId} />
        ) : (
          <AssignedPerformancePlanList />
        )}
      </>
    );
  }
}
