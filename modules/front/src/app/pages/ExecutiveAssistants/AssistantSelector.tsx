import * as React from "react";
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
import {restServices} from "../../../cuba/services";
import {RootStoreProp} from "../../store";
import {PersonProfile} from "../MyTeam/MyTeamCard";
import {Select} from "antd";
import {FormattedMessage} from "react-intl";

export type AssistantSelectorProps = {
  render: (selectedPerson: PersonProfile) => React.ReactNode,
  onChange?: (selectedPerson?: PersonProfile) => void,
}

@inject("rootStore")
@observer
export class AssistantSelector extends React.Component<RootStoreProp & AssistantSelectorProps> {

  @observable
  managers: PersonProfile[] = [];

  @observable
  selectedPerson?: PersonProfile;

  render() {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Select style={{height: '5%', width: '100%', padding: 10}}
                showSearch
                allowClear
                autoFocus={true}
                value={this.props.rootStore!.assistantTeamInfo.selectedManager
                  ? this.props.rootStore!.assistantTeamInfo.selectedManager.id
                  : undefined}
                placeholder={<FormattedMessage id={'select.manager'}/>}
                filterOption={(input, option) =>
                  (option.props.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={this.onChangeManager}>
          {this.managers.length > 0 ? this.managers.map(l =>
              <Select.Option title={(l as PersonProfile).fullName!}
                             key={l.id}>{(l as PersonProfile).fullName}</Select.Option>) :
            <Select.Option key="empty"/>
          }
        </Select>

        <div style={{height: '95%', width: '100%'}}>
          {
            this.selectedPerson
              ? this.props.render(this.selectedPerson)
              : <></>
          }
        </div>
      </div>
    )
  }

  onChangeManager = (value: string) => {
    this.selectedPerson = this.managers.find(manager => manager.id === value);
    this.props.rootStore!.assistantTeamInfo.selectedManager = this.selectedPerson;
    if (this.props.onChange) {
      this.props.onChange(this.selectedPerson);
    }
  };

  componentDidMount() {
    this.props.rootStore!.assistantTeamInfo.active = true;
    restServices.executiveAssistantService.getManagerList(this.props.rootStore!.userInfo!.positionGroupId!)
      .then(value => this.managers = value)
      .then(value => {
        const selectedManager = this.props.rootStore!.assistantTeamInfo.selectedManager;
        if (value && value.length === 1) this.onChangeManager(value[0].id);
        else if (!value || value.length === 0 || (selectedManager && !value.find(item => item.id === selectedManager.id)))
          this.props.rootStore!.assistantTeamInfo.selectedManager = undefined;
        return value;
      });

    if (this.props.onChange &&
      this.props.rootStore!.assistantTeamInfo.selectedManager) {
      this.props.onChange(this.props.rootStore!.assistantTeamInfo.selectedManager);
    }
  }
}