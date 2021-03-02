import React, {Component} from 'react';
import {Icon, List} from "antd";
import {Meta} from "antd/es/list/Item";
import {CourseSection} from "../../../cuba/entities/base/tsadv$CourseSection";

type Props<T> = {
  dataInstance?: T[] | null,
  selectedItem?: string | null;
  clickItemHandler?: (e: React.MouseEvent<HTMLDivElement>) => void
}

class CourseSectionList extends Component<Props<CourseSection>> {
  render() {
    return (
      <List
        grid={{
          column: 1
        }}
        dataSource={this.props.dataInstance ? this.props.dataInstance : []}
        renderItem={item => {
          return <List.Item onClick={this.props.clickItemHandler}>
            <>{
              // @ts-ignore
              <Meta title={<>
                {item.courseSectionAttempts!.length > 0 ?
                  <Icon type="check-circle" className={"done"} theme="twoTone" twoToneColor="#12BF66"
                        style={{fontSize: '32px'}}/> : null}
                <div>{item.sectionName}</div>
              </>}
                    className={"course-section-item" + (this.props.selectedItem === item.id ? " selected" : "")}
                    id={item.id} key={item.id}/>}</>
          </List.Item>
        }}
      />
    );
  }
}

export default CourseSectionList;