import * as React from "react";
import {collection} from "@cuba-platform/react";
import {PersonContact} from "../../../cuba/entities/base/tsadv$PersonContact";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../store";
import {Course} from "../../../cuba/entities/base/tsadv$Course";

@inject("rootStore")
@observer
export class MyEducation extends React.Component<RootStoreProp> {

  dataCollection = collection<Course>(Course.NAME, {
    view: "_local",
    sort: "-createTs"
  });


  render() {
    const {status} = this.dataCollection;
    console.log(status);

    return <div>{this.dataCollection.items.map(e => {
        return <span>{e._instanceName}</span>
      }
    )}</div>;
  }


  componentDidMount(): void {
    this.dataCollection.load();
  }
}
