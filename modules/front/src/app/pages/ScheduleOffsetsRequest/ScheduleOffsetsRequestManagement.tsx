import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import ScheduleOffsetsRequestEdit from "./ScheduleOffsetsRequestEdit";
import ScheduleOffsetsRequestList from "./ScheduleOffsetsRequestList";

type Props = RouteComponentProps<{ entityId: string, personGroupId: string }>;

@observer
export class ScheduleOffsetsRequestManagement extends React.Component<Props> {
  static PATH_WITH_PARAMS = "/scheduleOffsetsRequest/:entityId/:personGroupId?";
  static PATH = "/scheduleOffsetsRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId, personGroupId} = this.props.match.params;
    return (
      <>
        {entityId ? (
          <ScheduleOffsetsRequestEdit  entityId={entityId} personGroupId={personGroupId}/>
        ) : (
          <ScheduleOffsetsRequestList />
        )}
      </>
    );
  }
}
