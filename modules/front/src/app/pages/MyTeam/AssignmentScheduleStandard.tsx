import * as React from "react";
import {MyTeamCardProps} from "./MyTeamCard";
import {collection, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {cubaREST} from "../../store";
import {AssignmentSchedule} from "../../../cuba/entities/base/tsadv$AssignmentSchedule";
import {Table} from "antd";
import Column from "antd/es/table/Column";
import {Link} from "react-router-dom";
import {ScheduleOffsetsRequestManagement} from "../ScheduleOffsetsRequest/ScheduleOffsetsRequestManagement";
import Button, {ButtonType} from "../../components/Button/Button";
import {DEFAULT_DATE_PATTERN, JSON_DATE_TIME_FORMAT} from "../../util/Date/Date";
import moment from "moment";
import DataTableFormat from "../../components/DataTable/intex";
import {ScheduleOffsetsRequest} from "../../../cuba/entities/base/tsadv_ScheduleOffsetsRequest";
import {AssignmentExt} from "../../../cuba/entities/base/base$AssignmentExt";
import {now} from "moment/moment";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import LoadingPage from "../LoadingPage";

@injectMainStore
@observer
class AssignmentScheduleStandard extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps> {

  @observable
  dataCollection: DataCollectionStore<AssignmentSchedule>;

  assignment: AssignmentExt;

  fields = [
    "schedule",

    "startDate",

    "endDate",
  ];

  componentDidMount() {
    (async () => {
      await cubaREST.searchEntities<AssignmentExt>(AssignmentExt.NAME, {
        conditions: [{
          property: 'personGroup',
          operator: '=',
          value: this.props.personGroupId
        }, {
          property: 'startDate',
          operator: '<=',
          value: moment().format(JSON_DATE_TIME_FORMAT)
        }, {
          property: 'endDate',
          operator: '>=',
          value: moment().format(JSON_DATE_TIME_FORMAT)
        }]
      }, {
        limit: 1,
        view: 'portal-assignment-group'
      }).then(value => value[0])
        .then(value => this.assignment = value);

      this.dataCollection = collection<AssignmentSchedule>(
        AssignmentSchedule.NAME,
        {
          filter: {
            conditions: [{
              property: 'assignmentGroup',
              operator: '=',
              value: this.assignment.group!.id
            }]
          },
          view: "assignmentSchedule-for-my-team",
          sort: "-startDate"
        }
      );

    })();
  }

  render() {
    if (!this.dataCollection)
      return <LoadingPage/>
    return (
      <div>
        <Link
          to={
            ScheduleOffsetsRequestManagement.PATH +
            "/" +
            ScheduleOffsetsRequestManagement.NEW_SUBPATH + "/" + this.props.personGroupId
          }
          key="create"
        >
          <Button buttonType={ButtonType.PRIMARY}>
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
          </Button>
        </Link>

        <DataTableFormat hideSelectionColumn={true} dataCollection={this.dataCollection} fields={this.fields}/>
      </div>
    )
  }
}

export default injectIntl(AssignmentScheduleStandard);
