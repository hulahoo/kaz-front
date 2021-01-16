import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PersonalDataRequestEdit from "./PersonalDataRequestEdit";
import PersonalDataRequestList from "./PersonalDataRequestList";
import PageContentHoc from "../../hoc/PageContentHoc";
import {PersonalDataRequestEditPage} from "./PersonalDataRequestEditPage";
import Page from "../../hoc/PageContentHoc";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PersonalDataRequestManagement extends React.Component<Props> {
  static PATH = "/personalDataRequestManagement";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    const RenderComponent = entityId ? (
        <Page pageName={"Мой профиль"}><PersonalDataRequestEditPage/></Page>) :
      <Page pageName={"Мой профиль"}><PersonalDataRequestList/></Page>;
    return (
      <>
        {RenderComponent}
      </>
    );
  }
}
