import React from 'react';
import Dropdown from "../Dropdown";
import Button, {ButtonType} from "../../Button/Button";
import {Menu} from "antd";
import {MenuRaw} from "../DefaultDropdown";
import {NavLink} from "react-router-dom";

interface DropdownButtonProps {
  buttonText?: string,
  menu:  MenuRaw[];
  buttonStyle?: React.CSSProperties
}

class DropdownButton extends React.Component<DropdownButtonProps> {
  render() {
    const menuOverlay = <Menu className={"button-dropdown"}>
      {(this.props.menu as MenuRaw[]).map((m: MenuRaw) =>
        <Menu.Item>
          {m.render ? m.render :
            <NavLink to={m.id}>
              {m.value}
            </NavLink>
          }
        </Menu.Item>
      )}
    </Menu>;
    return (
      <Dropdown overlay={menuOverlay} trigger={['click']}>
        <Button buttonType={ButtonType.FOLLOW} style={this.props.buttonStyle}>{this.props.buttonText}</Button>
      </Dropdown>
    );
  }
}

export default DropdownButton;