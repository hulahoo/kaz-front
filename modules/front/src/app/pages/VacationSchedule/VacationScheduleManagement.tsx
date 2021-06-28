import * as React from "react";
import {observer} from "mobx-react";
import {VacationScheduleList} from "./VacationScheduleList";

@observer
export class VacationScheduleManagement extends React.Component {
  static PATH = "/vacationSchedule";

  render() {
    return (
      <>
        <VacationScheduleList/>
      </>
    );
  }
}
