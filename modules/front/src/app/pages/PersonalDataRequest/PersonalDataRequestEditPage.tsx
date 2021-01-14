import * as React from "react";
import PageContentHoc from "../../hoc/PageContentHoc";
import PersonalDataRequestEdit from "./PersonalDataRequestEdit";
import {observer} from "mobx-react";

@observer
export class PersonalDataRequestEditPage extends React.Component {
  render() {
    const Page = PageContentHoc({pageName: "Мой профиль"}, <PersonalDataRequestEdit />);
    return <Page />;
  }
}
