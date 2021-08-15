import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

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

export  type  PersonCardProps = {
  person?: PersonProfile
}

@injectMainStore
@inject("rootStore")
@observer
class PositionOverlappingRequestListComponent extends React.Component<PersonCardProps & MainStoreInjected & WrappedComponentProps & RootStoreProp>{

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
      </Link>
    ];

    return (

          <div>
            <div style={{marginBottom: 16}}>
              {buttons}
            </div>
            <DataTableFormat dataCollection={this.dataCollection}
                             hideSelectionColumn
                             canSelectRowByClick={false}
                             enableFiltersOnColumns={this.fields}
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
}

const PositionOverlappingRequestList = injectIntl(
  PositionOverlappingRequestListComponent
);

export default PositionOverlappingRequestList;
