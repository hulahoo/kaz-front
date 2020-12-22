import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {inject, observer} from "mobx-react";
import RootStore from "../../store/RootStore";
import {RootStoreProp} from "../../store";
import {ElementStore} from "../../store/SectionStore";

@inject("rootStore")
@observer
export default class extends React.Component<RouteComponentProps & RootStoreProp> {
  render() {
    // const rootStore = this.props.rootStore!;
    // rootStore.page.clearPage();
    // rootStore.page.loadPage(this.props.location.pathname);
    // return <div className={"content-container"}><h1 className={"content-header"}>{rootStore.page.name}</h1>
    //   {rootStore.page.sections.map(section => {
    //     return <div className={"section-container"}>
    //       {section.name ? <div className={"section-header-container"}><h1>Заголовок</h1></div> : <></>}
    //       <div className={"section-body"}>
    //         {section.elements && section.elements.map(e => {
    //           return e.getElementFactory().parse();
    //         })}
    //       </div>
    //     </div>
    //   })}
    // </div>
    return <></>
  }
}