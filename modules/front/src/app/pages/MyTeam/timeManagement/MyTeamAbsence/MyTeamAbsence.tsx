import * as React from "react";
import {observer} from "mobx-react";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {MyTeamCardProps} from "../../MyTeamCard";
import {Absence} from "../../../../../cuba/entities/base/tsadv$Absence";
import {observable} from "mobx";
import {Link} from "react-router-dom";
import {ChangeAbsenceDaysRequestManagement} from "../ChangeAbsenceDaysRequest/ChangeAbsenceDaysRequestManagement";
import Button, {ButtonType} from "../../../../components/Button/Button";


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
        buttons={[<Link to={ChangeAbsenceDaysRequestManagement.PATH + '/new/' + this.props.personGroupId}>
          <Button buttonType={ButtonType.FOLLOW}>Create ChangeAbsenceDaysRequestManagement</Button>
        </Link>]}
        dataCollection={this.dataCollection}
        onRowSelectionChange={selectedRowKeys => this.selectedRowKey = selectedRowKeys[0]}
        fields={this.absenceFields}
        hideSelectionColumn={true}
      />
    )
  }

}

export default injectIntl(MyTeamAbsence);
