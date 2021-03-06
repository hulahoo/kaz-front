import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PortalFeedbackQuestionEdit from "./PortalFeedbackQuestionEdit";

type Props = RouteComponentProps<{ entityId: string }>;

@observer
export class PortalFeedbackQuestionManagement extends React.Component<Props> {
  static PATH = "/feedbackQuestion";
  // static NEW_SUBPATH = "new";

  render() {
    // const {entityId} = this.props.match.params;
    return (
      <>
        <PortalFeedbackQuestionEdit/>
      </>
    );
  }

}
