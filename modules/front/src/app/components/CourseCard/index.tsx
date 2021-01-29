import React from 'react';
import Meta from "antd/es/card/Meta";
import {Card, Rate} from "antd";

export type CourseCardProps = {
  loading?: boolean
  imgBase64?: string;
  courseName?: string,
  rateCount?: number,
  avgRate?: number,
  courseId?: string,
  imageIcon?: string,
}

class CourseCard extends React.Component<CourseCardProps> {
  render() {
    return (
      <Card className={"course-card"}
            loading={this.props.loading}
            hoverable={!this.props.loading}
            cover={<>{this.props.imageIcon ? <img src={this.props.imageIcon} alt="online" className={"icon-online"}/> : null}<img alt={this.props.courseName}
                             src={this.props.imgBase64 ? "data:image/png;base64, " + this.props.imgBase64 : undefined}/></>}>
        <Meta title={this.props.courseName}
              description={<><Rate disabled defaultValue={this.props.avgRate} allowHalf/> ({this.props.rateCount})</>}/>
      </Card>
    );
  }
}

export default CourseCard;