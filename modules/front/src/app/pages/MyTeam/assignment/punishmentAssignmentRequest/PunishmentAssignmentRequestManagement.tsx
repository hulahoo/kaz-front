import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import PunishmentRequestEdit from "./PunishmentAssignmentRequestEdit";

type Props = RouteComponentProps<{ entityId?: string, personGroupId: string }>;

@observer
export class PunishmentAssignmentRequestManagement extends React.Component<Props> {
  static PATH_WITH_PARAMS = "/punishmentAssignmentRequest/:entityId/:personGroupId?";
  static PATH = "/punishmentAssignmentRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId, personGroupId} = this.props.match.params;
    return (
      <>
          <PunishmentRequestEdit entityId={entityId} personGroupId={personGroupId} />
      </>
    );
  }
}
