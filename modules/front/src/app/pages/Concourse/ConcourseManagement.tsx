import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import ConcourseEdit from "./ConcourseEdit";
import ConcourseList from "./ConcourseList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class ConcourseManagement extends React.Component<Props> {
  static PATH = "/concourseManagement";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? <ConcourseEdit entityId={entityId} /> : <ConcourseList />}
      </>
    );
  }
}
