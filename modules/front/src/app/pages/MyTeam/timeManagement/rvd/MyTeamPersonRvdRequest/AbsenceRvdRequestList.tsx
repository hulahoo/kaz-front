import * as React from "react";
import {observer} from "mobx-react";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {AbsenceRvdRequest} from "../../../../../../cuba/entities/base/tsadv_AbsenceRvdRequest";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {MyTeamCardProps} from "../../../MyTeamCard";
import DataTableFormat from "../../../../../components/DataTable/intex";
import {Link} from "react-router-dom";
import {AbsenceRvdRequestManagement} from "./AbsenceRvdRequestManagement";
import {DEFAULT_DATE_TIME_PATTERN, formatDate} from "../../../../../util/Date/Date";

@injectMainStore
@observer
class AbsenceRvdRequestListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & MyTeamCardProps> {

  dataCollection = collection<AbsenceRvdRequest>(AbsenceRvdRequest.NAME, {
    view: "absenceRvdRequest.edit",
    sort: "-timeOfStarting",
    loadImmediately: true,
    filter: {
      conditions: [
        {
          property: "personGroup.id",
          operator: "=",
          value: this.props.personGroupId!
        },
      ],
    },
  });

  fields = [

    "requestNumber",

    "status",

    "type",

    "purpose",

    "timeOfStarting",

    "timeOfFinishing",

    "totalHours",

    "compensation",

    "vacationDay",

    "agree",

  ];

  render() {
    return <DataTableFormat
      dataCollection={this.dataCollection}
      fields={this.fields}
      hideSelectionColumn={true}
      render={[{
        column: 'requestNumber',
        render: (text, record) => <Link to={AbsenceRvdRequestManagement.PATH + '/' + record.id}>{text}</Link>
      }, {
        column: 'timeOfStarting',
        render: (text, record) => formatDate(record.timeOfStarting, DEFAULT_DATE_TIME_PATTERN)
      }, {
        column: 'timeOfFinishing',
        render: (text, record) => formatDate(record.timeOfFinishing, DEFAULT_DATE_TIME_PATTERN)
      }]}
    />
  }

}

const AbsenceRvdRequestList = injectIntl(AbsenceRvdRequestListComponent);

export default AbsenceRvdRequestList;
