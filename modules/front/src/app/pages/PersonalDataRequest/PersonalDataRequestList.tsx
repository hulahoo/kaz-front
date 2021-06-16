import * as React from "react";
import {observer} from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import DataTableFormat from "../../components/DataTable/intex";
import {withRouter} from "react-router";
import {BaseUuidEntity} from "../../../cuba/entities/base/sys$BaseUuidEntity";
import {PersonalDataRequestManagement} from "./PersonalDataRequestManagement";
import {PersonalDataRequest} from "../../../cuba/entities/base/tsadv$PersonalDataRequest";

export type RequiredPersonGroupProps = {
  personGroupId: string
}

@injectMainStore
@observer
class PersonalDataRequestListComponent extends React.Component<RequiredPersonGroupProps & MainStoreInjected & WrappedComponentProps & RouteComponentProps> {
  dataCollection = collection<PersonalDataRequest>(PersonalDataRequest.NAME, {
    view: "portal.my-profile",
    sort: "-updateTs",
    filter: {
      conditions: [{
        property: 'personGroup.id',
        operator: '=',
        value: this.props.personGroupId
      }]
    }
  });

  fields = [
    "requestNumber",

    "requestDate",

    "status",
  ];

  render() {

    return (
      <DataTableFormat
        dataCollection={this.dataCollection}
        fields={this.fields}
        render={[{
          column: this.fields[0],
          render: (text, record) => <Link
            to={PersonalDataRequestManagement.PATH + "/" + (record as BaseUuidEntity).id}
          >{text}</Link>
        }]}
        hideSelectionColumn={true}
      />
    );
  }

}

const PersonalDataRequestList = injectIntl(withRouter(PersonalDataRequestListComponent));

export default PersonalDataRequestList;
