import React from "react";
import {Msg} from "@cuba-platform/react";
import {UserExt} from "../../../../cuba/entities/base/tsadv$UserExt";
import {Modal, Table} from "antd";
import Column from "antd/es/table/Column";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {observer} from "mobx-react";

type Candidates = {
  candidates: UserExt[] | null;
}

@observer
export class Candidate extends React.Component<Candidates> {

  showModal = (candidates: UserExt[], title: any) => {
    Modal.info({
      title: 'title',
      content: (
        <Table dataSource={candidates}
               showHeader={false}
               rowKey={record => record.id}
               pagination={false}>
          <Column key='id' render={(text, record) => (record as UserExt).fullNameWithLogin}/>
        </Table>
      )
    });
  };

  getCandidatesCard(candidates: UserExt[] | null) {
    if (!candidates || candidates.length === 0) return "";
    else if (candidates.length === 1) {
      return <div> {candidates[0].fullNameWithLogin} </div>
    } else {
      const minValue = candidates[0].fullNameWithLogin + " +" + (candidates.length - 1);
      const title = <Msg entityName={ExtTaskData.NAME} propertyName='assignee'/>;
      return (
        <a onClickCapture={() => this.showModal(candidates, title)} key="modal">
          {minValue}
        </a>
      )
    }
  }

  render() {
    const candidates = this.props.candidates ? Array.from(this.props.candidates) : null;
    return this.getCandidatesCard(candidates);
  }
}