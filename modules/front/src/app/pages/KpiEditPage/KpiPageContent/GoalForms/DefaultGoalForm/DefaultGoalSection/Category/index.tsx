import React, {Component} from 'react';
import CommonComponentHoc from "../../../../../../../hoc/CommonComponent/CommonComponentHoc";
import DefaultDropdown from "../../../../../../../components/Dropdown/DefaultDropdown";
import {RootStoreProp} from "../../../../../../../store";
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";

@inject("rootStore")
@observer
class Category extends Component<RootStoreProp & WrappedComponentProps> {
  render() {
    const {goalStore} = this.props.rootStore!;

    const Component = CommonComponentHoc(
      <DefaultDropdown menu={goalStore.categories ? goalStore.categories.map(e => {
        return {
          id: e.id,
          value: e.name
        }
      }) : goalStore.categories}
                       selected={goalStore.selectedCategory}
                       placeholder={this.props.intl.formatMessage({id: 'placeholder.category'})}
                       handleMenuClick={goalStore.setSelectedCategory}/>,
      {name: this.props.intl.formatMessage({id: 'category'})})
    return <Component />;
  }
}

export default injectIntl(Category);