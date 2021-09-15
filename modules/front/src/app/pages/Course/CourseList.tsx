import React from 'react';
import PanelCard from "../../components/CourseCard";
import {Select, Spin, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import { observable, runInAction} from "mobx";
import Meta from "antd/es/card/Meta";
import ImageLogo from "../../components/ImageLogo";
import {restServices} from "../../../cuba/services";
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
  dataCollection = serviceCollection(
    (pagination) => restServices.courseService.allCourses({
      personGroupId: this.props.rootStore!.userInfo.personGroupId!
    }));
  @observable
  filterValue:string = ""
  handleChange = (name:string, value:string) =>{
    this.filterValue = value
    console.log("filteredValue",this.filterValue)
  }
  onSearch = (value: string) => {
    if (value) {
      restServices.courseService.searchCourses({
        personGroupId: this.props.rootStore!.userInfo.personGroupId!,
        courseName: value
      })
        .then((foundCategoryWithCourses) => {
          if (foundCategoryWithCourses.length === 0) {
            Notification.info({
              message: this.props.intl.formatMessage({id: "courses.search.noFound"})
            });
            return;
          }
          runInAction(() => {
            this.dataCollection.items = foundCategoryWithCourses as any;
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
    const { Option } = Select;
    let sortedItems = items;
    const defaultTabKey = this.props.rootStore!.courseCatalogStore ? this.props.rootStore!.courseCatalogStore.selectedCategoryId : undefined;
    console.log(this.dataCollection)
    return (
      <>
        <Spin spinning={status === 'LOADING'}>
          <div style={{display:"flex"}}>
            <div style={{width:"70%"}}>
              <SearchInput onSearch={this.onSearch}/>
            </div>
            <div style={{width:"20%", marginLeft:"30px"}}>
              <Select allowClear={true} placeholder={"Выберите..."} onChange={value => this.handleChange("name",value as string)} style={{width:"100%"}} >
                <Option value={"1"}>{this.props.intl.formatMessage({id: "filter.AtoZ"})}</Option>
                <Option value={"2"}>{this.props.intl.formatMessage({id: "filter.ZtoA"})}</Option>
                <Option value={"3"}>{this.props.intl.formatMessage({id: "filter.Newest"})}</Option>
                <Option value={"4"}>{this.props.intl.formatMessage({id: "filter.Oldest"})}</Option>
              </Select>
            </div>
          </div>
          {status === 'DONE' ? <Tabs defaultActiveKey={defaultTabKey} onChange={this.tabOnChange}>
            {sortedItems.map((category: any) => <TabPane
              tab={category.langValue} key={category.id}>
              <div className={"courses-cards-wrapper"}>
                <div className={"courses-cards"}>
                  {category.courses!.sort((a:any,b:any) => {
                    return   this.filterValue ==='1'?
                      a.name.localeCompare(b.name,'en',{numeric:true})
                      :this.filterValue ===""? 0
                        :this.filterValue ==="2"?  b.name.localeCompare(a.name,'en',{numeric:true})
                          :this.filterValue==="3"? new Date(b.createTs).valueOf() - new Date (a.createTs).valueOf()
                            :this.filterValue==="4"?new Date(a.createTs).valueOf() - new Date (b.createTs).valueOf()
                            :""

                  }).map((course: any) => <Link to={"/course/" + course.id}>
                    <PanelCard key={course.id}
                               loading={false} {...course}
                               name={course.name!}
                               header={(<>
                                   {
                                     course.enrollmentId && (CardIconFactory.getIcon(course.enrollmentStatus) != null)
                                       ? React.createElement(CardIconFactory.getIcon(course.enrollmentStatus)!, {className: "course-icon left-icon"})
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
                                     imgSrc={course.logo ? getFileUrl(course.logo) : undefined}
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
  constructor(props:WrappedComponentProps,props2:RootStoreProp){
    super(props,props2);
    this.state={
      filteredValue:""
    }
  }
  componentDidMount(): void {
    console.log("DidMount")
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