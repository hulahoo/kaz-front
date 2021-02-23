import React from 'react';
import {Tabs} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";
import AssignedGoalList from "../../AssignedGoals/IndividualGoal/AssignedGoalList";

type Props = {
  assignedPerformancePlanId: string;
  setTotalWeight?: (totalWeight: number) => void
  readonly: boolean;
}

class GoalForm extends React.Component<Props & WrappedComponentProps> {

  render() {
    const {TabPane} = Tabs;

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.ratingForm"})} key="1">
          <AssignedGoalList assignedPerformancePlanId={this.props.assignedPerformancePlanId} setTotalWeight={this.props.setTotalWeight} readonly={this.props.readonly}/>
        </TabPane>
        {/*<TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.ratingForm"})} key="3">*/}
        {/*  <div>*/}
        {/*  </div>*/}
        {/*</TabPane>*/}
        {/*<TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.tree"})} key="4">*/}
        {/*  <div>*/}
        {/*  </div>*/}
        {/*</TabPane>*/}
      </Tabs>
    );
  }
}

export default injectIntl(GoalForm);