import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PersonDocumentEdit from "../PersonDocument/PersonDocumentEdit";
import PersonEducationList from "./PersonEducationList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PersonEducationManagement extends React.Component<Props> {
  static PATH = "/personEducationManagement";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId ? (
          <PersonDocumentEdit entityId={entityId}/>
        ) : (
          <PersonEducationList/>
        )}
      </>
    );
  }
}
