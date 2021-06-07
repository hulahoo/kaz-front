import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {CertificateRequest} from "../../../cuba/entities/base/tsadv_CertificateRequest";
import {CertificateRequestManagement} from "./CertificateRequestManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import Button, {ButtonType} from "../../components/Button/Button";
import {Icon} from "antd";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import DataTableFormat from "../../components/DataTable/intex";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import {downloadFile} from "../../util/util";

@injectMainStore
@inject("rootStore")
@observer
class CertificateRequestListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

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

  render() {
    if (!this.dataCollection.items)
      return <Icon type="spin"/>;

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
            <DataTableFormat dataCollection={this.dataCollection}
                             hideSelectionColumn
                             canSelectRowByClick={false}
                             enableFiltersOnColumns={this.fields.filter(value => value != 'file')}
                             render={[{
                               column: this.fields[0],
                               render: (text, record) => <Link
                                 to={CertificateRequestManagement.PATH + "/" + (record as CertificateRequest).id}
                               >{text}</Link>
                             }, {
                               column: this.fields[3],
                               render: (text, record) => {
                                 const file = (record as CertificateRequest).file;
                                 if (file)
                                   return (
                                     <a onClick={() => {
                                       downloadFile((file as FileDescriptor).id,
                                         (file as FileDescriptor).name as string,
                                         (file as FileDescriptor).extension as string,
                                         "");
                                     }}>
                                       {(file as FileDescriptor).name}
                                     </a>
                                   )
                                 return (<span/>);
                               }
                             }]}
                             fields={this.fields}/>
          </div>
        </Section>
      </Page>
    );
  }
}

const CertificateRequestList = injectIntl(CertificateRequestListComponent);

export default CertificateRequestList;
