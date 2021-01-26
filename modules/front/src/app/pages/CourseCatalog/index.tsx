import React from 'react';
import Page from "../../hoc/PageContentHoc";
import {collection} from "@cuba-platform/react";
import {observer} from "mobx-react";
import {Course} from "../../../cuba/entities/base/tsadv$Course";
import CourseCarousel from "../../components/CourseCarousel";
import {CourseCardProps} from "../../components/CourseCard";
import CourseList from "../Course/CourseList";

@observer
class CourseCatalog extends React.Component {

  dataCollection = collection<Course>(Course.NAME, {
    view: "course-portal-browse",
    sort: "-createTs"
  });

  render() {
    return (
      <Page pageName={"Каталог курсов"}>
        <CourseList status={this.dataCollection.status} items={this.dataCollection.items.map(course => {
          return {
            avgRate: course.avgRate,
            courseId: course.id,
            courseName: course.name,
            imgBase64: course.logo,
            rateCount: 90
          } as CourseCardProps
        })}/>
      </Page>
    );
  }
}

export default CourseCatalog;