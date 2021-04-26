import * as React from "react";
import {MyTeamCardProps} from "./MyTeamCard";
import {injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {cubaREST} from "../../store";
import {AssignmentSchedule} from "../../../cuba/entities/base/tsadv$AssignmentSchedule";
import {Button, Table} from "antd";
import Column from "antd/es/table/Column";
import {Link} from "react-router-dom";
import {ScheduleOffsetsRequestManagement} from "../ScheduleOffsetsRequest/ScheduleOffsetsRequestManagement";

@injectMainStore
@observer
class AssignmentScheduleStandard extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps> {

  @observable
  dataCollection: AssignmentSchedule[];


  componentDidMount() {
    cubaREST.query(AssignmentSchedule.NAME, "getAssignmentSchedule", {
      personGroupId: this.props.personGroupId
    }).then(value => {
      this.dataCollection = value as AssignmentSchedule[];
    })
  }

  render() {
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
          <Button
            htmlType="button"
            style={{margin: "0 12px 12px 0"}}
            type="primary"
            icon="plus"
          >
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
          </Button>
        </Link>
        <Table
          dataSource={this.dataCollection != null && this.dataCollection.length > 0 ? this.dataCollection.slice() : []}
          pagination={false}
          size="default" bordered={false} rowKey="id">
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='schedule'/>}
                  dataIndex="schedule._instanceName"
                  key="schedule"/>
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='startDate'/>}
                  dataIndex="startDate"
                  key="startDate"/>
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='endDate'/>}
                  dataIndex="endDate"
                  key="endDate"/>
        </Table>
      </div>
    )
  }
}

export default injectIntl(AssignmentScheduleStandard);
