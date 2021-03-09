import React from 'react';
import Page from "../../hoc/PageContentHoc";
import {observer} from "mobx-react";
import CourseList from "../Course/CourseList";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Section from "../../hoc/Section";
import {Slider} from "antd";
import Carousel, {SliderFile} from "../../components/Carousel/Carousel";
import {collection} from "@cuba-platform/react";
import {LmsSlider} from "../../../cuba/entities/base/tsadv$LmsSlider";
import {LmsSliderImage} from "../../../cuba/entities/base/tsadv$LmsSliderImage";
import {queryCollection} from "../../util/QueryDataCollectionStore";
import {observable} from "mobx";
import {getBlobUrl} from "../../util/util";

@observer
class CourseCatalog extends React.Component<WrappedComponentProps> {

  @observable
  carouselImages: SliderFile[] = [];

  render() {
    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.course-catalog"})}>
        <Section visible size="large" padding="none">
          <Carousel images={this.carouselImages}/>
        </Section>
        <Section size="large" visible={false}>
          <CourseList/>
        </Section>
      </Page>
    );
  }


  componentDidMount(): void {
    const sliderImages = queryCollection<LmsSliderImage>(LmsSliderImage.NAME, "sliderImages", {
      code: "course-catalog",
    });

    sliderImages.afterLoad = () => {
      console.log(sliderImages.items);
      sliderImages.items.forEach(si => {
        console.log('1');
        getBlobUrl(si.image!.id).then(fileUrl => {
          this.carouselImages.push({
            url: si.url ? si.url : undefined,
            type: "src",
            src: fileUrl
          });
        })
      });
    };
    //
    // sliderImages.load();
  }
}

export default injectIntl(CourseCatalog);