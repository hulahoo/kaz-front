import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom";

import {observable} from "mobx";

import {Tabs} from "antd";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {SerializedEntity} from "@cuba-platform/rest";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import {AbsenceRequestManagement} from "../AbsenceRequest/AbsenceRequestManagement";
import {Absence} from "../../../cuba/entities/base/tsadv$Absence";
import {LeavingVacationRequestManagement} from "../LeavingVacationRequest/LeavingVacationRequestManagement";
import {AllAbsenceRequest} from "../../../cuba/entities/base/tsadv_AllAbsenceRequest";
import {link} from "../../util/util";
import {VacationScheduleRequestManagement} from "../VacationScheduleRequest/VacationScheduleRequestManagement";
import {VacationScheduleRequest} from "../../../cuba/entities/base/tsadv_VacationScheduleRequest";
import DataTableFormat from "../../components/DataTable/intex";

const {TabPane} = Tabs;

type ActiveTabProps = RouteComponentProps<{ activeTab?: string }>;

@injectMainStore
@inject("rootStore")
@observer
class AbsenceListComponent extends React.Component<ActiveTabProps & MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps<any>> {

  dataCollection = collection<AllAbsenceRequest>(AllAbsenceRequest.NAME, {
    view: "allAbsenceRequest-view",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
    }
  });

  dataCollectionVacationSchedule = collection<VacationScheduleRequest>(VacationScheduleRequest.NAME, {
      view: "_local",
      sort: "-updateTs",
      filter: {
        conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
      }
    }
  );

  dataCollectionAbsence = collection<Absence>(Absence.NAME, {
    view: "absence.view",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
    }
  });

  absenceFields = [
    "type",

    "dateFrom",

    "dateTo",

    "absenceDays"
  ];

  vacationScheduleFields = [
    "requestNumber",

    "startDate",

    "endDate",

    "absenceDays"
  ];

  absenceRequestFields = [
    "requestNumber",

    "type",

    "startDate",

    "endDate",

    "status",

    "requestDate"
  ];

  @observable selectedRowKey: string | undefined;

  @observable
  pageName = "absence";

  isCreateLeavingVacationRequestDisabled = false;

  isSelectedAbsenceTypeMaternity = (): boolean => {
    if (this.selectedRowKey === null || this.selectedRowKey === undefined) return true;
    const absence = this.getAbsenceById(this.selectedRowKey);
    return !(absence !== null && absence.type !== undefined && absence.type !== null && absence.type.availableForLeavingVacation);
  }

  render() {
    this.isCreateLeavingVacationRequestDisabled = this.isSelectedAbsenceTypeMaternity();
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

    const {activeTab} = this.props.match.params;
    const defaultActiveKey = activeTab ? activeTab : "1";

    return (
      <Page pageName={this.props.intl.formatMessage({id: this.pageName})}>
        <Section size="large">
          <Tabs defaultActiveKey={defaultActiveKey}
                onChange={activeKey => this.pageName = "absence" + (activeKey === "1" ? "" : "Request")}>
            <TabPane tab={this.props.intl.formatMessage({id: "absence"})} key="1">
              <div>
                <div style={{marginBottom: 16}}>
                  {btns}
                </div>
                <DataTableFormat
                  dataCollection={this.dataCollectionAbsence}
                  onRowSelectionChange={selectedRowKeys => this.selectedRowKey = selectedRowKeys[0]}
                  fields={this.absenceFields}
                  hideSelectionColumn={true}
                />
              </div>
            </TabPane>
            <TabPane tab={this.props.intl.formatMessage({id: "vacationScheduleRequest"})} key="2">
              <div>
                <div style={{marginBottom: 16}}>
                  <Link
                    to={VacationScheduleRequestManagement.PATH + "/" + VacationScheduleRequestManagement.NEW_SUBPATH}>
                    <Button type={ButtonType.PRIMARY}
                            key="vacationScheduleRequestCreateBtn"
                            style={{margin: "0 12px 12px 0"}}>
                      <span><FormattedMessage id="new.request"/></span>
                    </Button>
                  </Link>
                </div>
                <DataTableFormat
                  dataCollection={this.dataCollectionVacationSchedule}
                  fields={this.vacationScheduleFields}
                  hideSelectionColumn={true}
                  render={[{
                    column: this.vacationScheduleFields[0],
                    render: (text, record) => {
                      return <Link to={VacationScheduleRequestManagement.PATH + "/" + record.id}>
                        {text}
                      </Link>
                    }
                  }]}
                />
              </div>
            </TabPane>
            <TabPane tab={this.props.intl.formatMessage({id: "absenceRequest"})} key="3">
              <div>
                <DataTableFormat
                  dataCollection={this.dataCollection}
                  fields={this.absenceRequestFields}
                  hideSelectionColumn={true}
                  render={[{
                    column: this.absenceRequestFields[0],
                    render: (text, record) => {
                      return <Link to={link(record.entityName!) + "/" + record.id}>
                        {text}
                      </Link>
                    }
                  }]}
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