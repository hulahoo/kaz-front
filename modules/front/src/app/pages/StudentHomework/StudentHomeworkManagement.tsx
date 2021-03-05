import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import StudentHomeworkEdit from "./StudentHomeworkEdit";
import StudentHomeworkList from "./StudentHomeworkList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class StudentHomeworkManagement extends React.Component<Props> {
  static PATH = "/studentHomeworkManagement";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <StudentHomeworkEdit entityId={entityId} />
        ) : (
          <StudentHomeworkList />
        )}
      </>
    );
  }
}
