import * as React from "react";
import {getEnumCaption, getPropertyInfoNN, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {observer} from "mobx-react";
import {MyTeamCardProps} from "./MyTeamCard";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {observable} from "mobx";
import {AssignmentSchedule} from "../../../cuba/entities/base/tsadv$AssignmentSchedule";
import {cubaREST} from "../../store";
import {Table} from "antd";
import Column from "antd/es/table/Column";
import {ScheduleOffsetsRequest} from "../../../cuba/entities/base/tsadv_ScheduleOffsetsRequest";
import moment from "moment";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";
import {Link} from "react-router-dom";
import {ScheduleOffsetsRequestManagement} from "../ScheduleOffsetsRequest/ScheduleOffsetsRequestManagement";
import {AssignedPerformancePlan} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {SerializedEntity} from "@cuba-platform/rest";

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
          <Column title={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName='requestNumber'/>}
                  dataIndex="requestNumber"
                  render={(text, record: ScheduleOffsetsRequest) => {
                    if (text) {
                      return <Link to={ScheduleOffsetsRequestManagement.PATH + "/" + record.id} children={text}/>;
                    }
                    return text;
                  }}
                  key="requestNumber"/>
          <Column title={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName='requestDate'/>}
                  dataIndex="requestDate"
                  render={text => {
                    if (text) {
                      return moment(text).format(DEFAULT_DATE_PATTERN);
                    }
                    return text;
                  }}
                  key="requestDate"/>
          <Column title={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName='currentSchedule'/>}
                  dataIndex="currentSchedule._instanceName"/>
          <Column title={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName='newSchedule'/>}
                  dataIndex="newSchedule._instanceName"/>
          <Column title={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName='dateOfNewSchedule'/>}
                  dataIndex="dateOfNewSchedule"
                  render={text => {
                    if (text) {
                      return moment(text).format(DEFAULT_DATE_PATTERN);
                    }
                    return text;
                  }}
                  key="dateOfNewSchedule"/>
          <Column title={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName='dateOfStartNewSchedule'/>}
                  dataIndex="dateOfStartNewSchedule"
                  render={text => {
                    if (text) {
                      return moment(text).format(DEFAULT_DATE_PATTERN);
                    }
                    return text;
                  }}
                  key="dateOfStartNewSchedule"/>
          <Column title={<Msg entityName={ScheduleOffsetsRequest.NAME} propertyName='status'/>}
                  dataIndex="status"
                  render={(text, record: ScheduleOffsetsRequest) => {
                    if (text) {
                      return (record.status as SerializedEntity<DicRequestStatus>)._instanceName;
                    }
                    return text;
                  }}
                  key="status"/>
        </Table>
      </div>
    )
  }
}

export default injectIntl(MyTeamScheduleOffsetRequestList);
