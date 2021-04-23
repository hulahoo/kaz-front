import * as React from "react";
import {inject, observer} from "mobx-react";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {Table} from "antd";
import Column from "antd/es/table/Column";
import {DicHrRole} from "../../../../cuba/entities/base/tsadv$DicHrRole";
import {injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {TsadvUser} from "../../../../cuba/entities/base/tsadv$UserExt";
import Candidate from "../component/Candidate";
import {injectIntl, WrappedComponentProps} from "react-intl";

type TaskProps = {
  tasks: ExtTaskData[];
};

@inject("rootStore")
@injectMainStore
@observer
class TaskDataTable extends React.Component<TaskProps & MainStoreInjected & WrappedComponentProps> {

  render() {
    return (
      <Table
        dataSource={this.props.tasks}
        pagination={false}
        key="key"
        bordered
        rowKey="id">
        <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='hrRole'/>}
                dataIndex="hrRole"
                ellipsis
                key="hrRole"
                render={(text, record) => {
                  return <div className="break-words">{(record as ExtTaskData).hrRole ? ((record as ExtTaskData).hrRole as DicHrRole).langValue : ""}</div>;
                }}/>
        <Column title={this.props.intl.formatMessage({ id: "bproc.startBproc.modal.user" })}
                dataIndex="assigneeOrCandidates"
                key="assigneeOrCandidates"
                ellipsis
                render={(text, record) =>
                  (<Candidate candidates={((record as ExtTaskData).assigneeOrCandidates as TsadvUser[] | null)}/>)
                }/>
        <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='createTime'/>}
                dataIndex="createTime"
                key="createTime"
                ellipsis
                render={(text, record, index) => {
                  return <div className="break-words">{(record as ExtTaskData).createTime}</div>;
                }}/>
        <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='endTime'/>}
                dataIndex="endTime"
                ellipsis
                key="endTime"
                render={(text, record, index) => {
                  return <div className="break-words">{(record as ExtTaskData).endTime}</div>;
                }}/>
        <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='outcome'/>}
                dataIndex="outcome"
                key="outcome"
                ellipsis
                render={(text, record, index) => {
                  const outcome = (record as ExtTaskData).outcome;
                  return outcome ? <div className="break-words">{this.props.intl.formatMessage({id: outcome!})}</div> : "";
                }}/>
        <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='comment'/>}
                dataIndex="comment"
                key="comment"
                ellipsis
                render={(text, record, index) => {
                  return <div className="break-words">{(record as ExtTaskData).comment}</div>;
                }}/>
      </Table>
    )
  }
}

export default injectIntl(TaskDataTable);
