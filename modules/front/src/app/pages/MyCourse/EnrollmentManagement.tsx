import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import EnrollmentEdit from "./EnrollmentEdit";
import EnrollmentList from "./EnrollmentList";
import StudentHomeworkList from "../StudentHomework/StudentHomeworkList";

type Props = RouteComponentProps<{ entityId?: string, homework?: string }>;

@observer
export class EnrollmentManagement extends React.Component<Props> {
  static PATH = "/my-course";
  static NEW_SUBPATH = "new";
  static HOMEWORK = 'homework';

  render() {
    const {entityId, homework} = this.props.match.params;
    return (
      <>
        {entityId ? homework === EnrollmentManagement.HOMEWORK ?
          <StudentHomeworkList enrollmentId={entityId}/> :
          <EnrollmentEdit entityId={entityId}/> :
          <EnrollmentList/>}
      </>
    );
  }
}
