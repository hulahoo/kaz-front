import * as React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { observable } from "mobx";

import { Button } from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
} from "@cuba-platform/react";

import { PunishmentRequest } from "../../../../cuba/entities/base/tsadv$PunishmentRequest";
import { PunishmentAssignmentRequestManagement } from "./punishmentAssignmentRequest/PunishmentAssignmentRequestManagement";
import { PunishmentRemovalRequestManagement } from "./punishmentRemovalRequest/punishmentRemovalRequestManagement";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import {MyTeamCardProps} from "../MyTeamCard";
import DataTableFormat from "../../../components/DataTable/intex";
import {PunishmentRequestType} from "../../../../cuba/enums/enums";

@injectMainStore
@observer
class PunishmentRequestListComponent extends React.Component<
  MainStoreInjected & WrappedComponentProps & MyTeamCardProps
> {
  dataCollection = collection<PunishmentRequest>(PunishmentRequest.NAME, {
    view: "punishmentRequest-view",
    sort: "-updateTs",
    filter: {
      conditions: [
        {
          property: "personGroup.id",
          operator: "=",
          value: this.props.personGroupId!
        },
      ],
    },
  });

  fields = [
    "requestNumber",
    "requestDate",
    "requestType",
    "status",
  ];

  @observable selectedRowKey: string | undefined;

  render() {
    const buttons = [
      <Link
        to={
          PunishmentAssignmentRequestManagement.PATH + "/" + PunishmentAssignmentRequestManagement.NEW_SUBPATH + "/" + this.props.personGroupId
        }
        key="create">
        <Button
          htmlType="button"
          style={{margin: "0 12px 12px 0"}}
          type="primary"
        >
          <span>
            <FormattedMessage id="punishmentRequest.create"/>
          </span>
        </Button>
      </Link>,

      <Link
        to={PunishmentRemovalRequestManagement.PATH + "/" + PunishmentAssignmentRequestManagement.NEW_SUBPATH + "/" + this.props.personGroupId}
        key="edit"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          type="primary"
        >
          <FormattedMessage id="punishmentDismiss" />
        </Button>
      </Link>
    ];

    return <DataTableFormat
      dataCollection={this.dataCollection}
      fields={this.fields}
      hideSelectionColumn={true}
      buttons={buttons}
      render={[{
        column: 'requestType',
        render: (text, record) => record.requestType ?
          (record.requestType==PunishmentRequestType.ASSIGNMENT ? <FormattedMessage id="punishmentRequest.assignment"/> :
            <FormattedMessage id="punishmentRequest.removal"/>) : ""
        },
        {
          column: 'requestNumber',
          render: (text, record) => (
            record.requestType==PunishmentRequestType.ASSIGNMENT ? (
                record.requestNumber ?
                <Link to={PunishmentAssignmentRequestManagement.PATH + "/" + record.id }>{text}</Link> : ''
            ) : (
                record.requestNumber ?
                <Link to={PunishmentRemovalRequestManagement.PATH + "/" + record.id }>{text}</Link> : ''
            )
          )
        }
      ]}
    />
  }
}

const PunishmentRequestList = injectIntl(PunishmentRequestListComponent);

export default PunishmentRequestList;
