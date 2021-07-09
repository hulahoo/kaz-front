import * as React from "react";
import {observer} from "mobx-react";
import PersonPayslipList from "./PersonPayslipList";

@observer
export class PersonPayslipManagement extends React.Component {
  static PATH = "/personPayslip";

  render() {
    return (
      <>
        <PersonPayslipList/>
      </>
    );
  }
}
