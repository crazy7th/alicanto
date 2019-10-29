import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import Link from "next/link";
import { inject } from "mobx-react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";

class Nominal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartFromMultiprice: [],
      drawerIsOpen: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.setFormatPrice = this.setFormatPrice.bind(this);
  }

  state = { drawerIsOpen: false };

  handleDrawerOpen = () => {
    this.setState({ drawerIsOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false });
  };

  toggleDrawer2 = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

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
          <div className="nominal-baselogo">
            <h2> Pilih Paket Data : </h2>
            <img
              className="nominal-logo"
              src="/static/transaction/icon-tsel.svg"
            />
          </div>
          <p className="nominal-desc"> Penawaran Terbaik </p>
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
              <p className="nominal-item__more" onClick={this.handleDrawerOpen}>
                Lihat Selengkapnya
              </p>
            </Grid>
            {/* ----------- END PAKET DATA ACTIVE----------- */}

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
              <p className="nominal-item__false"> Harga 50.000 </p>
              <p className="nominal-item__price">Rp120.000</p>
              <p className="nominal-item__more" onClick={this.handleDrawerOpen}>
                Lihat Selengkapnya
              </p>
            </Grid>
            {/* ----------- END PAKET DATA DISCOUNT----------- */}
          </Grid>
        </Paper>

        <Paper spacing={2} elevation={0} className="nominal-base">
          <h2> Pilihan paket Telkomsel yang lain: </h2>
          <Grid container wrap="nowrap" spacing={2} className="nominal-grid">
            {/* ----------- PAKET DATA GROUP ----------- */}
            <Link href="/transaction/paket-data-detail">
              <Grid
                item
                xs={6}
                align="center"
                className="nominal-item nominal-group"
              >
                <p className="nominal-item__price">Internet</p>
                <p className="nominal-item__quota">20 Paket</p>
                <span> Cek Sekarang </span>
              </Grid>
            </Link>
            {/* ----------- END PAKET DATA GROUP----------- */}

            {/* ----------- PAKET DATA GROUP ----------- */}
            <Link href="/transaction/paket-data-detail">
              <Grid
                item
                xs={6}
                align="center"
                className="nominal-item nominal-group"
              >
                <p className="nominal-item__price">Telepon</p>
                <p className="nominal-item__quota">20 Paket</p>
                <span> Cek Sekarang </span>
              </Grid>
            </Link>
            {/* ----------- END PAKET DATA GROUP----------- */}

            {/* ----------- PAKET DATA GROUP ----------- */}
            <Link href="/transaction/paket-data-detail">
              <Grid
                item
                xs={6}
                align="center"
                className="nominal-item nominal-group"
              >
                <p className="nominal-item__price">SMS</p>
                <p className="nominal-item__quota">20 Paket</p>
                <span> Cek Sekarang </span>
              </Grid>
            </Link>
            {/* ----------- END PAKET DATA GROUP----------- */}

            {/* ----------- PAKET DATA GROUP ----------- */}
            <Link href="/transaction/paket-data-detail">
              <Grid
                item
                xs={6}
                align="center"
                className="nominal-item nominal-group"
              >
                <p className="nominal-item__price">Luar Negeri</p>
                <p className="nominal-item__quota">20 Paket</p>
                <span> Cek Sekarang </span>
              </Grid>
            </Link>
            {/* ----------- END PAKET DATA GROUP----------- */}
          </Grid>
        </Paper>

        <Drawer
          anchor="bottom"
          open={this.state.drawerIsOpen}
          onClose={this.toggleDrawer2("drawerIsOpen", false)}
          className="prod-info"
          elevation={0}
        >
          <div tabIndex={0} role="button">
            <div className="prod-info__header">
              <div className="prod-info__header-left">
                <p>
                  <span> Paket 5 GB 24 jam </span>
                </p>
              </div>
            </div>
            <div className="prod-info__bottom">
              <img
                className="prod-info__close"
                src="/static/transaction/icon-close.svg"
                onClick={() => this.props.changeShowPopUp(false)}
              />
              <p className="prod-info__number">
                Kuota utama 35GB berlaku di jaringan 2G/3G/4G, Bonus kuota
                YouTube 35GB dapat diakses untuk streaming YouTube pada semua
                jaringan 2G/3G/4G, Bonus kuota YouTube Tanpa Kuota hanya berlaku
                dari jam 1 s.d 6 pagi WIB, Memiliki jaringan prioritas untuk
                penggunaan paket internet tanpa hambatan, Jika pelanggan
                memiliki sisa kuota utama, maka kuota akan terakumulasi
                seluruhnya saat perpanjangan paket di bulan berikutnya dan dapat
                digunakan selama paket aktif
              </p>

              <Button variant="contained" fullWidth>
                <p className="MuiButton-label" style={{ color: "white" }}>
                  Lanjut ke pembayaran
                </p>
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default inject("userStore", "transactionStore")(Nominal);
