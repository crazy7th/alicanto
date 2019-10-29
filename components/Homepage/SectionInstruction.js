import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

export default class extends Component {
  render() {
    return (
      <section className="section section-banner">
        <div className="banner">
          <h2> Info </h2>
          <div className="banner-item">
            <Paper spacing={6} elevation={0} className="banner-item__wrapper">
              <div className="banner-item__left">
                <img src="/static/homepage/icon-info.svg" />
              </div>
              <div className="banner-item__right">
                <p className="banner-item__title">
                  Cara menggunakan fitur AutoPay
                </p>
                <p className="banner-item__desc">
                  Yuk ikuti langkah mudah untuk mengaktifkan fitur ini
                </p>
              </div>
            </Paper>
          </div>
          <div className="banner-item">
            <Paper spacing={6} elevation={0} className="banner-item__wrapper">
              <div className="banner-item__left">
                <img src="/static/homepage/icon-info.svg" />
              </div>
              <div className="banner-item__right">
                <p className="banner-item__title">
                  Cara menggunakan fitur AutoPay
                </p>
                <p className="banner-item__desc">
                  Yuk ikuti langkah mudah untuk mengaktifkan fitur ini
                </p>
              </div>
            </Paper>
          </div>
          <div className="banner-item">
            <Paper spacing={6} elevation={0} className="banner-item__wrapper">
              <div className="banner-item__left">
                <img src="/static/homepage/icon-info.svg" />
              </div>
              <div className="banner-item__right">
                <p className="banner-item__title">
                  Cara menggunakan fitur AutoPay
                </p>
                <p className="banner-item__desc">
                  Yuk ikuti langkah mudah untuk mengaktifkan fitur ini
                </p>
              </div>
            </Paper>
          </div>
        </div>
        <div className="banner-all">
          <p> Lihat Semua </p>
        </div>
      </section>
    );
  }
}
