import React, {HTMLAttributes} from "react";
import {observer} from "mobx-react";

type PaddingType = "normal" | "none"

export interface ContentProps {
  size?: 'large' | 'half'
  sectionName?: string | React.ReactNode,
  onHeaderClick?: () => void,
  visible?: boolean,
  padding?: PaddingType
}

@observer
export default class Section extends React.Component<ContentProps & HTMLAttributes<HTMLDivElement>> {
  render() {
    const {size, visible, padding, onHeaderClick, sectionName, ...rest} = this.props;

    const className = "section-container" + (this.props.size ? " " + this.props.size + "-section" : "") + (this.props.visible === false ? " hidden" : "" + (this.props.padding ? " p-" + this.props.padding : "")) + (rest.className ? " " + rest.className : "");

    return <div {...this.props} className={className}>
      {this.props.sectionName ?
        <div className={"section-header-container"}>{typeof this.props.sectionName === 'string' ?
          <h1>{this.props.sectionName}</h1> : <>{this.props.sectionName}</>}</div> : <></>}
      <div className={"section-body"}>
        {this.props.children}
      </div>
    </div>
  }
}