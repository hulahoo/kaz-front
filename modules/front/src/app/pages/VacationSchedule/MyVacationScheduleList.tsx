import * as React from "react";
import {inject, observer} from "mobx-react";
import {VacationScheduleRequest} from "../../../cuba/entities/base/tsadv_VacationScheduleRequest";
import DataTableFormat from "../../components/DataTable/intex";
import {Link} from "react-router-dom";
import {VacationScheduleRequestManagement} from "../VacationScheduleRequest/VacationScheduleRequestManagement";
import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import Button, {ButtonType} from "../../components/Button/Button";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {RootStoreProp} from "../../store";

@observer
@injectMainStore
@inject("rootStore")
class MyVacationScheduleListComponent extends React.Component<MainStoreInjected & RootStoreProp & WrappedComponentProps> {

  dataCollectionVacationSchedule = collection<VacationScheduleRequest>(VacationScheduleRequest.NAME, {
      view: "_local",
      sort: "-requestNumber",
      filter: {
        conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
      }
    }
  );

  vacationScheduleFields = [
    "requestNumber",

    "startDate",

    "endDate",

    "absenceDays",

    "assignmentSchedule",

    "approved",

    "sentToOracle"
  ];

  render() {
    return (
      <Page pageName={this.props.intl.formatMessage({id: "vacationScheduleRequest"})}>
        <Section size="large">
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
              enableFiltersOnColumns={[]}
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
        </Section>
      </Page>
    );
  }

  componentDidMount() {
    this.dataCollectionVacationSchedule.load();
  }
}

const MyVacationScheduleList = injectIntl(MyVacationScheduleListComponent);

export default MyVacationScheduleList;
