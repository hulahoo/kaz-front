import React, {Component} from 'react';
import {Rate} from "antd";
import {RateProps} from "antd/lib/rate";

export default class extends Component<RateProps, any> {
  render() {
    const {value, ...rest} = this.props;
    return (
      <Rate value={value ? this.roundValue(value) : value} {...rest}/>
    );
  }

  roundValue = (value: number): number => {
    const slittedValue = (value + "").split(".");
    if (slittedValue.length === 2) {
      const decimalValue = Number("0." + (slittedValue[1] as string).substr(0, 2));
      console.log(decimalValue);
      if (decimalValue < 0.25) {
        return Number(slittedValue[0]);
      } else if ((decimalValue >= 0.25) && (decimalValue < 0.75)) {
        return Number(slittedValue[0]) + 0.5;
      } else {
        return Number(slittedValue[0]) + 1;
      }
    }
    return Number(slittedValue[0]);
  }
}