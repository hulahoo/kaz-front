import React from 'react';
import {DataContainerStatus} from "@cuba-platform/react";
import CourseCard, {CourseCardProps} from "../CourseCard";
import {Button} from "antd";
import {observer} from "mobx-react";
import {observable} from "mobx";

type Props<T> = {
  status: DataContainerStatus,
  items: Array<CourseCardProps>
}

@observer
class CourseCarousel<T> extends React.Component<Props<T>> {

  componentDidUpdate(prevProps: Readonly<Props<T>>, prevState: Readonly<{}>, snapshot?: any): void {
    const carouselCourses = this.carouselCoursesRef.current;
    this.showNextCoursesButton = carouselCourses ? carouselCourses.scrollWidth > carouselCourses.clientWidth : false;
  }

  carouselCoursesRef = React.createRef<HTMLDivElement>();
  prevButtonRef = React.createRef<any>();
  nextButtonRef = React.createRef<any>();
  @observable showNextCoursesButton: boolean = false;

  handleNextButtonClick = (e: React.MouseEvent) => {
    const carouselContainer = this.carouselCoursesRef.current;
    this.prevButtonRef.current!.buttonNode.removeAttribute("style");

    carouselContainer!.scroll({
      left: carouselContainer!.scrollLeft + carouselContainer!.offsetWidth,
      behavior: 'smooth'
    });
    setTimeout(() => {
      if (carouselContainer!.offsetWidth + carouselContainer!.scrollLeft >= carouselContainer!.scrollWidth) {
        this.nextButtonRef!.current.buttonNode.style.display = 'none';
        return;
      }
    }, 700);
  };

  handlePrevButtonClick = (e: React.MouseEvent) => {
    const carouselContainer = this.carouselCoursesRef.current;
    this.nextButtonRef.current!.buttonNode.removeAttribute("style");

    carouselContainer!.scroll({
      left: carouselContainer!.scrollLeft - carouselContainer!.offsetWidth,
      behavior: 'smooth'
    });
    setTimeout(() => {
      console.log(carouselContainer!.scrollLeft);
      if (carouselContainer!.scrollLeft === 0) {
        this.prevButtonRef!.current.buttonNode.style.display = 'none';
        return;
      }
    }, 700);
  };

  render() {
    const {status, items} = this.props;

    const courses = [];
    if (status !== 'LOADING') {
      for (let i = 0; i < 10; i++) {
        courses.push(<div className="carousel-item"><CourseCard key={items[0].courseId} loading={false} {...items[0]}
                                                                courseName={items[0]!.courseName! + (i + 1)}/></div>)
      }
    }

    return (
      <div className={"carousel-courses-wrapper"}>
        <div className={"carousel-courses"} ref={this.carouselCoursesRef}>
          {status === 'LOADING' ? <CourseCard loading={true}/> : courses}
        </div>
        {status === 'LOADING'
          ? <></>
          : this.showNextCoursesButton
            ? <><Button className={"carousel-prev-button carousel-button"} shape={"circle"}
                        icon={"left"}
                        style={{display: 'none'}} ref={this.prevButtonRef} onClick={this.handlePrevButtonClick}/>
              <Button className={"carousel-next-button carousel-button"} shape={"circle"} icon={"right"}
                      onClick={this.handleNextButtonClick}
                      ref={this.nextButtonRef}/></>
            : <></>}
      </div>
    );
  }
}

export default CourseCarousel;