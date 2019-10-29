import React from "react";
import Grid from "@material-ui/core/Grid";

class DenomWithDiscount extends React.Component {
  render() {
    return (
      <Grid
        item
        xs={6}
        align="center"
        className="nominal-item"
        key={this.props.productId}
        url={this.props.productUrl}
        onClick={this.props.addToCart}
        product_label={this.props.productLabel}
        admin_fee={this.props.adminFee}
        price={this.props.productPrice}
      >
        <div
          className="nominal-item__discount"
          url={this.props.productUrl}
          product_label={this.props.productLabel}
          admin_fee={this.props.adminFee}
          price={this.props.productPrice}
        >
          <p> {menu.diskon} </p>{" "}
        </div>
        <p
          className="nominal-item__name"
          url={this.props.productUrl}
          product_label={this.props.productLabel}
          admin_fee={this.props.adminFee}
          price={this.props.productPrice}
        >
          {this.props.productLabel}
        </p>
        <p
          className="nominal-item__name2"
          url={this.props.productUrl}
          product_label={this.props.productLabel}
          admin_fee={this.props.adminFee}
          price={this.props.productPrice}
        >
          Harga
        </p>
        <p
          className="nominal-item__price"
          url={this.props.productUrl}
          product_label={this.props.productLabel}
          admin_fee={this.props.adminFee}
          price={this.props.productPrice}
        >
          Rp
          {this.props.productPrice.replace(
            /(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
            "$1."
          )}
        </p>
      </Grid>
    );
  }
}
export default DenomWithDiscount;
