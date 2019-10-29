import React from "react";
import Grid from "@material-ui/core/Grid";
import { SlugMultiprice } from "../../components/Transaction/SlugMultiprice";

class DenomInactive extends React.Component {
  render() {
    const productType = localStorage.getItem("productType");
    const slugPaketData = SlugMultiprice.paketData;
    return (
      <Grid
        item
        xs={6}
        align="center"
        className="nominal-item nominal-item-disabled"
        key={this.props.productId}
      >
        <p className="nominal-item__sold">
          <img src="/static/transaction/icon-alert-red.svg" /> Waduh produk ini
          lagi abis
        </p>
        <p className={this.props.isCenterText ? "nominal-item__name text-center" : "nominal-item__name"}>{this.props.productLabel}</p>
        <p className={this.props.isCenterText ? "nominal-item__name2 text-center" : "nominal-item__name2"}>Harga</p>
        <p className={this.props.isCenterText ? "nominal-item__price text-center" : "nominal-item__price"}>
          Rp
          {this.props.productPrice}
        </p>
        {productType === slugPaketData &&
        this.props.description !== null &&
        this.props.description !== "" ? (
          <p className="nominal-item__more">Lihat Selengkapnya</p>
        ) : (
          ""
        )}
      </Grid>
    );
  }
}
export default DenomInactive;
