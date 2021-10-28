import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import ConcourseNewEdit from "./ConcourseNewEdit";
import ConcourseNewList from "./ConcourseNewList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class ConcourseNewManagement extends React.Component<Props> {
  static PATH = "/concourseNew";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <ConcourseNewEdit entityId={entityId} />
        ) : (
          <ConcourseNewList />
        )}
      </>
    );
  }
}
