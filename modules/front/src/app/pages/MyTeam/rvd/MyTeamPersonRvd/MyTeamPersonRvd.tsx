import * as React from "react";
import {observer} from "mobx-react";

import {collection, DataTable, getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {MyTeamCardProps} from "../../MyTeamCard";
import {Absence} from "../../../../../cuba/entities/base/tsadv$Absence";
import {observable} from "mobx";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {Link} from "react-router-dom";
import {AbsenceRvdRequestManagement} from "../MyTeamPersonRvdRequest/AbsenceRvdRequestManagement";
import {DicAbsenceType} from "../../../../../cuba/entities/base/tsadv$DicAbsenceType";
import {dictionaryCollection} from "../../../../util/DictionaryDataCollectionStore";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";


@injectMainStore
@observer
class MyTeamPersonRvd extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps> {

  @observable
  dataCollection: DataCollectionStore<Absence>;

  /*  dataCollection = collection<Absence>(Absence.NAME, {
      view: "absence.view",
      sort: "-updateTs",
      filter: {
        conditions: [{
          property: "personGroup.id",
          operator: "=",
          value: this.props.personGroupId!},
        ]
      }
    });*/

  componentDidMount() {
    getCubaREST()!.query<DicAbsenceType>(DicAbsenceType.NAME, "myTeamRvdAbsenceType").then(a => {
      this.dataCollection = collection<Absence>(Absence.NAME, {
        view: "absence.view",
        sort: "-updateTs",
        filter: {
          conditions: [{
            property: 'type.id',
            operator: 'in',
            value: a.map(s => s.id) as string[],
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
        <Link
          to={
            AbsenceRvdRequestManagement.PATH + "/" + AbsenceRvdRequestManagement.NEW_SUBPATH + "/" + this.props.personGroupId
          }
          key="create"

        >
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
        {/*        <Link to={AbsenceRvdRequestManagement.PATH + "/" + AbsenceRvdRequestManagement.NEW_SUBPATH}>
          <Button buttonType={ButtonType.PRIMARY}
                  style={{margin: "0 12px 12px 0"}}>
            <span><FormattedMessage id="management.browser.create"/></span>
          </Button>
        </Link>*/}
        {
          this.dataCollection ? <DataTable
              dataCollection={this.dataCollection}
              onRowSelectionChange={selectedRowKeys => this.selectedRowKey = selectedRowKeys[0]}
              fields={this.absenceFields}
              hideSelectionColumn={true}
            />
            : null}
      </div>
    )
  }

}

export default injectIntl(MyTeamPersonRvd);
