import React, {CSSProperties} from "react";
import {observer} from "mobx-react";

export interface ContentProps {
  pageName?: string | JSX.Element,
  wrapperCss?: CSSProperties,
  contentWrapperCss?: CSSProperties,
  onHeaderClick?: () => void
}

@observer
export default class Page extends React.Component<ContentProps> {
  render() {
    return <div className={"content-container"}>
      {this.props.pageName ? <h1 className={"content-header"}>{this.props.pageName}</h1> : <></>}
      <div className={"page-body"}>
      {this.props.children}
      </div>
    </div>
  }
}
