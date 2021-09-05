import * as React from "react";
import {inject, observer} from "mobx-react";
import {VacationScheduleRequest} from "../../../cuba/entities/base/tsadv_VacationScheduleRequest";
import DataTableFormat from "../../components/DataTable/intex";
import {Link} from "react-router-dom";
import {VacationScheduleRequestManagement} from "../VacationScheduleRequest/VacationScheduleRequestManagement";
import {serviceCollection} from "../../util/ServiceDataCollectionStore";
import {restServices} from "../../../cuba/services";
import {RootStoreProp} from "../../store";

@inject("rootStore")
@observer
export class VacationScheduleList extends React.Component<RootStoreProp> {

  dataCollectionVacationSchedule = serviceCollection<VacationScheduleRequest>(
    (pagination) => restServices.vacationScheduleRequestService.getChildVacationSchedule({
      limit: pagination.limit,
      offset: pagination.offset
    }),
    VacationScheduleRequest.NAME);

  vacationScheduleFields = [
    "requestNumber",

    "personGroup",

    "startDate",

    "endDate",

    "absenceDays",

    "assignmentSchedule",

    "approved",

    "sentToOracle",
  ];

  render() {
    return (
      <DataTableFormat
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
    );
  }

  componentDidMount() {
    this.dataCollectionVacationSchedule.load();
    this.props.rootStore!.assistantTeamInfo.active = false;
  }
}
