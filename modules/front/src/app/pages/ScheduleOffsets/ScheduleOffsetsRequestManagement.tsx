import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import ScheduleOffsetsRequestEdit from "./ScheduleOffsetsRequestEdit";
import ScheduleOffsetsRequestList from "./ScheduleOffsetsRequestList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class ScheduleOffsetsRequestManagement extends React.Component<Props> {
  static PATH = "/schedule-offsets";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId ? (
          <ScheduleOffsetsRequestEdit entityId={entityId}/>
        ) : (
          <ScheduleOffsetsRequestList/>
        )}
      </>
    );
  }
}
