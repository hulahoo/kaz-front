import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import ConcourseRequestDocumentEdit from "./ConcourseRequestDocumentEdit";
import ConcourseRequestDocumentList from "./ConcourseRequestDocumentList";

type Props = RouteComponentProps<{ entityId: string }>;

@observer
export class ConcourseRequestDocumentManagement extends React.Component<Props> {
  static PATH = "/concourseRequestDocumentManagement";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>

          <ConcourseRequestDocumentEdit entityId={entityId} />

      </>
    );
  }
}
