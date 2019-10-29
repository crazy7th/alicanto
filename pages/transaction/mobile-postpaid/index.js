import React from "react";
import { inject } from "mobx-react";
import Router from "next/router";
import getConfig from "next/config";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LoadingPage from "../../loading";
import Header from "../../../components/Layouts/HeaderTransaction";
import InputField from "../../../components/Transaction/InputCustomerId";
import HistoryTransaction from "../../../components/Transaction/HistoryTransaction";
import Inquiry from "../../../components/Transaction/Inquiry";
import "../../../static/css/style.sass";
import { SlugMultiprice } from "../../../components/Transaction/SlugMultiprice";

const styles = theme => ({
  button: {
    color: "white !important",
    background: "#ff4d4d !important"
  },
  buttonDisabled: {
    color: "white !important",
    background: "#B0B0B0 !important"
  }
});

@inject("transactionStore", "userStore")
class MobilePostpaid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: "",
      warningLessDigit: false,
      warningTooMuchDigit: false,
      showIconClear: false,
      loading: false,
      warningNotFoundCustomerId: false,
      statusButtonCekTagihan: true,
      statusInputCustomerId: true,
      urlMobilePostpaid: "",
      listInquiryMobilePostpaid: ""
    };
    this.clearInput = this.clearInput.bind(this);
    this.editCustomerIdMobilePostpaid = this.editCustomerIdMobilePostpaid.bind(
      this
    );
    this.getProductMobilePostpaid = this.getProductMobilePostpaid.bind(this);
    this.addToCartMobilePostpaid = this.addToCartMobilePostpaid.bind(this);
    this.checkoutMobilePospaid = this.checkoutMobilePospaid.bind(this);
    this.errorResCode = this.errorResCode.bind(this);
  }

  async componentDidMount() {
    // save product type to local storage
    const slugMobilePostpaid = SlugMultiprice.pascaBayar;
    await localStorage.setItem("productType", slugMobilePostpaid);

    // get product bpjs
    await this.getProductMobilePostpaid();
  }

  /**
   * Function to change state when input number
   * @param  {string} e input number value
   * @return none
   */
  async changeInput(e) {
    // set number only
    const numberOnly = e.target.value.replace(/[^0-9]+/g, "");

    // convert 62 to 0
    let cleanPhone = numberOnly.replace(/^(62)/, "0").trim();

    // set warning if number phone > 13
    if (cleanPhone.length > 13) {
      await this.setState({ warningTooMuchDigit: true });
      cleanPhone = await cleanPhone.slice(0, 13);
    }

    // set state phone number with value input(number)
    await this.setState({
      customerId: cleanPhone,
      warningNotFoundCustomerId: false
    });

    // set disable warning when input > 9 and < 13
    if (this.state.customerId.length > 9 && this.state.customerId.length < 13) {
      await this.setState({ warningTooMuchDigit: false });
      await this.setState({ warningLessDigit: false });
    }

    if (this.state.customerId.length > 0) {
      this.setState({ showIconClear: true, statusButtonCekTagihan: false });
    } else {
      this.setState({ showIconClear: false, statusButtonCekTagihan: true });
    }
  }

  /**
   * Function get list multiprice mobile post paid
   * @return none
   */
  async getProductMobilePostpaid() {
    // import some function from store
    const { refreshAuth, token } = this.props.userStore;
    const { showMultipriceWithSlug } = this.props.transactionStore;

    // set token
    const tokens = token.access ? token.access : this.props.token;

    // get slug pln
    const slugMobilePostpaid = SlugMultiprice.pascaBayar;

    // get data from API
    const getDenom = await showMultipriceWithSlug(tokens, slugMobilePostpaid);

    if (getDenom.status === "200") {
      const urlProductMobilePostpaid = getDenom.data[0].product.url;
      await this.setState({
        urlMobilePostpaid: urlProductMobilePostpaid
      });
    }
    // refresh token when get response unauthorized
    else if (getDenom.status === "401") {
      await refreshAuth();

      // set new token
      const tokenNew = token.access ? token.access : this.props.token;

      //  get list data again from api
      const getDenomAgain = await showMultipriceWithSlug(
        tokenNew,
        slugMobilePostpaid
      );

      // redirect to login if refresh token expired
      if (getDenomAgain.status === "401") {
        Router.push("/signin");
      }
      // set state if get response
      else {
        const urlPascabayar = getDenomAgain.data[0].product.id;
        await this.setState({ urlMobilePostpaid: urlPascabayar });
      }
    }
  }

  /**
   * Function to clear input and list denom
   * @return none
   */
  async clearInput() {
    await this.setState({
      customerId: "",
      showIconClear: false,
      warningLessDigit: false,
      warningTooMuchDigit: false,
      statusButtonCekTagihan: true,
      warningNotFoundCustomerId: false
    });
  }

  /**
   * Function to add to cart if click button inquiry
   * @param  {string} e value
   * @return none
   */
  async addToCartMobilePostpaid(e) {
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

    // disble warning digit too much
    await this.setState({ warningTooMuchDigit: false });

    if (customerId.length < 10) {
      // validate if length of customer id < 10
      await this.setState({ warningLessDigit: true });
    } else {
      // call loading page
      await this.setState({ loading: true });
      const url = this.state.urlMobilePostpaid;
      if (url !== "") {
        // set parameter for request add to cart
        const optionValue = [
          { option: `${endpoints}oscar/options/1/`, value: customerId }
        ];
        const tokens = token.access ? token.access : this.props.token;
        const sendCart = await postCartWithOption(tokens, url, optionValue);

        if (sendCart.status === "200") {
          // save value to local storage for request on checkout page
          await localStorage.setItem(
            "optionValue",
            JSON.stringify(optionValue)
          );
          await localStorage.setItem("urlProduct", url);
          // set data for inquiry
          const dataResponse = sendCart.data;
          const dataAttributes = dataResponse.lines[0].attributes;
          const inquiry = checkOptions(dataAttributes, "inquiry_details");
          const valuejson = JSON.parse(inquiry);
          const inquiryShow = await setDataForLoop(valuejson);
          await this.setState({
            listInquiryMobilePostpaid: inquiryShow,
            statusInputCustomerId: false,
            loading: false
          });
        } else if (sendCart.status === "401") {
          // off loading page
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
        await this.setState({
          loading: false,
          warningNotFoundCustomerId: true
        });
      } else if (errorMessage === "50") {
        alert("Tagihan anda sudah terbayar");
      }
    }
  }

  /**
   * Function to edit input customer id when on inquiry page
   * @return none
   */
  async editCustomerIdMobilePostpaid() {
    await this.setState({ statusInputCustomerId: true });
  }

  /**
   * Function to change router chekout postpaid
   * @return none
   */
  async checkoutMobilePospaid() {
    await this.setState({ loading: true });
    Router.push("/transaction/checkout");
    await this.setState({ loading: false });
  }

  /**
   * Function to set wording error digit number customer id
   * @return wording error html
   */
  errorTextMessage() {
    if (this.state.warningLessDigit) {
      return (
        <p style={{ color: "red" }}>
          Nomor handphonenya terlalu sedikit. Minimal 10 digit ya.
        </p>
      );
    } else if (this.state.warningTooMuchDigit) {
      return (
        <p style={{ color: "red" }}>
          Nomor handphonenya kelebihan. Maksimal 13 digit ya.
        </p>
      );
    } else if (this.state.warningNotFoundCustomerId) {
      return (
        <p style={{ color: "red" }}>
          Nomor handphonenya tidak terdaftar. Coba dicek lagi ya.
        </p>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const errorCondition =
      this.state.warningLessDigit ||
      this.state.warningTooMuchDigit ||
      this.state.warningNotFoundCustomerId;
    return (
      <div className="App">
        <Header header="Pasca Bayar " routerBack="/" />
        {/* call loading page */}
        {this.state.loading ? <LoadingPage /> : ""}
        {this.state.statusInputCustomerId ? (
          <div className="section section-plntab">
            <div className="section plntab-content">
              <div className="plntab">
                <InputField
                  changeCustomerInput={e => {
                    this.changeInput(e);
                  }}
                  inputNumber={this.state.customerId}
                  clearInput={() => this.clearInput()}
                  statusClear={this.state.showIconClear}
                  textError={() => this.errorTextMessage()}
                  errorValidation={errorCondition}
                  labelInput="Nomor Handphone"
                  placeHolder="1234xxx"
                />
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.button}
                  disabled={this.state.statusButtonCekTagihan}
                  classes={{ disabled: classes.buttonDisabled }}
                  onClick={this.addToCartMobilePostpaid}
                >
                  Cek Tagihan
                </Button>
              </div>

              <HistoryTransaction imageProduct="/static/transaction/icon-mobile-postpaid.svg" />
            </div>
          </div>
        ) : (
          <div>
            <Inquiry
              editCustomerId={e => this.editCustomerIdMobilePostpaid()}
              listInquiry={this.state.listInquiryMobilePostpaid}
            />
            <div className="section section-plntab">
              <div className="section plntab-content">
                <Button
                  variant="contained"
                  type="submit"
                  className="button-red"
                  onClick={this.checkoutMobilePospaid}
                >
                  Lanjut Ke Pembayaran
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(MobilePostpaid);
