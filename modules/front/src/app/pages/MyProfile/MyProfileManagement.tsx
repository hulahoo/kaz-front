import * as React from "react";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import {FormattedMessage} from "react-intl";
import MyProfile from "./MyProfile";

@inject("rootStore")
@observer
export class MyProfileManagement extends React.Component<RootStoreProp> {
  static PATH = "/my-profile";

  render() {
    return (
      <Page pageName={<FormattedMessage id={'menu.my-profile'}/>}>
        <MyProfile personGroupId={this.props.rootStore!.userInfo!.personGroupId!}/>
      </Page>
    );
  }
}
