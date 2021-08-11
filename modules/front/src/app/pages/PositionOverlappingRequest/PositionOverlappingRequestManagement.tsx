import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import PositionOverlappingRequestEdit from "./PositionOverlappingRequestEdit";
import PositionOverlappingRequestList from "./PositionOverlappingRequestList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PositionOverlappingRequestManagement extends React.Component<
  Props
> {
  static PATH = "/positionOverlappingRequestManagement";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {entityId ? (
          <PositionOverlappingRequestEdit entityId={entityId} />
        ) : (
          <PositionOverlappingRequestList />
        )}
      </>
    );
  }
}
