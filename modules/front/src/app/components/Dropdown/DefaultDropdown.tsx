import React from "react";
import {Select} from "antd";
import {action, observable} from "mobx";
import {observer} from "mobx-react";

export type MenuRaw = {
  id: string,
  value: string,
  render?: () => React.ReactNode
}

type DropdownProps = {
  selected?: string,
  placeholder?: string,
  menu?: MenuRaw[]
}

type DropdownHandlers = {
  handleMenuClick?: (key: string) => void
}

@observer
export default class extends React.Component<DropdownProps & DropdownHandlers> {

  @observable selected: string | undefined = this.props.selected

  handleMenuClick = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    this.setSelected(value);
    if (this.props.handleMenuClick && option.key) {
      this.props.handleMenuClick(option.key.toString());
    }
  }

  render() {
    return <Select defaultValue={this.selected} className={"default-type"} onChange={this.handleMenuClick} placeholder={this.props.placeholder}>
      {this.props.menu ? this.props.menu.map((m: MenuRaw) => {
        return <Select.Option key={m.id}>
            {m.value}
          </Select.Option>
        }
      ) : <Select.Option key={"EMPTY"}>
        "Список пуст"
      </Select.Option>}
    </Select>
  }

  @action
  setSelected = (value: string | undefined) => {
    this.selected = value;
  }
}