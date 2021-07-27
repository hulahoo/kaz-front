import * as React from "react";
import {observer} from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom";

import {observable} from "mobx";

import {collection, getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {AddressRequestManagement} from "../AddressRequest/AddressRequestManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {Address} from "../../../cuba/entities/base/tsadv$Address";
import DataTableFormat from "../../components/DataTable/intex";
import {withRouter} from "react-router";
import {AddressRequest} from "../../../cuba/entities/base/tsadv$AddressRequest";
import Button, {ButtonType} from "../../components/Button/Button";

export type AddressListProps = {
  personGroupId: string
}

@injectMainStore
@observer
class AddressListComponent extends React.Component<AddressListProps & MainStoreInjected & WrappedComponentProps & RouteComponentProps> {
  dataCollection = collection<Address>(Address.NAME, {
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
    "addressType",

    "postalCode",

    "country",

    "kato",

    "streetType",

    "startDate",

    "endDate",
  ];

  @observable selectedRowKey: string | undefined;

  render() {
    const buttons = [
      <Link
        to={
          AddressRequestManagement.PATH +
          "/" +
          AddressRequestManagement.NEW_SUBPATH
        }
        key="create"
      >
        <Button buttonType={ButtonType.PRIMARY}
                style={{margin: "0 12px 12px 0"}}
                key="createBtn"
        >
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
        </Button>
      </Link>,
      <Button
        buttonType={ButtonType.FOLLOW}
        style={{margin: "0 12px 12px 0"}}
        disabled={!this.selectedRowKey}
        onClick={this.openRequest}
        key="editBtn"
      >
        <FormattedMessage id="management.browser.edit"/>
      </Button>
    ];

    return (
      <DataTableFormat
        dataCollection={this.dataCollection}
        enableFiltersOnColumns={[]}
        fields={this.fields}
        onRowSelectionChange={this.handleRowSelectionChange}
        hideSelectionColumn={true}
        buttons={buttons}
      />
    );
  }

  openRequest = () => {
    this.getRequestId()
      .then(value => this.props.history!.push(AddressRequestManagement.PATH + '/' + value));
  }

  getRequestId = (): Promise<string> => {
    if (!this.selectedRowKey) return new Promise<string>(resolve => resolve(AddressRequestManagement.NEW_SUBPATH));
    return getCubaREST()!.searchEntities<AddressRequest>(AddressRequest.NAME, {
      conditions: [{
        property: 'baseAddress.id',
        operator: '=',
        value: this.selectedRowKey!
      }, {
        property: 'status.code',
        operator: 'in',
        value: ['DRAFT', 'APPROVING']
      }]
    }, {
      view: 'portal.my-profile'
    }).then(values => {
      if (!values || values.length === 0) {
        return AddressRequestManagement.NEW_SUBPATH + '/' + this.selectedRowKey!;
      } else {
        const approvingRequest = values.find(value => value!.status!.code === 'APPROVING');
        return approvingRequest ? approvingRequest.id : values[0].id;
      }
    });
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

}

const AddressList = injectIntl(withRouter(AddressListComponent));

export default AddressList;
