import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom";

import {observable} from "mobx";

import {Tabs} from "antd";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {AbsenceRequest} from "../../../cuba/entities/base/tsadv$AbsenceRequest";
import {SerializedEntity} from "@cuba-platform/rest";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import {AbsenceRequestManagement} from "../AbsenceRequest/AbsenceRequestManagement";
import {Absence} from "../../../cuba/entities/base/tsadv$Absence";
import {LeavingVacationRequestManagement} from "../LeavingVacationRequestTest/LeavingVacationRequestManagement";

const {TabPane} = Tabs;

@injectMainStore
@inject("rootStore")
@observer
class AbsenceListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps<any>> {

  dataCollection = collection<AbsenceRequest>(AbsenceRequest.NAME, {
    view: "absenceRequest.edit",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
    }
  });

  dataCollectionAbsence = collection<Absence>(Absence.NAME, {
    view: "absence.view",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
    }
  });

  absenceRequestFields = [
    "requestNumber",

    "type",

    "dateFrom",

    "dateTo",

    "status",

    "requestDate"
  ];

  absenceFields = [
    "type",

    "dateFrom",

    "dateTo",

    "absenceDays"
  ];

  @observable selectedRowKey: string | undefined;

  lastIndex = -1;

  renderColumn = (text: string, record: AbsenceRequest, index: number) => {
    if (text === record["requestNumber"] && this.lastIndex !== index) {
      this.lastIndex = index;
      return <Link to={AbsenceRequestManagement.PATH + "/" + record.id}>
        {text}
      </Link>
    }

    return text;
  }

  @observable
  pageName = "absence";

  isCreateLeavingVacationRequestDisabled = false;

  isSelectedAbsenceTypeMaternity = (): boolean => {
    if (this.selectedRowKey === null || this.selectedRowKey === undefined) return true;
    const absence = this.getAbsenceById(this.selectedRowKey);
    return !(absence !== null && absence.type !== undefined && absence.type !== null && absence.type.code === "MATERNITY");
  }

  render() {
    this.isCreateLeavingVacationRequestDisabled = this.isSelectedAbsenceTypeMaternity();
    console.log(this.isCreateLeavingVacationRequestDisabled);
    const btns = [<Link
      to={AbsenceRequestManagement.PATH + "/" + AbsenceRequestManagement.NEW_SUBPATH}
      key="createAbsenceRequest">
      <Button buttonType={ButtonType.PRIMARY}
              style={{margin: "0 12px 12px 0"}}>
        <span><FormattedMessage id="management.browser.create"/></span>
      </Button>
    </Link>,
      <Button buttonType={ButtonType.PRIMARY}
              key={"createLeavingVacationRequest"}
              disabled={this.isCreateLeavingVacationRequestDisabled}
              onClick={() => {
                this.props.history!.push(LeavingVacationRequestManagement.PATH + "/new-" + this.selectedRowKey)
              }}
              style={{margin: "0 12px 12px 0"}}>
        <span><FormattedMessage id="create.leavingVacationRequest"/></span>
      </Button>
    ];

    return (
      <Page pageName={this.props.intl.formatMessage({id: this.pageName})}>
        <Section size="large">
          <Tabs defaultActiveKey="1"
                onChange={activeKey => this.pageName = "absence" + (activeKey === "1" ? "" : "Request")}>
            <TabPane tab={this.props.intl.formatMessage({id: "absence"})} key="1">
              <div>
                <div style={{marginBottom: 16}}>
                  {btns}
                </div>
                <DataTable
                  dataCollection={this.dataCollectionAbsence}
                  onRowSelectionChange={selectedRowKeys => this.selectedRowKey = selectedRowKeys[0]}
                  fields={this.absenceFields}
                  hideSelectionColumn={true}
                />
              </div>
            </TabPane>
            <TabPane tab={this.props.intl.formatMessage({id: "absenceRequest"})} key="2">
              <div>
                <DataTable
                  dataCollection={this.dataCollection}
                  fields={this.absenceRequestFields}
                  hideSelectionColumn={true}
                  columnProps={{
                    render: this.renderColumn
                  }}
                />
              </div>
            </TabPane>
          </Tabs>
        </Section>
      </Page>
    );
  }

  getAbsenceById(id: string): SerializedEntity<Absence> {
    const record:
      | SerializedEntity<Absence>
      | undefined = this.dataCollectionAbsence.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }
}

const AbsenceList = injectIntl(AbsenceListComponent);

export default AbsenceList;
