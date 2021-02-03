import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import EnrollmentEdit from "./EnrollmentEdit";
import EnrollmentList from "./EnrollmentList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class EnrollmentManagement extends React.Component<Props> {
  static PATH = "/my-course";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? <EnrollmentEdit entityId={entityId} /> : <EnrollmentList />}
      </>
    );
  }
}
