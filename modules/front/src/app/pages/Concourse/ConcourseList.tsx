import * as React from "react";
import { inject, observer } from "mobx-react";
import { Link, RouteComponentProps } from "react-router-dom";
import Button, {ButtonType} from "../../components/Button/Button";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {Tabs} from "antd";
import DataTableFormat from "../../components/DataTable/intex";
import {link} from "../../util/util";
import { observable } from "mobx";

import { Modal } from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  DataTable
} from "@cuba-platform/react";

import { Concourse } from "../../../cuba/entities/base/tsadv_Concourse";
import { ConcourseRequest } from "../../../cuba/entities/base/tsadv_ConcourseRequest";
import { SerializedEntity } from "@cuba-platform/rest";
import { ConcourseManagement } from "./ConcourseManagement";
import { ConcourseRequestManagement } from "../ConcourseRequest/ConcourseRequestManagement";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";


const {TabPane} = Tabs;

type ActiveTabProps = RouteComponentProps<{ activeTab?: string }>;
interface IState {
  data: number;
}


@injectMainStore
@inject("rootStore")
@observer
class ConcourseListComponent extends React.Component<ActiveTabProps & MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps<any>, IState> {

  dataCollection = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    sort: "-updateTs",
   });

  dataCollectionConcourse = collection<Concourse>(Concourse.NAME, {
    view: "concourse-view",
    sort: "-updateTs",
   });

  dataCollectionConcourseRequest = collection<ConcourseRequest>(ConcourseRequest.NAME, {
    view: "concourseRequest-view",
    sort: "-updateTs",
  });

  concourseFields = [
    "description",
    "banner",
  ];

  bestConcourseFields = [
    "name_ru",
    "category",
    "year",
    "organizationBin",
  ]

  concourseRequestFields = [
    "requestNumber",
    "requestDate",
    "status",
  ]

  constructor(props:any) {
    super(props);
    this.state={
      data:0
    }
  }

  @observable selectedRowKey: string | undefined;

  @observable
  pageName = "concourse";

  showDeletionDialog = (e: SerializedEntity<Concourse>) => {
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
        this.selectedRowKey = undefined;

        return this.dataCollection.delete(e);
      }
    });
  };

  render() {
    const btns = [<Link
      to={ConcourseRequestManagement.PATH + "/" + ConcourseRequestManagement.NEW_SUBPATH}
      key="createConcourseRequest">
      <Button buttonType={ButtonType.PRIMARY}
              style={{margin: "0 12px 12px 0"}}>
        <span><FormattedMessage id="management.browser.create"/></span>
      </Button>
    </Link>,
    ];

    const {activeTab} = this.props.match.params;
    const defaultActiveKey = activeTab ? activeTab : "1";
    return (
      <Page pageName={this.props.intl.formatMessage({id: this.pageName})}>
        <Section size="large">
          <Tabs defaultActiveKey={defaultActiveKey}
                onChange={activeKey => this.pageName = "concourse" + (activeKey === "1" ? "" : "Request")}>
            <TabPane tab={this.props.intl.formatMessage({id: "concourse"})} key="1">
              <div>
                <div style={{marginBottom: 16}}>
                  {btns}
                </div>
                <DataTableFormat
                  dataCollection={this.dataCollection}
                  onRowSelectionChange={selectedRowKeys => this.selectedRowKey = selectedRowKeys[0]}
                  fields={this.concourseFields}
                  hideSelectionColumn={true}
                />
              </div>
            </TabPane>
            <TabPane tab={this.props.intl.formatMessage({id: "bestConcourse"})} key="3">
              <div>
                <DataTableFormat
                  dataCollection={this.dataCollectionConcourse}
                  fields={this.bestConcourseFields}
                  hideSelectionColumn={true}
                />
              </div>
            </TabPane>
            <TabPane tab={this.props.intl.formatMessage({id: "concourseRequest"})} key="4">
                <DataTableFormat
                  dataCollection={this.dataCollectionConcourseRequest}
                  fields={this.concourseRequestFields}
                  hideSelectionColumn={true}
                />
            </TabPane>
          </Tabs>
        </Section>
      </Page>
    );
  }


  getRecordById(id: string): SerializedEntity<Concourse> {
    const record:
      | SerializedEntity<Concourse>
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

const ConcourseList = injectIntl(ConcourseListComponent);

export default ConcourseList;
