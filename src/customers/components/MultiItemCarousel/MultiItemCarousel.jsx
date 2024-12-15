import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";
import { topMeels } from "../../../Data/topMeels";

const responsive= [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 5,
    }
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 3,
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    }
  }
];

export default class MultipleItemsCarousel extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false, // Set to false if you want the end to stop
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 2,
      autoplay: false, // Disable autoplay
      pauseOnHover: false,
      arrows: false,
      responsive,
    };

    return (
      <div style={{ overflow:  "scroll" }}> {/* Hide the scrollbar */}
        <Slider {...settings}>
          {topMeels.map((item) => (
            <CarouselItem key={item.title} image={item.image} title={item.title} />
          ))}
        </Slider>
      </div>
    );
  }
}
