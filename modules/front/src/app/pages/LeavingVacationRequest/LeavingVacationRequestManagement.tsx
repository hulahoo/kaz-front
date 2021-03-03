import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import LeavingVacationRequestEdit from "./LeavingVacationRequestEdit";

type Props = RouteComponentProps<{ entityId: string }>;

@observer
export class LeavingVacationRequestManagement extends React.Component<Props> {
  static PATH = "/leavingVacationRequest";
  static NEW_SUBPATH = "new";

  absenceId?: string;

  entityId: string;

  render() {
    const {entityId} = this.props.match.params;
    this.entityId = entityId;
    if (entityId.startsWith(LeavingVacationRequestManagement.NEW_SUBPATH)) {
      this.absenceId = entityId.substring(LeavingVacationRequestManagement.NEW_SUBPATH.length + 1);
      this.entityId = LeavingVacationRequestManagement.NEW_SUBPATH;
    }
    return (
      <>
        <LeavingVacationRequestEdit entityId={this.entityId} absenceId={this.absenceId}/>
      </>
    );
  }
}
