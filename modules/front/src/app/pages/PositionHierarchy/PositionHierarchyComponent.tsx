import * as React from "react";
import {SplitPane} from "react-multi-split-pane/dist";
import Search from "antd/es/input/Search";
import {PositionHierarchyTree} from "./PositionHierarchyTree";
import {PositionDetails} from "./PositionDetails/PositionDetails";
import {observable} from "mobx";
import {observer} from "mobx-react";

@observer
export class PositionHierarchyComponent extends React.Component {

  @observable
  selectedPosition: string

  changeSelectedPosition = (positionId: string): void => {
    console.log('2', positionId)
    this.selectedPosition = positionId
  }


  render() {
    return <div style={{height: "100%", position: 'relative'}}>
      <SplitPane split="vertical">
        <div style={{height: "100%", width: "100%"}}>
          <Search style={{padding: '10px 5px 10px 10px'}}/>
          <div style={{height: 'calc(100% - 52px)', width: "100%", overflowX: "auto", overflowY: "auto"}}>
            <PositionHierarchyTree changeSelectedPosition={this.changeSelectedPosition}/>
          </div>
        </div>
          <PositionDetails selectedPosition={this.selectedPosition}/>
      </SplitPane>
    </div>;
  }

}
