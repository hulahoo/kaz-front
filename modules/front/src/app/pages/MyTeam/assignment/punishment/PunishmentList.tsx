import * as React from "react";
import { observer } from "mobx-react";

import {
  collection,
  injectMainStore,
  MainStoreInjected
} from "@cuba-platform/react";

import { Punishment } from "../../../../../cuba/entities/base/tsadv$Punishment";
import {
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import DataTableFormat from "../../../../components/DataTable/intex";
import { observable } from "mobx";
import {MyTeamCardProps} from "../../MyTeamCard";

@injectMainStore
@observer
class PunishmentListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & MyTeamCardProps> {
  dataCollection = collection<Punishment>(Punishment.NAME, {
    filter: {
      conditions: [
        {
          property: "responsibleEmployee",
          operator: '=',
          value: this.props.personGroupId
        }
      ]
    },
    view: "punishment.all",
    sort: "-updateTs"
  });


  fields = [
    "orderNumber",
    "date",
    "offenceType",
  ];

  @observable selectedRowKey: string | undefined;

  render() {
    return (
      <DataTableFormat
        dataCollection={this.dataCollection}
        fields={this.fields}
        hideSelectionColumn={true}
      />
    );
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

}

const PunishmentList = injectIntl(PunishmentListComponent);

export default PunishmentList;
