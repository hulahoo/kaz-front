import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import IncentiveApprove from "./IncentiveApprove";

type Props = RouteComponentProps<{ entityId: string }>;

@observer
export class IncentiveApproveManagement extends React.Component<Props> {
  static PATH = "/incentive-approve";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        <IncentiveApprove entityId={entityId}/>
      </>
    );
  }
}
