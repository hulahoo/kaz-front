import React, {Component} from 'react';
import {Icon, List} from "antd";
import {Meta} from "antd/es/list/Item";
import {CourseSection} from "../../../cuba/entities/base/tsadv$CourseSection";
import {CourseSectionRenderType} from "../../pages/MyCourse/RenderModalBody/RenderModalBody";

export type ListItem = {
  id: string,
  hasAttempt: boolean,
  text: string,
  type: CourseSectionRenderType,
  styleClass?: string
}

type Props<T> = {
  dataInstance?: ListItem[] | null,
  selectedItem?: string | null;
  clickItemHandler?: (e: React.MouseEvent<HTMLDivElement>) => void
}

class CourseSectionList extends Component<Props<CourseSection>> {
  render() {
    return (
      <List
        grid={{
          column: 1
        }} locale={{
        emptyText: () => <></>
      }}
        dataSource={this.props.dataInstance ? this.props.dataInstance : []}
        renderItem={item => {
          return <List.Item onClick={this.props.clickItemHandler}>
            <>{
              // @ts-ignore
              <Meta title={<>
                {item.hasAttempt ?
                  <Icon type="check-circle" className={"done"} theme="twoTone" twoToneColor="#12BF66"
                        style={{fontSize: '32px'}}/> : null}
                <div>{item.text}</div>
              </>}
                    className={"course-section-item" + (this.props.selectedItem === item.id ? " selected" : "") + (item.styleClass ? " " + item.styleClass : "")}
                    id={item.id} key={item.id} type={item.type}/>}</>
          </List.Item>
        }}
      />
    );
  }
}

export default CourseSectionList;