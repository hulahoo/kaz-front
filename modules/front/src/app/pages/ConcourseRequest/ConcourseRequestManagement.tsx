import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import ConcourseRequestEdit from "./ConcourseRequestEdit";
import ConcourseRequestList from "./ConcourseRequestList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class ConcourseRequestManagement extends React.Component<Props> {
  static PATH = "/concourse-request";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <ConcourseRequestEdit entityId={entityId} />
        ) : (
          <ConcourseRequestList />
        )}
      </>
    );
  }
}
