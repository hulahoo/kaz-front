import React from 'react';
import {collection, DataContainerStatus} from "@cuba-platform/react";
import CourseCard, {CourseCardProps} from "../../components/CourseCard";
import {Button, Spin, Tabs} from "antd";
import {observer} from "mobx-react";
import {DicCategory} from "../../../cuba/entities/base/tsadv$DicCategory";
import {Link} from "react-router-dom";

type Props<T> = {
  status: DataContainerStatus,
  items: Array<CourseCardProps>
}

@observer
class CourseList<T> extends React.Component<Props<T>> {

  dataCollection = collection<DicCategory>(DicCategory.NAME, {view: "category-courses"});

  render() {
    const {status, items} = this.dataCollection;
    const {TabPane} = Tabs;

    return (
      <Spin spinning={status === 'LOADING'}>
        <Tabs>
          {status === 'DONE' ? items.map(category => <TabPane tab={category.langValue1} key={category.id}>
            <div className={"courses-cards-wrapper"}>
              <div className={"courses-cards"}>
                {category.courses!.map(course => <Link to={"/course/" + course.id}><CourseCard key={course.id}
                                                             loading={false} {...course} courseName={course.name!}
                                                             imgBase64={course.logo} rateCount={90}
                                                             avgRate={course.avgRate} courseId={course.id}/></Link>)}
              </div>
            </div>
          </TabPane>) : <></>}
        </Tabs>
      </Spin>
    );
  }

  componentDidMount(): void {
    this.dataCollection.load();
  }
}

export default CourseList;