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
        const {buttonType, className, ...rest} = {...this.props};
        return <button
            className={(className ? className + " button" : "button") + " " + "btn-" + buttonType} {...rest}/>;
    }
}