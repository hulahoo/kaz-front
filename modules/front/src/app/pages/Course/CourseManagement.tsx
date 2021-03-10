import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import CourseEdit from "./CourseEdit";
import CourseCatalog from "../CourseCatalog";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class CourseManagement extends React.Component<Props> {
  static PATH = "course";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;

    return (
      <>
        {entityId ? (
          <CourseEdit entityId={entityId}/>
        ) : (
          <CourseCatalog/>
        )}
      </>
    );
  }
}
