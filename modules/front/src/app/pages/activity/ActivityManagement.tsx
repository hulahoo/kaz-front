import {observer} from "mobx-react";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import ActivityCards from "./ActivityCards";

type Props = RouteComponentProps<{ type: string }>;

@observer
export class ActivityManagement extends React.Component<Props> {
  static PATH = "/activity/:type";
  static PATH_TASKS = "/activity/tasks";
  static PATH_NOTIFICATIONS = "/activity/notifications";

  render() {
    const {type} = this.props.match.params;
    return (
      <>
        <ActivityCards type={type}/>
      </>
    );
  }
}
