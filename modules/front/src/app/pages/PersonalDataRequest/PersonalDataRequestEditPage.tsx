import * as React from "react";
import PageContentHoc from "../../hoc/PageContentHoc";
import PersonalDataRequestEdit from "./PersonalDataRequestEdit";
import {observer} from "mobx-react";
import Page from "../../hoc/PageContentHoc";

@observer
export class PersonalDataRequestEditPage extends React.Component {
  render() {
    return <Page pageName={"Мой профиль"}>
      <PersonalDataRequestEdit/>
    </Page>;
  }
}
