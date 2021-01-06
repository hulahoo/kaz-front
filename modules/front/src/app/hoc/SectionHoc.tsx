import React, {CSSProperties} from "react";

export interface ContentProps {
  size?: 'large' | 'half'
  sectionName?: string,
  wrapperCss?: CSSProperties,
  contentWrapperCss?: CSSProperties,
  onHeaderClick?: () => void
}

export function SectionHoc(Child: JSX.Element, props: ContentProps): React.ComponentClass {

  class InnerContentComponent extends React.Component<any> {
    render() {
      return <div className={"section-container" + (props.size ? " " + props.size + "-section" : "")}>
        {props.sectionName ? <div className={"section-header-container"}><h1>{props.sectionName}</h1></div> : <></>}
        <div className={"section-body"}>
          {Child}
        </div>
      </div>
    }
  }

  return InnerContentComponent;
}
