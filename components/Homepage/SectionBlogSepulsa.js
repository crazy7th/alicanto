import React, { Component } from "react";
import { inject } from "mobx-react";
import Swiper from "swiper";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

@inject("productStore", "userStore")
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: "",
      detailOrder: ""
    };
    this.getListBlog = this.getListBlog.bind(this);
    this.getBlogDetail = this.getBlogDetail.bind(this);
  }

  async componentDidMount() {
    this.callSwiper();
    console.warn("cek this props", this.props);
    await this.getListBlog();
    await this.getBlogDetail(10993);
  }

  async getListBlog() {
    const { showBlogContent } = this.props.productStore;
    const listBlog = await showBlogContent();
    console.warn("cek list blog data", listBlog);
  }

  async getBlogDetail(idBlog) {
    const { showBlogDetail } = this.props.productStore;
    const blogDetail = await showBlogDetail(idBlog);
    console.warn("Cek blog detail response", blogDetail);
  }

  callSwiper() {
    new Swiper(".swiper-article", {
      spaceBetween: 15,
      slidesPerView: 2.3,
      slidesOffsetBefore: 15,
      slidesOffsetAfter: 15,
      pagination: {
        el: ".article-pagination",
        clickable: true
      },
      breakpoints: {
        768: {
          spaceBetween: 15,
          slidesPerView: 2.3,
          slidesOffsetBefore: 15,
          slidesOffsetAfter: 15
        }
      }
    });
  }

  render() {
    return (
      <>
        <section className="section section-article">
          <h2> Artikel </h2>
          <div className="swiper-article swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="image-article">
                  <img src="/static/homepage/article1.png" />
                </div>
                <div className="desc-article">
                  <p className="title"> Lorem Ipsum dolor do Amet </p>
                  <p className="desc">
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div align="center">
                    <Button variant="outlined" size="medium" color="primary">
                      Baca Sekarang
                    </Button>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="image-article">
                  <img src="/static/homepage/article1.png" />
                </div>
                <div className="desc-article">
                  <p className="title"> Lorem Ipsum dolor do Amet </p>
                  <p className="desc">
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div align="center">
                    <Button variant="outlined" size="medium" color="primary">
                      Baca Sekarang
                    </Button>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="image-article">
                  <img src="/static/homepage/article1.png" />
                </div>
                <div className="desc-article">
                  <p className="title"> Lorem Ipsum dolor do Amet </p>
                  <p className="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div align="center">
                    <Button variant="outlined" size="medium" color="primary">
                      Baca Sekarang
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section section-slider mt0">
          <div className="swiper-box mt10">
            <div className="article-pagination"></div>
            <p> Lihat Semua </p>
          </div>
        </section>
      </>
    );
  }
}
