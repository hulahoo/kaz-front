import React, {ChangeEvent, EventHandler} from "react";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../store";
import Input from "../../components/Input/Input";
import InputElement from "antd/es/auto-complete/InputElement";
import PageContentHoc from "../../hoc/PageContentHoc";
import {SectionHoc} from "../../hoc/SectionHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";
import UserSettingMainSection from "./UserSettingMainSection";

class UserSettings extends React.Component<RootStoreProp & WrappedComponentProps> {

  render() {
    const MainSection = SectionHoc(<UserSettingMainSection />, {});
    const PageContentComponent = PageContentHoc({pageName: this.props.intl.formatMessage({id: 'settings'})}, <MainSection/>);
    return <PageContentComponent/>
  }
}

export default injectIntl(UserSettings);