import * as React from "react";
import {observer} from "mobx-react";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {MyTeamCardProps} from "../../MyTeamCard";
import {Absence} from "../../../../../cuba/entities/base/tsadv$Absence";
import {observable} from "mobx";
import {Link} from "react-router-dom";
import {ChangeAbsenceDaysRequestManagement} from "../ChangeAbsenceDaysRequest/ChangeAbsenceDaysRequestManagement";
import {Button} from "antd";
import moment from "moment/moment";


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
  @observable disabledChangeVacationDates: boolean = true;

  render() {
    return (
      <DataTable
        buttons={[<Link to={ChangeAbsenceDaysRequestManagement.PATH + '/new/' + this.selectedRowKey}>
          <Button disabled={this.disabledChangeVacationDates}>
            <FormattedMessage id={'create.request.change.vacation.dates'}/>
          </Button>
        </Link>]}
        dataCollection={this.dataCollection}
        onRowSelectionChange={this.selectRow}
        fields={this.absenceFields}
        hideSelectionColumn={true}
      />
    )
  }

  selectRow = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
    if (this.selectedRowKey) {
      const absence = this.dataCollection.items.find(value => value.id === this.selectedRowKey);
      this.disabledChangeVacationDates = (absence && absence.type && absence.type.code && absence.type.code.startsWith('ANNUAL')
        && moment(absence.dateFrom) > moment()) !== true
    }
  }
}

export default injectIntl(MyTeamAbsence);