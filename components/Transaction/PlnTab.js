import React from "react";
import { inject } from "mobx-react";
import getConfig from "next/config";
import Router from "next/router";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Alert from "./PlnAlert";
import InputField from "./InputCustomerId";
import Inquiry from "./Inquiry";
import NominalPln from "./ListDenom";
import LoadingPage from "../../pages/loading";
import { SlugMultiprice } from "../../components/Transaction/SlugMultiprice";

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
class TabPLN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusTab: 0,
      loading: false,
      // -------------- state for pln prepaid -------------------
      phone_number: "",
      customerIdPrepaid: "",
      showWarningLessDigit: false,
      tooMuchDigit: false,
      showIconClearPhone: false,
      showIconClearPrepaid: false,
      statusInputIdPrepaid: true,
      listInquiry: "",
      listDenomPln: "",
      defaultDenomUrl: "",
      warningLessPln: false,
      warningTooMuchPln: false,
      buttonStatusPostpaid: true,
      warningNotFoundPrepaid: false,
      // -------------- state for pln postpaid -------------------
      customerIdPostpaid: "",
      showIconClearPostpaid: false,
      buttonStatusPrepaid: true,
      urlPostpaid: "",
      warningLessPlnPostpaid: false,
      warningTooMuchPlnPostpaid: false,
      listInquiryPostpaid: "",
      statusInputIdPospaid: true,
      warningNotFoundPostpaid: false
    };
    this.changeTab = this.changeTab.bind(this);
    // -------------- function for pln prepaid -------------------
    this.addToCartInquiryPln = this.addToCartInquiryPln.bind(this);
    this.changeCustomerIdPrepaid = this.changeCustomerIdPrepaid.bind(this);
    this.clearInputPhone = this.clearInputPhone.bind(this);
    this.clearInputPrepaid = this.clearInputPrepaid.bind(this);
    this.editCustomerIdPrepaid = this.editCustomerIdPrepaid.bind(this);
    this.getDenomPlnPrepaid = this.getDenomPlnPrepaid.bind(this);
    this.setDataForDenom = this.setDataForDenom.bind(this);
    this.getUrlForRquest = this.getUrlForRquest.bind(this);
    // -------------- function for pln prepaid -------------------
    this.changeCustomerIdPostpaid = this.changeCustomerIdPostpaid.bind(this);
    this.clearInputPostpaid = this.clearInputPostpaid.bind(this);
    this.getProductPlnPostpaid = this.getProductPlnPostpaid.bind(this);
    this.addToCartPostpaid = this.addToCartPostpaid.bind(this);
    this.checkoutPostpaid = this.checkoutPostpaid.bind(this);
  }

  async componentDidMount() {
    await this.getDenomPlnPrepaid();
    const slugPlnPrepaid = SlugMultiprice.plnPrepaid;
    await localStorage.setItem("productType", slugPlnPrepaid);
    if (this.state.listDenomPln !== "") {
      const cheapestDenomUrl = await this.getUrlForRquest(
        this.state.listDenomPln
      );
      await this.setState({ defaultDenomUrl: cheapestDenomUrl });
    }
  }

  /**
   * Function change active tab when click tab and request multiprice postpaid if status = 1
   * @param  {BOOLEAN} status status active tab
   * @return none
   */
  async changeTab(status) {
    await this.setState({ statusTab: status });
    if (status === 1 && this.state.urlPostpaid === "") {
      await this.getProductPlnPostpaid();
    }
  }

  /**
   * Function to get cheapest active product
   * @param  {array} product listmultiprice denom pln
   * @return url product
   */
  async getUrlForRquest(product) {
    const listData = product;
    for (const i in listData) {
      const val = listData[i];
      const { is_active, product_url } = val;
      if (is_active === true) {
        return product_url;
        break;
      }
    }
  }

  // --------------------------------- Function for PLN PREPAID -----------------------------------------------
  /**
   * Function to add to cart if click button inquiry
   * @param  {string} e value
   * @return none
   */
  async addToCartInquiryPln(e) {
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
    const customerId = this.state.customerIdPrepaid;
    const phoneNumber = this.state.phone_number;

    // disble warning digit too much
    await this.setState({ warningTooMuchPln: false });

    if (customerId.length < 11) {
      // validate if length of customer id < 11
      await this.setState({ warningLessPln: true });
    } else if (phoneNumber.length < 8) {
      await this.setState({ showWarningLessDigit: true });
    } else {
      const url = this.state.defaultDenomUrl;
      // call loading page
      await this.setState({ loading: true });
      if (url !== "") {
        // set parameter for request add to cart
        const optionValue = [
          { option: `${endpoints}oscar/options/1/`, value: customerId },
          { option: `${endpoints}oscar/options/3/`, value: phoneNumber }
        ];
        // set to local storage option value for checkout
        await localStorage.setItem("optionValue", JSON.stringify(optionValue));
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
            listInquiry: inquiryShow,
            statusInputIdPrepaid: false,
            loading: false
          });
        } else if (sendCart.status === "401") {
          await this.setState({ loading: false });
          alert("sesi anda telah habis, silahkan login ulang lagi");
          Router.push("/signin");
        } else if (sendCart.status === "406") {
          // call loading page and show warning notfound prepaid
          await this.setState({ loading: false, warningNotFoundPrepaid: true });
        }
      }
      // off loading page
      await this.setState({ loading: false });
    }
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

  /**
   * Function to change state when input number
   * @param  {string} e input number value
   * @return none
   */
  async changeInputPhone(e) {
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
      this.setState({ showIconClearPhone: true });
    } else {
      this.setState({ showIconClearPhone: false });
    }

    // condition if all input field filled to activate button
    if (this.state.customerIdPrepaid !== "" && this.state.phone_number !== "") {
      await this.setState({ buttonStatusPrepaid: false });
    } else {
      await this.setState({ buttonStatusPrepaid: true });
    }
  }

  /**
   * Function to edit input customer id when on inquiry page
   * @return none
   */
  editCustomerIdPrepaid() {
    this.setState({ statusInputIdPrepaid: true });
  }

  /**
   * Function get list multiprice from API
   * @return none
   */
  async getDenomPlnPrepaid() {
    // import some function from store
    const { refreshAuth, token } = this.props.userStore;
    const { showMultipriceWithSlug } = this.props.transactionStore;

    // set token
    const tokens = token.access ? token.access : this.props.token;

    // get slug pln
    const slugPlnPrepaid = SlugMultiprice.plnPrepaid;

    // get data from API
    const getDenom = await showMultipriceWithSlug(tokens, slugPlnPrepaid);

    if (getDenom.status === "200") {
      await this.setDataForDenom(getDenom.data);
    }
    // refresh token when get response unauthorized
    else if (getDenom.status === "401") {
      await refreshAuth();

      // set new token
      const tokenNew = token.access ? token.access : this.props.token;

      //  get list data again from api
      const getDenomAgain = await showMultipriceWithSlug(
        tokenNew,
        slugPlnPrepaid
      );

      // redirect to login if refresh token expired
      if (getDenomAgain.status === "401") {
        Router.push("/signin");
      }
      // set state if get response
      else {
        await this.setDataForDenom(getDenomAgain.data);
      }
    }
  }

  /**
   * Function to change format list denom pln prepaid for looping
   * @param {array} product response list multiprice with slug pln prepaid
   * @return none
   */
  async setDataForDenom(product) {
    const listData = product;
    let arrayMultiprice = [];

    // filter list denom pln
    for (const i in listData) {
      let data = {};
      const val = listData[i];
      const {
        id,
        admin_fee,
        product_label,
        product,
        price_excl_tax,
        is_active
      } = val;
      data.id = id;
      data.admin_fee = admin_fee;
      data.product_label = product_label;
      data.price_excl_tax = price_excl_tax;
      data.product_url = product.url;
      data.is_active = is_active;
      arrayMultiprice.push(data);
    }

    // set state list denom
    await this.setState({ listDenomPln: arrayMultiprice });
  }

  async changeCustomerIdPrepaid(e) {
    // set number only
    let onlyNumber = e.target.value.replace(/[^0-9]+/g, "");

    // set warning if number phone > 12
    if (onlyNumber.length > 12) {
      await this.setState({ warningTooMuchPln: true });
      onlyNumber = await onlyNumber.slice(0, 12);
    }

    // set state customer ID with value input(number)
    await this.setState({
      customerIdPrepaid: onlyNumber,
      warningNotFoundPrepaid: false
    });

    // set disable warning when input > 10 and < 12
    if (
      this.state.customerIdPrepaid.length > 10 &&
      this.state.customerIdPrepaid.length < 12
    ) {
      await this.setState({ warningLessPln: false });
      await this.setState({ warningTooMuchPln: false });
    }

    if (this.state.customerIdPrepaid.length > 0) {
      this.setState({ showIconClearPrepaid: true });
    } else {
      this.setState({ showIconClearPrepaid: false });
    }

    // condition if payment checked to activate button
    if (this.state.customerIdPrepaid !== "" && this.state.phone_number !== "") {
      await this.setState({ buttonStatusPrepaid: false });
    } else {
      await this.setState({ buttonStatusPrepaid: true });
    }
  }

  /**
   * Function to clear input and list denom
   * @return none
   */
  async clearInputPhone() {
    await this.setState({
      phone_number: "",
      showIconClearPhone: false,
      showWarningLessDigit: false,
      tooMuchDigit: false,
      buttonStatusPrepaid: true
    });
  }

  /**
   * Function to clear input and list denom
   * @return none
   */
  async clearInputPrepaid() {
    await this.setState({
      customerIdPrepaid: "",
      showIconClearPrepaid: false,
      warningLessPln: false,
      warningTooMuchPln: false,
      buttonStatusPrepaid: true,
      warningNotFoundPrepaid: false
    });
  }

  /**
   * Function to set wording error digit number
   * @return wording error html
   */
  errorTextCustomerIdPln() {
    if (this.state.warningLessPln) {
      return (
        <p style={{ color: "red" }}>
          Nomor meternya terlalu sedikit. Minimal 11 digit ya.
        </p>
      );
    } else if (this.state.warningTooMuchPln) {
      return (
        <p style={{ color: "red" }}>
          Nomor meternya kelebihan. Maksimal 12 digit ya.
        </p>
      );
    } else if (this.state.warningNotFoundPrepaid) {
      return (
        <p style={{ color: "red" }}>
          Nomor meter PLNmu tidak ditemukan. Coba ingat-ingat lagi ya
        </p>
      );
    }
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

  // --------------------------------- Function for PLN POST PAID -----------------------------------------------

  /**
   * Function get list multiprice PLN post paid from API
   * @return none
   */
  async getProductPlnPostpaid() {
    // import some function from store
    const { refreshAuth, token } = this.props.userStore;
    const { showMultipriceWithSlug } = this.props.transactionStore;

    // set token
    const tokens = token.access ? token.access : this.props.token;

    // get slug pln
    const slugPlnPostpaid = SlugMultiprice.plnPostpaid;

    // get data from API
    const getDenom = await showMultipriceWithSlug(tokens, slugPlnPostpaid);

    if (getDenom.status === "200") {
      const urlProductPostpaid = getDenom.data[0].product.url;
      await this.setState({ urlPostpaid: urlProductPostpaid });
    }
    // refresh token when get response unauthorized
    else if (getDenom.status === "401") {
      await refreshAuth();

      // set new token
      const tokenNew = token.access ? token.access : this.props.token;

      //  get list data again from api
      const getDenomAgain = await showMultipriceWithSlug(
        tokenNew,
        slugPlnPostpaid
      );

      // redirect to login if refresh token expired
      if (getDenomAgain.status === "401") {
        Router.push("/signin");
      }
      // set state if get response
      else {
        const urlProductPostpaid = getDenomAgain.data[0].product.id;
        await this.setState({ urlPostpaid: urlProductPostpaid });
      }
    }
  }

  /**
   * Function to edit input customer id when on inquiry page
   * @return none
   */
  editCustomerIdPostpaid() {
    this.setState({ statusInputIdPospaid: true });
  }

  /**
   * Function to add to cart if click button inquiry
   * @param  {string} e value
   * @return none
   */
  async addToCartPostpaid(e) {
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
    const customerId = this.state.customerIdPostpaid;

    // disble warning digit too much
    await this.setState({ warningTooMuchPlnPostpaid: false });

    if (customerId.length < 11) {
      // validate if length of customer id < 11
      await this.setState({ warningLessPlnPostpaid: true });
    } else {
      // call loading page
      await this.setState({ loading: true });
      const url = this.state.urlPostpaid;
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
            listInquiryPostpaid: inquiryShow,
            statusInputIdPospaid: false,
            loading: false
          });
        } else if (sendCart.status === "401") {
          // off loading page
          await this.setState({ loading: false });
          alert("sesi anda telah habis, silahkan login ulang lagi");
          Router.push("/signin");
        } else if (sendCart.status === "406") {
          // off loading page and show warning notfound postpaid
          await this.setState({
            loading: false,
            warningNotFoundPostpaid: true
          });
        }
      }

      // off loading page
      await this.setState({ loading: false });
    }
  }

  /**
   * Function to change state when input number
   * @param  {string} e input customer id post paid
   * @return none
   */
  async changeCustomerIdPostpaid(e) {
    // set number only
    let onlyNumber = e.target.value.replace(/[^0-9]+/g, "");

    // set warning if number phone > 12
    if (onlyNumber.length > 12) {
      await this.setState({ warningTooMuchPlnPostpaid: true });
      onlyNumber = await onlyNumber.slice(0, 12);
    }

    // set state customer ID with value input(number)
    await this.setState({
      customerIdPostpaid: onlyNumber,
      warningNotFoundPostpaid: false
    });

    // set disable warning when input > 10 and < 12
    if (
      this.state.customerIdPostpaid.length > 10 &&
      this.state.customerIdPostpaid.length < 12
    ) {
      await this.setState({ warningLessPlnPostpaid: false });
      await this.setState({ warningTooMuchPlnPostpaid: false });
    }

    if (this.state.customerIdPostpaid.length > 0) {
      await this.setState({
        showIconClearPostpaid: true,
        buttonStatusPostpaid: false
      });
    } else {
      await this.setState({
        showIconClearPostpaid: false,
        buttonStatusPostpaid: true
      });
    }
  }

  /**
   * Function to change router chekout postpaid
   * @return none
   */
  async checkoutPostpaid() {
    await this.setState({ loading: true });
    Router.push("/transaction/checkout");
    await this.setState({ loading: false });
  }

  /**
   * Function to clear input and list denom
   * @return none
   */
  async clearInputPostpaid() {
    await this.setState({
      customerIdPostpaid: "",
      showIconClearPostpaid: false,
      buttonStatusPostpaid: true,
      warningLessPlnPostpaid: false,
      warningTooMuchPlnPostpaid: false,
      warningNotFoundPostpaid: false
    });
  }

  /**
   * Function to set wording error digit number
   * @return wording error html
   */
  errorTextCustomerIdPlnPostpaid() {
    if (this.state.warningLessPlnPostpaid) {
      return (
        <p style={{ color: "red" }}>
          Nomor meternya terlalu sedikit. Minimal 11 digit ya.
        </p>
      );
    } else if (this.state.warningTooMuchPlnPostpaid) {
      return (
        <p style={{ color: "red" }}>
          Nomor meternya kelebihan. Maksimal 12 digit ya.
        </p>
      );
    } else if (this.state.warningNotFoundPostpaid) {
      return (
        <p style={{ color: "red" }}>
          Nomor meter PLNmu tidak ditemukan. Coba ingat-ingat lagi ya
        </p>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const errorCondition =
      this.state.showWarningLessDigit || this.state.tooMuchDigit;

    const errorCustomerIdPlnPrepaid =
      this.state.warningLessPln ||
      this.state.warningTooMuchPln ||
      this.state.warningNotFoundPrepaid;

    const errorCustomerIdPlnPostpaid =
      this.state.warningLessPlnPostpaid ||
      this.state.warningTooMuchPlnPostpaid ||
      this.state.warningNotFoundPostpaid;

    return (
      <div className="section section-plntab">
        {/* call loading page */}
        {this.state.loading ? <LoadingPage /> : ""}
        <AppBar position="static">
          <Tabs
            value={this.state.statusTab}
            variant="fullWidth"
            className="plntab-tab"
          >
            <Tab label="Token Listrik" onClick={e => this.changeTab(0)} />
            <Tab label="Tagihan Listrik" onClick={e => this.changeTab(1)} />
          </Tabs>
        </AppBar>

        {/* ----------------------- PLN PRE PAID --------------------- */}
        <div className="section plntab-content">
          {this.state.statusTab === 0 && this.state.statusInputIdPrepaid ? (
            <div className="plntab">
              <Alert
                content="Sepulsa Mate, Pembelian Token Listrik tidak dapat
              dilakukan pada jam <span> 23.00 - 01.00 </span> WIB setiap harinya
              sesuai dengan ketentuan dari PLN"
              />
              <Paper>
                <InputField
                  changeCustomerInput={e => {
                    this.changeCustomerIdPrepaid(e);
                  }}
                  inputNumber={this.state.customerIdPrepaid}
                  clearInput={() => this.clearInputPrepaid()}
                  statusClear={this.state.showIconClearPrepaid}
                  errorValidation={errorCustomerIdPlnPrepaid}
                  textError={() => this.errorTextCustomerIdPln()}
                  labelInput="Nomor Meter PLN / ID Pelanggan"
                  placeHolder="1234xxx"
                  padding="0px 4px 17px 0px"
                  id="nomor-meter"
                  name="nomor-meter"
                />
                <div
                  className="pln-field-handphone"
                  style={{ marginTop: "-36px", paddingTop: "0px" }}
                >
                  <InputField
                    changeCustomerInput={e => {
                      this.changeInputPhone(e);
                    }}
                    inputNumber={this.state.phone_number}
                    clearInput={() => this.clearInputPhone()}
                    statusClear={this.state.showIconClearPhone}
                    errorValidation={errorCondition}
                    textError={() => this.errorTextMessage()}
                    labelInput="Nomor Handphone"
                    placeHolder="08xxx"
                    padding="0px 4px 17px 0px"
                    id="nomor-handphone"
                    name="nomor-handphone"
                  />
                </div>
                <div className="pln-notif-handphone">
                  <p className="plntab-alert">
                    <img src="/static/transaction/icon-alert.svg" /> Nomor token
                    Anda akan dikirimkan ke nomor handphone ini
                  </p>
                </div>
              </Paper>
              <Button
                variant="contained"
                fullWidth
                size="medium"
                disabled={this.state.buttonStatusPrepaid}
                onClick={this.addToCartInquiryPln}
                className={classes.button}
                classes={{ disabled: classes.buttonDisabled }}
              >
                Lanjutkan
              </Button>
            </div>
          ) : (
            this.state.statusTab === 0 &&
            this.state.listInquiry !== "" && (
              <div>
                <Inquiry
                  editCustomerId={e => this.editCustomerIdPrepaid()}
                  listInquiry={this.state.listInquiry}
                />
                <NominalPln
                  productList={this.state.listDenomPln}
                  labelNominal="Pilih Nominal Token Listrik"
                  customerId={this.state.customerIdPrepaid}
                  phoneNumber={this.state.phone_number}
                  loading={this.state.loading}
                  changeStatusLoading={e => this.changeStatusLoading(e)}
                  {...this.props}
                />
              </div>
            )
          )}

          {/* ----------------------- PLN POST PAID --------------------- */}
          {this.state.statusTab === 1 && this.state.statusInputIdPospaid ? (
            <div className="plntab">
              <Alert
                content="Sepulsa Mate, Pembelian Tagihan Listrik tidak dapat
              dilakukan pada jam <span> 23.00 - 01.00 </span> WIB setiap harinya
              sesuai dengan ketentuan dari PLN"
              />
              <InputField
                changeCustomerInput={e => {
                  this.changeCustomerIdPostpaid(e);
                }}
                inputNumber={this.state.customerIdPostpaid}
                clearInput={() => this.clearInputPostpaid()}
                statusClear={this.state.showIconClearPostpaid}
                errorValidation={errorCustomerIdPlnPostpaid}
                textError={() => this.errorTextCustomerIdPlnPostpaid()}
                labelInput="Nomor ID Pelanggan"
                placeHolder="1234xxx"
                padding="0px 4px 17px 0px"
              />
              <Button
                variant="contained"
                type="submit"
                className={classes.button}
                classes={{ disabled: classes.buttonDisabled }}
                disabled={this.state.buttonStatusPostpaid}
                onClick={this.addToCartPostpaid}
              >
                Lanjutkan
              </Button>
            </div>
          ) : (
            this.state.statusTab === 1 &&
            this.state.listInquiryPostpaid !== "" && (
              <div>
                <Inquiry
                  editCustomerId={e => this.editCustomerIdPostpaid()}
                  listInquiry={this.state.listInquiryPostpaid}
                />
                <Button
                  variant="contained"
                  className={classes.button}
                  classes={{ disabled: classes.buttonDisabled }}
                  onClick={this.checkoutPostpaid}
                >
                  Lanjut ke Pembayaran
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TabPLN);
