import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PersonalDataRequestEdit from "./PersonalDataRequestEdit";
import PersonalDataRequestList from "./PersonalDataRequestList";
import PageContentHoc from "../../hoc/PageContentHoc";
import {PersonalDataRequestEditPage} from "./PersonalDataRequestEditPage";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PersonalDataRequestManagement extends React.Component<Props> {
  static PATH = "/personalDataRequestManagement";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    const RenderComponent = entityId ? (
      PageContentHoc({pageName: "Мой профиль"}, <PersonalDataRequestEditPage />)
    ) : (
      PageContentHoc({pageName: "Мой профиль"}, <PersonalDataRequestList/>)
    );
    return (
      <>
        <RenderComponent/>
      </>
    );
  }
}
