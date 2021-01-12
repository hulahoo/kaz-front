import React, {ChangeEvent} from 'react';
import {inject, observer} from "mobx-react";
import CommonComponentHoc from "../../../hoc/CommonComponent/CommonComponentHoc";
import Input from "../../../components/Input/Input";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../../store";
import Button, {ButtonType} from "../../../components/Button/Button";

//@inject("rootStore")
@observer
class ChangePassword extends React.Component<WrappedComponentProps & RootStoreProp> {

  render() {
    const changePasswordStore = this.props.rootStore!.changePassword;

    const OldPasswordComponent = CommonComponentHoc(
      <Input type={"password"}
             onChange={(e: ChangeEvent<HTMLInputElement>) => changePasswordStore.setOldPassword(e.target.value)}
             autoComplete={"off"} placeholder={this.props.intl.formatMessage({id: 'placeholder.old-password'})}
      />, {name: this.props.intl.formatMessage({id: 'old-password'})});

    const NewPasswordComponent = CommonComponentHoc(
      <Input type={"password"}
             onChange={(e: ChangeEvent<HTMLInputElement>) => changePasswordStore.setNewPassword(e.target.value)}
             autoComplete={"off"} placeholder={this.props.intl.formatMessage({id: 'placeholder.new-password'})}
      />, {name: this.props.intl.formatMessage({id: 'new-password'})});

    const RetryPasswordComponent = CommonComponentHoc(
      <Input type={"password"}
             onChange={(e: ChangeEvent<HTMLInputElement>) => changePasswordStore.setRetryPassword(e.target.value)}
             autoComplete={"off"} placeholder={this.props.intl.formatMessage({id: 'placeholder.retry-password'})}
      />, {});

    return (
      <div className={"centered-container form-container"}>
        {<OldPasswordComponent/>}
        {<NewPasswordComponent/>}
        {<RetryPasswordComponent/>}
      </div>
    );
  }
}

export default injectIntl(ChangePassword);