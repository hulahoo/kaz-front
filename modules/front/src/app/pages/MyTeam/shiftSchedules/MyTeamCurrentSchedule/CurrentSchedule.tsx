import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {Icon} from "antd";
import {AssignmentSchedule} from "../../../../../cuba/entities/base/tsadv$AssignmentSchedule";
import {RootStoreProp} from "../../../../store";
import Button, {ButtonType} from "../../../../components/Button/Button";
import Page from "../../../../hoc/PageContentHoc";
import {AbsenceRequestManagement} from "../../../AbsenceRequest/AbsenceRequestManagement";
import {CurrentScheduleRequestManagement} from "../MyTeamCurrentScheduleRequest/CurrentScheduleRequestManagement";

@injectMainStore
@inject("rootStore")
@observer
class CurrentSchedule extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {
  componentDidMount(): void {
  }

  dataCollection = collection<AssignmentSchedule>(AssignmentSchedule.NAME, {
    view: "assignmentSchedule-for-my-team",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
    }
  });

  fields = [
    "schedule",

    "startDate",

    "endDate",
  ];

  render() {
    if (!this.dataCollection.items)
      return <Icon type="spin"/>;

    const buttons = [
      <Link
        to={CurrentScheduleRequestManagement.PATH + "/" + CurrentScheduleRequestManagement.NEW_SUBPATH}
        key="createCurrentScheduleRequest">
        <Button buttonType={ButtonType.PRIMARY}
                style={{margin: "0 12px 12px 0"}}>
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
        </Button>
      </Link>
    ];

    return (
      <Page>
        <div style={{marginBottom: 5}}>
          {buttons}
          <DataTable
            fields={this.fields}
            dataCollection={this.dataCollection}
            hideSelectionColumn={true}
          />
        </div>
      </Page>
    );
  }
}

export default injectIntl(CurrentSchedule);
