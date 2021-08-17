import * as React from "react";
import TabSheets from "./TabSheets";
import {observable} from "mobx";

export type PositionDetailsProps = {
  selectedPosition?: string
}

export class PositionDetails extends React.Component<PositionDetailsProps> {

  @observable
  selectedPosition?:string



  render(): React.ReactNode {
    console.log('3',this.props.selectedPosition)
    if (this.props.selectedPosition && this.props.selectedPosition.length > 0) {
      return <TabSheets selectedPosition={this.props.selectedPosition}/>
    } else
      return <div/>
  }
}
