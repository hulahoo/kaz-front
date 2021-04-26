import * as React from "react";
import {injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {observer} from "mobx-react";
import {MyTeamCardProps} from "./MyTeamCard";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {observable} from "mobx";
import {AssignmentSchedule} from "../../../cuba/entities/base/tsadv$AssignmentSchedule";
import {cubaREST} from "../../store";
import {Table} from "antd";
import Column from "antd/es/table/Column";
import {ScheduleOffsetsRequest} from "../../../cuba/entities/base/tsadv_ScheduleOffsetsRequest";

@injectMainStore
@observer
class MyTeamScheduleOffsetRequestList extends React.Component<MyTeamCardProps & MainStoreInjected & WrappedComponentProps> {

  @observable
  dataCollection: ScheduleOffsetsRequest[];

  componentDidMount() {
    cubaREST.query(ScheduleOffsetsRequest.NAME, "getScheduleOffsetRequest", {
      personGroupId: this.props.personGroupId
    }).then(value => {
      this.dataCollection = value as ScheduleOffsetsRequest[];
    })
  }


  render() {
    return (
      <div>
        <Table
          dataSource={this.dataCollection != null && this.dataCollection.length > 0 ? this.dataCollection.slice() : []}
          pagination={false}
          size="default" bordered={false} rowKey="id">
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='requestNumber'/>}
                  dataIndex="requestNumber"
                  key="requestNumber"/>
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='requestDate'/>}
                  dataIndex="requestDate"
                  key="requestDate"/>
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='currentSchedule'/>}
                  dataIndex="currentSchedule._instanceName"/>
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='newSchedule'/>}
                  dataIndex="newSchedule._instanceName"/>
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='dateOfNewSchedule'/>}
                  dataIndex="dateOfNewSchedule"
                  key="dateOfNewSchedule"/>
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='dateOfStartNewSchedule'/>}
                  dataIndex="dateOfStartNewSchedule"
                  key="dateOfStartNewSchedule"/>
          <Column title={<Msg entityName={AssignmentSchedule.NAME} propertyName='status'/>}
                  dataIndex="status"
                  key="status"/>
        </Table>
      </div>
    )
  }
}

export default injectIntl(MyTeamScheduleOffsetRequestList);
