import React from 'react';
import {Tabs} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";
import AssignedGoalList from "../../AssignedGoals/DefaultGoal/AssignedGoalList";

type Props = {
  assignedPerformancePlanId: string;
}

class GoalForm extends React.Component<Props & WrappedComponentProps> {

  render() {
    const {TabPane} = Tabs;

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.ratingForm"})} key="1">
          <AssignedGoalList assignedPerformancePlanId={this.props.assignedPerformancePlanId}/>
        </TabPane>
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.approvers"})} key="2">
          <div>
          </div>
        </TabPane>
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.ratingForm"})} key="3">
          <div>
          </div>
        </TabPane>
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.tree"})} key="4">
          <div>
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

export default injectIntl(GoalForm);