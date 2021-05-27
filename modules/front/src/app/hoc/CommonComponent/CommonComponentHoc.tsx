import React, {HTMLAttributes} from "react";
import {observer} from "mobx-react";

export interface ContentProps {
  name?: string
  wrapperStyles?: HTMLAttributes<HTMLDivElement>,
  key?: string | number
}

const CommonComponentHoc = (Child: JSX.Element, props: ContentProps) => {

  @observer
  class InnerContentComponent extends React.Component<ContentProps> {
    render() {
      const {className = undefined, ...rest} = {...props.wrapperStyles};
      return <div className={className ? className + " element-property" : "element-property"} {...rest}
                  key={props.key}>
        {props.name ? <span className={"element-header-name"}>{props.name}</span> : <></>}
        <div className={"element-property-container"} key={props.key ? "inner_div_" + props.key : props.key}>
          {Child}
        </div>
      </div>
    }
  }

  return InnerContentComponent;
}

export default CommonComponentHoc;