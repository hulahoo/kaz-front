import * as React from "react";
import {observer} from "mobx-react";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {MyTeamCardProps} from "../../MyTeamCard";
import {Absence} from "../../../../../cuba/entities/base/tsadv$Absence";
import {observable} from "mobx";
import {Link} from "react-router-dom";
import {ChangeAbsenceDaysRequestManagement} from "../ChangeAbsenceDaysRequest/ChangeAbsenceDaysRequestManagement";
import moment from "moment/moment";
import {AbsenceForRecallManagement} from "../AbsenceForRecall/AbsenceForRecallManagement";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {formatDate} from "../../../../util/Date/Date";


@injectMainStore
@observer
class MyTeamAbsence extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps> {

  dataCollection = collection<Absence>(Absence.NAME, {
    view: "absence.view",
    sort: "-dateFrom",
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
  @observable disabledAbsenceForRecall: boolean = true;

  render() {
    return (
      <DataTable
        buttons={[<Link to={AbsenceForRecallManagement.PATH + '/new/' + this.selectedRowKey}>
          <Button disabled={this.disabledAbsenceForRecall}
                  buttonType={ButtonType.PRIMARY}
                  style={{margin: "0 12px 12px 0", width: 'auto'}}>
            <FormattedMessage id={'create.request.absence.for.recall'}/>
          </Button>
        </Link>,
          <Link to={ChangeAbsenceDaysRequestManagement.PATH + '/new/' + this.selectedRowKey}>
            <Button disabled={this.disabledChangeVacationDates} buttonType={ButtonType.PRIMARY}
                    style={{margin: "0 12px 12px 0", width: 'auto'}}>
              <FormattedMessage id={'create.request.change.vacation.dates'}/>
            </Button>
          </Link>]}
        dataCollection={this.dataCollection}
        onRowSelectionChange={this.selectRow}
        fields={this.absenceFields}
        hideSelectionColumn={true}
        columnProps={{
          render: this.absenceColumnRender
        }}
      />
    )
  }

  indexCount = -1;
  columnCount = 0;

  absenceColumnRender = (text: any, record: any, index: number) => {
    if (this.indexCount != index) {
      this.indexCount = index;
      this.columnCount = 0;
    }
    this.columnCount++;

    if (this.columnCount > 1 && this.columnCount < 4)
      return formatDate(record[this.absenceFields[this.columnCount - 1]]);
    return text;
  }

  selectRow = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
    if (this.selectedRowKey) {
      const absence = this.dataCollection.items.find(value => value.id === this.selectedRowKey);
      this.disabledChangeVacationDates = (absence && absence.type && absence.type
        && absence.type.isVacationDate
        && absence.type.availableForChangeDate
        && absence.type.availableForRecallAbsence
        && absence.type.useInSelfService
        && moment(absence.dateFrom) > moment()) !== true;
      this.disabledAbsenceForRecall = (absence && absence.type && absence.type.useInSelfService
        && absence.type.availableForChangeDate && absence.type.availableForRecallAbsence) !== true;
    }
  }
}

export default injectIntl(MyTeamAbsence);
