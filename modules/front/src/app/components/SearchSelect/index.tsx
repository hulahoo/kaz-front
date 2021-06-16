import React from 'react';
import {Select} from "antd";
import {SelectProps, SelectValue} from "antd/lib/select";

type Props = {
  onSearch?: (value: string) => void,
  placeholder?: string,
  options?: any,
  className?: string
}

export class SearchSelect<T = SelectValue> extends React.Component<SelectProps<T> & Props> {

  render() {
    const {options} = this.props;

    return (
      // @ts-ignore
      <Select
        showSearch
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        notFoundContent={null}
        {...this.props}
      >
        {options}
      </Select>
    );
  }
}