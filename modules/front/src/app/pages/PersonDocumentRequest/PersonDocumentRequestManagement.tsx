import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PersonDocumentRequestEdit from "./PersonDocumentRequestEdit";

type Props = RouteComponentProps<{ entityId: string, documentId?: string }>;

@observer
export class PersonDocumentRequestManagement extends React.Component<Props> {
  static PATH = "/personDocumentRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId, documentId} = this.props.match.params;
    return (
      <>
        <PersonDocumentRequestEdit entityId={entityId} documentId={documentId}/>
      </>
    );
  }
}
