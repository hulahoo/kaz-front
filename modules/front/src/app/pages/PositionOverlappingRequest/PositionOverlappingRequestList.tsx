import * as React from "react";
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";

import { Modal, List, Icon, Spin } from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  EntityProperty
} from "@cuba-platform/react";

import { PositionOverlappingRequest } from "../../../cuba/entities/kzm$PositionOverlappingRequest";
import { SerializedEntity } from "@cuba-platform/rest";
import { PositionOverlappingRequestManagement } from "./PositionOverlappingRequestManagement";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import {CertificateRequestManagement} from "../CertificateRequest/CertificateRequestManagement";
import Button, {ButtonType} from "../../components/Button/Button";
import Section from "../../hoc/Section";
import DataTableFormat from "../../components/DataTable/intex";
import {CertificateRequest} from "../../../cuba/entities/base/tsadv_CertificateRequest";
import {downloadFile} from "../../util/util";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import Page from "../../hoc/PageContentHoc";

@injectMainStore
@inject("rootStore")
@observer
class PositionOverlappingRequestListComponent extends React.Component<
  MainStoreInjected & WrappedComponentProps
> {
  dataCollection = collection<PositionOverlappingRequest>(
    PositionOverlappingRequest.NAME,
    { view: "positionOverlappingRequest-edit", sort: "-updateTs" }
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
          PositionOverlappingRequestManagement.PATH + "/" + PositionOverlappingRequestManagement.NEW_SUBPATH
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
      <Page pageName={this.props.intl.formatMessage({id: "positionOverlappingRequest"})}>
        <Section size="large">
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
        </Section>
      </Page>
    );
  }
}

const PositionOverlappingRequestList = injectIntl(
  PositionOverlappingRequestListComponent
);

export default PositionOverlappingRequestList;
