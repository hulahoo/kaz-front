import React from "react";

export type ButtonComponentProps =
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
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
        const {buttonType, ...rest} = {...this.props};
        return <button
            className={(this.props.className ? this.props.className + " button" : "button") + " " + "btn-" + buttonType} {...rest}/>;
    }
}