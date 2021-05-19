import React from 'react';
import PanelCard from "../../components/CourseCard";
import {Spin, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import {DicCategory} from "../../../cuba/entities/base/tsadv$DicCategory";
import {Link} from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import {runInAction} from "mobx";
import Meta from "antd/es/card/Meta";
import ImageLogo from "../../components/ImageLogo";
import {restServices} from "../../../cuba/services";
import {SerializedEntity} from "@cuba-platform/rest";
import {serviceCollection} from "../../util/ServiceDataCollectionStore";
import Notification from "../../util/Notification/Notification";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Rate from "../../components/Rate/Rate";
import {getFileUrl} from "../../util/util";
import CardIconFactory from "../CourseCatalog/CardIconFactory";
import {RootStoreProp} from "../../store";

@inject("rootStore")
@observer
class CourseList<T> extends React.Component<WrappedComponentProps & RootStoreProp> {

  dataCollection = serviceCollection(restServices.courseService.allCourses);

  onSearch = (value: string) => {
    if (value) {
      restServices.courseService.searchCourses({courseName: value}).then((foundCategoryWithCourses: Array<SerializedEntity<DicCategory>>) => {
        if (foundCategoryWithCourses.length === 0) {
          Notification.info({
            message: this.props.intl.formatMessage({id: "courses.search.noFound"})
          });
          return;
        }
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

    const defaultTabKey = this.props.rootStore!.courseCatalogStore ? this.props.rootStore!.courseCatalogStore.selectedCategoryId : undefined;

    return (
      <>
        <Spin spinning={status === 'LOADING'}>
          <SearchInput onSearch={this.onSearch}/>
          {status === 'DONE' ? <Tabs defaultActiveKey={defaultTabKey} onChange={this.tabOnChange}>
            {items.map((category: SerializedEntity<DicCategory>) => <TabPane
              tab={category._instanceName} key={category.id}>
              <div className={"courses-cards-wrapper"}>
                <div className={"courses-cards"}>
                  {category.courses!.map((course: any) => <Link to={"/course/" + course.id}><PanelCard key={course.id}
                                                                                                       loading={false} {...course}
                                                                                                       name={course.name!}
                                                                                                       header={(<>
                                                                                                           {
                                                                                                             course.enrollments.length > 0 && (CardIconFactory.getIcon(course.enrollments![0].status) != null)
                                                                                                               ? React.createElement(CardIconFactory.getIcon(course.enrollments![0].status)!, {className: "course-icon left-icon"})
                                                                                                               : null
                                                                                                           }
                                                                                                           {
                                                                                                             course.isOnline ?
                                                                                                               <img
                                                                                                                 src={require("../../../resources/icons/online.png")}
                                                                                                                 alt="online"
                                                                                                                 className="course-icon right-icon"/> :
                                                                                                               null}
                                                                                                           <ImageLogo
                                                                                                             type="src"
                                                                                                             imgSrc={course.logo ? getFileUrl(course.logo.id) : undefined}
                                                                                                             name={course.name!}/>
                                                                                                         </>
                                                                                                       )}>
                    <Meta title={course.name}
                          description={<><Rate disabled defaultValue={course.rating || 0}
                                               allowHalf/>({course.commentCount || 0})</>}/>
                  </PanelCard></Link>)}
                </div>
              </div>
            </TabPane>)}
          </Tabs> : <></>}
        </Spin>
      </>
    );
  }

  componentDidMount(): void {
    this.dataCollection.load();
    const {courseCatalogStore} = this.props.rootStore!;
    if (!courseCatalogStore) {
      this.props.rootStore!.createCourseCatalogStore();
    }
  }

  tabOnChange = (activeKey: string) => {
    this.props.rootStore!.courseCatalogStore!.setSelectedCategoryId(activeKey);
  }
}

export default injectIntl(CourseList);