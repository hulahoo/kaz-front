import React, {Component} from 'react';
import {DatePicker} from "antd";
import {DatePickerProps} from "antd/lib/date-picker/interface";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";

interface DefaultDatePickerProps extends DatePickerProps {
}

class DefaultDatePicker extends Component<DefaultDatePickerProps> {
  render() {
    return (
      <DatePicker format={DEFAULT_DATE_PATTERN} {...this.props}/>
    );
  }
}

export default DefaultDatePicker;