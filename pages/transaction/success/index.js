import Router from "next/router";
import { inject } from "mobx-react";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Header from "../../../components/Layouts/HeaderTransaction";
import Success from "../../../components/Transaction/SuccessTransaction";
import "../../../static/css/style.sass";

@inject("transactionStore", "userStore")
class ThankYouPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: "",
      detailOrder: ""
    };
    this.displayDetailOrder = this.displayDetailOrder.bind(this);
    this.displayTotalOrder = this.displayTotalOrder.bind(this);
    this.getOrder = this.getOrder.bind(this);
  }

  async componentDidMount() {
    // get order detail
    this.getOrder();
  }

  /**
   * Function to get order detail
   * @return none
   */
  async getOrder() {
    const { refreshAuth, token } = this.props.userStore;
    const {
      showOrderDetail,
      checkOptions,
      setDataForLoop
    } = this.props.transactionStore;
    const orderId = await localStorage.getItem("orderId");
    const tokens = token.access ? token.access : this.props.token;

    const getOrderDetail = await showOrderDetail(tokens, orderId);
    if (getOrderDetail.status === "200") {
      const orderAttributes = getOrderDetail.data.lines[0].attributes;
      const orderDetail = JSON.parse(
        checkOptions(orderAttributes, "payment_details")
      );
      const showOrder = setDataForLoop(orderDetail);
      const totalPay = getOrderDetail.data.total_incl_fee
        .toString()
        .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
      await this.setState({ detailOrder: showOrder, totalPrice: totalPay });
    } else if (getOrderDetail.status === "401") {
      await refreshAuth();
      // set new token
      const tokenNew = token.access ? token.access : this.props.token;
      const getOrderDetailAgain = await showOrderDetail(tokenNew, orderId);
      if (getOrderDetailAgain.status === "200") {
        const orderAttributes = getOrderDetailAgain.data.lines[0].attributes;
        const orderDetail = JSON.parse(
          checkOptions(orderAttributes, "payment_details")
        );
        const showOrder = setDataForLoop(orderDetail);
        const totalPay = getOrderDetailAgain.data.total_incl_fee
          .toString()
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        await this.setState({ detailOrder: showOrder, totalPrice: totalPay });
      } else if (getOrderDetailAgain.status === "401") {
        alert("Sesi anda telah habis, silahkan login ulang lagi");
        Router.push("/signin");
      }
    }
  }

  /**
   * Function to call display order detail
   * @return {HTMl} display order detail
   */
  displayDetailOrder() {
    const displayOrder = this.state.detailOrder;
    if (displayOrder !== "") {
      return (
        <ExpansionPanelDetails className="success-desc">
          {displayOrder.map((data, index) => (
            <div className="success-item" key={index}>
              <p className="success-left">{data.field} </p>
              <p className="success-right">{data.value}</p>
            </div>
          ))}
        </ExpansionPanelDetails>
      );
    }
  }

  /**
   * Function to call display total order price
   * @return {HTMl} display total order price
   */
  displayTotalOrder() {
    return (
      <ExpansionPanelDetails className="detailtrans-bot">
        <div className="detailtrans-left">
          <p> Total Pembayaran </p>
        </div>
        <div className="detailtrans-right">
          <p>Rp{this.state.totalPrice}</p>
        </div>
      </ExpansionPanelDetails>
    );
  }
  render() {
    return (
      <div>
        <Header disable="headertrans-disable" header="Transaksi Sukses" />
        <Success
          displayDetailOrder={() => this.displayDetailOrder()}
          displayTotalOrder={() => this.displayTotalOrder()}
        />
      </div>
    );
  }
}

export default ThankYouPage;
