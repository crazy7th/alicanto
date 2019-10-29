import { inject } from "mobx-react";
import Router from "next/router";
import Header from "../../../components/Layouts/HeaderTransaction";
import List from "../../../components/Transaction/ListAllPayment";
import "../../../static/css/style.sass";

class listPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPayment: []
    };
    this.getPaymentData = this.getPaymentData.bind(this);
  }

  async componentDidMount() {
    await this.getPaymentData();
  }

  /**
   * Function to get all payment data
   * @return none
   */
  async getPaymentData() {
    const { refreshAuth, token } = this.props.userStore;
    const { showAllPayment } = this.props.transactionStore;
    // set token
    const tokens = token.access ? token.access : this.props.token;
    // get payment list
    const paymentData = await showAllPayment(tokens);

    if (paymentData.status === "200") {
      await this.setState({ allPayment: paymentData.data });
    } else if (paymentData.status === "401") {
      await refreshAuth();
      // set new token
      const tokenNew = token.access ? token.access : this.props.token;
      //  get list data again from api
      const getPaymentDataAgain = await showAllPayment(tokenNew);
      await this.setState({
        allPayment: getPaymentDataAgain.data
      });
    } else {
      alert(
        "Mohon maaf, silahkan memilih product lagi karena anda belum menyelesaikan pembayaran"
      );
      const routeUrl = await this.redirectDependOnProductType();
      Router.push(routeUrl);
    }
  }
  redirectDependOnProductType() {
    const productType = localStorage.getItem("productType");
    if (productType === SlugMultiprice.pulsaPrepaid) {
      return "/transaction/pulsa";
    } else if (productType === SlugMultiprice.paketData) {
      return "/transaction/paket-data";
    } else if (productType === SlugMultiprice.plnPrepaid) {
      return "/transaction/pln";
    } else {
      return "/";
    }
  }

  render() {
    return (
      <div className="App">
        <Header header="Pembayaran" />
        <List availablePayment={this.state.allPayment} {...this.props} />
      </div>
    );
  }
}

export default inject("userStore", "productStore", "transactionStore")(
  listPayment
);
