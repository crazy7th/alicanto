import React from "react";
import { inject } from "mobx-react";
import getConfig from "next/config";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import LoadingPage from "../../loading";
import Inquiry from "../../../components/Transaction/Inquiry";
import Header from "../../../components/Layouts/HeaderTransaction";
import Input from "../../../components/Transaction/InputCustomerId";
import InputPeriode from "../../../components/Transaction/InputPeriode";
import HistoryTransaction from "../../../components/Transaction/HistoryTransaction";
import { SlugMultiprice } from "../../../components/Transaction/SlugMultiprice";
import "../../../static/css/style.sass";

const styles = theme => ({
  button: {
    color: "white !important",
    background: "#ff4d4d !important"
  },
  buttonDisabled: {
    color: "white !important",
    background: "#B0B0B0 !important"
  },
  buttonRed: {
    background: "#FF5959"
  },
  mt0: {
    marginTop: "-20px"
  },
  mt1: {
    marginTop: "-36px"
  }
});

@inject("transactionStore", "userStore")
class BpjsKesehatan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: "",
      listingPeriod: "",
      warningTooMuchCustomerId: false,
      warningLessCustomerId: false,
      selectedPeriodBpjs: "",
      statusInputCustomerId: true,
      alertBpjs: true,
      buttonStatusCekTagihan: true,
      urlBpjsKesehatan: "",
      dataInquiryBpjs: "",
      warningNotFoundBpjs: false,
      loading: false,
      indexMonthSelected: ""
    };
    this.clearInput = this.clearInput.bind(this);
    this.changeInputCustomerId = this.changeInputCustomerId.bind(this);
    this.updateSelectedPeriod = this.updateSelectedPeriod.bind(this);
    this.addToCartBpjs = this.addToCartBpjs.bind(this);
    this.editCustomerIdBpjs = this.editCustomerIdBpjs.bind(this);
    this.getProductBpjsKesehatan = this.getProductBpjsKesehatan.bind(this);
    this.checkoutBpjs = this.checkoutBpjs.bind(this);
    this.errorResCode = this.errorResCode.bind(this);
  }

  async componentDidMount() {
    // save product type to local storage
    const slugBpjsKesehatan = SlugMultiprice.bpjsKesehatan;
    await localStorage.setItem("productType", slugBpjsKesehatan);

    // get dinamic listing period
    const period = await this.getListingMonth();
    await this.setState({ listingPeriod: period });

    // get product bpjs
    await this.getProductBpjsKesehatan();
  }

  /**
   * Function to set rule input customer id and set state customer id
   * @param {integer} e input customer id by user
   * @return none
   */
  async changeInputCustomerId(e) {
    // set number only
    let numberOnly = e.target.value.replace(/[^0-9]+/g, "");

    // set warning if customer id bpjs > 19
    if (numberOnly.length > 19) {
      await this.setState({ warningTooMuchCustomerId: true });
      numberOnly = await numberOnly.slice(0, 19);
    }

    // set state phone number with value input(number)
    await this.setState({ customerId: numberOnly, warningNotFoundBpjs: false });

    // set disable warning when length of customer id  > 9 and < 20
    if (this.state.customerId.length > 9 && this.state.customerId.length < 19) {
      await this.setState({
        warningLessCustomerId: false,
        warningTooMuchCustomerId: false
      });
    }

    if (this.state.customerId.length > 0) {
      this.setState({ showIconClear: true });
    } else {
      this.setState({ showIconClear: false });
    }

    // condition if all input field filled to activate button
    if (this.state.customerId !== "" && this.state.selectedPeriodBpjs !== "") {
      await this.setState({ buttonStatusCekTagihan: false });
    } else {
      await this.setState({ buttonStatusCekTagihan: true });
    }
  }

  /**
   * Function get list multiprice PLN post paid from API
   * @return none
   */
  async getProductBpjsKesehatan() {
    // import some function from store
    const { refreshAuth, token } = this.props.userStore;
    const { showMultipriceWithSlug } = this.props.transactionStore;

    // set token
    const tokens = token.access ? token.access : this.props.token;

    // get slug pln
    const slugBpjsKesehatan = SlugMultiprice.bpjsKesehatan;

    // get data from API
    const getDenom = await showMultipriceWithSlug(tokens, slugBpjsKesehatan);

    if (getDenom.status === "200") {
      const urlBpjs = getDenom.data[0].product.url;
      await this.setState({ urlBpjsKesehatan: urlBpjs });
    }
    // refresh token when get response unauthorized
    else if (getDenom.status === "401") {
      await refreshAuth();

      // set new token
      const tokenNew = token.access ? token.access : this.props.token;

      //  get list data again from api
      const getDenomAgain = await showMultipriceWithSlug(
        tokenNew,
        slugBpjsKesehatan
      );

      // redirect to login if refresh token expired
      if (getDenomAgain.status === "401") {
        Router.push("/signin");
      }
      // set state if get response
      else {
        const urlBpjsKes = getDenomAgain.data[0].product.id;
        await this.setState({ urlBpjsKesehatan: urlBpjsKes });
      }
    }
  }

  /**
   * Function to add to cart if click button inquiry
   * @param  {string} e value
   * @return none
   */
  async addToCartBpjs() {
    // import some variable from store and config
    const { publicRuntimeConfig } = getConfig();
    const {
      postCartWithOption,
      checkOptions,
      setDataForLoop
    } = this.props.transactionStore;
    const { token } = this.props.userStore;
    const endpoints =
      publicRuntimeConfig.baseURL + publicRuntimeConfig.apiEndpoints;

    // get customer ID
    const customerId = this.state.customerId;
    const selectedPeriodBpjs = this.state.selectedPeriodBpjs;

    // disble warning digit too much
    await this.setState({ warningTooMuchCustomerId: false });

    if (customerId.length < 10) {
      // validate if length of customer id < 10
      await this.setState({ warningLessCustomerId: true });
    } else {
      const url = this.state.urlBpjsKesehatan;
      // call loading page
      await this.setState({ loading: true });
      if (url !== "") {
        // set parameter for request add to cart
        const optionValue = [
          { option: `${endpoints}oscar/options/1/`, value: customerId },
          { option: `${endpoints}oscar/options/9/`, value: selectedPeriodBpjs }
        ];
        // set to local storage option value for checkout
        await localStorage.setItem("optionValue", JSON.stringify(optionValue));
        await localStorage.setItem("urlProduct", url);
        const tokens = token.access ? token.access : this.props.token;
        const sendCart = await postCartWithOption(tokens, url, optionValue);

        if (sendCart.status === "200") {
          // set data for inquiry
          const dataResponse = sendCart.data;
          const dataAttributes = dataResponse.lines[0].attributes;
          const inquiry = checkOptions(dataAttributes, "inquiry_details");
          const valuejson = JSON.parse(inquiry);
          const inquiryShow = await setDataForLoop(valuejson);
          await this.setState({
            dataInquiryBpjs: inquiryShow,
            statusInputCustomerId: false,
            loading: false
          });
        } else if (sendCart.status === "401") {
          await this.setState({ loading: false });
          alert("sesi anda telah habis, silahkan login ulang lagi");
          Router.push("/signin");
        } else if (sendCart.status === "406") {
          const messageError = sendCart.data.response_code[0];
          await this.errorResCode(messageError);
        }
      }
      // off loading page
      await this.setState({ loading: false });
    }
  }

  /**
   * Function to handle scenario response 400
   * @param {string} errorMessage error message from api
   * @return none
   */
  async errorResCode(errorMessage) {
    if (errorMessage !== "") {
      if (errorMessage === "20") {
        // call loading page and show warning notfound bpjs
        await this.setState({ loading: false, warningNotFoundBpjs: true });
      } else if (errorMessage === "50") {
        alert("Tagihan anda sudah terbayar");
      }
    }
  }

  /**
   * Function to clear input when click icon clear
   * @return
   */
  async clearInput() {
    await this.setState({
      customerId: "",
      showIconClear: false,
      warningLessCustomerId: false,
      warningTooMuchCustomerId: false,
      buttonStatusCekTagihan: true,
      warningNotFoundBpjs: false
    });
  }

  /**
   * Function to update selected period bpjs
   * @param {integer} periodValue period selected by user
   * @return none
   */
  async updateSelectedPeriod(periodValue, indexMonth) {
    await this.setState({
      selectedPeriodBpjs: periodValue,
      indexMonthSelected: indexMonth
    });

    if (this.state.customerId !== "" && this.state.selectedPeriodBpjs !== "") {
      await this.setState({ buttonStatusCekTagihan: false });
    } else {
      await this.setState({ buttonStatusCekTagihan: true });
    }
  }

  /**
   * Function to edit input customer id when on inquiry page
   * @return none
   */
  async editCustomerIdBpjs() {
    await this.setState({
      statusInputCustomerId: true
    });
  }

  /**
   * Function to set dinamyc listing period start from this month and max 12 month for dropdown
   * @return {array} listing period data
   */
  getListingMonth() {
    const month = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];
    const getNowDate = new Date();
    const monthNow = getNowDate.getMonth();
    let year = getNowDate.getFullYear();
    const newListMonth = [];
    for (let i = 0; i < 12; i++) {
      const data = {};
      let currentMonth = (monthNow + i) % 12;
      if (currentMonth == 0) {
        year = year + 1;
      }
      data.label = String(month[currentMonth]) + " " + String(year);
      data.value = String(i + 1) + " bulan";
      data.periodValue = String(i + 1);
      newListMonth.push(data);
    }
    return newListMonth;
  }

  /**
   * Function to change router chekout postpaid
   * @return none
   */
  async checkoutBpjs() {
    await this.setState({ loading: true });
    Router.push("/transaction/checkout");
    await this.setState({ loading: false });
  }

  /**
   * Function to set wording error digit number customer id
   * @return wording error html
   */
  errorTextMessage() {
    if (this.state.warningLessCustomerId) {
      return (
        <p style={{ color: "red" }}>
          Nomor BPJS terlalu sedikit. Minimal 10 digit ya.
        </p>
      );
    } else if (this.state.warningTooMuchCustomerId) {
      return (
        <p style={{ color: "red" }}>
          Nomor BPJS kelebihan. Max cuma 19 digit aja ya.
        </p>
      );
    } else if (this.state.warningNotFoundBpjs) {
      return (
        <p style={{ color: "red" }}>
          Nomor BPJS yang kamu masukkan tidak terdaftar. Coba dicek lagi ya.
        </p>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const errorCondition =
      this.state.warningLessCustomerId ||
      this.state.warningTooMuchCustomerId ||
      this.state.warningNotFoundBpjs;

    return (
      <div className="App">
        <Header header="Bayar BPJS Kesehatan" routerBack="/indexlogin" />
        {/* call loading page */}
        {this.state.loading ? <LoadingPage /> : ""}
        {this.state.statusInputCustomerId ? (
          <div>
            <Paper elevation={0}>
              <Input
                changeCustomerInput={e => {
                  this.changeInputCustomerId(e);
                }}
                inputNumber={this.state.customerId}
                clearInput={() => this.clearInput()}
                statusClear={this.state.showIconClear}
                errorValidation={errorCondition}
                textError={() => this.errorTextMessage()}
                labelInput="Nomor BPJS"
                placeHolder="00001234xxx"
              />
              <div className={classes.mt1}>
                {this.state.listingPeriod !== "" ? (
                  <InputPeriode
                    listingPeriod={this.state.listingPeriod}
                    updateSelectedPeriod={(selectedPeriod, indexMonth) =>
                      this.updateSelectedPeriod(selectedPeriod, indexMonth)
                    }
                    indexMonthSelected={this.state.indexMonthSelected}
                  />
                ) : (
                  ""
                )}
              </div>
            </Paper>
            <div className={classes.mt0}>
              <div className="section section-plntab">
                <div className="section plntab-content">
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.button}
                    onClick={this.addToCartBpjs}
                    disabled={this.state.buttonStatusCekTagihan}
                    classes={{ disabled: classes.buttonDisabled }}
                  >
                    Cek Tagihan
                  </Button>
                </div>
              </div>
            </div>
            <HistoryTransaction imageProduct="/static/transaction/icon-bpjs.svg" />
          </div>
        ) : (
          <div>
            {this.state.alertBpjs && (
              <div className="section section-plnwarning mt0">
                <p>
                  Sepulsa Mate, Pembayaran Bayar BPJS Kesehatan tidak dapat
                  dilakukan pada jam <span> 23.00 - 00.30</span> WIB setiap
                  harinya sesuai dengan ketentuan dari BPJS Kesehatan
                </p>
                <img
                  src="/static/transaction/icon-close-red.svg"
                  onClick={() => this.setState({ alertBpjs: false })}
                />
              </div>
            )}
            {this.state.dataInquiryBpjs !== "" && (
              <div>
                <Inquiry
                  editCustomerId={e => this.editCustomerIdBpjs()}
                  listInquiry={this.state.dataInquiryBpjs}
                />
                <div className={classes.mt0}>
                  <div className="section section-plntab">
                    <div className="section plntab-content">
                      <Button
                        variant="contained"
                        type="submit"
                        className="button-red"
                        onClick={this.checkoutBpjs}
                      >
                        Lanjut Ke Pembayaran
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BpjsKesehatan);
