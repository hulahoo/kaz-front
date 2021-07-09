import * as React from "react";
import {inject, observer} from "mobx-react";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {PersonPayslip} from "../../../cuba/entities/base/tsadv_PersonPayslip";
import {injectIntl, WrappedComponentProps} from "react-intl";
import DataTableFormat from "../../components/DataTable/intex";
import {downloadFile} from "../../util/util";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";

@injectMainStore
@inject("rootStore")
@observer
class PersonPayslipListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {
  dataCollection = collection<PersonPayslip>(PersonPayslip.NAME, {
    filter: {
      conditions: [{
        property: 'personGroup.id',
        operator: '=',
        value: this.props.rootStore!.userInfo!.personGroupId!
      }]
    },
    view: "portal.personPayslip-list",
    sort: "-period"
  });

  fields = ["period", "file"];

  render() {
    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.personPayslip"})}>
        <Section size="large">
          <DataTableFormat
            dataCollection={this.dataCollection}
            fields={this.fields}
            hideSelectionColumn={true}
            render={[{
              column: 'file',
              render: (text, record) => {
                const file = (record as PersonPayslip).file;
                if (file)
                  return (
                    <a onClick={() => {
                      downloadFile((file as FileDescriptor).id,
                        (file as FileDescriptor).name as string,
                        (file as FileDescriptor).extension as string,
                        this.props.intl.formatMessage({id: "file.download.error"}));
                    }}>
                      {(file as FileDescriptor).name}
                    </a>
                  )
                return (<span/>);
              }
            }]}
          />
        </Section>
      </Page>
    );
  }
}

const PersonPayslipList = injectIntl(PersonPayslipListComponent);

export default PersonPayslipList;
