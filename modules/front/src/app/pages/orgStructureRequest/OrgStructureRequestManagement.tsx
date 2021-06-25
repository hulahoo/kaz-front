import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import OrgStructureRequestEdit from "./OrgStructureRequestEdit";
import OrgStructureRequestList from "./OrgStructureRequestList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class OrgStructureRequestManagement extends React.Component<Props> {
  static PATH = "/orgStructureRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId ? (
          <OrgStructureRequestEdit entityId={entityId}/>
        ) : (
          <OrgStructureRequestList/>
        )}
      </>
    );
  }
}
