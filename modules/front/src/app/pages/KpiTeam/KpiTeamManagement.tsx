import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import KpiTeamEdit from "./KpiTeamEdit";
import KpiTeamList from "./KpiTeamList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class KpiTeamManagement extends React.Component<Props> {
  static PATH = "/kpi-team";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>{entityId ? <KpiTeamEdit entityId={entityId} /> : <KpiTeamList />}</>
    );
  }
}
