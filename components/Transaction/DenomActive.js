import React from "react";
import Grid from "@material-ui/core/Grid";
import { SlugMultiprice } from "../../components/Transaction/SlugMultiprice";
import PopupPaketData from "./PopupPaketData";

class DenomActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false
    };
    this.showPopUpPaketData = this.showPopUpPaketData.bind(this);
  }
  async showPopUpPaketData(status) {
    await this.setState({ showPopUp: status });
  }

  render() {
    const productType = localStorage.getItem("productType");
    const slugPaketData = SlugMultiprice.paketData;
    return (
      <Grid
        item
        xs={6}
        align="center"
        className="nominal-item nominal-item-discount"
        key={this.props.productId}
        url={this.props.productUrl}
        product_label={this.props.productLabel}
        admin_fee={this.props.adminFee}
        price={this.props.productPrice}
        style={{ minHeight: `${this.props.minHeight}` }}
      >
        {this.props.productIsPromo ? (
          <div className="nominal-item__discount">
            <p> Hemat 20% </p>
          </div>
          )
          : (
            ""
          )}
        <p
          className={this.props.isCenterText ? "nominal-item__name text-center" : "nominal-item__name"}
          url={this.props.productUrl}
          product_label={this.props.productLabel}
          admin_fee={this.props.adminFee}
          price={this.props.productPrice}
          onClick={this.props.addToCart}
        >
          {this.props.productLabel}
        </p>
        <p
          className={this.props.isCenterText ? "nominal-item__name2 text-center" : "nominal-item__name2"}
          url={this.props.productUrl}
          product_label={this.props.productLabel}
          admin_fee={this.props.adminFee}
          price={this.props.productPrice}
          onClick={this.props.addToCart}
        >
          Harga
        </p>
        <p
          className={this.props.isCenterText ? "nominal-item__price text-center" : "nominal-item__price"}
          url={this.props.productUrl}
          product_label={this.props.productLabel}
          admin_fee={this.props.adminFee}
          price={this.props.productPrice}
          onClick={this.props.addToCart}
        >
          Rp
          {this.props.productPrice.replace(
            /(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
            "$1."
          )}
        </p>
        {productType === slugPaketData &&
          this.props.description !== null &&
          this.props.description !== "" ? (
            <p
              className="nominal-item__more"
              onClick={() => this.showPopUpPaketData(true)}
            >
              Lihat Selengkapnya
          </p>
          ) : (
            ""
          )}
        {this.state.showPopUp ? (
          <PopupPaketData
            url={this.props.productUrl}
            product_label={this.props.productLabel}
            admin_fee={this.props.adminFee}
            price={this.props.productPrice}
            addToCart={this.props.addToCart}
            description={this.props.description}
            showPopUp={this.state.showPopUp}
            changeShowPopUp={status => this.showPopUpPaketData(status)}
            {...this.props}
          />
        ) : (
            ""
          )}
      </Grid>
    );
  }
}
export default DenomActive;
