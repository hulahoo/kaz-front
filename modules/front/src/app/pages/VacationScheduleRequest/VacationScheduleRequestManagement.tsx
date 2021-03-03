import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import VacationScheduleRequestEdit from "./VacationScheduleRequestEdit";

type Props = RouteComponentProps<{ entityId: string }>;

@observer
export class VacationScheduleRequestManagement extends React.Component<Props> {
  static PATH = "/vacationScheduleRequest";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        <VacationScheduleRequestEdit entityId={entityId}/>
      </>
    );
  }
}
