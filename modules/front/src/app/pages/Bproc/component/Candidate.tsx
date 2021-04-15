import React from "react";
import {TsadvUser} from "../../../../cuba/entities/base/tsadv$UserExt";
import {Modal, Table} from "antd";
import Column from "antd/es/table/Column";
import {observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RouteComponentProps, withRouter} from "react-router-dom";

type Candidates = {
  candidates: TsadvUser[] | null;
}

@observer
class Candidate extends React.Component<Candidates & WrappedComponentProps & RouteComponentProps> {

  showModal = (candidates: TsadvUser[]) => {
    Modal.info({
      title: this.props.intl.formatMessage({id: "candidates"}),
      content: (
        <Table dataSource={candidates}
               showHeader={false}
               rowKey={record => record.id}
               pagination={false}>
          <Column key='id' render={(text, record) => (record as TsadvUser).fullNameWithLogin}/>
        </Table>
      )
    });
  };

  getCandidatesCard(candidates: TsadvUser[] | null) {
    if (!candidates || candidates.length === 0) return "";
    else if (candidates.length === 1) {
      return <div className="break-words">{candidates[0].fullNameWithLogin}</div>
    } else {
      const minValue = candidates[0].fullNameWithLogin + " +" + (candidates.length - 1);
      return (
        <a onClickCapture={() => this.showModal(candidates)} key="modal">
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

export default withRouter(injectIntl(Candidate));
