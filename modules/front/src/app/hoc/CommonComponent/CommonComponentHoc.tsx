import React, {CSSProperties, HTMLAttributes} from "react";

export interface ContentProps {
  name?: string
  wrapperStyles?: HTMLAttributes<HTMLDivElement>,
}

export function CommonComponentHoc(Child: JSX.Element, props: ContentProps): React.ComponentClass {

  class InnerContentComponent extends React.Component<ContentProps> {
    render() {
      const {className = undefined, ...rest} = {...props.wrapperStyles};
      return <div className={className ? className + " element-property" : "element-property"} {...rest} key={"123"}>
        {props.name ? <span className={"element-header-name"}>{props.name}</span> : <></>}
        <div className={"element-property-container"}>
          {Child}
        </div>
      </div>
    }
  }

  return InnerContentComponent;
}

export default CommonComponentHoc;