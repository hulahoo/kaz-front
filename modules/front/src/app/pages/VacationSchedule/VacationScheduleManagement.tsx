import * as React from "react";
import {observer} from "mobx-react";
import VacationScheduleList from "./VacationScheduleList";
import {RouteComponentProps} from "react-router";
import MyVacationScheduleList from "./MyVacationScheduleList";
import AssistantVacationSchedule from "./AssistantVacationSchedule";

type Props = RouteComponentProps<{ type: string }>;

@observer
export class VacationScheduleManagement extends React.Component<Props> {
  static PATH = "/vacationSchedule";

  static MY_VACATION_SCHEDULE_TYPE = "my";
  static MANAGER_VACATION_SCHEDULE_TYPE = "manager";
  static ASSISTANT_VACATION_SCHEDULE_TYPE = "assistant";

  render() {
    const {type} = this.props.match.params;

    return (
      <>
        {
          type === VacationScheduleManagement.MY_VACATION_SCHEDULE_TYPE
            ? <MyVacationScheduleList/>
            : type === VacationScheduleManagement.MANAGER_VACATION_SCHEDULE_TYPE
              ? <VacationScheduleList/>
              : type === VacationScheduleManagement.ASSISTANT_VACATION_SCHEDULE_TYPE
                ? <AssistantVacationSchedule/>
                : <></>
        }
      </>
    );
  }
}
