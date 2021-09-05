import * as React from "react";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../store";
import {AssistantSelector} from "../ExecutiveAssistants/AssistantSelector";
import {serviceCollection, ServiceDataCollectionStore} from "../../util/ServiceDataCollectionStore";
import {VacationScheduleRequest} from "../../../cuba/entities/base/tsadv_VacationScheduleRequest";
import {restServices} from "../../../cuba/services";
import DataTableFormat from "../../components/DataTable/intex";
import {Link} from "react-router-dom";
import {VacationScheduleRequestManagement} from "../VacationScheduleRequest/VacationScheduleRequestManagement";
import {PersonProfile} from "../MyTeam/MyTeamCard";
import {observable} from "mobx";

@inject("rootStore")
@observer
export class AssistantVacationSchedule extends React.Component<RootStoreProp> {

  @observable
  dataCollectionVacationSchedule: ServiceDataCollectionStore<VacationScheduleRequest>

  vacationScheduleFields = [
    "requestNumber",

    "personGroup",

    "startDate",

    "endDate",

    "absenceDays",

    "assignmentSchedule",

    "approved",

    "sentToOracle"
  ];

  render() {
    return (
      <AssistantSelector
        onChange={this.onChangeAssistant}
        render={selectedPerson =>
          this.dataCollectionVacationSchedule
            ? <DataTableFormat
              dataCollection={this.dataCollectionVacationSchedule}
              fields={this.vacationScheduleFields}
              hideSelectionColumn={true}
              render={[{
                column: this.vacationScheduleFields[0],
                render: (text, record) => {
                  return <Link
                    to={VacationScheduleRequestManagement.PATH + "/" + record.id + "/" + VacationScheduleRequestManagement.GANT_CHART}>
                    {text}
                  </Link>
                }
              }]}
            />
            : <></>
        }
      />
    )
  }

  onChangeAssistant = (selectedPerson?: PersonProfile) => {
    if (selectedPerson) {
      this.dataCollectionVacationSchedule = serviceCollection<VacationScheduleRequest>(
        (pagination) => restServices.vacationScheduleRequestService.getPositionChildVacationSchedule({
            limit: pagination.limit,
            offset: pagination.offset
          },
          selectedPerson.positionGroupId),
        VacationScheduleRequest.NAME);

      this.dataCollectionVacationSchedule.load();
    }
  }

}