import React from "react";
import {Input} from "antd";
import {InputState} from "antd/lib/input/Input";
import {InputProps} from "antd/es/input";

type CommonInputProps = InputProps | InputState;

export default class extends React.Component<CommonInputProps> {
  render() {
    return (
      <div>
        <Input {...this.props}/>
      </div>
    );
  }
}