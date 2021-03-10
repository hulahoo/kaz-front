import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import AbsenceRequestEdit from "./AbsenceRequestEdit";

type Props = RouteComponentProps<{ entityId: string }>;

@observer
export class AbsenceRequestManagement extends React.Component<Props> {
  static PATH = "/absenceRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        <AbsenceRequestEdit entityId={entityId}/>
      </>
    );
  }
}
