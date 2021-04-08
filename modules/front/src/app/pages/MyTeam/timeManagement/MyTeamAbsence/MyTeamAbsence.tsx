import * as React from "react";
import {observer} from "mobx-react";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {MyTeamCardProps} from "../../MyTeamCard";
import {Absence} from "../../../../../cuba/entities/base/tsadv$Absence";
import {observable} from "mobx";


@injectMainStore
@observer
class MyTeamAbsence extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps> {

  dataCollection = collection<Absence>(Absence.NAME, {
    view: "absence.view",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.personGroupId!}]
    }
  });

  absenceFields = [
    "type",

    "dateFrom",

    "dateTo",

    "absenceDays"
  ];

  @observable selectedRowKey: string | undefined;

  render() {
    return (
      <DataTable
        dataCollection={this.dataCollection}
        onRowSelectionChange={selectedRowKeys => this.selectedRowKey = selectedRowKeys[0]}
        fields={this.absenceFields}
        hideSelectionColumn={true}
      />
    )
  }

}

export default injectIntl(MyTeamAbsence);
