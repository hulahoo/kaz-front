import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import CascadeEdit from "./CascadeEdit";
import CascadeList from "./CascadeList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class CascadeGoalManagement extends React.Component<Props> {
  static PATH = "/cascadeGoalManagement";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>{entityId ? <CascadeEdit entityId={entityId} /> : <CascadeList />}</>
    );
  }
}
