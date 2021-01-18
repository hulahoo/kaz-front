import React, {Component} from 'react';
import {InputNumberProps} from "antd/lib/input-number";
import {InputNumber} from "antd";

class DefaultInputNumber extends Component<InputNumberProps> {
  render() {
    return (
      <InputNumber {...this.props}/>
    );
  }
}

export default DefaultInputNumber;