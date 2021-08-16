import React from "react";
import {TimePicker} from "antd";
import {TimePickerProps} from "antd/lib/time-picker";
import {observable} from "mobx";
import {observer} from "mobx-react";
import * as moment from "moment";

@observer
export default class extends React.Component<TimePickerProps, any> {

  @observable
  isOpened = false;

  render() {
    return <TimePicker
      open={this.isOpened}
      onOpenChange={() => {
        this.isOpened = true
      }}
      {...this.props}
      onChange={(time: moment.Moment, timeString: string) => {
        this.isOpened = false;
        if (this.props.onChange)
          this.props.onChange(time, timeString);
      }}/>;
  }
}