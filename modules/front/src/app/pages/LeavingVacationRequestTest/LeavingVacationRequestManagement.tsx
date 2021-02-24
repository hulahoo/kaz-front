import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import LeavingVacationRequestEdit from "./LeavingVacationRequestEdit";

type Props = RouteComponentProps<{ entityId: string }>;

@observer
export class LeavingVacationRequestManagement extends React.Component<Props> {
  static PATH = "/leavingVacationRequest";
  static NEW_SUBPATH = "new";

  absenceId: string;

  render() {
    const {entityId} = this.props.match.params;
    if (entityId.startsWith(LeavingVacationRequestManagement.NEW_SUBPATH)) {
      this.absenceId = entityId.substring(LeavingVacationRequestManagement.NEW_SUBPATH.length);
    }
    return (
      <>
        <LeavingVacationRequestEdit entityId={entityId} absenceId={this.absenceId}/>
      </>
    );
  }
}
