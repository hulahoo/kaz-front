import React from 'react';
import {SectionHoc} from "../../../hoc/SectionHoc";
import EmployeeInformation from "./KpiTable/EmployeeInformation";
import StatusSteps from "../../../common/StatusSteps";
import PageContentHoc from "../../../hoc/PageContentHoc";
import Button, {ButtonType} from "../../../components/Button/Button";
import KpiTable from "./KpiTable";
import Dropdown from "../../../components/Dropdown/Dropdown";
import DropdownButton from "../../../components/Dropdown/DropdownButton";
import {MenuRaw} from "../../../components/Dropdown/DefaultDropdown";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../../store";

//@inject("rootStore")
@observer
class KpiPageContent extends React.Component<RootStoreProp> {

  render() {
    const EmployeeInformationSection = SectionHoc(<EmployeeInformation/>, {
      sectionName: "Информация о сотруднике",
      size: "large"
    });
    const StatusStepsSection = SectionHoc(<StatusSteps/>, {size: "large"});
    const TableSection = SectionHoc(<KpiTable/>, {size: "large"});

    const createGoalsMenu: MenuRaw[] = [{id: "/kpi/" + this.props.rootStore!.kpiEditStore.appId + "/goal/create/default", value: "Новая цель"}, {
      id: "/kpi/goal/create/library",
      value: "Из библиотеки"
    }, {id: "/kpi/goal/create/cascade", value: "Каскадировать"}];
    const CreateDropdownSection = SectionHoc(<DropdownButton menu={createGoalsMenu} buttonText={"Добавить цель"}/>, {size: "large", visible: false});

    return (<>
        <EmployeeInformationSection/>
        <StatusStepsSection/>
        <CreateDropdownSection/>
        <TableSection/>
      </>
    );
  }
}

export default KpiPageContent;