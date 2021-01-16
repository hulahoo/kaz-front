import React from "react";
import {ButtonProps} from "antd/lib/button";
import {Button} from "antd";

export type ButtonComponentProps =
  ButtonProps
    & {
    child?: JSX.Element
    buttonType: ButtonType
}

export enum ButtonType {
    PRIMARY = "primary",
    FOLLOW = "follow"
}

export default class extends React.Component<ButtonComponentProps> {
    render() {
        const {buttonType, className, ...rest} = {...this.props};
        return <Button
            className={(className ? className + " button" : "button") + " " + "btn-" + buttonType} {...rest}/>;
    }
}