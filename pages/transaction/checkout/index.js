import { inject } from "mobx-react";
import Router from "next/router";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Header from "../../../components/Layouts/HeaderTransaction";
import StepTransaction from "../../../components/Transaction/StepTransaction";
import Detail from "../../../components/Transaction/DetailTransaction";
import Email from "../../../components/Transaction/EmailTransaction";
import Recommend from "../../../components/Transaction/ListRecommendPayment";
import SepulsaKredit from "../../../components/Transaction/SepulsaKredit";
import "../../../static/css/style.sass";
import { SlugMultiprice } from "../../../components/Transaction/SlugMultiprice";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: "telkomsel",
      detailCart: "",
      listRecommendPayment: [],
      is_login: true,
      sepulsaKredit: false,
      totalPriceOrder: 0
    };
    this.getCart = this.getCart.bind(this);
    this.getRecommendPayment = this.getRecommendPayment.bind(this);
    this.displayCart = this.displayCart.bind(this);
  }

  async componentDidMount() {
    // get cart data
    await this.getCart();
    const priceCart = this.state.totalPriceOrder;

    if (priceCart > 0 && this.state.detailCart !== "") {
      // get recomended payment
      await this.getRecommendPayment();
    } else {
      alert("Mohon maaf, silahkan memilih produk lagi");
      const routeUrl = await this.redirectDependOnProductType();
      Router.push(routeUrl);
    }
  }

  /**
   * Function to change router if get cart failed
   * @return none
   */
  redirectDependOnProductType() {
    const productType = localStorage.getItem("productType");
    if (productType === SlugMultiprice.pulsaPrepaid) {
      return "/transaction/pulsa";
    } else if (productType === SlugMultiprice.paketData) {
      return "/transaction/paket-data";
    } else if (productType === SlugMultiprice.plnPrepaid) {
      return "/transaction/pln";
    } else if (productType === SlugMultiprice.bpjsKesehatan) {
      return "/transaction/bpjs-kesehatan";
    } else if (productType === SlugMultiprice.pascaBayar) {
      return "/transaction/mobile-postpaid";
    } else {
      return "/";
    }
  }
  /**
   * Function to get cart detail
   * @return none
   */
  async getCart() {
    const { refreshAuth, token } = this.props.userStore;
    const {
      showCart,
      checkOptions,
      setDataForLoop
    } = this.props.transactionStore;
    // set token
    const tokens = token.access ? token.access : this.props.token;
    // get cart detail from API
    const cart = await showCart(tokens);

    if (cart.status === "200" && cart.data.lines.length > 0) {
      // set data cart
      const cartAttributes = cart.data.lines[0].attributes;
      const cartDetail = JSON.parse(
        checkOptions(cartAttributes, "payment_details")
      );
      const dataCart = await setDataForLoop(cartDetail);
      const totalPrice = cart.data.total_incl_fee;

      // set state data cart detail dan data total price
      await this.setState({
        detailCart: dataCart,
        totalPriceOrder: totalPrice
      });
    } else if (cart.status === "401") {
      // call refresh auth to get new token access
      await refreshAuth();

      // set new token
      const tokenNew = token.access ? token.access : this.props.token;

      //  get list data again from api
      const getCartAgain = await showCart(tokenNew);

      if (getCartAgain.status === "200" && getCartAgain.data.lines.length > 0) {
        // set data for cart
        const cartAttributes = getCartAgain.data.lines[0].attributes;
        const cartDetail = JSON.parse(
          checkOptions(cartAttributes, "payment_details")
        );
        const dataCart = await setDataForLoop(cartDetail);
        const totalPrice = getCartAgain.data.total_incl_fee;

        // set state data cart detail and total price
        await this.setState({
          detailCart: dataCart,
          totalPriceOrder: totalPrice
        });
      } else {
        Router.push("/signin");
      }
    }
  }

  /**
   * Function to call display cart
   * @return {HTMl} display cart detail
   */
  displayCart() {
    const dataCartShow = this.state.detailCart;
    if (dataCartShow !== "") {
      return (
        <ExpansionPanelDetails className="detailtrans-desc">
          {dataCartShow.map((data, index) => (
            <div className="detailtrans-item" key={index}>
              <p className="detailtrans-left">{data.field} </p>
              <p className="detailtrans-right">{data.value}</p>
            </div>
          ))}
        </ExpansionPanelDetails>
      );
    }
  }

  /**
   * Function to get recomended payment
   * @return none
   */
  async getRecommendPayment() {
    const { refreshAuth, token } = this.props.userStore;
    const { showTopPayment } = this.props.transactionStore;
    // set token
    const tokens = token.access ? token.access : this.props.token;

    // request list payment from API
    const recommendPayment = await showTopPayment(tokens);
    if (recommendPayment.status === "200") {
      // set state data list top payment
      await this.setState({ listRecommendPayment: recommendPayment.data });
    } else if (recommendPayment.status === "401") {
      await refreshAuth();
      // set new token
      const tokenNew = token.access ? token.access : this.props.token;
      //  get list data again from api
      const getRecommendPaymentAgain = await showTopPayment(tokenNew);
      await this.setState({
        listRecommendPayment: getRecommendPaymentAgain.data
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header header="Pembayaran" />
        <StepTransaction />
        {!this.state.is_login ? <Email /> : ""}

        <Detail
          cartDetail={this.state.detailCart}
          displayCart={() => this.displayCart()}
          totalPriceOrder={this.state.totalPriceOrder}
        />
        <SepulsaKredit />

        <Recommend
          topPayment={this.state.listRecommendPayment}
          cartDetail={this.state.detailCart}
          {...this.props}
        />
      </div>
    );
  }
}

export default inject("userStore", "productStore", "transactionStore")(Payment);
