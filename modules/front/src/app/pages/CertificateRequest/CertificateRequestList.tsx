import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {collection, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";

import {CertificateRequest} from "../../../cuba/entities/base/tsadv_CertificateRequest";
import {SerializedEntity} from "@cuba-platform/rest";
import {CertificateRequestManagement} from "./CertificateRequestManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import Button, {ButtonType} from "../../components/Button/Button";
import {Icon, Modal} from "antd";
import {Table} from "antd/es";
import Column from "antd/es/table/Column";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {downloadFile} from "../../util/util";
import {InsuredPerson} from "../../../cuba/entities/base/tsadv$InsuredPerson";
import moment from "moment";
import {DEFAULT_DATE_PARSE_FORMAT} from "../../../cuba/services";
import {DEFAULT_DATE_FORMAT} from "../../components/Datepicker";

@injectMainStore
@inject("rootStore")
@observer
class CertificateRequestListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {
  componentDidMount(): void {
  }

  dataCollection = collection<CertificateRequest>(CertificateRequest.NAME, {
    view: "portal.certificateRequest-edit",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
    }
  });

  fields = [
    "requestNumber",

    "requestDate",

    "status",

    "file"
  ];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<CertificateRequest>) => {
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

  render() {
    if (!this.dataCollection.items)
      return <Icon type="spin"/>;

    const items = Array.from(this.dataCollection.items);

    const buttons = [
      <Link
        to={
          CertificateRequestManagement.PATH + "/" + CertificateRequestManagement.NEW_SUBPATH
        }
        key="create">
        <Button buttonType={ButtonType.PRIMARY}
                style={{margin: "0 12px 12px 0"}}>
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
        </Button>
      </Link>
    ];

    return (
      <Page pageName={this.props.intl.formatMessage({id: "certificateRequest"})}>
        <Section size="large">
          <div>
            <div style={{marginBottom: 16}}>
              {buttons}
            </div>
            <Table
              dataSource={items}
              rowKey={record => record.id}>
              <Column
                title={<Msg entityName={CertificateRequest.NAME} propertyName='requestNumber'/>}
                dataIndex="requestNumber"
                render={(text, record) => (
                  <Link
                    to={CertificateRequestManagement.PATH + "/" + (record as CertificateRequest).id}>
                    {(record as CertificateRequest).requestNumber}
                  </Link>
                )}
              />
              <Column
                title={<Msg entityName={CertificateRequest.NAME} propertyName='requestDate'/>}
                dataIndex="requestDate"
                render={(text, record: InsuredPerson) => (
                  (React.createElement("div", null, moment((record as CertificateRequest).requestDate!, DEFAULT_DATE_PARSE_FORMAT).format(DEFAULT_DATE_FORMAT)))
                )}
              />
              <Column
                title={<Msg entityName={CertificateRequest.NAME} propertyName='status'/>}
                dataIndex="status"
                render={(text, record) => (
                  <div>
                    {((record as CertificateRequest).status as DicRequestStatus).langValue1}
                  </div>
                )}
              />
              <Column
                title={<Msg entityName={CertificateRequest.NAME} propertyName='file'/>}
                dataIndex="file"
                render={(text, record) => {
                  const file = (record as CertificateRequest).file;
                  if (file)
                    return (
                      <a
                        onClick={() => {
                          downloadFile((file as FileDescriptor).id,
                            (file as FileDescriptor).name as string,
                            (file as FileDescriptor).extension as string,
                            "");
                        }
                        }>
                        {(file as FileDescriptor).name}
                      </a>
                    )
                  return (<span/>);
                }
                }
              />
            </Table>
          </div>
        </Section>
      </Page>
    );
  }

  getRecordById(id: string): SerializedEntity<CertificateRequest> {
    const record:
      | SerializedEntity<CertificateRequest>
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
}

const CertificateRequestList = injectIntl(CertificateRequestListComponent);

export default CertificateRequestList;
