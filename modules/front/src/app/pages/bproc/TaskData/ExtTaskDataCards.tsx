import * as React from "react";
import {inject, observer} from "mobx-react";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {observable} from "mobx";
import {Card, Table} from "antd";
import Column from "antd/es/table/Column";
import {DicHrRole} from "../../../../cuba/entities/base/tsadv$DicHrRole";
import {injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import LoadingPage from "../../LoadingPage";
import {UserExt} from "../../../../cuba/entities/base/tsadv$UserExt";
import {Candidate} from "../component/Candidate";

type TaskProps = {
  tasks: ExtTaskData[];
};

@inject("rootStore")
@injectMainStore
@observer
export class ExtTaskDataCards extends React.Component<TaskProps & MainStoreInjected> {

  state = {visible: false};

  @observable
  mainStore = this.props.mainStore!;

  render() {

    const messages = this.mainStore.messages!;

    if (!messages) return <LoadingPage/>

    const approvers = messages['bproc.participants'];

    return (
      <Card className="narrow-layout large-section section-container">
        <div
          className={"section-header-container"}>{approvers}</div>
        <Table
          dataSource={this.props.tasks}
          pagination={false}
          key="key"
          size="default" bordered={true} rowKey="id">
          <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='hrRole'/>}
                  dataIndex="hrRole"
                  key="hrRole"
                  render={(text, record, index) => {
                    return ((record as ExtTaskData).hrRole as DicHrRole).langValue;
                  }}/>
          <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='assignee'/>}
                  dataIndex="assigneeOrCandidates"
                  key="assigneeOrCandidates"
                  render={(text, record) =>
                    (<Candidate candidates={((record as ExtTaskData).assigneeOrCandidates as UserExt[] | null)}/>)
                  }/>
          <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='createTime'/>}
                  dataIndex="createTime"
                  key="createTime"
                  render={(text, record, index) => {
                    return (record as ExtTaskData).createTime;
                  }}/>
          <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='endTime'/>}
                  dataIndex="endTime"
                  key="endTime"
                  render={(text, record, index) => {
                    return (record as ExtTaskData).endTime;
                  }}/>
          <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='outcome'/>}
                  dataIndex="outcome"
                  key="outcome"
                  render={(text, record, index) => {
                    return (record as ExtTaskData).outcome;
                  }}/>
          <Column title={<Msg entityName={ExtTaskData.NAME} propertyName='comment'/>}
                  dataIndex="comment"
                  key="comment"
                  render={(text, record, index) => {
                    return (record as ExtTaskData).comment;
                  }}/>
        </Table>
      </Card>
    )
      ;
  }
}
