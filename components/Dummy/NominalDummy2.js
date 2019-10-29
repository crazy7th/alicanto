import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { inject } from "mobx-react";

class Nominal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartFromMultiprice: []
    };
    this.addToCart = this.addToCart.bind(this);
    this.setFormatPrice = this.setFormatPrice.bind(this);
  }

  /**
   * Function to add to cart if click denom
   *
   * @param  {string} e value
   * @return none
   */

  async addToCart(e) {
    const digitNumber = this.props.numberPhone.length;

    // set warning if digit number <8 when click denom
    if (digitNumber < 8) {
      await this.props.changeStatus(true);
    } else {
      // get product url
      const url = e.target.getAttribute("url");

      // get data for cart
      let selectedValue = {};
      selectedValue.product_label = e.target.getAttribute("product_label");
      selectedValue.admin_fee = e.target.getAttribute("admin_fee");
      selectedValue.no_handphone = this.props.numberPhone;
      selectedValue.price = e.target.getAttribute("price");

      // call loading page
      await this.props.changeStatusLoading(true);

      // set format data
      const dataCart = await this.setFormatPrice(selectedValue);

      // import some function from store
      const { postCart } = this.props.transactionStore;
      const { token, getCookie } = this.props.userStore;

      // get token from cookies
      let tokenOnCookie = "";
      await getCookie("token").then(function(result) {
        tokenOnCookie = result;
      });

      const tokens = token.access ? token.access : tokenOnCookie;

      // hit API post cart
      const sendCart = await postCart(tokens, url);
      if (sendCart.status === 200) {
        await this.setState({ cartFromMultiprice: dataCart });
        await localStorage.setItem(
          "cart",
          JSON.stringify(this.state.cartFromMultiprice)
        );
        // disable loading page
        await this.props.changeStatusLoading(false);

        Router.push("/transaction/checkout");
      } else if (sendCart.status === 401) {
        alert("sesi anda telah habis, silahkan login ulang lagi");
        // disable loading page
        await this.props.changeStatusLoading(false);

        Router.push("/signin");
      }
    }
  }

  async setFormatPrice(data) {
    // set fee value
    let newData = data;
    if ((newData.admin_fee === null) | (newData.admin_fee === 0)) {
      newData.admin_fee = "Gratis!";
      newData.price =
        data.price !== null
          ? data.price.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
          : 0;
      newData.total_price =
        data.price !== null
          ? data.price.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
          : 0;
    } else {
      if (data.price !== null && data.admin_fee !== null) {
        const total_price = parseInt(data.price) + parseInt(data.admin_fee);
        newData.total_price = total_price
          .toString()
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        newData.admin_fee = data.admin_fee
          .toString()
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        newData.price = data.price
          .toString()
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
      }
    }
    return newData;
  }

  render() {
    // if (this.props.productList.length !== 0) {
    return (
      <div className="section section-nominal">
        <Paper spacing={2} elevation={0} className="nominal-base">
          <h2 className="nominal-qtitle"> Internet Harian </h2>
          <img className="nominal-logo" src={this.props.logoOperator} />
          <Grid container wrap="nowrap" spacing={2} className="nominal-grid">
            {/* ----------- PAKET DATA ACTIVE ----------- */}
            <Grid
              item
              xs={6}
              align="center"
              className="nominal-item nominal-paketdata"
            >
              <p className="nominal-item__qname">Freedom Combo M</p>
              <p className="nominal-item__quota">40gb</p>
              <p className="nominal-item__name2">Harga</p>
              <p className="nominal-item__price">Rp120.000</p>
              <p className="nominal-item__more">Lihat Selengkapnya</p>
            </Grid>
            {/* ----------- END PAKET DATA ACTIVE----------- */}

            {/* ----------- PAKET DATA INACTIVE ----------- */}
            <Grid
              item
              xs={6}
              align="center"
              className="nominal-item nominal-item-disabled nominal-paketdata"
            >
              <p className="nominal-item__sold">
                <img src="/static/transaction/icon-alert-red.svg" /> Waduh
                produk ini lagi abis
              </p>
              <p className="nominal-item__qname">Freedom Combo M</p>
              <p className="nominal-item__quota">40gb</p>
              <p className="nominal-item__name2">Harga</p>
              <p className="nominal-item__price">Rp120.000</p>
              <p className="nominal-item__more">Lihat Selengkapnya</p>
            </Grid>
            {/* ----------- END PAKET DATA INACTIVE----------- */}

            {/* ----------- PAKET DATA DISCOUNT ----------- */}
            <Grid
              item
              xs={6}
              align="center"
              className="nominal-item nominal-item-discount nominal-paketdata"
            >
              <div className="nominal-item__discount">
                <p> Hemat 20% </p>
              </div>
              <p className="nominal-item__qname">Freedom Combo M</p>
              <p className="nominal-item__quota">40gb</p>
              <p class="nominal-item__false"> Harga 50.000 </p>
              <p className="nominal-item__price">Rp120.000</p>
              <p className="nominal-item__more">Lihat Selengkapnya</p>
            </Grid>
            {/* ----------- END PAKET DATA DISCOUNT----------- */}
          </Grid>
        </Paper>

        <Paper spacing={2} elevation={0} className="nominal-base">
          <h2 className="nominal-qtitle"> Internet Bulanan </h2>
          <img className="nominal-logo" src={this.props.logoOperator} />
          <Grid container wrap="nowrap" spacing={2} className="nominal-grid">
            {/* ----------- PAKET DATA ACTIVE ----------- */}
            <Grid
              item
              xs={6}
              align="center"
              className="nominal-item nominal-paketdata"
            >
              <p className="nominal-item__qname">Freedom Combo M</p>
              <p className="nominal-item__quota">40gb</p>
              <p className="nominal-item__name2">Harga</p>
              <p className="nominal-item__price">Rp120.000</p>
              <p className="nominal-item__more">Lihat Selengkapnya</p>
            </Grid>
            {/* ----------- END PAKET DATA ACTIVE----------- */}

            {/* ----------- PAKET DATA INACTIVE ----------- */}
            <Grid
              item
              xs={6}
              align="center"
              className="nominal-item nominal-item-disabled nominal-paketdata"
            >
              <p className="nominal-item__sold">
                <img src="/static/transaction/icon-alert-red.svg" /> Waduh
                produk ini lagi abis
              </p>
              <p className="nominal-item__qname">Freedom Combo M</p>
              <p className="nominal-item__quota">40gb</p>
              <p className="nominal-item__name2">Harga</p>
              <p className="nominal-item__price">Rp120.000</p>
              <p className="nominal-item__more">Lihat Selengkapnya</p>
            </Grid>
            {/* ----------- END PAKET DATA INACTIVE----------- */}

            {/* ----------- PAKET DATA DISCOUNT ----------- */}
            <Grid
              item
              xs={6}
              align="center"
              className="nominal-item nominal-item-discount nominal-paketdata"
            >
              <div className="nominal-item__discount">
                <p> Hemat 20% </p>
              </div>
              <p className="nominal-item__qname">Freedom Combo M</p>
              <p className="nominal-item__quota">40gb</p>
              <p class="nominal-item__false"> Harga 50.000 </p>
              <p className="nominal-item__price">Rp120.000</p>
              <p className="nominal-item__more">Lihat Selengkapnya</p>
            </Grid>
            {/* ----------- END PAKET DATA DISCOUNT----------- */}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default inject("userStore", "transactionStore")(Nominal);
