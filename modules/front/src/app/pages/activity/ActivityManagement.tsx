import {observer} from "mobx-react";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import ActivityCards from "./ActivityCards";
import {ActivityEdit} from "./ActivityEdit";

type Props = RouteComponentProps<{ type?: string }>;

// @observer
export class ActivityManagement extends React.Component<Props> {
  static PATH = "/activity/:type";
  static PATH_TASKS = "/activity/tasks";
  static PATH_NOTIFICATIONS = "/activity/notifications";

  render() {
    const {type} = this.props.match.params;
    const component = (type
      ? (type === "tasks" || type === "notifications")
        ? <ActivityCards type={type} key={type}/>
        : <ActivityEdit entityId={type}/>
      : null);
    return (
      <>
        {component}
      </>
    );
  }

}
