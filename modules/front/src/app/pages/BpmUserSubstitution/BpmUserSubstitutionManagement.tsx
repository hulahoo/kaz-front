import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import BpmUserSubstitutionEdit from "./BpmUserSubstitutionEdit";
import BpmUserSubstitutionList from "./BpmUserSubstitutionList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class BpmUserSubstitutionManagement extends React.Component<Props> {
  static PATH = "/bpmUserSubstitution";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <BpmUserSubstitutionEdit entityId={entityId} />
        ) : (
          <BpmUserSubstitutionList />
        )}
      </>
    );
  }
}
