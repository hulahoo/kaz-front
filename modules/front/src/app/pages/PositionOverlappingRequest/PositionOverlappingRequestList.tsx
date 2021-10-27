import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom";

import {Icon, Modal} from "antd";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {PositionOverlappingRequest} from "../../../cuba/entities/kzm$PositionOverlappingRequest";
import {SerializedEntity} from "@cuba-platform/rest";
import {PositionOverlappingRequestManagement} from "./PositionOverlappingRequestManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Button, {ButtonType} from "../../components/Button/Button";
import DataTableFormat from "../../components/DataTable/intex";
import {RootStoreProp} from "../../store";
import {PersonProfile} from "../MyTeam/MyTeamCard";
import {observable} from "mobx";
import {withRouter} from "react-router";

export  type  PersonCardProps = {
  person?: PersonProfile
}

@injectMainStore
@inject("rootStore")
@observer
class PositionOverlappingRequestListComponent extends React.Component<PersonCardProps & MainStoreInjected
  & WrappedComponentProps & RootStoreProp & RouteComponentProps>{

  person = this.props.person;

  dataCollection = collection<PositionOverlappingRequest>(
    PositionOverlappingRequest.NAME,
    { view: "positionOverlappingRequest-edit",
      sort: "-updateTs",
      filter: {
        conditions: [{property: "personGroup.id", operator: "=", value: this.person!.groupId}]
      }
  }
  );

  fields = [
    "requestNumber",

    "requestDate",

    "type",

    "status",
  ];

  @observable selectedRowKey: string | undefined;
  @observable selectedData?: SerializedEntity<PositionOverlappingRequest> | undefined;


  handleRowSelectionChange = (selectedRowKeys: string[]) => {

    this.selectedRowKey = selectedRowKeys[0];
     this.selectedData = this.getRequestById(this.selectedRowKey);
  };


  showDeletionDialog = (e: SerializedEntity<PositionOverlappingRequest>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        { id: "management.browser.delete.areYouSure" },
        { instanceName: e._instanceName }
      ),
      okText: this.props.intl.formatMessage({
        id: "management.browser.delete.ok"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "management.browser.delete.cancel"
      }),
      onOk: () => {
        return this.dataCollection.delete(e);
      }
    });
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRequestById(this.selectedRowKey!));
  };
  render() {
    if (!this.dataCollection.items)
      return <Icon type="spin"/>;

    const buttons = [
      <Link
        to={
          PositionOverlappingRequestManagement.PATH + "/"
          + PositionOverlappingRequestManagement.NEW_SUBPATH + "/"+ this.person!.groupId
        }
        key="create" >
        <Button buttonType={ButtonType.PRIMARY}
                style={{margin: "0 12px 12px 0"}}>
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
        </Button>
      </Link>,
      <Link
        to={
          PositionOverlappingRequestManagement.PATH + "/"
          + this.selectedRowKey
        }
        key="edit" >
        <Button buttonType={ButtonType.FOLLOW}
                style={{margin: "0 12px 12px 0"}}
                key="edit"
                disabled={!(this.selectedData && this.selectedData.status && this.selectedData.status.langValue3 === 'Draft')}
        >
          <FormattedMessage id="management.browser.edit"/>
        </Button>
      </Link>,
      <Button
        buttonType={ButtonType.FOLLOW}
        style={{margin: "0 12px 12px 0"}}
        disabled={!(this.selectedData && this.selectedData.status && this.selectedData.status.langValue3 === 'Draft')}
       // disabled={false}
        onClick={this.deleteSelectedRow}
        key="remove"
      >
        <FormattedMessage id="management.browser.remove"/>
      </Button>

    ];

    return (

          <div>
            <div style={{marginBottom: 16}}>
              {buttons}
            </div>
            <DataTableFormat dataCollection={this.dataCollection}
                             hideSelectionColumn
                             enableFiltersOnColumns={this.fields}
                             onRowSelectionChange={this.handleRowSelectionChange}
                             render={[{
                               column: this.fields[0],
                               render: (text, record) => <Link
                                 to={PositionOverlappingRequestManagement.PATH + "/" + (record as PositionOverlappingRequest).id}
                               >{text}</Link>
                             }]}
                             fields={this.fields}/>
          </div>

    );
  }

  getRequestById(id: string): SerializedEntity<PositionOverlappingRequest> {
    const request:
      | SerializedEntity<PositionOverlappingRequest>
      | undefined = this.dataCollection.items.find(request => request.id === id);

    if (!request) {
      throw new Error("Cannot find entity with id " + id);
    }
    return request;
  }

}

const PositionOverlappingRequestList = injectIntl(withRouter(
  PositionOverlappingRequestListComponent)
);

export default PositionOverlappingRequestList;
