import React from 'react';
import {Steps} from "antd";

export type StatusStepProp = {
  title?: React.ReactNode,
  description?: React.ReactNode,
  icon?: React.ReactNode
}

type Props = {
  steps?: StatusStepProp[],
  currentIndex?: number,
}

class StatusSteps extends React.Component<Props> {
  render() {
    const {Step} = Steps;
    const {steps, currentIndex} = this.props;
    return (
      <div>
        <Steps type={"navigation"} current={currentIndex}>
          {steps ? steps.map(s => <Step icon={<></>} {...s}/>) : <></>}
        </Steps>
      </div>
    );
  }
}

export default StatusSteps;