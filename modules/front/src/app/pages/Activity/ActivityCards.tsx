import * as React from "react";
import {inject, observer} from "mobx-react";
import {
  collection,
  DataTable,
  getEnumCaption,
  getPropertyInfoNN,
  injectMainStore,
  MainStoreInjected
} from "@cuba-platform/react";
import {Activity} from "../../../cuba/entities/base/uactivity$Activity";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {observable} from "mobx";
import {NavLink, RouteComponentProps} from "react-router-dom";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {withRouter} from "react-router";
import Button from "../../components/Button/Button";
import {link} from "../../util/util";
import {DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS, format} from "../../util/Date/Date";

type Prop = { type: "tasks" | "notifications" }

@injectMainStore
@inject("rootStore")
@observer
class ActivityCards extends React.Component<Prop & WrappedComponentProps & RootStoreProp & RouteComponentProps & MainStoreInjected> {

  dataCollection = collection<Activity>(Activity.NAME, {
    view: "portal-activity",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "assignedUser.id", operator: "=", value: this.props.rootStore!.userInfo.id!},
        {
          property: "type.code",
          operator: (this.props.type === "tasks" ? "<>" : "="),
          value: "NOTIFICATION"
        }]
    }
  });

  language = this.props.rootStore!.userInfo.language as String;

  fields = [
    "createTs",
    "name" + this.language.charAt(0).toUpperCase() + this.language.slice(1),
    "status"
  ];

  @observable
  selectedRowKey: string | undefined;

  render() {
    const type = this.props.type;
    const message = this.props.intl.formatMessage({id: type});

    let columnIndex = 0;
    return (
      <Page pageName={message}>
        <Section size="large" visible={true}>
          <div>
            <DataTable fields={this.fields}
                       rowSelectionMode="none"
                       columnProps={{
                         render: ((text, record, index) => {
                           if (columnIndex === 1) {
                             columnIndex = -1;
                             if (record.type!.code !== 'NOTIFICATION')
                             return <NavLink
                               to={`..${link(record!.type!.windowProperty!.entityName!)}/${record!.referenceId}`}>{text}</NavLink>;
                             else {
                               return <NavLink
                                 to={`${record!.id}`}>{text}</NavLink>;
                             }
                           } else if (columnIndex === 0) {
                             columnIndex++;
                             return format(new Date(text), DEFAULT_DATE_TIME_PATTERN_WITHOUT_SECONDS);
                           }
                           columnIndex++;
                           return getEnumCaption(record.status, getPropertyInfoNN("status", Activity.NAME, this.props.mainStore!.metadata!), this.props.mainStore!.enums!);
                         })
                       }}
                       dataCollection={this.dataCollection}/>
          </div>
        </Section>
      </Page>
    );
  }
}

const component = injectIntl(ActivityCards);
export default withRouter(component);