import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import {LeavingVacationRequestEdit} from "./LeavingVacationRequestEdit";

type Props = RouteComponentProps<{ entityId: string }>;

@observer
export class LeavingVacationRequestManagement extends React.Component<Props> {
  static PATH = "/leavingVacationRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        <LeavingVacationRequestEdit entityId={entityId}/>
      </>
    );
  }
}
