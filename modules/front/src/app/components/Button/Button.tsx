import React from "react";
import {Button} from "antd";
import {ButtonProps} from "antd/es/button";

export type ButtonComponentProps = {
  child?: JSX.Element
}

export default class extends React.Component<ButtonProps> {
  render() {
    return <Button {...this.props} className={(this.props.className ? this.props.className  + " btn" : "btn")}/>;
  }
}