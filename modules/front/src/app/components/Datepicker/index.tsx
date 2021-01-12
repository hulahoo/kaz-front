import React, {Component} from 'react';
import Input, {CommonInputProps} from "../Input/Input";
import {DatePicker} from "antd";
import {DatePickerProps} from "antd/lib/date-picker/interface";
import moment from "moment";

export const DEFAULT_DATE_FORMAT = "DD.MM.YYYY"

interface DefaultDatePickerProps extends DatePickerProps {
}

class DefaultDatePicker extends Component<DefaultDatePickerProps> {
  render() {
    return (
      <DatePicker format={DEFAULT_DATE_FORMAT} {...this.props}/>
    );
  }
}

export default DefaultDatePicker;