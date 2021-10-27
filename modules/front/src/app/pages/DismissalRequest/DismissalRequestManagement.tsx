import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import DismissalRequestList from "./DismissalRequestList";
import DismissalRequestFormComponent from "./DismissalRequestForm";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class DismissalRequestManagement extends React.Component<Props> {
  static PATH = "/dismissalRequest";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <DismissalRequestFormComponent entityId={entityId} />
        ) : (
          <DismissalRequestList />
        )}
      </>
    );
  }
}