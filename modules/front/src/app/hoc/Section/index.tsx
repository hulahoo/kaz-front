import React, {CSSProperties} from "react";
import {observer} from "mobx-react";

export interface ContentProps {
  size?: 'large' | 'half'
  sectionName?: string | React.ReactNode,
  wrapperCss?: CSSProperties,
  contentWrapperCss?: CSSProperties,
  onHeaderClick?: () => void,
  visible?: boolean
}

@observer
export default class Section extends React.Component<ContentProps> {
  render() {
    const className = "section-container" + (this.props.size ? " " + this.props.size + "-section" : "") + (this.props.visible === false ? " hidden" : "");

    return <div className={className}>
      {this.props.sectionName ?
        <div className={"section-header-container"}>{typeof this.props.sectionName === 'string'? <h1>{this.props.sectionName}</h1> : <>{this.props.sectionName}</>}</div> : <></>}
      <div className={"section-body"}>
        {this.props.children}
      </div>
    </div>
  }
}