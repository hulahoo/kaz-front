import React from 'react';
import {injectIntl, WrappedComponentProps} from "react-intl";
import Search from "antd/es/input/Search";

type Props = {
  onSearch?: (value: string) => void,
  placeholder?: string
}

class SearchInput extends React.Component<WrappedComponentProps & Props> {
  render() {
    const {onSearch, placeholder} = this.props;

    return (
      <Search className={"search-input"}
              placeholder={placeholder ? placeholder : this.props.intl.formatMessage({id: "search"}) + " ..."}
              autoComplete={'off'}
              onSearch={onSearch}/>
    );
  }
}

export default injectIntl(SearchInput);