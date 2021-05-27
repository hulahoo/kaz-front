import * as React from "react";
import {observer} from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import DataTableFormat from "../../components/DataTable/intex";
import {AddressRequest} from "../../../cuba/entities/base/tsadv$AddressRequest";
import {withRouter} from "react-router";
import {AddressRequestManagement} from "./AddressRequestManagement";
import {BaseUuidEntity} from "../../../cuba/entities/base/sys$BaseUuidEntity";

export type RequiredPersonGroupProps = {
  personGroupId: string
}

@injectMainStore
@observer
class AddressRequestListComponent extends React.Component<RequiredPersonGroupProps & MainStoreInjected & WrappedComponentProps & RouteComponentProps> {
  dataCollection = collection<AddressRequest>(AddressRequest.NAME, {
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

    "addressType",

    "postalCode",

    "country",

    "kato",

    "streetType",
  ];

  render() {

    return (
      <DataTableFormat
        dataCollection={this.dataCollection}
        fields={this.fields}
        render={[{
          column: this.fields[0],
          render: (text, record) => <Link
            to={AddressRequestManagement.PATH + "/" + (record as BaseUuidEntity).id}
          >{text}</Link>
        }]}
        hideSelectionColumn={true}
      />
    );
  }

}

const AddressList = injectIntl(withRouter(AddressRequestListComponent));

export default AddressList;
