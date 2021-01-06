import React, {CSSProperties} from "react";

export interface ContentProps {
  pageName?: string,
  wrapperCss?: CSSProperties,
  contentWrapperCss?: CSSProperties,
  onHeaderClick?: () => void
}

export function PageContentHoc(props: ContentProps, ...Child: JSX.Element[]): React.ComponentClass {

  class InnerContentComponent extends React.Component<any> {
    render() {
      return <div className={"content-container"}>
        {props.pageName ? <h1 className={"content-header"}>{props.pageName}</h1> : <></>}
        {Child}
      </div>
    }
  }

  return InnerContentComponent;
}

export default PageContentHoc;