import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import VacationScheduleRequestEdit from "./VacationScheduleRequestEdit";

type Props = RouteComponentProps<{ entityId: string, chartType: string }>;

@observer
export class VacationScheduleRequestManagement extends React.Component<Props> {
  static PATH = "/vacationScheduleRequest";
  static NEW_SUBPATH = "new";
  static GANT_CHART = "gantt-chart";

  render() {
    const {entityId, chartType} = this.props.match.params;
    return (
      <>
        <VacationScheduleRequestEdit entityId={entityId}
                                     ganttChartVisible={chartType === VacationScheduleRequestManagement.GANT_CHART}/>
      </>
    );
  }
}
