import React from "react";
import { inject } from "mobx-react";
import Header from "../../../components/Layouts/HeaderTransaction";
import Input from "../../../components/Transaction/InputCustomerId";

import InputZone from "../../../components/Transaction/InputZone";
import Nominal from "../../../components/Dummy/NominalDummy2";
import { phoneOperator } from "../../../components/Transaction/MobileProvider";
import "../../../static/css/style.sass";
import Router from "next/router";
import LoadingPage from "../../loading";
import { SlugMultiprice } from "../../../components/Transaction/SlugMultiprice";

class TransactionPaketData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: "",
      logoProvider: "",
      phone_number: "",
      listMultiprice: [],
      listDenom: [],
      showWarningLessDigit: false,
      tooMuchDigit: false,
      showIconClear: false,
      loading: false
    };
    // this.changeInput = this.changeInput.bind(this);
    this.checkOperator = this.checkOperator.bind(this);
    this.getDenomPaketData = this.getDenomPaketData.bind(this);
    this.setProductList = this.setProductList.bind(this);
    this.filterListProduct = this.filterListProduct.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.changeStatusLoading = this.changeStatusLoading.bind(this);
    this.errorTextMessage = this.errorTextMessage.bind(this);
  }

  /**
   * Function to mount list multiprice when load page
   */
  componentDidMount() {
    this.getDenomPaketData();
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

    // set denom list
    this.setProductList();
  }

  /**
   * Function set list denom filter by prefix
   * @return none
   */
  async setProductList() {
    // set null on listdenom and provider if input < 4
    if (this.state.phone_number.length < 4) {
      await this.setState({ provider: "", logoProvider: "", listDenom: [] });
    }
    // set list denom if input > 4
    else {
      await this.checkOperator();
      await this.filterListProduct(this.state.listMultiprice);
    }
  }

  /**
   * Function to filter list multiprice by prefix
   *
   * @param  {array} product listmultiprice
   * @return array filter by prefix
   */
  async filterListProduct(product) {
    // get listmultiprice, provider data from state
    const listData = product;
    const providerData = await this.state.provider.toLowerCase().trim();
    let arrayMultiprice = [];

    // filter list multiprice by prefix
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
      const categoryProduct = product.categories;
      const checkIsPaketData = String(categoryProduct).match(">");
      if (checkIsPaketData !== null) {
        // const category = product;
        let category = product.categories[0].split(">")[1];
        if (category !== undefined) {
          const newCategory = category
            .trim()
            .toLowerCase()
            .split("-")[1];
          if (newCategory === providerData) {
            data.id = id;
            data.admin_fee = admin_fee;
            data.product_label = product_label;
            data.price = price_excl_tax;
            data.category = category;
            data.product_url = product.url;
            data.is_active = is_active;
            arrayMultiprice.push(data);
          }
        }
      }
    }

    // set state list denom
    await this.setState({ listDenom: arrayMultiprice });
  }

  /**
   * Function to check operator by input number
   * @return none
   */
  async checkOperator() {
    // check provider by prefix
    const checkopr = await phoneOperator(this.state.phone_number);
    if (checkopr !== undefined) {
      this.setState({ provider: checkopr.name, logoProvider: checkopr.logo });
    }
  }

  /**
   * Function get list multiprice from API
   * @return none
   */
  async getDenomPaketData() {
    // import some function from store
    const { refreshAuth, token } = this.props.userStore;
    const { showMultipriceWithSlug } = this.props.transactionStore;

    // set token
    const tokens = token.access ? token.access : this.props.token;

    // get slug pulsa
    const slugPaketData = SlugMultiprice.paketData;

    // get data from API
    const getDenom = await showMultipriceWithSlug(tokens, slugPaketData);

    if (getDenom.status === "200") {
      this.setState({ listMultiprice: getDenom.data });
    }
    // refresh token when get response unauthorized
    else if (getDenom.status === "401") {
      await refreshAuth();

      // set new token
      const tokenNew = token.access ? token.access : this.props.token;

      //  get list data again from api
      const getDenomAgain = await showMultipriceWithSlug(
        tokenNew,
        slugPaketData
      );

      // redirect to login if refresh token expired
      if (getDenomAgain.status === "401") {
        Router.push("/signin");
      }
      // set state if get response
      else {
        this.setState({ listMultiprice: getDenomAgain.data });
      }
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
   * Function to change status loading page/not
   * @param {boolean} status loading page appear when click denom
   * @return none
   */
  async showLoading() {
    if (this.state.loading) {
      return <LoadingPage />;
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

  render() {
    const errorCondition =
      this.state.showWarningLessDigit || this.state.tooMuchDigit;
    return (
      <div className="App">
        <Header header="Paket Data" />
        {/* call loading page */}
        {this.state.loading ? <LoadingPage /> : ""}

        <Nominal />
      </div>
    );
  }
}

export default inject("userStore", "productStore", "transactionStore")(
  TransactionPaketData
);
