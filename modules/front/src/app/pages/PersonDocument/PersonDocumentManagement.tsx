import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import PersonDocumentEdit from "./PersonDocumentEdit";
import PersonDocumentList from "./PersonDocumentList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PersonDocumentManagement extends React.Component<Props> {
  static PATH = "/personDocumentManagement";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <PersonDocumentEdit entityId={entityId} />
        ) : (
          <PersonDocumentList />
        )}
      </>
    );
  }
}
