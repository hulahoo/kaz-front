import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import AbsenceRvdRequestEdit from "./AbsenceRvdRequestEdit";
import AbsenceRvdRequestList from "./AbsenceRvdRequestList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class AbsenceRvdRequestManagement extends React.Component<Props> {
  static PATH = "/absenceRvdRequestManagement";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        <AbsenceRvdRequestEdit entityId={entityId}/>
      </>
    );
  }
}

