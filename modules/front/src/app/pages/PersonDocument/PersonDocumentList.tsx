import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom";

import {observable} from "mobx";

import {collection, DataTable, getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {PersonDocument} from "../../../cuba/entities/base/tsadv$PersonDocument";
import {PersonDocumentManagement} from "./PersonDocumentManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Button, {ButtonType} from "../../components/Button/Button";
import {RootStoreProp} from "../../store";
import {PersonDocumentRequestManagement} from "../PersonDocumentRequest/PersonDocumentRequestManagement";
import {PersonDocumentRequest} from "../../../cuba/entities/base/tsadv_PersonDocumentRequest";
import {withRouter} from "react-router";
import DataTableFormat from "../../components/DataTable/intex";

@injectMainStore
@inject("rootStore")
@observer
class PersonDocumentListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps> {
  dataCollection = collection<PersonDocument>(PersonDocument.NAME, {
    view: "portal.my-profile",
    sort: "-updateTs",
    filter: {
      conditions: [{
        property: "personGroup.id",
        operator: "=",
        value: this.props.rootStore!.userInfo.personGroupId!
      }]
    }
  });

  fields = [
    "documentType",

    "expiredDate",

    "documentNumber",

    "issueDate",

    "issuingAuthority"
  ];

  @observable selectedRowKey: string | undefined;

  render() {
    const buttons = [
      <Link
        to={
          PersonDocumentRequestManagement.PATH +
          "/" +
          PersonDocumentManagement.NEW_SUBPATH
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
      <Button buttonType={ButtonType.FOLLOW}
              style={{margin: "0 12px 12px 0"}}
              key="edit"
              onClick={this.openEditRequest}
              disabled={!this.selectedRowKey}
      >
        <FormattedMessage id="management.browser.edit"/>
      </Button>
    ];

    return (
      <DataTableFormat
        dataCollection={this.dataCollection}
        fields={this.fields}
        onRowSelectionChange={this.handleRowSelectionChange}
        hideSelectionColumn={true}
        buttons={buttons}
      />
    );
  }

  openEditRequest = () => {
    this.getRequestId()
      .then(value => this.props.history!.push(PersonDocumentRequestManagement.PATH + '/' + value));
  }
  getRequestId = (): Promise<string> => {
    return getCubaREST()!.searchEntities<PersonDocumentRequest>(PersonDocumentRequest.NAME, {
      conditions: [{
        property: 'editedPersonDocument.id',
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
        return PersonDocumentRequestManagement.NEW_SUBPATH + '/' + this.selectedRowKey!;
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

const PersonDocumentList = injectIntl(withRouter(PersonDocumentListComponent));

export default PersonDocumentList;