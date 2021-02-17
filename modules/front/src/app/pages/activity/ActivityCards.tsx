import * as React from "react";
import {inject, observer} from "mobx-react";
import {Icon} from "antd";
import {collection, DataTable, injectMainStore} from "@cuba-platform/react";
import {Activity} from "../../../cuba/entities/base/uactivity$Activity";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {observable} from "mobx";
import {RouteComponentProps} from "react-router-dom";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {withRouter} from "react-router";
import {WindowProperty} from "../../../cuba/entities/base/uactivity$WindowProperty";
import Button from "../../components/Button/Button";

type Prop = { type: string }

@injectMainStore
@inject("rootStore")
@observer
class ActivityCards extends React.Component<Prop & WrappedComponentProps & RootStoreProp & RouteComponentProps> {

  @observable
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

  @observable selectedRowKey: string | undefined;

  // @observable type: string | undefined;

  render() {
    const {status, items} = this.dataCollection;

    if (status === "LOADING") {
      return <Icon type="spin"/>;
    }

    const type = this.props.type;

    const find = this.selectedRowKey != null
      ? this.dataCollection.items.find(value => value.id === this.selectedRowKey) as Activity
      : null;

    const button = type === "tasks"
      ? <Button disabled={find === null}
                type={"primary"}
                style={{padding: 0}}
                onClick={() => {
                  if (find)
                    this.props.history!.push(`../${WindowProperty.link(find!.type!.windowProperty!)}/${find!.referenceId}`);
                }}>{this.props.intl.formatMessage({id: "open"})}</Button>
      : null;

    const message = this.props.intl.formatMessage({id: type});

    return (
      <Page pageName={message}>
        <Section size="large" visible={true}>
          <div>
            <div style={{marginBottom: 16}}>
              {button}
            </div>
            <DataTable fields={this.fields}
                       onRowSelectionChange={selectedRowKeys => this.selectedRowKey = selectedRowKeys[0]}
                       dataCollection={this.dataCollection}/>
          </div>
        </Section>
      </Page>
    );
  }

  componentDidMount(): void {
    this.dataCollection.load()
  }

}

export default withRouter(injectIntl(ActivityCards));