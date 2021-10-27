import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import PunishmentRemovalRequestEdit from "./PunishmentRemovalRequestEdit";

type Props = RouteComponentProps<{ entityId?: string, personGroupId: string }>;

@observer
export class PunishmentRemovalRequestManagement extends React.Component<Props> {
  static PATH_WITH_PARAMS = "/punishmentRemovalRequest/:entityId/:personGroupId?";
  static PATH = "/punishmentRemovalRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId, personGroupId} = this.props.match.params;
    return (
      <>
        <PunishmentRemovalRequestEdit entityId={entityId} personGroupId={personGroupId} />
      </>
    );
  }
}
