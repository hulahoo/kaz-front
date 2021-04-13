import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import CurrentScheduleRequestEdit from "./CurrentScheduleRequestEdit";

type Props = RouteComponentProps<{ entityId?: string | undefined }>;

@observer
export class CurrentScheduleRequestManagement extends React.Component<Props> {
  static PATH = "/currentScheduleRequestManagement";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
          <CurrentScheduleRequestEdit entityId={entityId} />
      </>
    );
  }
}

