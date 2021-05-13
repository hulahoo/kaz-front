import * as React from "react";
import {observer} from "mobx-react";

import {collection, getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {MyTeamCardProps} from "../../../MyTeamCard";
import {Absence} from "../../../../../../cuba/entities/base/tsadv$Absence";
import {observable} from "mobx";
import Button from "../../../../../components/Button/Button";
import {Link} from "react-router-dom";
import {AbsenceRvdRequestManagement} from "../MyTeamPersonRvdRequest/AbsenceRvdRequestManagement";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import DataTableFormat from "../../../../../components/DataTable/intex";
import {AbsPurposeSetting} from "../../../../../../cuba/entities/base/tsadv_AbsPurposeSetting";


@injectMainStore
@observer
class MyTeamPersonRvd extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps> {

  @observable
  dataCollection: DataCollectionStore<Absence>;

  componentDidMount() {
    getCubaREST()!.loadEntities<AbsPurposeSetting>(AbsPurposeSetting.NAME, {
      view: '_minimal'
    }).then(value => {
      const absenceTypes = value.map(purposeSetting => purposeSetting.absenceType)
        .filter(absenceType => !!absenceType)
        .map(absenceTypes => absenceTypes!.id!);

      this.dataCollection = collection<Absence>(Absence.NAME, {
        view: "absence.view",
        sort: "-updateTs",
        filter: {
          conditions: [{
            property: 'type.id',
            operator: 'in',
            value: absenceTypes,
          },
            {
              property: "personGroup.id",
              operator: "=",
              value: this.props.personGroupId!
            },]
        }
      });
    })
  }

  absenceFields = [
    "type",

    "dateFrom",

    "dateTo",

    "absenceDays"
  ];

  @observable selectedRowKey: string | undefined;

  render() {
    return (
      <div>
        {this.dataCollection ? <DataTableFormat
          dataCollection={this.dataCollection}
          buttons={[
            <Link
              to={
                AbsenceRvdRequestManagement.PATH + "/" + AbsenceRvdRequestManagement.NEW_SUBPATH + "/" + this.props.personGroupId
              }
              key="create">
              <Button
                htmlType="button"
                style={{margin: "0 12px 12px 0"}}
                type="primary"
              >
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
              </Button>
            </Link>
          ]}
          onRowSelectionChange={selectedRowKeys => this.selectedRowKey = selectedRowKeys[0]}
          fields={this.absenceFields}
          hideSelectionColumn={true}
        /> : null}
      </div>
    )
  }
}

export default injectIntl(MyTeamPersonRvd);
