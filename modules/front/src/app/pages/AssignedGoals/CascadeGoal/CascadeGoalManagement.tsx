import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import CascadeEdit from "./CascadeEdit";
import CascadeList from "./CascadeList";

type Props = RouteComponentProps<{ entityId?: string, appId: string }>;

@observer
export class CascadeGoalManagement extends React.Component<Props> {
  static PATH = "/goal/cascade/";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId, appId} = this.props.match.params;
    return (
      <>{entityId ? <CascadeEdit entityId={entityId} appId={appId}/> : <CascadeList/>}</>
    );
  }
}
