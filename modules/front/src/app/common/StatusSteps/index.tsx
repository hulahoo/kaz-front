import React from 'react';
import {Steps} from "antd";

class StatusSteps extends React.Component {
  render() {
    const { Step } = Steps;
    return (
      <div>
        <Steps type={"navigation"}>
          <Step title={1} description={"Постановка"} icon={<></>}/>
          <Step title={2} description={"Согласование"} icon={<></>}/>
          <Step title={3} description={"Самооценка"} icon={<></>}/>
          <Step title={4} description={"Оценка"} icon={<></>}/>
          <Step title={5} description={"Завершено"} icon={<></>}/>
        </Steps>
      </div>
    );
  }
}

export default StatusSteps;