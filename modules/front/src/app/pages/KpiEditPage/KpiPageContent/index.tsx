import React from 'react';
import Section from "../../../hoc/Section";
import StatusSteps from "../../../common/StatusSteps";
import PageContentHoc from "../../../hoc/PageContentHoc";
import Button, {ButtonType} from "../../../components/Button/Button";
import KpiTable from "../../Kpi/GoalForm";
import Dropdown from "../../../components/Dropdown/Dropdown";
import DropdownButton from "../../../components/Dropdown/DropdownButton";
import {MenuRaw} from "../../../components/Dropdown/DefaultDropdown";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../../store";
import {injectIntl, WrappedComponentProps} from "react-intl";

@inject("rootStore")
@observer
class KpiPageContent extends React.Component<RootStoreProp & WrappedComponentProps> {

  render() {

    const createGoalsMenu: MenuRaw[] = [{
      id: "/kpi/" + this.props.rootStore!.kpiEditStore.appId + "/goal/default",
      value: this.props.intl.formatMessage({id: "newGoal"})
    }, {
      id: "/kpi/goal/library",
      value: this.props.intl.formatMessage({id: "fromLibrary"})
    }, {id: "/kpi/goal/cascade", value: this.props.intl.formatMessage({id: "cascade"})}];

    return (<>
        <Section size={"large"} sectionName={this.props.intl.formatMessage({id: "employeeInformation"})}>
          {/*<EmployeeInformation/>*/}
        </Section>
        <Section size={"large"}>
          <StatusSteps/>
        </Section>
        <Section size={"large"}>
          {/*<KpiTable/>*/}
        </Section>
        <Section size={"large"}>
          <DropdownButton menu={createGoalsMenu}
                          buttonText={this.props.intl.formatMessage({id: "addGoal"})}/>
        </Section>
      </>
    );
  }
}

export default injectIntl(KpiPageContent);