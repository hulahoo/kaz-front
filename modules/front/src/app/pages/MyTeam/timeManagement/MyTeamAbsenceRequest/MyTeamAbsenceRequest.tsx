import * as React from "react";
import {observer} from "mobx-react";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {MyTeamCardProps} from "../../MyTeamCard";
import DataTableFormat from "../../../../components/DataTable/intex";
import {AllAbsenceRequest} from "../../../../../cuba/entities/base/tsadv_AllAbsenceRequest";
import {Link} from "react-router-dom";
import {link} from "../../../../util/util";


@injectMainStore
@observer
class MyTeamAbsenceRequest extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps> {

  dataCollection = collection<AllAbsenceRequest>(AllAbsenceRequest.NAME, {
    view: "allAbsenceRequest-view",
    sort: "-requestNumber",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.personGroupId}]
    }
  });

  absenceRequestFields = [

    "requestNumber",

    "requestDate",

    "type",

    "startDate",

    "endDate",

    "status"
  ];

  render() {
    return (
      <DataTableFormat
        dataCollection={this.dataCollection}
        fields={this.absenceRequestFields}
        hideSelectionColumn
        render={[{
          column: this.absenceRequestFields[0],
          render: (text, record) => <Link to={link(record.entityName!) + "/" + record.id}>{text}</Link>
        }]}
      />
    )
  }
}

export default injectIntl(MyTeamAbsenceRequest);
