import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import InsuredPersonEdit from "./InsuredPersonEdit";
import InsuredPersonList from "./InsuredPersonList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class InsuredPersonManagement extends React.Component<Props> {
  static PATH = "/my-dmc";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <InsuredPersonEdit entityId={entityId} />
        ) : (
          <InsuredPersonList />
        )}
      </>
    );
  }
}
