import * as React from "react";
import {observer} from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import DataTableFormat from "../../components/DataTable/intex";
import {withRouter} from "react-router";
import {BaseUuidEntity} from "../../../cuba/entities/base/sys$BaseUuidEntity";
import {PersonDocumentManagement} from "../PersonDocument/PersonDocumentManagement";
import {PersonDocumentRequest} from "../../../cuba/entities/base/tsadv_PersonDocumentRequest";

export type RequiredPersonGroupProps = {
  personGroupId: string
}

@injectMainStore
@observer
class PersonDocumentRequestListComponent extends React.Component<RequiredPersonGroupProps & MainStoreInjected & WrappedComponentProps & RouteComponentProps> {
  dataCollection = collection<PersonDocumentRequest>(PersonDocumentRequest.NAME, {
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

    "documentType",

    "documentNumber",

    "issueDate",

    "expiredDate",

    "issuingAuthority",
  ];

  render() {

    return (
      <DataTableFormat
        dataCollection={this.dataCollection}
        fields={this.fields}
        render={[{
          column: this.fields[0],
          render: (text, record) => <Link
            to={PersonDocumentManagement.PATH + "/" + (record as BaseUuidEntity).id}
          >{text}</Link>
        }]}
        hideSelectionColumn={true}
      />
    );
  }

}

const PersonDocumentRequestList = injectIntl(withRouter(PersonDocumentRequestListComponent));

export default PersonDocumentRequestList;
