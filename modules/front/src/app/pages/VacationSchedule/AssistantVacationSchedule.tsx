import * as React from "react";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../store";
import {AssistantSelector} from "../ExecutiveAssistants/AssistantSelector";
import {PersonProfile} from "../MyTeam/MyTeamCard";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import VacationScheduleList from "./VacationScheduleList";
import {observable} from "mobx";

@inject("rootStore")
@injectMainStore
@observer
class AssistantVacationScheduleComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  @observable
  selectedPerson?: PersonProfile;

  renderAssistantVacationSchedule = (selectedPerson: PersonProfile): React.ReactNode => {
    return (<VacationScheduleList positionGroupId={selectedPerson.positionGroupId}/>)
  }

  render() {
    return (
      <AssistantSelector
        onChange={this.onChangeAssistant}
        render={() =>
          this.selectedPerson
            ? this.renderAssistantVacationSchedule(this.selectedPerson)
            : <></>
        }
      />
    )
  }

  onChangeAssistant = (selectedPerson?: PersonProfile) => {
    this.selectedPerson = selectedPerson;
  }

  componentDidMount() {
    this.props.rootStore!.vacationRequestStore.setType('assistant');
  }
}

const AssistantVacationSchedule = injectIntl(AssistantVacationScheduleComponent);

export default AssistantVacationSchedule;