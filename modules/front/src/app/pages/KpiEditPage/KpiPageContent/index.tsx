import React from 'react';
import {SectionHoc} from "../../../hoc/SectionHoc";
import EmployeeInformation from "../EmployeeInformation";
import StatusSteps from "../../../common/StatusSteps";
import PageContentHoc from "../../../hoc/PageContentHoc";
import Button, {ButtonType} from "../../../components/Button/Button";
import KpiTable from "./KpiTable";

class KpiPageContent extends React.Component {
  render() {
    const EmployeeInformationSection = SectionHoc(<EmployeeInformation/>, {
      sectionName: "Информация о сотруднике",
      size: "large"
    });
    const StatusStepsSection = SectionHoc(<StatusSteps/>, {size: "large"});
    const TableSection = SectionHoc(<KpiTable/>, {size: "large"});

    return (<>
        <EmployeeInformationSection/>
        <StatusStepsSection/>
        <Button style={{'margin': '16px'}} buttonType={ButtonType.FOLLOW}>Добавить цель</Button>
        <TableSection/>
      </>
    );
  }
}

export default KpiPageContent;