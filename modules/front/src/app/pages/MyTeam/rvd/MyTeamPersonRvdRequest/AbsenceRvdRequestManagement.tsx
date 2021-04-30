import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import AbsenceRvdRequestEdit from "./AbsenceRvdRequestEdit";

type Props = RouteComponentProps<{ entityId?: string, personGroupId: string}>;


@observer
export class AbsenceRvdRequestManagement extends React.Component<Props> {
  static PATH_WITH_PARAMS = "/absenceRvdRequestManagement/:entityId/:personGroupId?";
  static PATH = "/absenceRvdRequestManagement";
  static NEW_SUBPATH = "new";


  render() {
    const {entityId, personGroupId} = this.props.match.params;
    return (
      <>
        <AbsenceRvdRequestEdit personGroupId={personGroupId} entityId={entityId}/>
      </>
    );
  }
}

