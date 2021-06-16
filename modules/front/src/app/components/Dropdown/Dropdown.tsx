import React from "react";
import {Dropdown, Icon} from "antd";
import {DropDownProps} from "antd/lib/dropdown/dropdown";
// import Button from "../Button/Button";
// import {ReactComponent as ArrowDownSvg} from '../../../resources/img/arrow-down.svg';

// export enum DropdownType {
//   DEFAULT = "default"
// }

// type DropdownProps = {
//   type?: DropdownType,
//   buttonName?: string,
//   menu?: Menu[]
// }

export default class extends React.Component<DropDownProps> {
  render() {
    return <Dropdown {...this.props}/>;
  }
}