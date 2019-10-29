import React from "react";
import { inject } from "mobx-react";
import PropTypes from "prop-types";
import Router from "next/router";
import getConfig from "next/config";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingSepulsa from "../../pages/loading";

const styles = theme => ({
  radio: {
    color: grey[500],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {},
  button: {
    color: grey[500]
  }
});

@inject("transactionStore", "userStore")
class PaymentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      buttonStatus: true,
      loading: false,
      optionIncludePayment: ""
    };
    this.redirectUrl = this.redirectUrl.bind(this);
    this.checkoutPayment = this.checkoutPayment.bind(this);
    this.insertPaymentMethod = this.insertPaymentMethod.bind(this);
    this.addPaymentToCart = this.addPaymentToCart.bind(this);
    this.onlyCheckThis = this.onlyCheckThis.bind(this);
  }

  /**
   * Function to set status checkable payment
   * @return none
   */
  async onlyCheckThis(event) {
    await this.setState({ selectedValue: event.target.name });
  }

  /**
   * Function to insert payment method on option
   * @return none
   */
  async insertPaymentMethod(e) {
    // const statusCheck = e.target.checked;
    const urlPayment = e.target.value;

    // get endpoint for option
    const { publicRuntimeConfig } = getConfig();
    const endpoints =
      publicRuntimeConfig.baseURL + publicRuntimeConfig.apiEndpoints;
    // get option value from local storage
    const optionValue = await JSON.parse(localStorage.getItem("optionValue"));
    // set url payment
    const optionPayment = {
      option: `${endpoints}oscar/options/2/`,
      value: urlPayment
    };
    await optionValue.push(optionPayment);
    // set state new value
    await this.setState({ optionIncludePayment: optionValue });

    // condition if payment checked to activate button
    if (this.state.optionIncludePayment !== "") {
      await this.setState({ buttonStatus: false });
    } else {
      await this.setState({ buttonStatus: true });
    }
  }

  /**
   * Function to hit API add to cart include payment method
   * @param {string} token token access
   * @return none
   */
  async addPaymentToCart(token) {
    const optionValue = this.state.optionIncludePayment;
    const urlProduct = localStorage.getItem("urlProduct");
    if (optionValue !== "" && urlProduct !== null) {
      const { postCartWithOption } = this.props.transactionStore;
      const cartUpdate = await postCartWithOption(
        token,
        urlProduct,
        optionValue
      );
      return cartUpdate;
    } else {
      alert("maaf, silahkan memilih metode pembayaran terlebih dahulu");
    }
  }

  /**
   * Function to do checkout payment
   * @return none
   */
  async checkoutPayment() {
    await this.setState({ loading: true, buttonStatus: true });
    const { refreshAuth, token } = this.props.userStore;
    const { postCheckoutProcess, paymentProcess } = this.props.transactionStore;
    const paymentName = this.state.selectedValue;
    if (paymentName === "Kredivo" || paymentName === "BNI Credit Card") {
      // set token
      const tokens = token.access ? token.access : this.props.token;
      const newCart = await this.addPaymentToCart(tokens);
      if (newCart.status === "200") {
        const urlBasket = newCart.data.url;
        const checkoutProcess = await postCheckoutProcess(tokens, urlBasket);
        if (checkoutProcess.status === "200") {
          const urlPayment = checkoutProcess.data.payment_url.slice(1);
          const orderNumber = checkoutProcess.data.number;
          await localStorage.setItem("orderId", orderNumber);
          const checkoutPayment = await paymentProcess(tokens, urlPayment);
          if (checkoutPayment.status === "200") {
            const urlRedirect = checkoutPayment.data.checkoutURL;
            this.redirectUrl(urlRedirect);
          } else {
            alert("Gagal checkout payment");
          }
        } else {
          alert(" Gagal checkout process");
        }
      } else if (newCart.status === "401") {
        await refreshAuth();
        const tokenNew = token.access ? token.access : this.props.token;
        const newCartAgain = await this.addPaymentToCart(tokenNew);
        if (newCartAgain.status === "200") {
          const urlBasketNew = newCartAgain.data.url;
          const checkoutProcessNew = await postCheckoutProcess(
            tokenNew,
            urlBasketNew
          );
          if (checkoutProcessNew.status === "200") {
            const urlPaymentNew = checkoutProcessNew.data.payment_url.slice(1);
            const orderNumberNew = checkoutProcessNew.data.number;
            await localStorage.setItem("orderId", orderNumberNew);
            const checkoutPaymentNew = await paymentProcess(
              tokenNew,
              urlPaymentNew
            );
            if (checkoutPaymentNew.status === "200") {
              const urlRedirect = checkoutPaymentNew.data.checkoutURL;
              this.redirectUrl(urlRedirect);
            } else {
              alert("Gagal checkout payment");
            }
          } else {
            alert("Gagal checkout process");
          }
        } else {
          alert("Gagal menambahkan payment method");
        }
      } else {
        alert("Gagal menambahkan payment method");
      }
    } else {
      alert(
        "Maaf sementara pembayaran hanya bisa dilakukan melalui kredivo dan BNI credit card"
      );
    }
    await this.setState({ loading: false, buttonStatus: false });
  }

  /**
   * Function to redirect to another page
   * @return none
   */
  redirectUrl(url) {
    window.location.href = url;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="section section-list">
        {/* call loading page */}
        {this.state.loading ? <LoadingSepulsa /> : ""}
        {this.props.availablePayment.map(payment =>
          payment.payment_credential.length > 0 ? (
            <div className="list-item" key={payment.title}>
              <h2>{payment.title}</h2>
              <Paper elevation={0} className="list-base">
                <List>
                  {payment.payment_credential.map((detailPayment, i) => (
                    <ListItem key={i}>
                      <label key={i}>
                        <figure>
                          <img
                            src="/static/transaction/payment.jpeg"
                            className="base-image"
                          />
                        </figure>
                        <div>
                          <p>{detailPayment.payment_name}</p>
                        </div>
                        <Radio
                          icon={<CircleCheckedFilled />}
                          checkedIcon={<CircleCheckedFilled />}
                          checked={
                            this.state.selectedValue ===
                            detailPayment.payment_name
                          }
                          name={detailPayment.payment_name}
                          onClick={this.onlyCheckThis}
                          onChange={this.insertPaymentMethod}
                          value={detailPayment.sourcetype.url}
                          classes={{
                            root: classes.radio,
                            checked: classes.checked
                          }}
                        />
                      </label>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </div>
          ) : (
            ""
          )
        )}
        <div className="next-payment">
          <Button
            variant="contained"
            elevation={0}
            fullWidth
            size="large"
            color="secondary"
            className="checkout-button"
            onClick={this.checkoutPayment}
            disabled={this.state.buttonStatus}
          >
            {this.state.loading ? (
              <CircularProgress
                size={30}
                thickness={5}
                classes={{ root: classes.button }}
              />
            ) : (
              "Lanjut ke pembayaran"
            )}
          </Button>
        </div>
      </div>
    );
  }
}

PaymentList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentList);
