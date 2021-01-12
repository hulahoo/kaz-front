import React, {CSSProperties} from "react";

export interface ContentProps {
  size?: 'large' | 'half'
  sectionName?: string,
  wrapperCss?: CSSProperties,
  contentWrapperCss?: CSSProperties,
  onHeaderClick?: () => void,
  visible?: boolean
}

export function SectionHoc(Child: JSX.Element, props: ContentProps): React.ComponentClass {

  class InnerContentComponent extends React.Component<any> {
    render() {
      const className = "section-container" + (props.size ? " " + props.size + "-section" : "") + (props.visible === false ? " hidden" : "");

      return <div className={className}>
        {props.sectionName ? <div className={"section-header-container"}><h1>{props.sectionName}</h1></div> : <></>}
        <div className={"section-body"}>
          {Child}
        </div>
      </div>
    }
  }

  return InnerContentComponent;
}
