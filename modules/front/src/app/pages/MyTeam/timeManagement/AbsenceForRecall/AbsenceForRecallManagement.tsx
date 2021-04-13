import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import AbsenceForRecallEdit from "./AbsenceForRecallEdit";

type Props = RouteComponentProps<{ entityId: string, absenceId: string }>;

@observer
export class AbsenceForRecallManagement extends React.Component<Props> {
  static PATH_WITH_PARAMS = "/absenceForRecall/:entityId/:absenceId?";
  static PATH = "/absenceForRecall";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId, absenceId} = this.props.match.params;
    return (
      <>
        <AbsenceForRecallEdit entityId={entityId} absenceId={absenceId}/>
      </>
    );
  }
}
