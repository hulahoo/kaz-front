import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import IncentiveList from "./IncentiveList";
import IncentiveEdit from "./IncentiveEdit";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class IncentiveManagement extends React.Component<Props> {
  static PATH = "/incentive";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId ? (
          <IncentiveEdit entityId={entityId}/>
        ) : (
          <IncentiveList/>
        )}
      </>
    );
  }
}
