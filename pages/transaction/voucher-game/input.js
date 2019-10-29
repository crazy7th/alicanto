import React from "react";
import { inject } from "mobx-react";

import Header from "../../../components/Layouts/HeaderTransaction";
import "../../../static/css/style.sass";
import Alert from "../../../components/Transaction/VoucherGameAlert";
import Input from "../../../components/Transaction/InputCustomerId";
import HistoryTransaction from "../../../components/Transaction/HistoryTransaction";
import Nominal from "../../../components/Transaction/ListDenom";
import LoadingPage from "../../loading";
import { SlugMultiprice } from "../../../components/Transaction/SlugMultiprice";

import * as Constants from "../../../util/Constants";
import * as ConstantsImg from "../../../util/ConstantsImg";

class TransactionVoucherGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phone_number: "",
      showIconClear: false,
      listDenom: [{
        "id": 25,
        "is_promo": true,
        "partner_sku": "SPSTR5",
        "price_excl_tax": "7000",
        "is_active": true,
        "admin_fee": "125",
        "is_admin_fee_kraken": false,
        "product_label": "Nominal 5000",
        "description": "<p>Kuota utama 35GB berlaku di jaringan 2G/3G/4G, Bonus kuota YouTube 35GB dapat diakses untuk streaming YouTube pada semua jaringan 2G/3G/4G, Bonus kuota YouTube Tanpa Kuota hanya berlaku dari jam 1 s.d 6 pagi WIB, Memiliki jaringan prioritas untuk penggunaan paket internet tanpa hambatan, Jika pelanggan memiliki sisa kuota utama, maka kuota akan terakumulasi seluruhnya saat perpanjangan paket di bulan berikutnya dan dapat digunakan selama paket aktif Mulai tgl 27 Februari 2019, khusus bagi pelanggan dengan paket XTRA Combo VIP dapat menikmati tayangan film dan serial berkualitas dari iFlix VIP tanpa biaya berlangganan, Paket akan diperpanjang otomatis.</p>",
        "tag": "",
        "product": {
          "url": "http://chital.sumpahpalapa.com/api/v1/oscar/products/24/",
          "id": 24,
          "description": "Ini Pulsa Tri 5000",
          "product_class": "Pulsa",
          "categories": [
            "Pulsa > Tri"
          ]
        }
      },
      {
        "id": 30,
        "partner_sku": "SPSTSEL5K",
        "price_excl_tax": "13000",
        "is_active": true,
        "admin_fee": "1000",
        "is_admin_fee_kraken": false,
        "product_label": "Nominal 10.000",
        "description": "<p>Kuota utama 35GB berlaku di jaringan 2G/3G/4G, Bonus kuota YouTube 35GB dapat diakses untuk streaming YouTube pada semua jaringan 2G/3G/4G, Bonus kuota YouTube Tanpa Kuota hanya berlaku dari jam 1 s.d 6 pagi WIB, Memiliki jaringan prioritas untuk penggunaan paket internet tanpa hambatan, Jika pelanggan memiliki sisa kuota utama, maka kuota akan terakumulasi seluruhnya saat perpanjangan paket di bulan berikutnya dan dapat digunakan selama paket aktif Mulai tgl 27 Februari 2019, khusus bagi pelanggan dengan paket XTRA Combo VIP dapat menikmati tayangan film dan serial berkualitas dari iFlix VIP tanpa biaya berlangganan, Paket akan diperpanjang otomatis.</p>",
        "tag": "",
        "product": {
          "url": "http://chital.sumpahpalapa.com/api/v1/oscar/products/29/",
          "id": 29,
          "description": "Ini Pulsa Telkomsel 5k",
          "product_class": "Pulsa",
          "categories": [
            "Pulsa > Telkomsel"
          ]
        }
      },
      {
        "id": 22,
        "is_promo": true,
        "partner_sku": "SPSSF10",
        "price_excl_tax": "23000",
        "is_active": false,
        "admin_fee": null,
        "is_admin_fee_kraken": false,
        "product_label": "Nominal 25.000",
        "description": "<p>Kuota utama 35GB berlaku di jaringan 2G/3G/4G, Bonus kuota YouTube 35GB dapat diakses untuk streaming YouTube pada semua jaringan 2G/3G/4G, Bonus kuota YouTube Tanpa Kuota hanya berlaku dari jam 1 s.d 6 pagi WIB, Memiliki jaringan prioritas untuk penggunaan paket internet tanpa hambatan, Jika pelanggan memiliki sisa kuota utama, maka kuota akan terakumulasi seluruhnya saat perpanjangan paket di bulan berikutnya dan dapat digunakan selama paket aktif Mulai tgl 27 Februari 2019, khusus bagi pelanggan dengan paket XTRA Combo VIP dapat menikmati tayangan film dan serial berkualitas dari iFlix VIP tanpa biaya berlangganan, Paket akan diperpanjang otomatis.</p>",
        "tag": "",
        "product": {
          "url": "http://chital.sumpahpalapa.com/api/v1/oscar/products/26/",
          "id": 26,
          "description": "Ini Pulsa Smartfren 10k",
          "product_class": "Pulsa",
          "categories": [
            "Pulsa > Smartfren"
          ]
        }
      }],
      logoProvider: "",
      title: ""
    };

    this.clearInput = this.clearInput.bind(this);
    this.errorTextMessage = this.errorTextMessage.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeStatusLoading = this.changeStatusLoading.bind(this);
  }

  async componentDidMount() {
    const productType = await localStorage.getItem("productType");
    let title;
    let logo;
    if (productType === SlugMultiprice.voucherGooglePlay) {
      title = Constants.VOUCHER_GAME_GOOGLE_PLAY;
      logo = ConstantsImg.VOUCHER_GAME_GOOGLE_PLAY_SMALL;
    } else {
      title = Constants.VOUCHER_GAME;
      logo = ConstantsImg.VOUCHER_GAME_STEAM_SMALL;
    }
    this.setState({ title: title, logoProvider: logo });
  }

  /**
   * Function to change state when input number
   *
   * @param  {string} e input number value
   * @return none
   */
  async changeInput(e) {
    // set number only
    const numberOnly = e.target.value.replace(/[^0-9]+/g, "");

    // convert 62 to 0
    let cleanPhone = numberOnly.replace(/^(62)/, "0").trim();

    // set warning if number phone > 13
    if (cleanPhone.length > 14) {
      await this.setState({ tooMuchDigit: true });
      cleanPhone = await cleanPhone.slice(0, 14);
    }

    // set state phone number with value input(number)
    await this.setState({ phone_number: cleanPhone });

    // set disable warning when input > 8 and < 13
    if (
      this.state.phone_number.length > 8 &&
      this.state.phone_number.length < 14
    ) {
      await this.setState({ tooMuchDigit: false });
      await this.setState({ showWarningLessDigit: false });
    }

    if (this.state.phone_number.length > 0) {
      this.setState({ showIconClear: true });
    } else {
      this.setState({ showIconClear: false });
    }
  }

  /**
   * Function to clear input and list denom
   * @return none
   */
  async clearInput() {
    await this.setState({
      phone_number: "",
      showIconClear: false,
      listDenom: [],
      showWarningLessDigit: false,
      tooMuchDigit: false
    });
  }

  /**
   * Function to set wording error digit number
   * @return wording error html
   */
  errorTextMessage() {
    if (this.state.showWarningLessDigit) {
      return (
        <p style={{ color: "red" }}>
          Nomor handphonenya terlalu sedikit. Minimal 8 digit ya.
        </p>
      );
    } else if (this.state.tooMuchDigit) {
      return (
        <p style={{ color: "red" }}>
          Nomor handphonenya kelebihan. Maksimal 14 digit ya.
        </p>
      );
    }
  }

  /**
   * Function to change status warning show/not
   * @param {boolean} status status warning if digit less than 8
   * @return none
   */
  async changeStatus(status) {
    await this.setState({
      showWarningLessDigit: status
    });
  }

  /**
   * Function to change status loading page/not
   * @param {boolean} status loading page appear when click denom
   * @return none
   */
  async changeStatusLoading(status) {
    await this.setState({
      loading: status
    });
  }

  render() {
    const errorCondition =
      this.state.showWarningLessDigit || this.state.tooMuchDigit;

    return (
      <div className="App">
        <Header header={this.state.title} />
        <div className="section">
          <Alert method="Token" />
          {this.state.loading ? <LoadingPage /> : ""}
          <Input
            changeCustomerInput={e => {
              this.changeInput(e);
            }}
            inputNumber={this.state.phone_number}
            clearInput={() => this.clearInput()}
            statusClear={this.state.showIconClear}
            errorValidation={errorCondition}
            textError={() => this.errorTextMessage()}
            labelInput="Nomor Handphone"
            placeHolder="08xxx"
            id="phone_number"
            name="phone_number"
          />
          {this.state.phone_number.length < 8 ? (
            <HistoryTransaction imageProduct={ConstantsImg.PRODUCT_VOUCHER_GAME} />
          ) : (
              ""
            )}
          {this.state.phone_number.length >= 8 ? (
            <Nominal
              productList={this.state.listDenom}
              logoOperator={this.state.logoProvider}
              customerId={this.state.phone_number}
              changeStatus={value => this.changeStatus(value)}
              loading={this.state.loading}
              changeStatusLoading={e => this.changeStatusLoading(e)}
              labelNominal="Pilih Nominal Voucher:"
              isCenterText={true}
              {...this.props}
            />
          ) : (
              ""
            )}
        </div>
      </div>
    );
  }
}

export default inject("userStore", "productStore", "transactionStore")(
  TransactionVoucherGame
);
