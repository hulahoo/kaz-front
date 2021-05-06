import * as React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Modal, Button} from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  DataTable, getCubaREST
} from "@cuba-platform/react";

import {AbsenceRvdRequest} from "../../../../../cuba/entities/base/tsadv_AbsenceRvdRequest";
import {SerializedEntity} from "@cuba-platform/rest";
import {AbsenceRvdRequestManagement} from "./AbsenceRvdRequestManagement";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import {MyTeamCardProps} from "../../MyTeamCard";
import moment from "moment";
import {DEFAULT_DATE_PARSE_FORMAT} from "../../../../../cuba/services";
import {DEFAULT_DATE_PATTERN} from "../../../../util/Date/Date";
import {DicAbsenceType} from "../../../../../cuba/entities/base/tsadv$DicAbsenceType";
import {Absence} from "../../../../../cuba/entities/base/tsadv$Absence";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import {dictionaryCollection} from "../../../../util/DictionaryDataCollectionStore";

@injectMainStore
@observer
class AbsenceRvdRequestListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & MyTeamCardProps> {

  /*  dataCollection = collection<AbsenceRvdRequest>(AbsenceRvdRequest.NAME, {
      view: "absenceRvdRequest.edit",
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
    });*/

  @observable
  dataCollection: DataCollectionStore<Absence>;

  fields = [

    "requestNumber",

    "requestDate",

    "status",

    "personGroup",

    "type",

    "purpose",

    "timeOfStarting",

    "timeOfFinishing",

    "totalHours",

    "compencation",

    "vacationDay",

    "agree",

  ];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<AbsenceRvdRequest>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        {id: "management.browser.delete.areYouSure"},
        {instanceName: e._instanceName}
      ),
      okText: this.props.intl.formatMessage({
        id: "management.browser.delete.ok"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "management.browser.delete.cancel"
      }),
      onOk: () => {
        this.selectedRowKey = undefined;

        return this.dataCollection.delete(e);
      }
    });
  };

  componentDidMount() {
    getCubaREST()!.query<DicAbsenceType>(DicAbsenceType.NAME, "myTeamRvdAbsenceType").then(a => {
      this.dataCollection = collection<AbsenceRvdRequest>(AbsenceRvdRequest.NAME, {
        view: 'absenceRvdRequest.edit',
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

/*  componentDidMount() {
    getCubaREST()!.query<DicAbsenceType>(DicAbsenceType.NAME, "myTeamRvdAbsenceType").then(a => {
      this.dataCollection = collection<AbsenceRvdRequest>(AbsenceRvdRequest.NAME, {
        view: 'absenceRvdRequest.edit',
        sort: "-updateTs",
        filter: {
          conditions: [{
            group: "AND",
            conditions: [
              {
                property: 'workOnWeekend',
                operator: '=',
                value: 'TRUE'
              },
              {
                property: "personGroup.id",
                operator: "=",
                value: this.props.personGroupId!
              },
            ]
          }]
        }
      });
    });
}*/

  render() {
    const buttons = [
      <Link
        to={
          AbsenceRvdRequestManagement.PATH +
          "/" +
          AbsenceRvdRequestManagement.NEW_SUBPATH
        }
        key="create"
      >
        <Button
          htmlType="button"
          style={{margin: "0 12px 12px 0"}}
          type="primary"
          icon="plus"
        >
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
        </Button>
      </Link>,
      <Link
        to={AbsenceRvdRequestManagement.PATH + "/" + this.selectedRowKey}
        key="edit"
      >
        <Button
          htmlType="button"
          style={{margin: "0 12px 12px 0"}}
          disabled={!this.selectedRowKey}
          type="default"
        >
          <FormattedMessage id="management.browser.edit"/>
        </Button>
      </Link>,
      <Button
        htmlType="button"
        style={{margin: "0 12px 12px 0"}}
        disabled={!this.selectedRowKey}
        onClick={this.deleteSelectedRow}
        key="remove"
        type="default"
      >
        <FormattedMessage id="management.browser.remove"/>
      </Button>
    ];

    return (
  /*    <DataTable
        dataCollection={this.dataCollection}
        fields={this.fields}
        onRowSelectionChange={this.handleRowSelectionChange}
        hideSelectionColumn={true}
        columnProps={{
          render: this.renderLinkColumn
        }}
      />*/
    <div>
      {
        this.dataCollection ? <DataTable
            dataCollection={this.dataCollection}
            onRowSelectionChange={selectedRowKeys => this.selectedRowKey = selectedRowKeys[0]}
            fields={this.fields}
            hideSelectionColumn={true}
            columnProps={{
              render: this.renderLinkColumn
            }}
          />
          : null
      }
    </div>
  )
    ;
  }

  getRecordById(id: string): SerializedEntity<AbsenceRvdRequest> {
    const record:
      | SerializedEntity<AbsenceRvdRequest>
      | undefined = this.dataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowKey!));
  };

  lastIndex = 0;
  renderLinkColumn = (text: string, record: AbsenceRvdRequest, index: number) => {
    if (this.lastIndex === 0) {
      this.lastIndex++;
      return <Link to={AbsenceRvdRequestManagement.PATH + "/" + record.id}>
        {text}
      </Link>
    } else if (this.lastIndex === 1) {
      this.lastIndex++;
      return React.createElement("div", null, moment((record as AbsenceRvdRequest).requestDate!, DEFAULT_DATE_PARSE_FORMAT).format(DEFAULT_DATE_PATTERN));
    }
    if (this.lastIndex === this.fields.length - 1) {
      this.lastIndex = 0;
    } else {
      this.lastIndex++;
    }
    return text;
  };
}

const AbsenceRvdRequestList = injectIntl(AbsenceRvdRequestListComponent);

export default AbsenceRvdRequestList;
