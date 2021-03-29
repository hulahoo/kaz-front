import * as React from "react";
import {inject, observer} from "mobx-react";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {observable} from "mobx";
import {Card} from "antd";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import TaskDataTable from "./TaskDataTable";

type TaskProps = {
  tasks: ExtTaskData[];
};

@inject("rootStore")
@injectMainStore
@observer
class ExtTaskDataCards extends React.Component<TaskProps & MainStoreInjected & WrappedComponentProps> {

  state = {visible: false};

  @observable
  mainStore = this.props.mainStore!;

  render() {
    return (
      <Card className="narrow-layout large-section section-container">
        <div
          className={"section-header-container"}>{this.props.intl.formatMessage({id: "bproc.participants"})}</div>
        <TaskDataTable key={'TaskDataTable'} tasks={this.props.tasks}/>
      </Card>
    )
  }
}

export default injectIntl(ExtTaskDataCards);