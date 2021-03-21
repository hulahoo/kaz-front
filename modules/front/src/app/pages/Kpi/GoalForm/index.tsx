import React from 'react';
import {Tabs} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";
import AssignedGoalList from "../../AssignedGoals/IndividualGoal/AssignedGoalList";

type Props = {
  assignedPerformancePlanId: string;
  setTotalWeight?: (totalWeight: number) => void
  setTotalResult?: (totalResult: number) => void
  readonly: boolean;
  approverHrRoleCode?: string;
  parentForm: any;
  setAssignedPerformanceState?: (state: {
    update: () => void;
    validate: () => boolean;
  }) => void;
}

class GoalForm extends React.Component<Props & WrappedComponentProps> {

  render() {
    const {TabPane} = Tabs;

    return (

      <Tabs defaultActiveKey="1" key={'tabs'}>
        <TabPane tab={this.props.intl.formatMessage({id: "kpi.edit.tabs.ratingForm"})} key="1">
          <div>
            <AssignedGoalList
              key='AssignedGoalList'
              setAssignedPerformanceState={this.props.setAssignedPerformanceState}
              assignedPerformancePlanId={this.props.assignedPerformancePlanId}
              setTotalWeight={this.props.setTotalWeight}
              setTotalResult={this.props.setTotalResult}
              parentForm={this.props.parentForm}
              approverHrRoleCode={this.props.approverHrRoleCode}
              readonly={this.props.readonly}/>
          </div>

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