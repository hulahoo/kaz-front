import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import PersonContactEdit from "./PersonContactEdit";
import PersonContactList from "./PersonContactList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PersonContactManagement extends React.Component<Props> {
  static PATH = "/personContactManagement";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <PersonContactEdit entityId={entityId} />
        ) : (
          <PersonContactList />
        )}
      </>
    );
  }
}
