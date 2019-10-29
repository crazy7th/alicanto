import React, { Component } from "react";
import Swiper from "swiper";

export default class extends Component {
  componentDidMount() {
    new Swiper(".swiper-home", {
      spaceBetween: 10,
      slidesPerView: 1.2,
      slidesOffsetBefore: 15,
      slidesOffsetAfter: 15,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        768: {
          spaceBetween: 10,
          slidesPerView: 1.2,
          slidesOffsetBefore: 15,
          slidesOffsetAfter: 15
        }
      }
    });
  }

  render() {
    return (
      <section className="section section-slider">
        <div className="swiper-home swiper-container">
          <h2> Promo </h2>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="/static/homepage/slider1@2x.svg" />
            </div>
            <div className="swiper-slide">
              <img src="/static/homepage/slider1@2x.svg" />
            </div>
            <div className="swiper-slide">
              <img src="/static/homepage/slider1@2x.svg" />
            </div>
          </div>
        </div>
        <div className="swiper-box mt10">
          <div className="swiper-pagination"></div>
          <p> Lihat Semua </p>
        </div>
      </section>
    );
  }
}
