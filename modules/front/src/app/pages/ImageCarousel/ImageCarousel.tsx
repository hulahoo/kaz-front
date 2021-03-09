import React, {Component} from 'react';
import {queryCollection} from "../../util/QueryDataCollectionStore";
import {LmsSliderImage} from "../../../cuba/entities/base/tsadv$LmsSliderImage";
import {getBlobUrl} from "../../util/util";
import {observer} from "mobx-react";
import {observable} from "mobx";
import Carousel, {SliderFile} from "../../components/Carousel/Carousel";
import Section from "../../hoc/Section";

export type ImageCarouselProps = {
  code: string
}

@observer
export default class ImageCarousel extends Component<ImageCarouselProps> {

  @observable
  carouselImages: SliderFile[] = [];

  render() {
    return (
      <Carousel images={this.carouselImages}/>
    );
  }

  componentDidMount(): void {
    const sliderImages = queryCollection<LmsSliderImage>(LmsSliderImage.NAME, "sliderImages", {
      code: this.props.code,
    });

    sliderImages.afterLoad = () => {
      sliderImages.items.forEach(si => {
        getBlobUrl(si.image!.id).then(fileUrl => {
          this.carouselImages.push({
            url: si.url ? si.url : undefined,
            type: "src",
            src: fileUrl
          });
        })
      });
    };
  }
}