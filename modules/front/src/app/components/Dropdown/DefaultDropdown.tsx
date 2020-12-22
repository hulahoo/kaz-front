import React, {ChangeEvent} from "react";
import Button from "../Button/Button";
import {ReactComponent as ArrowDownSvg} from "../../../resources/img/arrow-down.svg";
import {Dropdown, Menu} from "antd";
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import {ClickParam} from "antd/lib/menu";

export type MenuRaw = {
  id: string,
  value: string
}

type DropdownProps = {
  buttonName?: string,
  menu: MenuRaw[]
}

type DropdownHandlers = {
  handleMenuClick?: (key: string) => void
}

@observer
export default class extends React.Component<DropdownProps & DropdownHandlers> {

  @observable buttonText: string | undefined = this.props.buttonName

  handleMenuClick = (e: ClickParam) => {
    this.setButtonText(e.item.props.children);
    if (this.props.handleMenuClick) {
      this.props.handleMenuClick(e.key);
    }
  }

  render() {
    const overlayMenu = <Menu onClick={this.handleMenuClick}>
      {this.props.menu.map((m: MenuRaw) => <Menu.Item key={m.id}>
          {m.value}
        </Menu.Item>
      )}
    </Menu>

    return <Dropdown trigger={['click']} className={"default-type"} overlay={overlayMenu}>
      <Button>
        {this.buttonText}
        <i className="arrow-down"/>
        <ArrowDownSvg/>
      </Button>
    </Dropdown>;
  }

  @action
  setButtonText = (value: string | undefined) => {
      this.buttonText = value;
  }
}