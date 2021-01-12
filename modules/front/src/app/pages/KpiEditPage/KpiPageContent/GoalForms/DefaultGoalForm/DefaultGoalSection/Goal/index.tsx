import React, {Component} from 'react';
import CommonComponentHoc from "../../../../../../../hoc/CommonComponent/CommonComponentHoc";
import {RootStoreProp} from "../../../../../../../store";
import {inject, observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Input from "../../../../../../../components/Input/Input";

//@inject("rootStore")
@observer
class Goal extends Component<RootStoreProp & WrappedComponentProps> {
  render() {
    const {goalStore} = this.props.rootStore!;

    const Component = CommonComponentHoc(
      <Input type={"text"} placeholder={this.props.intl.formatMessage({id: 'placeholder.goal'})}
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
               goalStore.setGoalName(e.target.value)
             }}
             key={"333"}
             value={goalStore.goalName}
             autoComplete={"off"}/>, {name: this.props.intl.formatMessage({id: 'goal'}), key: "123"});
    return <Component/>;
  }
}

export default injectIntl(Goal);