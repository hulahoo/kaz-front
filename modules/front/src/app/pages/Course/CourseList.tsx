import React from 'react';
import {collection} from "@cuba-platform/react";
import PanelCard from "../../components/CourseCard";
import {Rate, Spin, Tabs} from "antd";
import {observer} from "mobx-react";
import {DicCategory} from "../../../cuba/entities/base/tsadv$DicCategory";
import {Link} from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import {restQueries} from "../../../cuba/queries";
import {runInAction} from "mobx";
import Meta from "antd/es/card/Meta";
import ImageLogo from "../../components/ImageLogo";
import {restServices} from "../../../cuba/services";
import {SerializedEntity} from "@cuba-platform/rest";

@observer
class CourseList<T> extends React.Component {

  dataCollection = collection<DicCategory>(DicCategory.NAME, {view: "category-courses"});

  onSearch = (value: string) => {
    if (value) {
      restServices.courseService.searchCourses({courseName: value}).then((foundCategoryWithCourses: Array<SerializedEntity<DicCategory>>) => {
        runInAction(() => {
          this.dataCollection.items = foundCategoryWithCourses;
        })
      });
    } else {
      this.dataCollection.clear();
      this.dataCollection.load();
    }
  };

  render() {
    const {status, items} = this.dataCollection;
    const {TabPane} = Tabs;

    return (
      <>
        <Spin spinning={status === 'LOADING'}>
          <SearchInput onSearch={this.onSearch}/>
          <Tabs>
            {status === 'DONE' ? items.map(category => <TabPane tab={category.langValue1} key={category.id}>
              <div className={"courses-cards-wrapper"}>
                <div className={"courses-cards"}>
                  {category.courses!.map(course => <Link to={"/course/" + course.id}><PanelCard key={course.id}
                                                                                                loading={false} {...course}
                                                                                                name={course.name!}
                                                                                                header={(<>
                                                                                                    {(course as
                                                                                                      any).isOnline ?
                                                                                                      <img
                                                                                                        src={require("../../../resources/icons/online.png")}
                                                                                                        alt="online"
                                                                                                        className={"icon-online"}/> :
                                                                                                      null}
                                                                                                    <ImageLogo
                                                                                                      type="base64"
                                                                                                      imgSrc={course.logo}
                                                                                                      name={course.name!}/>
                                                                                                  </>
                                                                                                )}>
                    <Meta title={course.name}
                          description={<><Rate disabled defaultValue={course.avgRate} allowHalf/>(90)</>}/>
                  </PanelCard></Link>)}
                </div>
              </div>
            </TabPane>) : <></>}
          </Tabs>
        </Spin>
      </>
    );
  }

  componentDidMount(): void {
    this.dataCollection.load();
  }
}

export default CourseList;